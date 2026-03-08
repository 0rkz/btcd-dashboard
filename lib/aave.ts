import { decodeFunctionResult } from "viem";
import { ethCall, encodeAddress } from "./rpc";
import { AAVE_V3_POOL_DATA, WBTC_ADDRESS, GET_RESERVE_DATA_SELECTOR } from "./constants";

// Aave V3 PoolDataProvider getReserveData ABI (subset we need)
const getReserveDataAbi = {
  name: "getReserveData",
  type: "function",
  stateMutability: "view",
  inputs: [{ name: "asset", type: "address" }],
  outputs: [
    { name: "unbacked", type: "uint256" },
    { name: "accruedToTreasuryScaled", type: "uint256" },
    { name: "totalAToken", type: "uint256" },
    { name: "totalStableDebt", type: "uint256" },
    { name: "totalVariableDebt", type: "uint256" },
    { name: "liquidityRate", type: "uint256" },
    { name: "variableBorrowRate", type: "uint256" },
    { name: "stableBorrowRate", type: "uint256" },
    { name: "averageStableBorrowRate", type: "uint256" },
    { name: "liquidityIndex", type: "uint256" },
    { name: "variableBorrowIndex", type: "uint256" },
    { name: "lastUpdateTimestamp", type: "uint40" },
  ],
} as const;

export interface AaveRates {
  supplyAPY: number;
  borrowAPY: number;
}

export async function getAaveWBTCRates(): Promise<AaveRates> {
  const rpcUrl = process.env.ALCHEMY_RPC_URL;
  if (!rpcUrl) {
    throw new Error("ALCHEMY_RPC_URL not configured");
  }

  const calldata = GET_RESERVE_DATA_SELECTOR + encodeAddress(WBTC_ADDRESS);

  const rawResult = await ethCall({
    rpcUrl,
    to: AAVE_V3_POOL_DATA,
    data: calldata,
    revalidate: 300,
  });

  const decoded = decodeFunctionResult({
    abi: [getReserveDataAbi],
    functionName: "getReserveData",
    data: rawResult as `0x${string}`,
  });

  // Aave returns rates in RAY (27 decimals) as per-second rates
  // True compound APY = ((1 + rate/SECONDS_PER_YEAR)^SECONDS_PER_YEAR - 1) * 100
  const SECONDS_PER_YEAR = 31536000;
  const liquidityRateAPR = Number(decoded[5]) / 1e27;
  const variableBorrowRateAPR = Number(decoded[6]) / 1e27;

  const supplyAPY = (Math.pow(1 + liquidityRateAPR / SECONDS_PER_YEAR, SECONDS_PER_YEAR) - 1) * 100;
  const borrowAPY = (Math.pow(1 + variableBorrowRateAPR / SECONDS_PER_YEAR, SECONDS_PER_YEAR) - 1) * 100;

  return {
    supplyAPY: Math.round(supplyAPY * 100) / 100,
    borrowAPY: Math.round(borrowAPY * 100) / 100,
  };
}
