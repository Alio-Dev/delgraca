import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTraining } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { ServiceIcon } from "@/components/icons";
import { CtaBanner } from "@/components/cta-banner";
import { ItemListJsonLd } from "@/components/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "training" });
  return { title: t("sectionTitle"), description: t("sectionSubtitle") };
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "training" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const training = await getTraining(locale);

  return (
    <>
      <ItemListJsonLd
        name={t("sectionTitle")}
        items={training.map((tr) => tr.name)}
      />
      <PageHeader
        eyebrow={tn("training")}
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("training") }]}
      />
      <section className="section">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {training.map((tr) => (
            <article key={tr.slug} className="surface-card flex flex-col p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-brand-orange/12 text-brand-orange-text">
                <ServiceIcon slug={tr.slug} className="size-6" />
              </span>
              <h2 className="mt-5 text-lg font-semibold leading-snug">
                {tr.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {tr.long}
              </p>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
