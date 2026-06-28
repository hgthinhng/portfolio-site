"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
] as const;

export function LocaleToggle() {
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div role="group" aria-label="Language" className="flex items-center rounded-full border border-white/10 overflow-hidden text-xs font-mono">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          aria-pressed={code === active}
          onClick={() => { if (code !== active) router.replace(pathname, { locale: code }); }}
          className={[
            "px-3 py-1 transition-colors duration-150",
            code === active ? "bg-copper text-bg font-semibold" : "text-muted hover:text-fg",
          ].join(" ")}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
