import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getServices, getTraining, getSupplies } from "@/lib/content";
import { company, telHrefs, fullAddress } from "@/data/company";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { CtaBanner } from "@/components/cta-banner";
import { Monogram } from "@/components/logo";
import { ServiceIcon, supplyIcons } from "@/components/icons";
import { LocalBusinessJsonLd } from "@/components/json-ld";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "hero" });
  const th = await getTranslations({ locale, namespace: "highlights" });
  const ts = await getTranslations({ locale, namespace: "services" });
  const ttr = await getTranslations({ locale, namespace: "training" });
  const tsu = await getTranslations({ locale, namespace: "supplies" });
  const tc = await getTranslations({ locale, namespace: "contact" });

  const services = await getServices(locale);
  const training = await getTraining(locale);
  const supplies = await getSupplies(locale);
  const highlights = th.raw("items") as { title: string; text: string }[];

  return (
    <>
      <LocalBusinessJsonLd />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border-subtle bg-gradient-to-b from-surface to-bg">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-brand-blue/5 blur-3xl"
        />
        <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 className="mt-4 max-w-xl">{t("headline")}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {t("subheadline")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/services" className="btn btn-primary text-base">
                {t("primaryCta")}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn btn-secondary text-base">
                {t("secondaryCta")}
              </Link>
            </div>
          </div>

          {/* Brand visual panel */}
          <div className="relative">
            <div className="surface-card mx-auto max-w-sm p-8 shadow-xl">
              <div className="flex items-center justify-center rounded-lg bg-surface py-8">
                <Monogram alt={company.brandName} size={120} />
              </div>
              <ul className="mt-6 space-y-3">
                {highlights.map((h) => (
                  <li key={h.title} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-brand-blue"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">{h.title}</p>
                      <p className="text-sm text-ink-muted">{h.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={ts("sectionTitle")}
              title={ts("sectionSubtitle")}
            />
            <Link
              href="/services"
              className="link-underline inline-flex items-center gap-1"
            >
              {ts("viewAll")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="auto-grid mt-10">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                name={s.name}
                short={s.short}
                cta={ts("viewDetail")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING + SUPPLIES */}
      <section className="section bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={ttr("sectionTitle")}
              title={ttr("sectionSubtitle")}
            />
            <ul className="mt-8 space-y-3">
              {training.map((tr) => (
                <li key={tr.slug}>
                  <Link
                    href="/training"
                    className="surface-card surface-card--interactive flex items-center gap-4 p-5"
                  >
                    <ServiceIcon slug={tr.slug} className="size-6 text-brand-blue" />
                    <span>
                      <span className="block font-semibold">{tr.name}</span>
                      <span className="block text-sm text-ink-muted">
                        {tr.short}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              eyebrow={tsu("sectionTitle")}
              title={tsu("sectionSubtitle")}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {supplies.map((cat) => {
                const Icon = supplyIcons[cat.slug];
                return (
                  <Link
                    key={cat.slug}
                    href="/supplies"
                    className="surface-card surface-card--interactive flex flex-col p-5"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-orange/12 text-brand-orange-text">
                      {Icon && <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />}
                    </span>
                    <span className="mt-3 font-semibold">{cat.name}</span>
                    <span className="mt-1 text-sm text-ink-muted">
                      {cat.description}
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/supplies"
              className="link-underline mt-6 inline-flex items-center gap-1"
            >
              {tsu("quoteCta")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="section">
        <div className="container-page">
          <div className="surface-card grid gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
            <div>
              <SectionHeading
                eyebrow={tc("title")}
                title={tc("subtitle")}
              />
              <p className="mt-5 max-w-lg leading-relaxed text-ink-muted">
                {tc("closing")}
              </p>
              <Link href="/contact" className="btn btn-primary mt-7">
                {tc("title")}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
            <address className="space-y-4 text-sm not-italic">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-orange-text" aria-hidden="true" />
                <span className="text-ink-muted">{fullAddress}</span>
              </p>
              {company.phones.map((p, i) => (
                <p key={p} className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-brand-orange-text" aria-hidden="true" />
                  <a href={telHrefs[i]} className="link-underline">
                    {p}
                  </a>
                </p>
              ))}
              <p className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-brand-orange-text" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="link-underline break-all">
                  {company.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </section>

      <CtaBanner locale={locale} />
    </>
  );
}
