'use client';
import { useTranslations } from 'next-intl';
import { Section } from './section';

export function ContactSection() {
  const t = useTranslations('contact');
  return (
    <Section id="contact">
      <h2 className="text-3xl font-bold text-fg">{t('title')}</h2>
    </Section>
  );
}
