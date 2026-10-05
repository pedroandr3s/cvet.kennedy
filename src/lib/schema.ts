import { siteConfig, services } from "@/content/site";

/**
 * Datos estructurados (JSON-LD) para búsquedas locales.
 * Solo incluye campos que existen en siteConfig: lo que está en null se omite
 * en vez de rellenarse con datos inventados.
 */
export function buildLocalBusinessSchema() {
  const { location, phone, hours, instagram, whatsapp } = siteConfig;
  const base = siteConfig.url.replace(/\/$/, "");

  const sameAs = [instagram.url, siteConfig.facebookUrl].filter(Boolean);
  const image = siteConfig.images.hero?.src;

  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${base}/#veterinaria`,
    name: siteConfig.name,
    url: base,
    foundingDate: `${siteConfig.founded.year}-${String(siteConfig.founded.month).padStart(2, "0")}`,
    description: siteConfig.seo.description,
    ...(image ? { image: `${base}${image}` } : {}),
    telephone: phone.e164,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.days,
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
    areaServed: { "@type": "City", name: location.city },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservas",
        telephone: phone.e164,
        availableLanguage: "es",
      },
      ...(whatsapp
        ? [
            {
              "@type": "ContactPoint",
              contactType: "WhatsApp",
              telephone: `+${whatsapp.digits}`,
              availableLanguage: "es",
            },
          ]
        : []),
    ],
    sameAs,
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  };
}
