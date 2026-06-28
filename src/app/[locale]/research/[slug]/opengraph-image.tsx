import { ImageResponse } from 'next/og';
import { research } from '@/.velite';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const alt = 'Research article — Hung Thinh Nguyen';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = research.find((r) => r.slug === slug && r.locale === locale);
  if (!article) notFound();

  const summary =
    article.summary.length > 160
      ? article.summary.slice(0, 157) + '…'
      : article.summary;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#161413',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ width: 48, height: 3, background: '#b87333', marginBottom: 32 }} />
        <div
          style={{
            fontSize: 14,
            color: '#b87333',
            fontFamily: 'monospace',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Research
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: '#ede8e2',
            lineHeight: 1.2,
            marginBottom: 20,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {article.title}
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#9a938b',
            lineHeight: 1.5,
          }}
        >
          {summary}
        </div>
      </div>
    ),
    { ...size }
  );
}
