// === Contract Addresses ===

// ESC (Elastos Smart Chain) — Chain ID 20
export const BTCD_TOKEN = "0x571efCD9c25A57cda70Ca4172cb5A773179C9209";
export const ESC_RPC = "https://api.elastos.io/esc";
export const ESC_BLOCKSCOUT = "https://esc.elastos.io";

// Ethereum Mainnet — Aave V3
// AaveProtocolDataProvider (has getReserveData(address) with pre-processed values)
export const AAVE_V3_POOL_DATA = "0x7B4EB56E7CD4b454BA8ff71E4518426c84fd2b6F";
export const WBTC_ADDRESS = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

// === ABI Function Selectors (4-byte keccak prefixes) ===
export const TOTAL_SUPPLY_SELECTOR = "0x18160ddd"; // totalSupply()
export const GET_RESERVE_DATA_SELECTOR = "0x35ea6a75"; // getReserveData(address)

// === API Endpoints ===
export const COINGECKO_API = "https://api.coingecko.com/api/v3";
export const DEFILLAMA_API = "https://api.llama.fi";
export const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex/tokens";

// === BTCFi Protocols for TVL comparison ===
export const BTCFI_PROTOCOLS = [
  "Babylon Genesis",
  "Core",
  "Stacks",
  "BOB",
  "Elastos",
] as const;
