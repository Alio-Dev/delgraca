"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathnames } from "@/i18n/routing";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteSearch, type SearchItem } from "@/components/site-search";
import { cn } from "@/lib/utils";

type CatalogRef = { slug: string; name: string };
type StaticHref = Exclude<AppPathnames, `${string}[slug]`>;

export type NavModel = {
  ariaLabel: string;
  logoAlt: string;
  labels: {
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

type NavItem = { href: StaticHref; label: string };

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

  const items: NavItem[] = [
    { href: "/about", label: nav.labels.about },
    { href: "/services", label: nav.labels.services },
    { href: "/training", label: nav.labels.training },
    { href: "/supplies", label: nav.labels.supplies },
    { href: "/blog", label: nav.labels.blog },
    { href: "/faq", label: nav.labels.faq },
    { href: "/contact", label: nav.labels.contact },
  ];

  const searchIndex: SearchItem[] = [
    ...nav.servicesItems.map((s) => ({
      name: s.name,
      typeKey: "categoryService" as const,
      href: "/services" as const,
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-bg/90 backdrop-blur-md transition-shadow duration-200",
        scrolled ? "border-border-subtle shadow-md" : "border-transparent"
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-3">
        <Link
          href="/"
          aria-label={nav.logoAlt}
          className="flex shrink-0 items-center"
        >
          <Logo alt={nav.logoAlt} priority className="h-7 sm:h-8 md:h-9" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label={nav.ariaLabel}
          className="hidden items-center gap-0.5 lg:flex"
        >
          {items.map((item) => (
            <TopLink key={item.href} href={item.href} active={isActive(item.href)}>
              {item.label}
            </TopLink>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={tSearch("label")}
            className="inline-flex size-11 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface hover:text-navy"
          >
            <SearchIcon className="size-5" aria-hidden="true" />
          </button>
          <LanguageSwitcher locale={locale} className="hidden sm:inline-flex" />
          <Link href="/contact" className="btn btn-accent ml-1 hidden xl:inline-flex">
            {nav.labels.cta}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={nav.labels.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-md text-navy lg:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

    {mobileOpen && (
      <MobileMenu
        locale={locale}
        nav={nav}
        items={items}
        isActive={isActive}
        onClose={() => setMobileOpen(false)}
      />
    )}

    <SiteSearch
      locale={locale}
      open={searchOpen}
      onClose={() => setSearchOpen(false)}
      items={searchIndex}
    />
    </>
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
        "relative rounded-md px-3 py-2 text-[0.9rem] font-medium transition-colors",
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

function MobileMenu({
  locale,
  nav,
  items,
  isActive,
  onClose,
}: {
  locale: string;
  nav: NavModel;
  items: NavItem[];
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
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
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={nav.ariaLabel}
        className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col bg-bg shadow-xl"
      >
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-border-subtle px-5">
          <Logo alt={nav.logoAlt} className="h-7" />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={nav.labels.closeMenu}
            className="inline-flex size-11 items-center justify-center rounded-md text-navy"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label={nav.ariaLabel}
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-3 text-base font-medium transition-colors",
                isActive(item.href)
                  ? "bg-blue-tint text-brand-blue"
                  : "text-ink hover:bg-surface hover:text-brand-blue"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 space-y-4 border-t border-border-subtle p-5">
          <LanguageSwitcher locale={locale} />
          <Link href="/contact" onClick={onClose} className="btn btn-accent w-full">
            {nav.labels.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
