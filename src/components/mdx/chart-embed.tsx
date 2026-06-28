interface ChartEmbedProps {
  chartKey?: string;
  caption?: string;
  height?: number;
}

export function ChartEmbed({ chartKey, caption, height = 240 }: ChartEmbedProps) {
  return (
    <figure className="my-8">
      <div
        className="bg-surface border border-white/[0.06] rounded-sm flex items-center justify-center"
        style={{ height }}
      >
        <p className="font-mono text-xs text-muted">
          [ Chart: {chartKey ?? 'unnamed'} — wired in Phase 3 ]
        </p>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-muted text-center font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
