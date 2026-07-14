import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTraining } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { PopoverCard } from "@/components/popover-card";
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
  const ts = await getTranslations({ locale, namespace: "services" });
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
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {training.map((tr) => (
              <PopoverCard
                key={tr.slug}
                title={tr.name}
                subtitle={tr.short}
                detailLabel={ts("viewDetail")}
                icon={<ServiceIcon slug={tr.slug} className="size-6" />}
              >
                <p className="text-sm leading-relaxed text-ink">{tr.long}</p>
              </PopoverCard>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
