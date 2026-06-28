'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function PillarsSection() {
  const t = useTranslations('pillars');
  return (
    <Section id="analyze">
      <h2 className="text-3xl font-bold text-fg">{t('title')}</h2>
    </Section>
  );
}
