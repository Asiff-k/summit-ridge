import {
  Building2,
  ClipboardCheck,
  CloudLightning,
  Droplets,
  HardHat,
  Handshake,
  House,
  Magnet,
  MapPin,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/config/business";
import { cn } from "@/lib/utils";

/** Maps the icon keys used in business.ts to Lucide icons. */
const icons: Record<IconName, LucideIcon> = {
  repair: Wrench,
  replacement: House,
  storm: CloudLightning,
  inspection: ClipboardCheck,
  gutters: Droplets,
  commercial: Building2,
  local: MapPin,
  warranty: ShieldCheck,
  clean: Magnet,
  honest: Handshake,
  family: Users,
  safety: HardHat,
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = icons[name];
  return (
    <Component
      aria-hidden="true"
      strokeWidth={1.5}
      className={cn("size-7 shrink-0", className)}
    />
  );
}
