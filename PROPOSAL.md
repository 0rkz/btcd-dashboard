# [PROPOSAL] BTCD Analytics Dashboard Phase 2: Collateral Indexer & Historical Data

## 1. Abstract

As Elastos pivots toward becoming the premier Bitcoin Layer-2 (BeL2) ecosystem, the success of the BTCD stablecoin is critical. However, institutional capital and sophisticated DeFi users will not interact with an ecosystem that lacks transparent, real-time risk analytics.

Our team has already built and deployed Phase 1 of the BTCD Analytics Dashboard at our own expense to prove our technical capability. We are now requesting a Cyber Republic grant to fund Phase 2: building custom smart contract indexers, a historical time-series database, and a real-time liquidation tracker to bring BTCD analytics up to industry standards (e.g., matching the data quality of MakerDAO/DAI).

## 2. Motivation & The Problem

Currently, the Elastos ecosystem suffers from a severe lack of third-party data infrastructure:

- **Blind Risk:** Users cannot see the system-wide collateralization ratio of BTCD.
- **No Liquidation Transparency:** Liquidations happen on-chain, but there is no UI tracking them, making the peg mechanisms opaque to retail users.
- **Lack of Historical Context:** Existing explorers only show current state. Users cannot view the historical stability of the BTCD peg or the growth of its TVL over time.

For BeL2 and BTCD to attract serious liquidity from the broader BTCFi market, we must provide the data infrastructure that whales and institutions expect.

## 3. Phase 1: Our Proof of Work (Completed)

We believe in delivering value before asking the DAO for treasury funds. We have successfully built and deployed Phase 1 of the dashboard.

**Live URL:** https://btcd-dashboard.vercel.app/

**Phase 1 Features (Live Today):**

- Real-time BTCD Total Supply & Holder count (via ESC RPC & Blockscout).
- Peg tracking infrastructure with fault-tolerant fallbacks (ready for DEX pool indexing as BTCD liquidity pools are listed).
- Elastos TVL vs. BTCFi Competitors (Babylon Genesis, Stacks, Core, BOB).
- Cross-chain BTC Yield Comparison (Aave V3 WBTC rates vs. BTCD).
- ESC Chain Health monitoring (transaction count, block time).

**Note:** Phase 1 utilizes a serverless edge-cache architecture, meaning it handles massive traffic spikes with zero lag and no API rate-limit crashes. Every data card is independently fault-tolerant — if a single upstream API goes down, only that card degrades while the rest of the dashboard remains fully operational.

## 4. Phase 2: Scope of Work (The Grant Request)

Phase 1 relies strictly on free, public APIs. To get deep collateral data, we must build custom backend infrastructure. Phase 2 funding will be used to build and host:

### A. Custom ESC Smart Contract Indexer

We will build a custom Node.js indexer that constantly listens to the BTCD and BeL2 smart contracts on the Elastos Smart Chain (ESC). It will decode blockchain events to track:

- Total Native BTC locked as collateral.
- The real-time System-Wide Collateralization Ratio.
- Individual loan health factors.

**Dependency:** We will coordinate with the Elastos core team during a pre-development phase to obtain and verify the BeL2 lending contract ABIs and addresses required for accurate event decoding.

### B. Liquidation Engine & Feed

- A live UI feed showing all recent BTCD liquidations, the amount liquidated, and the underlying collateral seized.
- A "Risk Dashboard" showing how much collateral is within 5% of liquidation based on current BTC prices.

### C. Historical Time-Series Database

- Implementation of a PostgreSQL database to store hourly snapshots of BTCD metrics.
- UI upgrades integrating interactive Recharts graphs so users can view 7-day, 30-day, and All-Time charts for BTCD Supply, Peg Stability, and TVL.

## 5. Milestones & Timeline

**Total Estimated Timeline: 8 Weeks**

**Pre-Development (Week 0-1): ABI Discovery & Contract Mapping**
- Coordinate with Elastos core team to obtain verified BeL2 contract ABIs and addresses.
- Map out all relevant event signatures (collateral deposits, liquidations, loan state changes).
- Set up development infrastructure (VPS, database, RPC endpoints).

**Milestone 1 (Week 2-3): Backend Indexer Development**
- Build and deploy the Node.js event listener to a VPS.
- Index historical events from contract deployment to present.
- Validate indexed data against on-chain state.

**Milestone 2 (Week 4-5): Database & API Layer**
- Set up PostgreSQL database for time-series snapshotting.
- Create secure REST API endpoints for the Next.js frontend to query historical data.
- Begin hourly metric snapshots (supply, peg, TVL, collateralization ratio).

**Milestone 3 (Week 6-8): Frontend Integration & UI**
- Build the Liquidation Feed UI.
- Implement historical charts (Supply, Peg, TVL, Collateralization Ratio).
- Build the Risk Dashboard (at-risk collateral visualization).
- Final audit, open-sourcing the indexer code, and mainnet deployment.

## 6. Budget Request

Building custom indexers requires significant backend engineering, and hosting a database/indexer requires ongoing monthly server costs that Phase 1's serverless model avoided.

We are requesting a total of **$12,000 USD** (payable in ELA at the time of distribution) to cover development and 18 months of infrastructure runway.

**Budget Breakdown:**

| Item | Amount |
|------|--------|
| Backend Engineering (Indexer & DB) | $5,500 |
| Frontend Engineering (Charts & UI) | $4,000 |
| Infrastructure Runway (18 Months) | $2,500 |

Infrastructure costs cover VPS hosting for the indexer, managed PostgreSQL database, and premium RPC endpoints required for heavy event indexing.

**Payout Structure:** We request 30% upfront ($3,600) to provision the server infrastructure and begin backend work, and the remaining 70% ($8,400) upon the successful delivery and public launch of Milestone 3.

## 7. Team

We are a highly technical two-person Web3 team (Solutions Architect + Lead Developer) specializing in Next.js App Router architectures, EVM smart contract integrations, and high-performance edge-cached data systems. Our commitment to the Elastos ecosystem is demonstrated by the self-funded Phase 1 dashboard — a fault-tolerant, serverless architecture deployed and live today at https://btcd-dashboard.vercel.app/.
