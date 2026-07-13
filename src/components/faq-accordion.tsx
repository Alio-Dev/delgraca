"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated">
      {items.map((item, i) => {
        const expanded = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-ink transition-colors hover:bg-surface md:px-6"
              >
                {item.q}
                <ChevronDown
                  className={`size-5 shrink-0 text-brand-blue transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className="px-5 pb-6 text-ink-muted md:px-6"
            >
              <p className="leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
