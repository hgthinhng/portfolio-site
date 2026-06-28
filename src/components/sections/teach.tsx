'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function TeachSection() {
  const t = useTranslations('teach');
  return (
    <Section id="teach">
      <h2 className="text-3xl font-bold text-fg">{t('title')}</h2>
    </Section>
  );
}
