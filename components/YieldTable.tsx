import { getAaveWBTCRates } from "@/lib/aave";

export async function YieldTable() {
  let aaveRates = { supplyAPY: 0, borrowAPY: 0 };
  let aaveError = false;

  try {
    aaveRates = await getAaveWBTCRates();
  } catch {
    aaveError = true;
  }

  const protocols = [
    {
      name: "BTCD / BeL2",
      supplyAPY: "TBD*",
      borrowAPY: "TBD*",
      tvl: "$3.5M",
      highlight: true,
    },
    {
      name: "Aave V3 (WBTC)",
      supplyAPY: aaveError ? "N/A" : `${aaveRates.supplyAPY}%`,
      borrowAPY: aaveError ? "N/A" : `${aaveRates.borrowAPY}%`,
      tvl: "$2.1B",
      highlight: false,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur">
      <h3 className="mb-4 text-sm font-medium text-gray-400">
        BTC Yield Comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="pb-3 text-left font-medium text-gray-400">
                Protocol
              </th>
              <th className="pb-3 text-right font-medium text-gray-400">
                Supply APY
              </th>
              <th className="pb-3 text-right font-medium text-gray-400">
                Borrow APY
              </th>
              <th className="pb-3 text-right font-medium text-gray-400">
                TVL
              </th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((p) => (
              <tr
                key={p.name}
                className={`border-b border-gray-700/30 ${
                  p.highlight ? "bg-blue-950/20" : ""
                }`}
              >
                <td className="py-3 font-medium text-white">
                  {p.name}
                </td>
                <td className="py-3 text-right text-gray-300">
                  {p.supplyAPY}
                </td>
                <td className="py-3 text-right text-gray-300">
                  {p.borrowAPY}
                </td>
                <td className="py-3 text-right text-gray-300">{p.tvl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-600">
        * BeL2 rates require Phase 2 loan indexer
      </p>
    </div>
  );
}
