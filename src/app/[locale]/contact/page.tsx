import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { company, telHrefs, fullAddress } from "@/data/company";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { LocalBusinessJsonLd } from "@/components/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <LocalBusinessJsonLd />
      <PageHeader
        eyebrow={tn("contact")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("contact") }]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            <p className="max-w-md leading-relaxed text-ink-muted">
              {t("closing")}
            </p>

            <div className="space-y-5">
              <InfoRow
                icon={<MapPin className="size-5" aria-hidden="true" />}
                label={t("addressLabel")}
              >
                {fullAddress}
              </InfoRow>
              <InfoRow
                icon={<Phone className="size-5" aria-hidden="true" />}
                label={t("phoneLabel")}
              >
                <span className="flex flex-col gap-1">
                  {company.phones.map((p, i) => (
                    <a key={p} href={telHrefs[i]} className="link-underline">
                      {p}
                    </a>
                  ))}
                </span>
              </InfoRow>
              <InfoRow
                icon={<Mail className="size-5" aria-hidden="true" />}
                label={t("emailLabel")}
              >
                <a
                  href={`mailto:${company.email}`}
                  className="link-underline break-all"
                >
                  {company.email}
                </a>
              </InfoRow>
              <InfoRow
                icon={<Clock className="size-5" aria-hidden="true" />}
                label={t("hoursLabel")}
              >
                {t("hours")}
              </InfoRow>
            </div>

            {/* Map placeholder — embed a real map before launch */}
            <div
              role="img"
              aria-label={t("mapPlaceholder")}
              className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-ink-muted"
            >
              <span className="flex flex-col items-center gap-2">
                <MapPin className="size-7 text-brand-orange-text" aria-hidden="true" />
                {t("mapPlaceholder")}
              </span>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-blue/8 text-brand-blue">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <div className="mt-0.5 text-ink-muted">{children}</div>
      </div>
    </div>
  );
}
