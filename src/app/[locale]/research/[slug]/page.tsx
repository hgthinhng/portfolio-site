import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { MDXContent } from '@/components/mdx/mdx-content';
import { research } from '@/.velite';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  // Only generate internal pages for articles without an external link
  const internal = research.filter((r) => !r.external);
  return internal.map((r) => ({ locale: r.locale, slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = research.find((r) => r.id === `${locale}__${slug}`);
  if (!article) return {};

  const alternates: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const alt = research.find((r) => r.slug === slug && r.locale === loc && !r.external);
    if (alt) alternates[loc] = `/${loc}/research/${slug}`;
  });

  return {
    title: `${article.title} — Hung Thinh Nguyen`,
    description: article.summary,
    alternates: {
      languages: alternates,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'research' });

  const article = research.find((r) => r.id === `${locale}__${slug}`);
  if (!article) notFound();

  // If this article has an external URL, redirect rather than render a blank shell
  if (article.external) {
    redirect(article.external);
  }

  const hasToc = Array.isArray(article.toc) && article.toc.length > 0;

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/research"
          className="inline-block font-mono text-xs text-muted hover:text-copper transition-colors duration-150 mb-10"
        >
          {t('back')}
        </Link>

        {/* Hero */}
        <header className="mb-12 border-b border-white/[0.06] pb-10">
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
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

          <h1 className="text-3xl md:text-4xl font-bold text-fg leading-tight mb-4">
            {article.title}
          </h1>

          <p className="font-mono text-xs text-copper/70">
            {t('published')} {formatDate(article.date, locale)}
          </p>

          {article.summary && (
            <p className="mt-4 text-muted leading-relaxed text-base">{article.summary}</p>
          )}
        </header>

        <div className="flex gap-10 items-start">
          {/* Optional TOC sidebar */}
          {hasToc && (
            <aside className="hidden xl:block w-48 shrink-0 sticky top-20 self-start">
              <p className="font-mono text-[10px] tracking-[0.15em] text-copper/60 uppercase mb-3">
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {(article.toc as unknown as { title: string; url: string }[]).map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    className="text-xs text-muted hover:text-copper transition-colors duration-150 leading-snug"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* Article body */}
          <article className="flex-1 min-w-0 font-serif prose prose-invert prose-sm md:prose-base max-w-none prose-headings:font-sans prose-headings:text-fg prose-headings:font-bold prose-p:text-muted prose-p:leading-relaxed prose-a:text-copper prose-a:no-underline hover:prose-a:underline prose-strong:text-fg prose-code:text-copper/80 prose-code:font-mono prose-pre:bg-surface prose-pre:border prose-pre:border-white/[0.06] prose-blockquote:border-l-copper prose-blockquote:text-muted">
            <MDXContent code={article.body} />
          </article>
        </div>

        {/* Footer back link */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <Link
            href="/research"
            className="font-mono text-xs text-muted hover:text-copper transition-colors duration-150"
          >
            {t('back')}
          </Link>
        </div>
      </div>
    </div>
  );
}
