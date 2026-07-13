"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Search as SearchIcon, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppPathnames } from "@/i18n/routing";
import { normalizeText } from "@/lib/utils";

export type SearchItem = {
  name: string;
  typeKey: "categoryService" | "categoryTraining" | "categorySupply";
  href:
    | AppPathnames
    | { pathname: AppPathnames; params?: Record<string, string> };
};

function useDebounced<T>(value: T, delay = 260): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/** Highlight the matched fragment (accent-insensitive) with <mark>. */
function Highlight({ text, query }: { text: string; query: string }) {
  const nQuery = normalizeText(query);
  if (!nQuery) return <>{text}</>;
  const nText = normalizeText(text);
  const start = nText.indexOf(nQuery);
  if (start === -1) return <>{text}</>;
  const end = start + nQuery.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded bg-brand-orange/20 px-0.5 text-ink">
        {text.slice(start, end)}
      </mark>
      {text.slice(end)}
    </>
  );
}

export function SiteSearch({
  open,
  onClose,
  items,
}: {
  locale: string;
  open: boolean;
  onClose: () => void;
  items: SearchItem[];
}) {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const n = normalizeText(debounced);
    if (!n) return [];
    return items.filter((it) => normalizeText(it.name).includes(n)).slice(0, 12);
  }, [debounced, items]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("label")}
        className="absolute left-1/2 top-[12vh] w-[min(40rem,92vw)] -translate-x-1/2 rounded-xl border border-border-subtle bg-surface-elevated shadow-xl"
      >
        <div className="flex items-center gap-3 border-b border-border-subtle px-4">
          <SearchIcon className="size-5 text-ink-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("label")}
            className="h-14 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="inline-flex size-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {debounced.trim() === "" && (
            <p className="px-3 py-6 text-center text-sm text-ink-muted">
              {t("empty")}
            </p>
          )}
          {debounced.trim() !== "" && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-ink-muted">
              {t("noResults")} “{debounced}”.
            </p>
          )}
          <ul>
            {results.map((it, i) => (
              <li key={`${it.name}-${i}`}>
                <Link
                  href={it.href as React.ComponentProps<typeof Link>["href"]}
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 rounded-md px-3 py-3 hover:bg-surface"
                >
                  <span className="text-ink">
                    <Highlight text={it.name} query={debounced} />
                  </span>
                  <span className="shrink-0 rounded-full border border-border-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
                    {t(it.typeKey)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
