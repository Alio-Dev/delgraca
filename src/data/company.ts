/**
 * Single source of truth for DELGRAÇA's legal / official data.
 * These values are IDENTICAL across locales and must never be translated.
 * Sourced from the company's Certidão Comercial, Alvará and presentation letter.
 */
export const company = {
  legalName: "DELGRAÇA – Comércio Geral e Prestação de Serviços, Lda",
  brandName: "DELGRAÇA",
  nif: "5002134306",
  cae: "82900 – Actividades de serviços de apoio prestados às empresas, n.e.",
  matricula: "40112-24/240923",
  email: "delgracacomerciogeral@gmail.com",
  phones: ["+244 921 322 922", "+244 941 117 183"],
  director: "Afonso Canga",
  address: {
    street: "Rua da Missão, Prédio da Suniver, 2.º Andar, Porta n.º 21",
    // NOTE: presentation letter says "Bairro da Mutamba"; earlier brief said
    // "Bairro Ingombota". Awaiting client confirmation — see BUILD_LOG.md.
    locality: "Município da Ingombota",
    region: "Luanda",
    country: "Angola",
    countryCode: "AO",
  },
} as const;

/** E.164-style tel: hrefs derived from the display phone numbers. */
export const telHrefs = company.phones.map(
  (p) => "tel:" + p.replace(/\s+/g, "")
);

export const fullAddress = `${company.address.street}, ${company.address.locality}, ${company.address.region}, ${company.address.country}`;

export const SITE_URL = "https://www.delgraca.co.ao";
