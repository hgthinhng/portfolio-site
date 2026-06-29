"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { LocaleToggle } from "@/components/ui/locale-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef<boolean>(false);
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isNow = latest > 12;
    if (isNow !== scrolledRef.current) {
      scrolledRef.current = isNow;
      setScrolled(isNow);
    }
  });

  return (
    <motion.header
      className={[
        "fixed top-0 inset-x-0 z-50 overflow-hidden transition-colors duration-300",
        scrolled
          ? "bg-bg/95 backdrop-blur-sm border-b border-white/5"
          : "",
      ].join(" ")}
      animate={{ height: scrolled ? 44 : 64 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <a
          href="#"
          className={[
            "font-mono font-semibold text-copper tracking-widest origin-left transition-all duration-300 hover:opacity-80 motion-reduce:transition-none",
            scrolled ? "text-sm" : "text-base",
          ].join(" ")}
          aria-label="HT, Hung Thinh Nguyen, home"
        >
          HT
        </a>
        <LocaleToggle />
      </div>
    </motion.header>
  );
}
