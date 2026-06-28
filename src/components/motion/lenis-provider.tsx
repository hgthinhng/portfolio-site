'use client';
import { useEffect } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let raf: number;
    let destroy: (() => void) | null = null;

    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis();
      destroy = () => lenis.destroy();
      function loop(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      destroy?.();
    };
  }, []);
  return <>{children}</>;
}
