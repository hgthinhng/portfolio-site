import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';

export async function ResearchSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'research' });

  return (
    <Section id="research">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">{t('title')}</h2>
        <p className="text-muted max-w-2xl mb-12 leading-relaxed">{t('intro')}</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card 1 — Ngư Ông Đắc Lợi (featured, spans full width) */}
        <Reveal delay={0} className="md:col-span-2">
          <div className="bg-surface border border-white/[0.06] rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8 h-full hover:border-copper/20 transition-colors duration-200">
            <div className="md:flex-1">
              <p className="font-mono text-xs text-copper/70 mb-3">Macro · 2025 · Featured</p>
              <h3 className="text-xl md:text-2xl font-semibold text-fg mb-2">Ngư Ông Đắc Lợi</h3>
              <p className="text-sm text-muted leading-relaxed">
                Russia as third-party beneficiary of US-Israel-Iran war: oil flows and fiscal impact.
              </p>
            </div>
            <Link
              href="/research/ngu-ong-dac-loi"
              className="shrink-0 text-xs text-copper hover:text-copper/70 transition-colors duration-150"
            >
              {t('readCaseStudy')}
            </Link>
          </div>
        </Reveal>

        {/* Card 2 — StoiX Read */}
        <Reveal delay={0.06}>
          <div className="bg-surface border border-white/[0.06] rounded-sm p-6 flex flex-col h-full hover:border-copper/20 transition-colors duration-200">
            <p className="font-mono text-xs text-copper/70 mb-3">VN Markets · Ongoing</p>
            <h3 className="text-base font-semibold text-fg mb-2">StoiX Read: Featured Articles</h3>
            <p className="text-sm text-muted leading-relaxed flex-1">
              9 long-form bilingual articles on VN equities: valuation, credit, macro, flows, banking.
            </p>
            <a
              href="https://stoix-read.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 text-xs text-copper hover:text-copper/70 transition-colors duration-150"
            >
              {t('readPublication')}
            </a>
          </div>
        </Reveal>

        {/* Card 3 — DEPP Research Arc */}
        <Reveal delay={0.12}>
          <div className="bg-surface border border-white/[0.06] rounded-sm p-6 flex flex-col h-full">
            <p className="font-mono text-xs text-copper/70 mb-3">Quant · 2026</p>
            <h3 className="text-base font-semibold text-fg mb-2">DEPP Research Arc</h3>
            <p className="text-sm text-muted leading-relaxed flex-1">
              1,805-day neutralized backtest of VN microstructure factors. Real information signal,
              not net-positive long-only alpha at realistic cost; reframed as risk/state signal.
            </p>
            <span className="mt-5 text-xs text-muted/40 font-mono">{t('comingSoon')}</span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="flex flex-col sm:flex-row gap-6 border-t border-white/[0.06] pt-8">
          <Link
            href="/research"
            className="text-sm text-fg hover:text-copper transition-colors duration-150"
          >
            {t('seeAllWriting')}
          </Link>
          <a
            href="https://stoix-read.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-fg hover:text-copper transition-colors duration-150"
          >
            {t('readFull')}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
