'use client';
import type React from 'react';
import { ConvictionChart } from '@/components/viz/conviction-chart';

interface ChartEmbedProps {
  chartKey?: string;
  caption?: string;
  /** Only used for the unknown-key fallback placeholder; registered charts control their own height. */
  height?: number;
}

const CHART_REGISTRY: Record<string, () => React.JSX.Element> = {
  conviction: () => <ConvictionChart />,
};

export function ChartEmbed({ chartKey, caption, height = 240 }: ChartEmbedProps) {
  const Chart = chartKey ? CHART_REGISTRY[chartKey] : undefined;
  return (
    <figure className="my-8">
      {Chart ? (
        <Chart />
      ) : (
        <div
          className="bg-surface border border-white/[0.06] rounded-sm flex items-center justify-center"
          style={{ height }}
        >
          <p className="font-mono text-xs text-muted">
            [ Chart: {chartKey ?? 'unnamed'} ]
          </p>
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 text-xs text-muted text-center font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
