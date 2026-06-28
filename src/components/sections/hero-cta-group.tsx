'use client';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from '@/i18n/navigation';

interface HeroCtaGroupProps {
  cta1: string;
  cta2: string;
}

export function HeroCtaGroup({ cta1, cta2 }: HeroCtaGroupProps) {
  const reduced = useReducedMotion();

  const primaryClass = "inline-flex items-center justify-center bg-copper text-bg px-7 py-3.5 rounded-sm font-semibold text-sm w-full sm:w-auto";
  const secondaryClass = "inline-flex items-center justify-center border border-white/20 text-fg px-7 py-3.5 rounded-sm text-sm w-full sm:w-auto";

  if (reduced) {
    return (
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center md:items-start">
        <Link href="/research" className={primaryClass}>{cta1}</Link>
        <a href="#contact" className={secondaryClass}>{cta2}</a>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center md:items-start">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full sm:w-auto"
      >
        <Link href="/research" className={primaryClass}>{cta1}</Link>
      </motion.div>
      <motion.a
        href="#contact"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={secondaryClass}
        style={{ borderColor: 'rgba(255,255,255,0.2)' }}
      >
        {cta2}
      </motion.a>
    </div>
  );
}
