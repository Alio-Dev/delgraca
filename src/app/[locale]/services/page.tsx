import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getServices } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { PopoverCard } from "@/components/popover-card";
import { ServiceIcon } from "@/components/icons";
import { CtaBanner } from "@/components/cta-banner";
import { ServiceJsonLd } from "@/components/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("sectionTitle"), description: t("sectionSubtitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const services = await getServices(locale);

  return (
    <>
      {services.map((s) => (
        <ServiceJsonLd key={s.slug} name={s.name} description={s.long} />
      ))}
      <PageHeader
        eyebrow={tn("services")}
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("services") }]}
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <PopoverCard
                key={s.slug}
                triangle
                title={s.name}
                subtitle={s.short}
                detailLabel={t("viewDetail")}
                icon={<ServiceIcon slug={s.slug} className="size-6" />}
              >
                <p className="text-sm leading-relaxed text-ink">{s.long}</p>
              </PopoverCard>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
