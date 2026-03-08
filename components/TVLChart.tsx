"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TVLChartProps {
  data: { name: string; tvl: number }[];
}

function formatTVL(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function TVLChart({ data }: TVLChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-sm font-medium text-gray-400">
          BTCFi Landscape — Total Value Locked
        </h3>
        <p className="text-sm text-gray-500">Data unavailable</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur">
      <h3 className="mb-4 text-sm font-medium text-gray-400">
        BTCFi Landscape — Total Value Locked
      </h3>
      <div className="h-64 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={110}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [formatTVL(value as number), "TVL"]}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar dataKey="tvl" radius={[0, 4, 4, 0]} label={{ position: "right", fill: "#9ca3af", fontSize: 12, formatter: (v) => formatTVL(v as number) }}>
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={
                    entry.name === "Elastos" ? "#3b82f6" : "#4b5563"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
