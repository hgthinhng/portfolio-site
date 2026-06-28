'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function EngineSection() {
  const t = useTranslations('engine');
  return (
    <Section id="build">
      <h2 className="text-3xl font-bold text-fg">{t('title')}</h2>
    </Section>
  );
}
