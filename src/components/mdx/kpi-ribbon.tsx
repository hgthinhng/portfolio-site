interface KPI {
  value: string;
  label: string;
  sub?: string;
}

interface KPIRibbonProps {
  stats: KPI[];
}

export function KPIRibbon({ stats }: KPIRibbonProps) {
  return (
    <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface border border-white/[0.06] rounded-sm p-6">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <p className="font-mono text-3xl font-bold text-copper">{s.value}</p>
          <p className="text-xs text-fg mt-1">{s.label}</p>
          {s.sub && <p className="text-xs text-muted mt-0.5">{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}
