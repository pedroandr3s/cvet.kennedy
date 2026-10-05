import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name}, veterinaria en ${siteConfig.location.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen al compartir el enlace (WhatsApp, Facebook…). Es de texto a propósito:
 * no hay fotos verificadas todavía. Para usar una foto propia, borrar este
 * archivo y poner un opengraph-image.jpg (1200×630) en /src/app.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0A47D6",
          color: "#FBFDFD",
          padding: "0 90px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ fontSize: 34, opacity: 0.9 }}>Clínica veterinaria</div>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1.05, marginTop: 8 }}>
            {siteConfig.shortName}
          </div>
          <div style={{ fontSize: 40, marginTop: 28, opacity: 0.95 }}>
            {`Veterinaria en ${siteConfig.location.city}`}
          </div>
        </div>
        <div
          style={{
            width: 300,
            height: 375,
            display: "flex",
            background: "#E0121B",
            borderRadius: "150px 150px 40px 40px",
          }}
        />
      </div>
    ),
    size,
  );
}
