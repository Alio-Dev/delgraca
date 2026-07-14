import { defineRouting } from "next-intl/routing";

export const locales = ["pt-AO", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt-AO";

/**
 * Localized pathnames: pt-AO (default) is served without a locale prefix at the
 * root; English lives under /en. Each route has a locale-specific slug for SEO.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
  pathnames: {
    "/": "/",
    "/about": {
      "pt-AO": "/sobre-nos",
      en: "/about",
    },
    "/services": {
      "pt-AO": "/servicos",
      en: "/services",
    },
    "/training": {
      "pt-AO": "/formacoes",
      en: "/training",
    },
    "/supplies": {
      "pt-AO": "/fornecimentos",
      en: "/supplies",
    },
    "/faq": {
      "pt-AO": "/perguntas-frequentes",
      en: "/faq",
    },
    "/contact": {
      "pt-AO": "/contacto",
      en: "/contact",
    },
    "/blog": {
      "pt-AO": "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      "pt-AO": "/blog/[slug]",
      en: "/blog/[slug]",
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;
