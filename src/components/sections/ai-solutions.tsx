import { getTranslations } from 'next-intl/server';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';

const ITEMS = [
  {
    title: 'AI News Engine',
    sub: 'Multilingual LLM enrichment for VN market news — intake classification, relevance scoring, sector tagging, sentiment, morning brief (5 modes), catalyst classification. Part of HLPP pipeline.',
    tag: 'Production · Part of HLPP',
    link: null as string | null,
  },
  {
    title: 'exam-ops RAG Tutor',
    sub: 'Hybrid RRF retrieval (vector + FTS) over 7,726 chunks. Multi-role tutor (lecturer/examiner/Feynman/Socratic). Measured RAGAS gates. Cross-lingual hardening: VN query → EN chunk, glossary expansion.',
    tag: 'Live · free-tier hosting',
    link: 'https://exam-ops.vercel.app',
  },
  {
    title: 'Opvia Architecture Blueprint',
    sub: "Consulting: refactored a client's LLM research system into a 15-module skill architecture + 6 workflows. Client anonymized.",
    tag: 'Consulting · 2025',
    link: null as string | null,
  },
  {
    title: 'Enterprise AI-Quoting (Anonymous)',
    sub: 'Anonymized enterprise AI-quoting consulting (POC stage).',
    tag: 'Confidential · POC stage',
    link: null as string | null,
  },
  {
    title: 'IHK — Applied-AI Product Engineering',
    sub: 'Local-first semantic knowledge board: URL → AI metadata extraction + embeddings → constellation viz (UMAP) → Blend AI synthesis. Multi-provider routing on IndexedDB.',
    tag: 'Local prototype',
    link: null as string | null,
  },
];

export async function AiSolutionsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'aiSolutions' });

  return (
    <Section id="ai">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">{t('title')}</h2>
        <p className="text-muted max-w-2xl mb-12 leading-relaxed">{t('intro')}</p>
      </Reveal>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {ITEMS.map(({ title, sub, tag, link }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="border-l-2 border-copper/40 pl-4 py-4">
              <h3 className="text-base font-semibold text-fg">{title}</h3>
              <p className="text-sm text-muted mt-1 leading-relaxed max-w-2xl">{sub}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="font-mono text-xs text-copper/70">{tag}</span>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted/60 hover:text-copper transition-colors duration-150"
                  >
                    ↗ {link.replace('https://', '')}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
