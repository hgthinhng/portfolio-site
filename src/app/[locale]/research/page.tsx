import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Section } from '@/components/sections/section';
import { Reveal } from '@/components/motion/reveal';
import { research } from '@/.velite';
import { formatDate } from '@/lib/format-date';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research' });
  return {
    title: `${t('title')} — Hung Thinh Nguyen`,
    description: t('intro'),
  };
}

export default async function ResearchIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research' });

  const articles = research
    .filter((r) => r.locale === locale)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <Section id="research">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-fg mb-4">{t('title')}</h1>
        <p className="text-muted max-w-2xl mb-12 leading-relaxed">{t('intro')}</p>
      </Reveal>

      {/* Banner CTA */}
      <Reveal delay={0.05}>
        <div className="mb-10 border border-copper/20 bg-surface rounded-sm p-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm text-muted flex-1">
            {t('bannerText')}
          </span>
          <a
            href="https://stoix-read.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-copper hover:text-copper/70 transition-colors duration-150"
          >
            {t('readFull')}
          </a>
        </div>
      </Reveal>

      {articles.length === 0 ? (
        <Reveal delay={0.1}>
          <p className="text-muted text-sm">{t('noArticles')}</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => {
            const isExternal = Boolean(article.external);
            const href = isExternal ? article.external! : `/research/${article.slug}`;

            const cardInner = (
              <div className="bg-surface border border-white/[0.06] rounded-sm p-6 flex flex-col h-full hover:border-copper/20 transition-colors duration-200 group">
                {/* Date + external badge */}
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-xs text-copper/70">
                    {t('published')} {formatDate(article.date, locale)}
                  </p>
                  {isExternal && (
                    <span className="font-mono text-[10px] text-copper/50 border border-copper/20 rounded-sm px-1.5 py-0.5">
                      {t('external')}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-base font-semibold text-fg mb-2 group-hover:text-copper transition-colors duration-150">
                  {article.title}
                </h2>

                {/* Summary */}
                <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                  {article.summary}
                </p>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-copper/10 text-copper px-2 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA row */}
                <p className="mt-5 text-xs text-copper group-hover:text-copper/70 transition-colors duration-150">
                  {isExternal ? t('readArticleExternal') : t('readCaseStudy')}
                </p>
              </div>
            );

            return (
              <Reveal key={article.id} delay={i * 0.06}>
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {cardInner}
                  </a>
                ) : (
                  <Link href={`/research/${article.slug}`} className="block h-full">
                    {cardInner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
