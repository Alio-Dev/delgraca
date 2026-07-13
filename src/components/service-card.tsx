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
      className="surface-card surface-card--interactive group relative flex flex-col overflow-hidden p-6 focus-visible:outline-none"
    >
      {/* orange triangle corner — DS signature */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 size-11 bg-brand-orange transition-transform duration-200 group-hover:scale-110"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      <span className="inline-flex size-12 items-center justify-center rounded-md bg-blue-tint text-brand-blue">
        <ServiceIcon slug={slug} className="size-6" />
      </span>
      <h3 className="mt-5 text-[1.35rem] leading-tight">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{short}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-wide text-brand-blue">
        {cta}
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
