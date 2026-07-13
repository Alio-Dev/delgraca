import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";

type LinkHref = React.ComponentProps<typeof Link>["href"];
import { getPost, getAllPostSlugs } from "@/content/blog";
import { CtaBanner } from "@/components/cta-banner";
import { PageHeader } from "@/components/page-header";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

  return (
    <>
      <PageHeader
        eyebrow={tn("blog")}
        title={post.title}
        crumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("blog"), href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="section">
        <div className="container-page max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden="true" />
              {t("publishedOn")} {dateFmt.format(new Date(post.date))}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.readingMinutes} {t("readingTime")}
            </span>
          </div>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="pt-4 text-2xl">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "link-p") {
                return (
                  <p key={i}>
                    {block.before}
                    <Link href={block.href as LinkHref} className="link-underline">
                      {block.linkLabel}
                    </Link>
                    {block.after}
                  </p>
                );
              }
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-subtle px-3 py-1 text-sm text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 border-t border-border-subtle pt-8">
            <Link href="/blog" className="btn btn-secondary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t("backToBlog")}
            </Link>
          </div>
        </div>
      </article>

      <CtaBanner locale={locale} />
    </>
  );
}
