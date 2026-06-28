'use client';
import { useRef, useEffect, useMemo } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'motion/react';

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  sub?: string;
  delay?: number;
}

export function StatCard({ value, label, suffix = '', sub, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const formatter = useMemo(() => new Intl.NumberFormat('en-US'), []);
  const displayValue = useTransform(count, (v) => formatter.format(Math.round(v)));

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: 1.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [isInView, value, delay, shouldReduceMotion, count]);

  return (
    <div ref={ref} className="bg-surface border border-white/[0.06] rounded-sm p-5">
      <p className="font-mono text-4xl text-copper leading-none">
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </p>
      <p className="text-sm text-fg mt-2">{label}</p>
      {sub && <p className="text-xs text-muted mt-1 leading-relaxed">{sub}</p>}
    </div>
  );
}
