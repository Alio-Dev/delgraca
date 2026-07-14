/**
 * Blog content registry (Phase 8).
 *
 * Each post follows a documented frontmatter contract (see BlogPost). This
 * mirrors what an MDX file's frontmatter would carry; see
 * src/content/blog/_TEMPLATE.mdx for the equivalent MDX authoring template.
 * Bodies are authored as an array of blocks so the same content renders in
 * both locales with typed internal links back to Service detail pages.
 */
import type { AppPathnames } from "@/i18n/routing";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | {
      type: "link-p";
      before: string;
      linkLabel: string;
      href: { pathname: AppPathnames; params?: Record<string, string> } | AppPathnames;
      after: string;
    };

export type BlogPost = {
  slug: string;
  locale: string;
  title: string;
  description: string; // ~150–160 chars, meta description
  date: string; // ISO
  tags: string[];
  ogImage?: string;
  readingMinutes: number;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "boas-praticas-gestao-de-projectos",
    locale: "pt-AO",
    title: "Boas práticas de gestão de projectos para empresas em Angola",
    description:
      "Cinco práticas de gestão de projectos que ajudam empresas públicas e privadas em Angola a cumprir prazos, controlar custos e elevar o rigor técnico.",
    date: "2026-06-30",
    tags: ["Gestão", "Projectos", "Boas práticas"],
    readingMinutes: 5,
    body: [
      {
        type: "p",
        text: "A boa gestão de projectos é, muitas vezes, a diferença entre uma entrega dentro do prazo e um investimento que se arrasta. Para empresas em Angola — que operam num contexto exigente e com prazos apertados — adoptar práticas estruturadas traz ganhos imediatos de previsibilidade e confiança.",
      },
      { type: "h2", text: "1. Defina o âmbito antes de começar" },
      {
        type: "p",
        text: "Um âmbito claro evita alterações constantes e custos não previstos. Documente objectivos, entregáveis e critérios de aceitação logo no início, e obtenha o alinhamento de todas as partes.",
      },
      { type: "h2", text: "2. Estruture a informação técnica" },
      {
        type: "link-p",
        before:
          "Projectos técnicos dependem de dados fiáveis. Quando o projecto envolve território, o recurso a levantamentos rigorosos e a sistemas geoespaciais faz toda a diferença — é o caso dos nossos serviços de ",
        linkLabel: "Topografia e SIG",
        href: "/services",
        after: ", que garantem uma base de dados sólida para a tomada de decisão.",
      },
      { type: "h2", text: "3. Apoie-se em sistemas de gestão" },
      {
        type: "link-p",
        before:
          "Ferramentas adequadas reduzem erros e automatizam tarefas repetitivas. A ",
        linkLabel: "implementação e treinamento de sistemas de gestão",
        href: "/services",
        after:
          " ajuda a equipa a trabalhar com dados consistentes e relatórios atempados.",
      },
      { type: "h2", text: "4. Monitorize prazos e custos" },
      {
        type: "p",
        text: "Acompanhe o progresso com indicadores simples e revisões periódicas. Pequenos desvios detectados cedo são fáceis de corrigir; ignorados, tornam-se problemas caros.",
      },
      { type: "h2", text: "5. Comunique com rigor" },
      {
        type: "p",
        text: "Relatórios claros e periódicos mantêm todas as partes informadas e reforçam a confiança institucional — um princípio central da forma como a DELGRAÇA trabalha.",
      },
    ],
  },
  {
    slug: "boas-praticas-gestao-de-projectos",
    locale: "en",
    title: "Project management best practices for companies in Angola",
    description:
      "Five project-management practices that help public and private organisations in Angola meet deadlines, control costs and raise technical rigour.",
    date: "2026-06-30",
    tags: ["Management", "Projects", "Best practices"],
    readingMinutes: 5,
    body: [
      {
        type: "p",
        text: "Good project management is often the difference between an on-time delivery and an investment that drags on. For organisations in Angola — operating in a demanding context with tight deadlines — structured practices bring immediate gains in predictability and trust.",
      },
      { type: "h2", text: "1. Define the scope before you start" },
      {
        type: "p",
        text: "A clear scope prevents constant changes and unforeseen costs. Document objectives, deliverables and acceptance criteria up front, and secure alignment from every stakeholder.",
      },
      { type: "h2", text: "2. Structure the technical information" },
      {
        type: "link-p",
        before:
          "Technical projects rely on reliable data. When a project involves the territory, rigorous surveys and geospatial systems make all the difference — as with our ",
        linkLabel: "Surveying & GIS",
        href: "/services",
        after: " services, which provide a solid data foundation for decision-making.",
      },
      { type: "h2", text: "3. Lean on management systems" },
      {
        type: "link-p",
        before: "The right tools reduce errors and automate repetitive tasks. Our ",
        linkLabel: "management systems implementation and training",
        href: "/services",
        after: " helps teams work with consistent data and timely reports.",
      },
      { type: "h2", text: "4. Monitor deadlines and costs" },
      {
        type: "p",
        text: "Track progress with simple indicators and periodic reviews. Small deviations caught early are easy to fix; ignored, they become expensive problems.",
      },
      { type: "h2", text: "5. Communicate with rigour" },
      {
        type: "p",
        text: "Clear, periodic reporting keeps every party informed and reinforces institutional trust — a principle at the core of how DELGRAÇA works.",
      },
    ],
  },
];

export function getPostsByLocale(locale: string): BlogPost[] {
  return blogPosts
    .filter((p) => p.locale === locale)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(locale: string, slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.locale === locale && p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return Array.from(new Set(blogPosts.map((p) => p.slug)));
}
