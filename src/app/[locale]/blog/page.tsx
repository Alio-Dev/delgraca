import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPostsByLocale } from "@/content/blog";
import { PageHeader } from "@/components/page-header";
import { CtaBanner } from "@/components/cta-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const posts = getPostsByLocale(locale);
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

  return (
    <>
      <PageHeader
        eyebrow={tn("blog")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("blog") }]}
      />
      <section className="section">
        <div className="container-page">
          <div className="auto-grid">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="surface-card surface-card--interactive flex flex-col p-6"
              >
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-blue/8 px-2.5 py-1 text-xs font-medium text-brand-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 text-xl leading-snug">
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="hover:text-brand-blue"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {dateFmt.format(new Date(post.date))}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {post.readingMinutes} {t("readingTime")}
                  </span>
                </div>
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue"
                >
                  {t("readMore")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner locale={locale} />
    </>
  );
}
