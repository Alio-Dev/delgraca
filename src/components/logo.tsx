import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * DELGRAÇA horizontal lockup. The artwork wordmark reads "DELGRACA" (no
 * cedilla) by design; alt text uses the correct legal name "DELGRAÇA".
 */
export function Logo({
  className,
  priority = false,
  alt,
}: {
  className?: string;
  priority?: boolean;
  alt: string;
}) {
  return (
    <Image
      src="/brand/delgraca-logo.png"
      alt={alt}
      width={1097}
      height={594}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}

export function Monogram({
  className,
  alt = "DELGRAÇA",
  size = 40,
}: {
  className?: string;
  alt?: string;
  size?: number;
}) {
  return (
    <Image
      src="/brand/delgraca-monogram.png"
      alt={alt}
      width={648}
      height={546}
      className={cn("h-auto", className)}
      style={{ width: size }}
    />
  );
}
