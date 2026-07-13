import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getServices } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { CtaBanner } from "@/components/cta-banner";

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
      <PageHeader
        eyebrow={tn("services")}
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("services") }]}
      />
      <section className="section">
        <div className="container-page">
          <div className="auto-grid">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                name={s.name}
                short={s.short}
                cta={t("viewDetail")}
              />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
