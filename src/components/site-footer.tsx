import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { getServices } from "@/lib/content";
import { company, telHrefs, fullAddress } from "@/data/company";

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  const services = await getServices(locale);
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-border-subtle bg-white text-ink">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo alt={company.brandName} className="h-9" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            {t("about")}
          </p>
        </div>

        <nav aria-label={t("quickLinks")}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-navy">
            {t("quickLinks")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: "/about" as const, label: tn("about") },
              { href: "/services" as const, label: tn("services") },
              { href: "/training" as const, label: tn("training") },
              { href: "/supplies" as const, label: tn("supplies") },
              { href: "/blog" as const, label: tn("blog") },
              { href: "/contact" as const, label: tn("contact") },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ink-muted transition-colors hover:text-brand-blue"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("servicesTitle")}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-navy">
            {t("servicesTitle")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href="/services"
                  className="text-ink-muted transition-colors hover:text-brand-blue"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-navy">
            {t("contactTitle")}
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-ink-muted">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange-text" aria-hidden="true" />
              <span>{fullAddress}</span>
            </p>
            {company.phones.map((p, i) => (
              <p key={p} className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand-orange-text" aria-hidden="true" />
                <a href={telHrefs[i]} className="transition-colors hover:text-brand-blue">
                  {p}
                </a>
              </p>
            ))}
            <p className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-brand-orange-text" aria-hidden="true" />
              <a
                href={`mailto:${company.email}`}
                className="break-all transition-colors hover:text-brand-blue"
              >
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. {t("rights")}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              {tAbout("legal.nif")}: {company.nif}
            </span>
            <span>
              {tAbout("legal.matricula")}: {company.matricula}
            </span>
            <span>{t("madeIn")}</span>
          </p>
        </div>
      </div>

      {/* Powered by Alio Analytics */}
      <div className="border-t border-border-subtle">
        <div className="container-page flex items-center justify-center py-5">
          <a
            href="https://www.alio.ao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by Alio Analytics"
            className="flex items-center gap-2.5 opacity-70 transition-opacity duration-200 hover:opacity-100"
          >
            <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              Powered by
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/alio.svg"
              alt="Alio Analytics"
              className="block h-7 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
