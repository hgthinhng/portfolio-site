import { getTranslations } from 'next-intl/server';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';

const CREDENTIALS = [
  'Passed CFA Levels I–III',
  'MSc (or equiv) — [operator fills]',
  'HLPP research platform — built & validating · paper portfolio (1B VND notional)',
  'exam-ops — production platform · live · free-tier hosting',
  'Teaching: financial econometrics, derivatives, CFA prep',
] as const;

export async function AboutSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <Section id="about">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-12">{t('title')}</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left — headshot placeholder */}
        <Reveal delay={0.1}>
          <div className="bg-surface border border-white/[0.06] rounded-sm aspect-[3/4] max-w-xs flex items-center justify-center mx-auto md:mx-0">
            <p className="font-mono text-xs text-muted/40 text-center px-6 leading-relaxed">
              [ Headshot — operator adds in P5 ]
            </p>
          </div>
        </Reveal>

        {/* Right — story + credentials */}
        <Reveal delay={0.2}>
          <p className="text-lg text-fg leading-relaxed mb-8">{t('story')}</p>
          <ul className="space-y-3">
            {CREDENTIALS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="font-mono text-copper text-xs mt-1 select-none">·</span>
                <span className="font-mono text-xs text-muted/80 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
