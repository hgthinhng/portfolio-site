import type { ReactNode } from 'react';

interface PullQuoteProps {
  source?: string;
  children: ReactNode;
}

export function PullQuote({ source, children }: PullQuoteProps) {
  return (
    <blockquote className="my-8 border-l-2 border-copper/40 pl-6">
      <p className="font-serif text-xl md:text-2xl text-fg leading-snug italic">{children}</p>
      {source && (
        <cite className="block mt-3 font-mono text-xs text-muted not-italic">— {source}</cite>
      )}
    </blockquote>
  );
}
