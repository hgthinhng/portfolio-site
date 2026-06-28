'use client';
import { useTranslations } from 'next-intl';
import { Mail, ExternalLink, GitFork, Download } from 'lucide-react';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';

const LINKS = [
  {
    icon: Mail,
    label: 'hungthinh.ng98@gmail.com',
    href: 'mailto:hungthinh.ng98@gmail.com',
    external: false,
  },
  {
    icon: ExternalLink,
    label: 'linkedin.com/in/hgthinhng',
    href: 'https://linkedin.com/in/hgthinhng',
    external: true,
  },
  {
    icon: GitFork,
    label: 'github.com/hgthinhng',
    href: 'https://github.com/hgthinhng',
    external: true,
  },
] as const;

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <Section id="contact" className="bg-surface/30">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">{t('title')}</h2>
        <p className="text-muted max-w-xl mb-12 leading-relaxed">{t('tagline')}</p>
      </Reveal>

      <div className="flex flex-col gap-6 mb-12">
        {LINKS.map(({ icon: Icon, label, href, external }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group inline-flex items-center gap-4 text-fg hover:text-copper transition-colors duration-200"
            >
              <Icon
                size={20}
                className="text-copper/50 group-hover:text-copper transition-colors duration-200 shrink-0"
              />
              <span className="font-mono text-base md:text-lg">{label}</span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25}>
        <a
          href="/cv-hung-thinh-nguyen.pdf"
          className="inline-flex items-center gap-2 bg-copper text-bg px-6 py-3 rounded-sm text-sm font-semibold hover:bg-copper/80 transition-colors duration-200"
        >
          <Download size={16} />
          Download CV (PDF)
        </a>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-12 font-mono text-xs text-muted/40">hgthinhng.vercel.app</p>
      </Reveal>
    </Section>
  );
}
