import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathnames } from "@/i18n/routing";
import { SITE_URL } from "@/data/company";

type HrefArg = Parameters<typeof getPathname>[0]["href"];

function abs(locale: (typeof routing.locales)[number], href: HrefArg) {
  const path = getPathname({ locale, href });
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

function entry(
  href: AppPathnames | { pathname: AppPathnames; params: Record<string, string> },
  priority: number
): MetadataRoute.Sitemap[number] {
  const h = href as HrefArg;
  return {
    url: abs(routing.defaultLocale, h),
    lastModified: new Date("2026-07-13"),
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: {
        "pt-AO": abs("pt-AO", h),
        en: abs("en", h),
        "x-default": abs("pt-AO", h),
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: [AppPathnames, number][] = [
    ["/", 1],
    ["/about", 0.8],
    ["/services", 0.9],
    ["/training", 0.7],
    ["/supplies", 0.7],
    ["/faq", 0.6],
    ["/contact", 0.8],
    ["/blog", 0.6],
  ];

  return staticRoutes.map(([href, p]) => entry(href, p));
}
