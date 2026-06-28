'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function AboutSection() {
  const t = useTranslations('about');
  return (
    <Section id="about">
      <h2 className="text-3xl font-bold text-fg">{t('title')}</h2>
    </Section>
  );
}
