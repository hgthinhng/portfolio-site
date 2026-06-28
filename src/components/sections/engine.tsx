'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';
import { ENGINE_STATS } from '@/content/engine-stats';
import { StatCard } from '@/components/viz/stat-card';
import { ConvictionChart } from '@/components/viz/conviction-chart';
import { ArchitectureDiagram } from '@/components/viz/architecture-diagram';

export function EngineSection() {
  const t = useTranslations('engine');

  return (
    <Section id="build" className="bg-surface/30">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">{t('title')}</h2>
        <p className="text-muted max-w-2xl mb-2 leading-relaxed">{t('intro')}</p>
        <p className="font-mono text-xs text-muted/60 mb-12">{t('status')}</p>
      </Reveal>

      {/* Number cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {ENGINE_STATS.map(({ value, label, suffix, sub }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <StatCard value={value} label={label} suffix={suffix} sub={sub} delay={i * 0.12} />
          </Reveal>
        ))}
      </div>

      {/* Conviction ranking chart */}
      <div className="mb-12">
        <ConvictionChart />
      </div>

      {/* Architecture diagram */}
      <ArchitectureDiagram />
    </Section>
  );
}
