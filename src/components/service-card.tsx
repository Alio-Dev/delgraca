import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ServiceIcon } from "@/components/icons";

export function ServiceCard({
  slug,
  name,
  short,
  cta,
}: {
  slug: string;
  name: string;
  short: string;
  cta: string;
}) {
  return (
    <Link
      href={{ pathname: "/services/[slug]", params: { slug } }}
      className="surface-card surface-card--interactive group flex flex-col p-6 focus-visible:outline-none"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-lg bg-brand-blue/8 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
        <ServiceIcon slug={slug} className="size-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-snug">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {short}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
        {cta}
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
