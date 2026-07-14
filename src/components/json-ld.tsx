import { company, fullAddress, SITE_URL } from "@/data/company";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const base = locale === "pt-AO" ? SITE_URL : `${SITE_URL}/${locale}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.legalName,
        legalName: company.legalName,
        url: base,
        logo: `${SITE_URL}/brand/delgraca-logo.png`,
        email: company.email,
        telephone: company.phones,
        vatID: company.nif,
        identifier: { "@type": "PropertyValue", name: "NIF", value: company.nif },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          addressLocality: company.address.locality,
          addressRegion: company.address.region,
          addressCountry: company.address.countryCode,
        },
        founder: { "@type": "Person", name: company.director },
        areaServed: "AO",
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: company.legalName,
        image: `${SITE_URL}/brand/delgraca-logo.png`,
        "@id": SITE_URL,
        url: SITE_URL,
        telephone: company.phones[0],
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          addressLocality: company.address.locality,
          addressRegion: company.address.region,
          addressCountry: company.address.countryCode,
        },
        description: fullAddress,
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: name,
        name,
        description,
        provider: { "@type": "Organization", name: company.legalName },
        areaServed: "AO",
      }}
    />
  );
}

export function ItemListJsonLd({
  name,
  items,
}: {
  name: string;
  items: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item,
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.url,
        })),
      }}
    />
  );
}
