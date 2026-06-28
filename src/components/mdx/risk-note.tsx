import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

export function RiskNote({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 flex gap-4 bg-surface border border-amber-900/30 rounded-sm p-5">
      <AlertTriangle size={18} className="shrink-0 text-amber-500 mt-0.5" />
      <div className="text-sm text-muted leading-relaxed [&>p]:mt-0">{children}</div>
    </aside>
  );
}
