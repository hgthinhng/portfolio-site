"use client";
import { useEffect, useRef } from "react";
import { LocaleToggle } from "@/components/ui/locale-toggle";

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.scrollY > 12) el.dataset.scrolled = "true";
        else delete el.dataset.scrolled;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <header
      ref={ref}
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300 data-[scrolled]:bg-bg/95 data-[scrolled]:backdrop-blur-sm data-[scrolled]:border-b data-[scrolled]:border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-base font-semibold text-copper tracking-widest hover:opacity-80 transition-opacity" aria-label="Hung Thinh Nguyen — home">HT</a>
        <LocaleToggle />
      </div>
    </header>
  );
}
