"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Short codes for the premium segmented toggle. pt-AO is the default.
const CODES: Record<string, { code: string; full: string }> = {
  "pt-AO": { code: "PT", full: "Português" },
  en: { code: "EN", full: "English" },
};

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname + params are route-correct at runtime
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={cn(
        "relative inline-flex items-center rounded-full border border-border-strong bg-surface-elevated p-0.5 shadow-sm",
        isPending && "opacity-70",
        className
      )}
    >
      {/* sliding pill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-navy transition-transform duration-200 ease-out"
        style={{
          transform:
            locale === routing.defaultLocale ? "translateX(0)" : "translateX(100%)",
        }}
      />
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            lang={loc}
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-pressed={active}
            aria-label={CODES[loc].full}
            title={CODES[loc].full}
            className={cn(
              "relative z-10 inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-full px-3 font-mono text-xs font-semibold tracking-wide transition-colors duration-200",
              active ? "text-white" : "text-ink-muted hover:text-navy"
            )}
          >
            {CODES[loc].code}
          </button>
        );
      })}
    </div>
  );
}
