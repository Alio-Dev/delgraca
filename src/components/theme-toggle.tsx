"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Light mode is the primary, fully-polished experience. This toggle offers an
 * optional dark mode; the preference is persisted in localStorage and applied
 * via a `.dark` class on <html>. A blocking inline script (in the layout head
 * would be ideal) is avoided here for simplicity — a brief flash is acceptable
 * for the secondary theme.
 */
export function ThemeToggle({ label }: { label: { light: string; dark: string } }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? label.light : label.dark}
      title={dark ? label.light : label.dark}
      className="inline-flex size-11 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface hover:text-ink"
    >
      {mounted && dark ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
