import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Info } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getSupplies } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { PopoverCard } from "@/components/popover-card";
import { supplyIcons } from "@/components/icons";
import { CtaBanner } from "@/components/cta-banner";
import { ItemListJsonLd } from "@/components/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "supplies" });
  return { title: t("sectionTitle"), description: t("sectionSubtitle") };
}

export default async function SuppliesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "supplies" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const ts = await getTranslations({ locale, namespace: "services" });
  const categories = await getSupplies(locale);

  return (
    <>
      {categories.map((cat) => (
        <ItemListJsonLd key={cat.slug} name={cat.name} items={cat.items} />
      ))}
      <PageHeader
        eyebrow={tn("supplies")}
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("supplies") }]}
      />

      <section className="section">
        <div className="container-page">
          <p className="mb-10 flex items-start gap-3 rounded-lg border border-border-subtle bg-surface p-4 text-sm text-ink-muted">
            <Info className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden="true" />
            {t("note")}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const Icon = supplyIcons[cat.slug];
              return (
                <PopoverCard
                  key={cat.slug}
                  title={cat.name}
                  subtitle={cat.description}
                  detailLabel={ts("viewDetail")}
                  icon={
                    Icon ? (
                      <Icon className="size-6" aria-hidden="true" strokeWidth={1.75} />
                    ) : undefined
                  }
                >
                  <ul className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border-subtle bg-bg px-3 py-1.5 text-sm text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </PopoverCard>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/contact" className="btn btn-accent">
              {t("quoteCta")}
            </Link>
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
