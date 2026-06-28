import { getTranslations } from 'next-intl/server';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';

const STATS = [
  { value: '376k words', label: 'CFA L1 curriculum authored' },
  { value: '7+',         label: 'exam tracks' },
  { value: '3',          label: 'graduate seminar topics' },
] as const;

const TOPICS = [
  'Financial econometrics: GARCH, cointegration, VaR',
  'Derivatives: SGX SIP syllabus',
  'CFA prep L1–3',
] as const;

export async function TeachSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'teach' });

  return (
    <Section id="teach" className="bg-surface/30">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">{t('title')}</h2>
        <p className="text-muted max-w-2xl mb-12 leading-relaxed">{t('intro')}</p>
      </Reveal>

      {/* Featured card */}
      <Reveal delay={0.1}>
        <div className="bg-surface border border-white/[0.06] rounded-sm p-6 mb-12 max-w-2xl">
          <h3 className="text-lg font-semibold text-fg mb-1">exam-ops / StoiX Learning</h3>
          <p className="font-mono text-xs text-copper/70 mb-3">Production AI exam-prep platform</p>
          <p className="text-sm text-muted leading-relaxed mb-4">
            7,612 CFA L1 questions · SM-2 spaced repetition · multi-role RAG tutor · PayOS+Stripe
          </p>
          <p className="font-mono text-xs text-muted/50 mb-4">
            Live · free-tier hosting (may auto-pause)
          </p>
          <a
            href="https://exam-ops.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-copper hover:text-copper/70 transition-colors duration-150"
          >
            Visit platform →
          </a>
        </div>
      </Reveal>

      {/* Stats row */}
      <Reveal delay={0.15}>
        <div className="flex flex-col sm:flex-row gap-8 mb-12">
          {STATS.map(({ value, label }) => (
            <div key={value}>
              <p className="font-mono text-2xl text-copper">{value}</p>
              <p className="text-sm text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Teaching list */}
      <Reveal delay={0.2}>
        <ul className="space-y-2">
          {TOPICS.map((topic) => (
            <li key={topic} className="flex items-start gap-2 text-sm text-muted">
              <span className="text-copper mt-0.5 select-none">·</span>
              {topic}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-muted/50 italic">
          Passed CFA Levels I–III — not charterholder
        </p>
      </Reveal>
    </Section>
  );
}
