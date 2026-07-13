import { cn } from "@/lib/utils";

/**
 * "Barras Ascendentes" — the DELGRAÇA signature motif (echoes the logo glyph).
 * Four rising, angled bars.
 */
export function Bars({
  variant = "orange",
  mini = false,
  className,
}: {
  variant?: "orange" | "blue" | "white";
  mini?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("bars", variant !== "orange" && variant, mini && "mini", className)}
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
