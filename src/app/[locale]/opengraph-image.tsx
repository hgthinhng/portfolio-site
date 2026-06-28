import { ImageResponse } from 'next/og';

export const alt = 'Hung Thinh Nguyen — Investor & Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

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
        {/* copper accent bar */}
        <div style={{ width: 48, height: 3, background: '#b87333', marginBottom: 32 }} />
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#ede8e2',
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          {isVi ? 'Nguyễn Hùng Thịnh' : 'Hung Thinh Nguyen'}
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#9a938b',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          {isVi ? 'Nhà đầu tư · Người xây dựng' : 'Investor · Builder'}
        </div>
        <div
          style={{
            fontSize: 15,
            color: '#b87333',
            fontFamily: 'monospace',
            letterSpacing: 1,
          }}
        >
          hgthinhng.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
