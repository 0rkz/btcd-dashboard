import { ESC_BLOCKSCOUT } from "@/lib/constants";

interface ChainStats {
  totalTransactions: string | null;
  avgBlockTime: string | null;
}

async function getChainStats(): Promise<ChainStats> {
  try {
    const res = await fetch(`${ESC_BLOCKSCOUT}/api/v2/stats`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return { totalTransactions: null, avgBlockTime: null };

    const json = await res.json();

    return {
      totalTransactions: json.total_transactions ?? null,
      avgBlockTime: json.average_block_time
        ? (json.average_block_time / 1000).toFixed(1)
        : null,
    };
  } catch {
    return { totalTransactions: null, avgBlockTime: null };
  }
}

export async function ChainHealth() {
  const stats = await getChainStats();

  return (
    <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur">
      <h3 className="mb-3 text-sm font-medium text-gray-400">
        ESC Chain Health
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-bold text-white">
            {stats.totalTransactions
              ? Number(stats.totalTransactions).toLocaleString()
              : "—"}
          </p>
          <p className="text-xs text-gray-500">Total Transactions</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">
            {stats.avgBlockTime ? `${stats.avgBlockTime}s` : "—"}
          </p>
          <p className="text-xs text-gray-500">Avg Block Time</p>
        </div>
      </div>
    </div>
  );
}
