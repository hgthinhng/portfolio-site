'use client';
import { motion } from 'motion/react';
import { TrendingUp, Layers, BrainCircuit, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Section } from './section';
import { Reveal } from '@/components/motion/reveal';

const ICON_MAP = { TrendingUp, Layers, BrainCircuit, GraduationCap };

const PILLARS = [
  { key: 'analyze', anchor: '#analyze', icon: 'TrendingUp'    as const },
  { key: 'build',   anchor: '#build',   icon: 'Layers'        as const },
  { key: 'ai',      anchor: '#ai',      icon: 'BrainCircuit'  as const },
  { key: 'teach',   anchor: '#teach',   icon: 'GraduationCap' as const },
] as const;

export function PillarsSection() {
  const t = useTranslations('pillars');
  return (
    <Section id="analyze" className="bg-bg">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-copper uppercase mb-3">
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-12">
          {t('title')}
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS.map(({ key, anchor, icon }, i) => {
          const Icon = ICON_MAP[icon];
          return (
            <Reveal key={key} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="group bg-surface border border-white/[0.06] hover:border-copper/30 rounded-sm p-6 flex flex-col transition-colors duration-200 h-full"
              >
                <Icon size={24} className="text-copper" />
                <h3 className="text-base font-semibold text-fg mt-4">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-sm text-muted mt-2 leading-relaxed flex-1">
                  {t(`${key}.line`)}
                </p>
                <p className="font-mono text-xs text-copper/70 mt-4">
                  {t(`${key}.metric`)}
                </p>
                <a
                  href={anchor}
                  className="mt-4 text-xs text-muted hover:text-copper transition-colors duration-150"
                >
                  {t(`${key}.cta`)} →
                </a>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
