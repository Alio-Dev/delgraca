import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const Title = as;
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Title>{title}</Title>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{subtitle}</p>
      )}
    </div>
  );
}
