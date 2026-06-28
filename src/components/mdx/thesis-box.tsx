import type { ReactNode } from 'react';

interface ThesisBoxProps {
  label?: string;
  children: ReactNode;
}

export function ThesisBox({ label = 'Thesis', children }: ThesisBoxProps) {
  return (
    <aside className="my-8 border-l-4 border-copper bg-surface rounded-sm p-6">
      <p className="font-mono text-xs tracking-widest text-copper uppercase mb-3">{label}</p>
      <div className="text-fg text-base leading-relaxed [&>p]:mt-0">{children}</div>
    </aside>
  );
}
