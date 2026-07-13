import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Bars } from "@/components/bars";

export async function CtaBanner({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "cta" });
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-xl bg-navy px-6 py-14 shadow-lg md:px-16 md:py-20">
          {/* ascending-bars background motif */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-end gap-3 px-8 opacity-[0.12]"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={i % 2 === 0 ? "flex-1 bg-brand-orange" : "flex-1 bg-white"}
                style={{
                  height: `${24 + ((i * 41) % 72)}%`,
                  clipPath: "polygon(0% 18%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <Bars className="mx-auto mb-6" />
            <h2 className="text-white">{t("bannerTitle")}</h2>
            <p className="mt-4 text-lg text-on-dark-muted">{t("bannerText")}</p>
            <Link href="/contact" className="btn btn-accent mt-8 text-base">
              {t("bannerButton")}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
