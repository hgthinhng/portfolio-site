'use client';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Reveal } from '@/components/motion/reveal';
import { SAMPLE_RANKING } from '@/content/sample-ranking';

const chartConfig = {
  score: { label: 'Conviction score', color: '#b87333' },
} satisfies ChartConfig;

export function ConvictionChart() {
  return (
    <Reveal>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart
          data={[...SAMPLE_RANKING]}
          layout="vertical"
          margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: '#9a938b', fontSize: 11, fontFamily: 'monospace' }}
          />
          <YAxis
            type="category"
            dataKey="ticker"
            width={36}
            tick={{ fill: '#ede8e2', fontSize: 11, fontFamily: 'monospace' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="score" fill="var(--color-score)" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ChartContainer>
      <p className="font-mono text-xs text-muted/60 text-center mt-2">
        Illustrative sample — not live signals
      </p>
    </Reveal>
  );
}
