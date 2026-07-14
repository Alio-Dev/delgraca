import { getTranslations } from "next-intl/server";
import { getServices, getTraining, getSupplies } from "@/lib/content";
import { HeaderClient, type NavModel } from "@/components/header-client";

export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const [services, training, supplies] = await Promise.all([
    getServices(locale),
    getTraining(locale),
    getSupplies(locale),
  ]);

  const nav: NavModel = {
    ariaLabel: t("ariaLabel"),
    logoAlt: t("home"),
    labels: {
      about: t("about"),
      services: t("services"),
      training: t("training"),
      supplies: t("supplies"),
      blog: t("blog"),
      contact: t("contact"),
      cta: t("cta"),
      openMenu: t("openMenu"),
      closeMenu: t("closeMenu"),
    },
    servicesItems: services.map((s) => ({ slug: s.slug, name: s.name })),
    trainingItems: training.map((s) => ({ slug: s.slug, name: s.name })),
    suppliesItems: supplies.map((s) => ({ slug: s.slug, name: s.name })),
  };

  return <HeaderClient locale={locale} nav={nav} />;
}
