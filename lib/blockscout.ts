import { formatUnits } from "viem";
import { ethCall } from "./rpc";
import { BTCD_TOKEN, ESC_RPC, ESC_BLOCKSCOUT, TOTAL_SUPPLY_SELECTOR } from "./constants";

export interface BTCDData {
  totalSupply: number;
  holderCount: number | null;
}

export async function getBTCDData(): Promise<BTCDData> {
  const supplyHex = await ethCall({
    rpcUrl: ESC_RPC,
    to: BTCD_TOKEN,
    data: TOTAL_SUPPLY_SELECTOR,
    revalidate: 60,
  });

  // Safe BigInt→number via viem formatUnits (handles "0x" edge case)
  const totalSupply =
    supplyHex && supplyHex !== "0x"
      ? parseFloat(formatUnits(BigInt(supplyHex), 18))
      : 0;

  // Fetch holder count from Blockscout V2 API
  let holderCount: number | null = null;
  try {
    const res = await fetch(
      `${ESC_BLOCKSCOUT}/api/v2/tokens/${BTCD_TOKEN}/counters`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const json = await res.json();
      if (json.token_holders_count) {
        holderCount = parseInt(json.token_holders_count, 10);
      }
    }
  } catch {
    // Blockscout holder count is non-critical
  }

  return { totalSupply, holderCount };
}
