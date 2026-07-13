import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="section">
      <div className="container-page flex min-h-[40vh] flex-col items-center justify-center text-center">
        <p className="text-7xl font-extrabold text-brand-blue">404</p>
        <h1 className="mt-4">{t("title")}</h1>
        <p className="mt-3 max-w-md text-ink-muted">{t("text")}</p>
        <Link href="/" className="btn btn-primary mt-8">
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
