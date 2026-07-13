"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Menu, X, Search as SearchIcon } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathnames } from "@/i18n/routing";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiteSearch, type SearchItem } from "@/components/site-search";
import { cn } from "@/lib/utils";

type CatalogRef = { slug: string; name: string };
type StaticHref = Exclude<AppPathnames, `${string}[slug]`>;

export type NavModel = {
  ariaLabel: string;
  logoAlt: string;
  labels: {
    home: string;
    about: string;
    services: string;
    training: string;
    supplies: string;
    faq: string;
    blog: string;
    contact: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  servicesItems: CatalogRef[];
  trainingItems: CatalogRef[];
  suppliesItems: CatalogRef[];
};

type DropdownDef = {
  key: string;
  label: string;
  base: StaticHref;
  detailBase?: "/services/[slug]";
  items: CatalogRef[];
};

export function HeaderClient({
  locale,
  nav,
}: {
  locale: string;
  nav: NavModel;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const tSearch = useTranslations("search");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const searchIndex: SearchItem[] = [
    ...nav.servicesItems.map((s) => ({
      name: s.name,
      typeKey: "categoryService" as const,
      href: { pathname: "/services/[slug]" as const, params: { slug: s.slug } },
    })),
    ...nav.trainingItems.map((s) => ({
      name: s.name,
      typeKey: "categoryTraining" as const,
      href: "/training" as const,
    })),
    ...nav.suppliesItems.map((s) => ({
      name: s.name,
      typeKey: "categorySupply" as const,
      href: "/supplies" as const,
    })),
  ];

  const dropdowns: DropdownDef[] = [
    {
      key: "services",
      label: nav.labels.services,
      base: "/services",
      detailBase: "/services/[slug]",
      items: nav.servicesItems,
    },
    {
      key: "training",
      label: nav.labels.training,
      base: "/training",
      items: nav.trainingItems,
    },
    {
      key: "supplies",
      label: nav.labels.supplies,
      base: "/supplies",
      items: nav.suppliesItems,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-bg/90 backdrop-blur-md transition-shadow duration-200",
        scrolled
          ? "border-border-subtle shadow-md"
          : "border-transparent"
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={nav.logoAlt}
          className="flex shrink-0 items-center"
        >
          <Logo alt={nav.logoAlt} priority className="h-8 md:h-9" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label={nav.ariaLabel}
          className="hidden items-center gap-1 lg:flex"
        >
          <TopLink href="/" active={pathname === "/"}>
            {nav.labels.home}
          </TopLink>
          <TopLink href="/about" active={pathname.startsWith("/about")}>
            {nav.labels.about}
          </TopLink>
          {dropdowns.map((d) => (
            <NavDropdown
              key={d.key}
              def={d}
              active={pathname.startsWith(d.base)}
            />
          ))}
          <TopLink href="/faq" active={pathname.startsWith("/faq")}>
            {nav.labels.faq}
          </TopLink>
          <TopLink href="/blog" active={pathname.startsWith("/blog")}>
            {nav.labels.blog}
          </TopLink>
          <TopLink href="/contact" active={pathname.startsWith("/contact")}>
            {nav.labels.contact}
          </TopLink>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={tSearch("label")}
            className="inline-flex size-11 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <SearchIcon className="size-5" aria-hidden="true" />
          </button>
          <ThemeToggle label={{ light: "Modo claro", dark: "Modo escuro" }} />
          <LanguageSwitcher locale={locale} className="hidden md:flex" />
          <Link
            href="/contact"
            className="btn btn-accent ml-1 hidden lg:inline-flex"
          >
            {nav.labels.cta}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={nav.labels.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-md text-ink lg:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu
          locale={locale}
          nav={nav}
          dropdowns={dropdowns}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <SiteSearch
        locale={locale}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={searchIndex}
      />
    </header>
  );
}

function TopLink({
  href,
  active,
  children,
}: {
  href: StaticHref;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors",
        active ? "text-brand-blue" : "text-ink hover:text-brand-blue"
      )}
    >
      {children}
      {active && (
        <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-orange" />
      )}
    </Link>
  );
}

function NavDropdown({ def, active }: { def: DropdownDef; active: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function focusItem(index: number) {
    const items = wrapRef.current?.querySelectorAll<HTMLAnchorElement>(
      "[data-menuitem]"
    );
    if (!items || items.length === 0) return;
    const clamped = (index + items.length) % items.length;
    items[clamped]?.focus();
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function onMenuKeyDown(e: React.KeyboardEvent) {
    const items = Array.from(
      wrapRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menuitem]") ??
        []
    );
    const currentIndex = items.indexOf(
      document.activeElement as HTMLAnchorElement
    );
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(currentIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(currentIndex - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors",
          active || open ? "text-brand-blue" : "text-ink hover:text-brand-blue"
        )}
      >
        {def.label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={menuId}
        role="menu"
        aria-label={def.label}
        onKeyDown={onMenuKeyDown}
        className={cn(
          "absolute left-0 top-full z-50 mt-1 w-80 origin-top rounded-lg border border-border-subtle bg-surface-elevated p-2 shadow-lg transition-all duration-200",
          open
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        )}
      >
        <Link
          href={def.base}
          data-menuitem
          role="menuitem"
          className="block rounded-md px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-surface"
        >
          {def.label} →
        </Link>
        <div className="my-1 h-px bg-border-subtle" />
        {def.items.map((item) => (
          <Link
            key={item.slug}
            data-menuitem
            role="menuitem"
            href={
              def.detailBase
                ? { pathname: def.detailBase, params: { slug: item.slug } }
                : def.base
            }
            className="block rounded-md px-3 py-2 text-sm text-ink transition-colors hover:bg-surface hover:text-brand-blue"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({
  locale,
  nav,
  dropdowns,
  onClose,
}: {
  locale: string;
  nav: NavModel;
  dropdowns: DropdownDef[];
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={nav.ariaLabel}
        className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-bg shadow-xl"
      >
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-border-subtle px-5">
          <Logo alt={nav.logoAlt} className="h-7" />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={nav.labels.closeMenu}
            className="inline-flex size-11 items-center justify-center rounded-md text-ink"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={nav.ariaLabel} className="flex flex-col gap-1 p-4">
          <MobileLink href="/" onClose={onClose}>
            {nav.labels.home}
          </MobileLink>
          <MobileLink href="/about" onClose={onClose}>
            {nav.labels.about}
          </MobileLink>
          {dropdowns.map((d) => (
            <details key={d.key} className="group rounded-md">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-3 font-medium text-ink hover:bg-surface">
                {d.label}
                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="ml-3 flex flex-col border-l border-border-subtle pl-3">
                <MobileLink href={d.base} onClose={onClose} subtle>
                  {d.label} →
                </MobileLink>
                {d.items.map((item) => (
                  <MobileLink
                    key={item.slug}
                    onClose={onClose}
                    subtle
                    href={
                      d.detailBase
                        ? { pathname: d.detailBase, params: { slug: item.slug } }
                        : d.base
                    }
                  >
                    {item.name}
                  </MobileLink>
                ))}
              </div>
            </details>
          ))}
          <MobileLink href="/faq" onClose={onClose}>
            {nav.labels.faq}
          </MobileLink>
          <MobileLink href="/blog" onClose={onClose}>
            {nav.labels.blog}
          </MobileLink>
          <MobileLink href="/contact" onClose={onClose}>
            {nav.labels.contact}
          </MobileLink>
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-border-subtle p-5">
          <LanguageSwitcher locale={locale} />
          <Link href="/contact" onClick={onClose} className="btn btn-accent w-full">
            {nav.labels.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  onClose,
  subtle,
}: {
  href: React.ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  onClose: () => void;
  subtle?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "rounded-md px-3 py-3 transition-colors hover:bg-surface",
        subtle
          ? "text-sm text-ink-muted hover:text-brand-blue"
          : "font-medium text-ink hover:text-brand-blue"
      )}
    >
      {children}
    </Link>
  );
}
