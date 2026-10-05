import {
  BedDouble,
  Bug,
  Cpu,
  FlaskConical,
  ScanLine,
  Scissors,
  ShieldCheck,
  Siren,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/site";

const icons: Record<Service["icon"], LucideIcon> = {
  stethoscope: Stethoscope,
  syringe: Syringe,
  bug: Bug,
  scissors: Scissors,
  shield: ShieldCheck,
  flask: FlaskConical,
  scan: ScanLine,
  smile: Smile,
  chip: Cpu,
  bed: BedDouble,
  siren: Siren,
  sparkles: Sparkles,
};

export function ServiceIcon({ name }: { name: Service["icon"] }) {
  const Icon = icons[name];
  return <Icon size={24} strokeWidth={1.8} aria-hidden />;
}
