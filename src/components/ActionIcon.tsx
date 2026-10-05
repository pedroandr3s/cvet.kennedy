import { CalendarCheck, Phone } from "lucide-react";
import type { ActionKind } from "@/lib/contact";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

export function ActionIcon({ kind, size = 20 }: { kind: ActionKind; size?: number }) {
  switch (kind) {
    case "whatsapp":
      return <WhatsAppIcon size={size} />;
    case "instagram":
      return <InstagramIcon size={size} />;
    case "phone":
      return <Phone size={size} aria-hidden />;
    default:
      return <CalendarCheck size={size} aria-hidden />;
  }
}
