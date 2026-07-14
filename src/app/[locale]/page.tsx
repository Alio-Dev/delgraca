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
import { PopoverCard } from "@/components/popover-card";
import { CtaBanner } from "@/components/cta-banner";
import { Logo } from "@/components/logo";
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

      {/* HERO — navy cover with ascending-bars motif */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end gap-3 px-6 opacity-[0.14] md:gap-5 md:px-10"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={i % 2 === 0 ? "flex-1 bg-brand-orange" : "flex-1 bg-white"}
              style={{
                height: `${28 + ((i * 37) % 70)}%`,
                clipPath: "polygon(0% 18%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />
          ))}
        </div>

        <div className="container-page relative py-20 md:py-28">
          <Logo
            alt={t("logoAlt")}
            priority
            className="mb-8 h-10 [filter:brightness(0)_invert(1)] md:h-12"
          />
          <p className="eyebrow !text-brand-orange">{t("eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-white">{t("headline")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted md:text-xl">
            {t("subheadline")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/services" className="btn btn-accent text-base">
              {t("primaryCta")}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="btn text-base border-[1.5px] border-white/40 text-white hover:border-white hover:bg-white/10"
            >
              {t("secondaryCta")}
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-6 font-mono text-xs tracking-wide text-on-dark-muted">
            <span>{company.address.locality}, {company.address.region}</span>
            <span>NIF {company.nif}</span>
            <span>{company.phones[0]}</span>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section bg-bg">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.title} className="surface-card p-6">
                <CheckCircle2 className="size-6 text-brand-orange" aria-hidden="true" />
                <h3 className="mt-4 text-xl text-brand-blue">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{h.text}</p>
              </div>
            ))}
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <PopoverCard
                key={s.slug}
                triangle
                title={s.name}
                subtitle={s.short}
                detailLabel={ts("viewDetail")}
                icon={<ServiceIcon slug={s.slug} className="size-6" />}
              >
                <p className="text-sm leading-relaxed text-ink">{s.long}</p>
              </PopoverCard>
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
