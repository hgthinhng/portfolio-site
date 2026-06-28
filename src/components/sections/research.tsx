'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function ResearchSection() {
  const t = useTranslations('research');
  return (
    <Section id="research">
      <h2 className="text-3xl font-bold text-fg">{t('title')}</h2>
    </Section>
  );
}
