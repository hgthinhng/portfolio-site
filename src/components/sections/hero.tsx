'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function HeroSection() {
  const t = useTranslations('hero');
  return (
    <Section id="hero" className="min-h-screen flex items-center">
      <h1 className="text-5xl font-bold text-fg">{t('title')}</h1>
    </Section>
  );
}
