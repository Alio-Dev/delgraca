import { getTranslations } from "next-intl/server";

export type Catalogitem = {
  slug: string;
  name: string;
  short: string;
  long: string;
};

export type SupplyCategory = {
  slug: string;
  name: string;
  description: string;
  items: string[];
};

/** Server-side accessors for the structured catalog content in messages/*.json */
export async function getServices(locale: string): Promise<Catalogitem[]> {
  const t = await getTranslations({ locale, namespace: "services" });
  return t.raw("items") as Catalogitem[];
}

export async function getTraining(locale: string): Promise<Catalogitem[]> {
  const t = await getTranslations({ locale, namespace: "training" });
  return t.raw("items") as Catalogitem[];
}

export async function getSupplies(locale: string): Promise<SupplyCategory[]> {
  const t = await getTranslations({ locale, namespace: "supplies" });
  return t.raw("categories") as SupplyCategory[];
}

export async function getFaq(
  locale: string
): Promise<{ q: string; a: string }[]> {
  const t = await getTranslations({ locale, namespace: "faq" });
  return t.raw("items") as { q: string; a: string }[];
}
