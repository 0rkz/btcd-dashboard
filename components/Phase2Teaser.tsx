export function Phase2Teaser() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur">
      {/* Blur overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
        <div className="text-center">
          <span className="inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/30">
            Pending Cyber Republic Grant
          </span>
          <p className="mt-2 text-sm font-medium text-gray-300">Coming Soon</p>
        </div>
      </div>

      {/* Blurred background content */}
      <h3 className="mb-3 text-sm font-medium text-gray-400">
        BTCD Collateral & Liquidation Tracker
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-lg font-bold text-gray-600">156%</p>
          <p className="text-xs text-gray-600">Avg Collateral Ratio</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-600">3</p>
          <p className="text-xs text-gray-600">Liquidations (24h)</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-600">$1.2M</p>
          <p className="text-xs text-gray-600">At-Risk Collateral</p>
        </div>
      </div>
    </div>
  );
}
