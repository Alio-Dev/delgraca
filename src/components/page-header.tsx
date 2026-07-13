import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: React.ComponentProps<typeof Link>["href"] };

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="border-b border-border-subtle bg-surface">
      <div className="container-page py-12 md:py-16">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand-blue">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
