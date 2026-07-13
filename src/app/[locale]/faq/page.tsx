import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getFaq } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBanner } from "@/components/cta-banner";
import { FaqJsonLd } from "@/components/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const items = await getFaq(locale);

  return (
    <>
      <FaqJsonLd items={items} />
      <PageHeader
        eyebrow={tn("faq")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("faq") }]}
      />
      <section className="section">
        <div className="container-page max-w-3xl">
          <FaqAccordion items={items} />
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
