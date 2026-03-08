import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StatCard } from "@/components/StatCard";
import { PegStatus } from "@/components/PegStatus";
import { YieldTable } from "@/components/YieldTable";
import { TVLChart } from "@/components/TVLChart";
import { ChainHealth } from "@/components/ChainHealth";
import { Phase2Teaser } from "@/components/Phase2Teaser";

import { getBTCDData } from "@/lib/blockscout";
import { getBTCDPrice } from "@/lib/dexscreener";
import { getELAData } from "@/lib/coingecko";
import { getBTCFiTVLs } from "@/lib/defillama";

function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-700/50 bg-gray-800/30 p-6">
      <div className="h-4 w-24 rounded bg-gray-700/50" />
      <div className="mt-3 h-8 w-32 rounded bg-gray-700/50" />
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

async function DashboardContent() {
  const [btcdData, btcdPrice, elaData, btcfiTvls] =
    await Promise.allSettled([
      getBTCDData(),
      getBTCDPrice(),
      getELAData(),
      getBTCFiTVLs(),
    ]);

  const btcd = btcdData.status === "fulfilled" ? btcdData.value : null;
  const peg = btcdPrice.status === "fulfilled" ? btcdPrice.value : null;
  const ela = elaData.status === "fulfilled" ? elaData.value : null;
  const tvls = btcfiTvls.status === "fulfilled" ? btcfiTvls.value : [];
  const elaTvl = tvls.find((t) => t.name === "Elastos")?.tvl ?? 0;

  return (
    <>
      {/* Header */}
      <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            BTCD Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Bitcoin-backed stablecoin on Elastos Smart Chain
          </p>
        </div>
        {ela && (
          <div className="rounded-lg bg-gray-800/50 px-3 py-1.5 text-sm">
            <span className="text-gray-400">ELA: </span>
            <span className="font-medium">${ela.price.toFixed(2)}</span>
          </div>
        )}
      </header>

      {/* Top Stats Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ErrorBoundary>
          <StatCard
            title="BTCD Total Supply"
            value={
              btcd
                ? btcd.totalSupply.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                : "—"
            }
            subtitle={
              btcd?.holderCount
                ? `${btcd.holderCount.toLocaleString()} holders`
                : undefined
            }
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <PegStatus
            priceUsd={peg?.priceUsd ?? null}
            pegDeviation={peg?.pegDeviation ?? null}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <StatCard
            title="ELA Market Cap"
            value={ela ? formatNumber(ela.marketCap) : "—"}
            subtitle={
              ela?.marketCapRank
                ? `#${ela.marketCapRank} on CoinGecko`
                : undefined
            }
          />
        </ErrorBoundary>
      </div>

      {/* Chain Health + Elastos TVL */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <ChainHealth />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <StatCard
            title="Elastos TVL"
            value={elaTvl > 0 ? formatNumber(elaTvl) : "—"}
            subtitle="Source: DeFiLlama"
          />
        </ErrorBoundary>
      </div>

      {/* Yield Comparison Table */}
      <div className="mb-6">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <YieldTable />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* BTCFi TVL Chart */}
      <div className="mb-6">
        <ErrorBoundary>
          <TVLChart data={tvls} />
        </ErrorBoundary>
      </div>

      {/* Phase 2 Teaser */}
      <div className="mb-6">
        <Phase2Teaser />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 pt-4 text-center text-xs text-gray-600">
        <p>
          Data sourced from ESC RPC, DexScreener, CoinGecko, DeFiLlama, and
          Aave. Refreshed every 60-300s via ISR.
        </p>
        <p className="mt-1">
          Built for the Elastos community. Phase 2 funding via Cyber Republic
          DAO.
        </p>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="space-y-4">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </main>
  );
}
