interface PegStatusProps {
  priceUsd: number | null;
  pegDeviation: number | null;
}

export function PegStatus({ priceUsd, pegDeviation }: PegStatusProps) {
  if (priceUsd === null || pegDeviation === null) {
    return (
      <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur">
        <p className="text-sm font-medium text-gray-400">BTCD Peg</p>
        <p className="mt-2 text-2xl font-bold text-gray-500">No Data</p>
        <p className="mt-1 text-xs text-gray-500">DexScreener unavailable</p>
      </div>
    );
  }

  // Green < 0.5%, Yellow 0.5-2%, Red > 2%
  let statusColor = "text-green-400";
  let borderColor = "border-green-500/30";
  let dotColor = "bg-green-400";
  let label = "On Peg";

  if (pegDeviation > 2) {
    statusColor = "text-red-400";
    borderColor = "border-red-500/30";
    dotColor = "bg-red-400";
    label = "Off Peg";
  } else if (pegDeviation > 0.5) {
    statusColor = "text-yellow-400";
    borderColor = "border-yellow-500/30";
    dotColor = "bg-yellow-400";
    label = "Minor Deviation";
  }

  return (
    <div className={`rounded-xl border ${borderColor} bg-gray-800/50 p-6 backdrop-blur`}>
      <p className="text-sm font-medium text-gray-400">BTCD Peg</p>
      <p className={`mt-2 text-2xl font-bold ${statusColor}`}>
        ${priceUsd.toFixed(4)}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} />
        <span className="text-xs text-gray-500">
          {pegDeviation.toFixed(2)}% off peg &middot; {label}
        </span>
      </div>
    </div>
  );
}
