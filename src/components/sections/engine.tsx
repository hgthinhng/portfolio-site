'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';

const NUMBERS = [
  { value: '130',   label: 'tickers tracked',  sub: '~85% of VN market cap' },
  { value: '70+',   label: 'data sources',      sub: 'crawlers, APIs, RSS, broker PDFs' },
  { value: '4',     label: 'languages',         sub: 'Vietnamese · English · Russian · French' },
  { value: '1,863', label: 'trading days',      sub: 'daily data 2019–2026' },
] as const;

const ARCH = [
  { key: 'L0', desc: 'Infrastructure (FastAPI, DB, cron)' },
  { key: 'L1', desc: 'Raw data (10 crawlers, 4 languages)' },
  { key: 'L2', desc: 'Signals (factors, sentiment, fundamental)' },
  { key: 'L3', desc: 'Conviction ranking + Telegram delivery' },
] as const;

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
        {NUMBERS.map(({ value, label, sub }, i) => (
          <Reveal key={value} delay={i * 0.08}>
            <div className="bg-surface border border-white/[0.06] rounded-sm p-5">
              <p className="font-mono text-4xl text-copper leading-none">{value}</p>
              <p className="text-sm text-fg mt-2">{label}</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">{sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Chart placeholder */}
      <Reveal delay={0.1}>
        <div className="bg-surface border border-white/[0.06] rounded-sm h-48 flex items-center justify-center mb-12">
          <p className="font-mono text-xs text-muted/40">
            [ Conviction ranking chart — Phase 3 ]
          </p>
        </div>
      </Reveal>

      {/* Architecture row */}
      <Reveal delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ARCH.map(({ key, desc }) => (
            <div
              key={key}
              className="bg-surface border-l-2 border-copper/40 pl-4 py-3 rounded-r-sm"
            >
              <p className="font-mono text-xs text-copper mb-1">{key}</p>
              <p className="font-mono text-xs text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
