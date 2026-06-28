import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-16 py-24 px-6', className)}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
