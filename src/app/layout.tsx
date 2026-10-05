import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { buildLocalBusinessSchema } from "@/lib/schema";

const { name, seo, location, published } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: seo.title, template: `%s | ${name}` },
  description: seo.description,
  applicationName: name,
  keywords: [
    `veterinaria ${location.city}`,
    `veterinario ${location.city}`,
    `clínica veterinaria ${location.city}`,
    `veterinaria perros y gatos ${location.city}`,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: "/",
    siteName: name,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  // Con published=false el sitio no se indexa: evita que Google guarde datos sin confirmar.
  robots: published ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfdfd",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = JSON.stringify(buildLocalBusinessSchema()).replace(/</g, "\\u003c");

  return (
    <html lang="es-CL">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        {children}
      </body>
    </html>
  );
}
