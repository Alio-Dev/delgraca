"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A catalog card that reveals its details in a popover on hover (desktop),
 * focus (keyboard), or tap (mobile). Used for Services / Training / Supplies
 * now that individual items no longer have their own pages.
 */
export function PopoverCard({
  icon,
  title,
  subtitle,
  detailLabel,
  triangle = false,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  detailLabel: string;
  triangle?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  useEffect(() => {
    function onDocPointer(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onDocPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 90);
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        className={cn(
          "surface-card surface-card--interactive relative flex w-full flex-col overflow-hidden p-6 text-left",
          open && "border-border-strong shadow-lg"
        )}
      >
        {triangle && (
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 size-11 bg-brand-orange"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          />
        )}
        {icon && (
          <span className="inline-flex size-12 items-center justify-center rounded-md bg-blue-tint text-brand-blue">
            {icon}
          </span>
        )}
        <span className="mt-5 text-[1.35rem] font-extrabold leading-tight text-heading [font-family:var(--font-display)]">
          {title}
        </span>
        <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {subtitle}
        </span>
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-wide text-brand-blue">
          <Plus className="size-3.5" aria-hidden="true" />
          {detailLabel}
        </span>
      </button>

      {/* Popover — flush to card bottom (pt-2 bridges the visual gap) */}
      <div
        id={panelId}
        role="region"
        aria-label={title}
        className={cn(
          "absolute inset-x-0 top-full z-30 pt-2 transition-all duration-150",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        )}
      >
        <div className="rounded-lg border border-border-strong bg-surface-elevated p-5 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
