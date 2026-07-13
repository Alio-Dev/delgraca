import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function CtaBanner({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "cta" });
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-xl bg-brand-blue px-6 py-14 text-center shadow-lg md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-orange/25 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-white">{t("bannerTitle")}</h2>
            <p className="mt-4 text-lg text-white/85">{t("bannerText")}</p>
            <Link
              href="/contact"
              className="btn btn-accent mt-8 text-base"
            >
              {t("bannerButton")}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
