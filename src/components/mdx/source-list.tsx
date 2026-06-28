interface Source {
  label: string;
  href?: string;
}

interface SourceListProps {
  sources: Source[];
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <footer className="my-8 border-t border-white/[0.06] pt-6">
      <p className="font-mono text-xs tracking-widest text-muted uppercase mb-4">Sources</p>
      <ol className="space-y-2">
        {sources.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted">
            <span className="font-mono text-xs text-copper/60 shrink-0 mt-0.5">[{i + 1}]</span>
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors"
              >
                {s.label}
              </a>
            ) : (
              <span>{s.label}</span>
            )}
          </li>
        ))}
      </ol>
    </footer>
  );
}
