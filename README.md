# BTCD Analytics Dashboard

Real-time risk analytics for the Elastos BeL2 ecosystem. The first third-party dashboard for BTCD — Bitcoin's stablecoin on the Elastos Smart Chain.

**Live:** [btcd-dashboard.vercel.app](https://btcd-dashboard.vercel.app/)

## Features

- **BTCD Supply & Holders** — Live on-chain data via ESC RPC and Blockscout
- **Peg Health Tracking** — Infrastructure ready for DEX pool indexing as BTCD liquidity grows
- **ELA Market Data** — Price, market cap, and CoinGecko ranking
- **ESC Chain Health** — Transaction count and block time from Blockscout
- **BTC Yield Comparison** — Aave V3 WBTC supply/borrow APY (live on-chain reads)
- **BTCFi Landscape** — TVL comparison across Babylon Genesis, Core, Stacks, BOB, and Elastos
- **Fault-Tolerant Architecture** — Each data card degrades independently; one API failure doesn't break the dashboard

## Architecture

- **Next.js 14** App Router with Server Components and ISR caching
- **Zero client-side API calls** — All data fetched server-side, cached via `{ next: { revalidate } }`
- **Native `fetch()`** for all RPC calls (preserves Next.js ISR cache)
- **Viem** for ABI decoding only (not network calls)
- **Recharts** for data visualization
- **Tailwind CSS** for styling

```
app/
  page.tsx            — Main dashboard (server component)
  layout.tsx          — Root layout, metadata, OG image
  error.tsx           — SSR error recovery
  opengraph-image.tsx — Dynamic OG image (edge runtime)
components/
  StatCard.tsx        — Reusable metric card
  PegStatus.tsx       — BTCD peg indicator
  YieldTable.tsx      — Aave rate comparison
  TVLChart.tsx        — BTCFi landscape bar chart
  ChainHealth.tsx     — ESC network stats
  Phase2Teaser.tsx    — Coming Soon teaser for Phase 2
  ErrorBoundary.tsx   — Per-card error isolation
lib/
  rpc.ts              — Generic JSON-RPC eth_call helper
  aave.ts             — Aave V3 WBTC rates (compound APY math)
  blockscout.ts       — BTCD supply + holder count
  dexscreener.ts      — BTCD price from DEX pools
  coingecko.ts        — ELA price and market data
  defillama.ts        — Chain TVL data
  constants.ts        — Contract addresses, endpoints, selectors
```

## Data Sources

| Data | Source | Cache |
|------|--------|-------|
| BTCD Supply | ESC RPC `totalSupply()` | 60s |
| Holder Count | Blockscout V2 API | 60s |
| ELA Price | CoinGecko | 60s |
| Chain Stats | Blockscout V2 `/stats` | 300s |
| BTCFi TVL | DeFiLlama `/v2/chains` | 300s |
| Aave WBTC APY | Ethereum RPC via Alchemy | 300s |

## Setup

```bash
npm install
cp .env.example .env.local
# Add your Alchemy RPC URL to .env.local
npm run dev
```

**Environment variables:**
- `ALCHEMY_RPC_URL` — Ethereum mainnet RPC for Aave V3 data reads

## Phase 2

Phase 2 (custom smart contract indexer, historical time-series database, and liquidation tracker) is proposed for funding via the Cyber Republic DAO. See [PROPOSAL.md](./PROPOSAL.md) for details.

## License

MIT
