import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/motion/reveal';
import { Link } from '@/i18n/navigation';

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-16"
    >
      {/* Copper radial glow — top-right quadrant, very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(184,115,51,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Film grain overlay — SVG fractal noise, barely visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content — max-w-4xl, left-aligned desktop, centered mobile */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-32 text-center md:text-left">
        {/* Kicker above headline — editorial pattern */}
        <Reveal>
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-copper uppercase mb-6">
            {t('kicker')}
          </p>
        </Reveal>

        {/* Headline — large, bold, fg */}
        <Reveal delay={0.08}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-fg">
            {t('headline')}
          </h1>
        </Reveal>

        {/* Bridge — muted, readable */}
        <Reveal delay={0.18}>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed mx-auto md:mx-0">
            {t('bridge')}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center md:items-start">
            <Link
              href="/research"
              className="inline-flex items-center justify-center bg-copper text-bg px-7 py-3.5 rounded-sm font-semibold text-sm hover:bg-copper-soft transition-colors duration-200 w-full sm:w-auto"
            >
              {t('cta1')}
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-white/20 text-fg px-7 py-3.5 rounded-sm text-sm hover:border-copper/50 transition-colors duration-200 w-full sm:w-auto"
            >
              {t('cta2')}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue — opacity pulse, no bounce */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse text-copper opacity-50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 7l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
