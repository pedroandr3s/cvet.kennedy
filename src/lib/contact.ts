import { siteConfig } from "@/content/site";

export type ActionKind = "booking" | "whatsapp" | "instagram" | "phone";

export type Action = {
  href: string;
  label: string;
  kind: ActionKind;
  /** true si abre otro sitio/app (se abre en pestaña nueva) */
  external: boolean;
};

const { whatsapp, phone, instagram, bookingUrl, bookingMessage, location } =
  siteConfig;

export const telHref = `tel:${phone.e164}`;

export function whatsappHref(message: string = bookingMessage): string | null {
  if (!whatsapp) return null;
  return `https://wa.me/${whatsapp.digits}?text=${encodeURIComponent(message)}`;
}

export const addressLine = `${location.street}, ${location.city}`;

const mapsQuery = encodeURIComponent(`${siteConfig.name}, ${addressLine}, Chile`);

/** Mapa embebido sin API key (se carga solo al acercarse a la sección). */
export const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

/** Enlace "Cómo llegar" que abre Google Maps / la app de mapas del teléfono. */
export const mapsDirectionsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

/**
 * Acción principal "Reservar hora". Orden de preferencia:
 *   1. Sistema de agenda online (si el cliente tiene uno)
 *   2. WhatsApp con mensaje prellenado
 *   3. Mensaje directo de Instagram (respaldo mientras falte el WhatsApp)
 * Así el botón siempre funciona y nunca apunta a un número inventado.
 */
export function bookingAction(): Action {
  if (bookingUrl) {
    return { href: bookingUrl, label: "Reservar hora", kind: "booking", external: true };
  }
  const wa = whatsappHref();
  if (wa) {
    return { href: wa, label: "Reservar hora", kind: "whatsapp", external: true };
  }
  return {
    href: instagram.directMessageUrl,
    label: "Reservar hora",
    kind: "instagram",
    external: true,
  };
}

/** Acción secundaria: WhatsApp si hay agenda online aparte; si no, llamar. */
export function secondaryAction(): Action {
  const wa = whatsappHref("Hola, tengo una consulta sobre mi mascota.");
  if (bookingUrl && wa) {
    return { href: wa, label: "WhatsApp", kind: "whatsapp", external: true };
  }
  return { href: telHref, label: "Llamar", kind: "phone", external: false };
}

export function whatsappAction(): Action | null {
  const wa = whatsappHref("Hola, tengo una consulta sobre mi mascota.");
  return wa ? { href: wa, label: "Escribir por WhatsApp", kind: "whatsapp", external: true } : null;
}
