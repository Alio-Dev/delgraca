import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, UserRound } from "lucide-react";
import { company, telHrefs, fullAddress } from "@/data/company";
import { PageHeader } from "@/components/page-header";
import { CtaBanner } from "@/components/cta-banner";
import { OrganizationJsonLd } from "@/components/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("lead").slice(0, 155) };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const capacity = t.raw("capacityItems") as string[];

  const legalRows: { label: string; value: string; mono?: boolean }[] = [
    { label: t("legal.legalName"), value: company.legalName },
    { label: t("legal.nif"), value: company.nif, mono: true },
    { label: t("legal.cae"), value: company.cae },
    { label: t("legal.matricula"), value: company.matricula, mono: true },
    { label: t("legal.address"), value: fullAddress },
    { label: t("legal.phones"), value: company.phones.join("  ·  ") },
    { label: t("legal.email"), value: company.email },
  ];

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <PageHeader
        eyebrow={tn("about")}
        title={t("title")}
        crumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("about") },
        ]}
      />

      <article className="section">
        <div className="container-page grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-12">
            <section aria-labelledby="about-intro">
              <h2 id="about-intro" className="sr-only">
                {t("title")}
              </h2>
              <p className="text-xl leading-relaxed text-ink">{t("lead")}</p>
            </section>

            <section aria-labelledby="capacity">
              <h2 id="capacity">{t("capacityTitle")}</h2>
              <p className="mt-3 text-ink-muted">{t("capacityIntro")}</p>
              <ul className="mt-6 space-y-4">
                {capacity.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 size-5 shrink-0 text-brand-blue"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-8">
            <section
              aria-labelledby="leadership"
              className="surface-card p-6"
            >
              <h2 id="leadership" className="text-lg">
                {t("leadershipTitle")}
              </h2>
              <div className="mt-4 flex items-center gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <UserRound className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{t("leadershipName")}</p>
                  <p className="text-sm text-ink-muted">{t("leadershipRole")}</p>
                </div>
              </div>
            </section>

            <section
              aria-labelledby="legal"
              className="surface-card p-6"
            >
              <h2 id="legal" className="text-lg">
                {t("legalTitle")}
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                {legalRows.map((row) => (
                  <div key={row.label}>
                    <dt className="font-medium text-ink-muted">{row.label}</dt>
                    <dd
                      className={
                        row.mono
                          ? "font-mono text-ink"
                          : "text-ink"
                      }
                    >
                      {row.label === t("legal.email") ? (
                        <a
                          href={`mailto:${company.email}`}
                          className="link-underline break-all"
                        >
                          {row.value}
                        </a>
                      ) : row.label === t("legal.phones") ? (
                        <span className="flex flex-col gap-1">
                          {company.phones.map((p, i) => (
                            <a key={p} href={telHrefs[i]} className="link-underline">
                              {p}
                            </a>
                          ))}
                        </span>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>
      </article>

      <CtaBanner locale={locale} />
    </>
  );
}
