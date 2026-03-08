interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  valueColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  valueColor = "text-white",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur">
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${valueColor}`}>{value}</p>
      {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}
