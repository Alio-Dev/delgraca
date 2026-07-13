import {
  Settings2,
  Code2,
  Leaf,
  Pickaxe,
  DraftingCompass,
  Map,
  Calculator,
  Building2,
  GraduationCap,
  Armchair,
  Network,
  FileText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** One consistent icon family (Lucide), one stroke width. */
export const serviceIcons: Record<string, LucideIcon> = {
  "sistemas-de-gestao": Settings2,
  "software-personalizado": Code2,
  "consultoria-ambiental": Leaf,
  "processos-mineiros": Pickaxe,
  "projectos-arquitectonicos": DraftingCompass,
  "topografia-sig": Map,
  "contabilidade-fiscalidade": Calculator,
  "gestao-imoveis": Building2,
};

export const trainingIcons: Record<string, LucideIcon> = {
  "cegid-primavera-vendus": GraduationCap,
  topografia: Map,
  "cartografia-sig": Map,
};

export const supplyIcons: Record<string, LucideIcon> = {
  escritorio: Armchair,
  "informatica-redes": Network,
  papelaria: FileText,
  seguranca: ShieldCheck,
};

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = serviceIcons[slug] ?? Settings2;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
