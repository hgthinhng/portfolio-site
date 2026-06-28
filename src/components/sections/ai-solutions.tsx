'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function AiSolutionsSection() {
  const t = useTranslations('aiSolutions');
  return (
    <Section id="ai">
      <h2 className="text-3xl font-bold text-fg">{t('title')}</h2>
    </Section>
  );
}
