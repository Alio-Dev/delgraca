import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { company, telHrefs, SITE_URL } from "@/data/company";
import { PageHeader } from "@/components/page-header";
import { ServiceIcon } from "@/components/icons";
import { CtaBanner } from "@/components/cta-banner";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export async function generateStaticParams() {
  const services = await getServices(routing.defaultLocale);
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const services = await getServices(locale);
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.short };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const services = await getServices(locale);
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "contact" });

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <ServiceJsonLd name={service.name} description={service.long} />
      <BreadcrumbJsonLd
        items={[
          { name: tn("home"), url: SITE_URL },
          { name: tn("services"), url: `${SITE_URL}/servicos` },
          { name: service.name, url: `${SITE_URL}/servicos/${slug}` },
        ]}
      />
      <PageHeader
        eyebrow={tn("services")}
        title={service.name}
        subtitle={service.short}
        crumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("services"), href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="inline-flex size-14 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
              <ServiceIcon slug={service.slug} className="size-7" />
            </span>
            <div className="prose-block mt-6 space-y-5 text-lg leading-relaxed text-ink">
              <p>{service.long}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                {tc("title")}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link href="/services" className="btn btn-secondary">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {t("viewAll")}
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="surface-card p-6">
              <h2 className="text-lg">{tc("title")}</h2>
              <p className="mt-2 text-sm text-ink-muted">{tc("subtitle")}</p>
              <div className="mt-4 space-y-2 text-sm">
                {company.phones.map((p, i) => (
                  <a
                    key={p}
                    href={telHrefs[i]}
                    className="flex items-center gap-2 text-brand-blue hover:underline"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-base">{t("viewAll")}</h2>
              <ul className="mt-4 space-y-1">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={{ pathname: "/services/[slug]", params: { slug: r.slug } }}
                      className="flex items-start gap-2 rounded-md px-2 py-2 text-sm text-ink transition-colors hover:bg-surface hover:text-brand-blue"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-orange-text" aria-hidden="true" />
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner locale={locale} />
    </>
  );
}
