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
    <footer className="mt-auto bg-surface-contrast text-on-dark">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="inline-flex rounded-lg bg-white p-3">
            <Logo alt={company.brandName} className="h-8" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-muted">
            {t("about")}
          </p>
        </div>

        <nav aria-label={t("quickLinks")}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-on-dark">
            {t("quickLinks")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: "/about" as const, label: tn("about") },
              { href: "/services" as const, label: tn("services") },
              { href: "/training" as const, label: tn("training") },
              { href: "/supplies" as const, label: tn("supplies") },
              { href: "/faq" as const, label: tn("faq") },
              { href: "/blog" as const, label: tn("blog") },
              { href: "/contact" as const, label: tn("contact") },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-on-dark-muted transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("servicesTitle")}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-on-dark">
            {t("servicesTitle")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={{ pathname: "/services/[slug]", params: { slug: s.slug } }}
                  className="text-on-dark-muted transition-colors hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-on-dark">
            {t("contactTitle")}
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-on-dark-muted">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
              <span>{fullAddress}</span>
            </p>
            {company.phones.map((p, i) => (
              <p key={p} className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                <a href={telHrefs[i]} className="transition-colors hover:text-white">
                  {p}
                </a>
              </p>
            ))}
            <p className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-brand-orange" aria-hidden="true" />
              <a
                href={`mailto:${company.email}`}
                className="break-all transition-colors hover:text-white"
              >
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
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
    </footer>
  );
}
