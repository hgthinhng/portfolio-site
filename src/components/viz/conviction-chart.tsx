'use client';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Reveal } from '@/components/motion/reveal';
import { SAMPLE_RANKING } from '@/content/sample-ranking';

const chartConfig = {
  score: { label: 'Conviction score', color: '#b87333' },
} satisfies ChartConfig;

const CHART_DATA = [...SAMPLE_RANKING];

export function ConvictionChart() {
  return (
    <Reveal>
      <div role="img" aria-label="Bar chart showing illustrative conviction scores for sample VN equities">
      <ChartContainer config={chartConfig} className="h-64 w-full [aspect-ratio:unset]">
        <BarChart
          data={CHART_DATA}
          layout="vertical"
          margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: 'var(--color-muted)', fontSize: 11, fontFamily: 'monospace' }}
          />
          <YAxis
            type="category"
            dataKey="ticker"
            width={36}
            tick={{ fill: 'var(--color-fg)', fontSize: 11, fontFamily: 'monospace' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="score" fill="var(--color-score)" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ChartContainer>
      <p className="font-mono text-xs text-muted/60 text-center mt-2">
        Illustrative sample — not live signals
      </p>
      </div>
    </Reveal>
  );
}
