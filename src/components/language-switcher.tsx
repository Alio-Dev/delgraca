"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  "pt-AO": "Português",
  en: "English",
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
      // Preserve dynamic route params (e.g. [slug]) across the locale switch.
      router.replace(
        // @ts-expect-error -- pathname + params are route-correct at runtime
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label="Idioma / Language"
    >
      <Globe className="mr-1 size-4 text-ink-muted" aria-hidden="true" />
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="px-1 text-border-strong">·</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === locale ? "true" : undefined}
            disabled={isPending}
            className={cn(
              "rounded px-1.5 py-1 text-sm font-medium transition-colors",
              loc === locale
                ? "text-brand-blue underline underline-offset-4"
                : "text-ink-muted hover:text-ink"
            )}
            lang={loc}
          >
            {LABELS[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
