import Image from "next/image";
import { siteConfig } from "@/content/site";

/**
 * Logotipo. Logo de la clínica (images.logo, sin modificarlo) junto al nombre en
 * tipografía, porque el logo solo se lee mal a tamaño de encabezado.
 */
export function Brand({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { logo } = siteConfig.images;
  const text = tone === "light" ? "text-paper" : "text-ink";
  const sub = tone === "light" ? "text-paper/75" : "text-muted";

  return (
    <span className="flex items-center gap-2.5">
      {logo && (
        <Image
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          className={`size-11 shrink-0 object-contain ${
            tone === "light" ? "rounded-xl bg-white" : "mix-blend-multiply"
          }`}
          priority
        />
      )}
      <span className="flex flex-col leading-none">
        <span className={`text-[0.8rem] font-medium tracking-wide ${sub}`}>
          Clínica veterinaria
        </span>
        <span className={`font-display text-[1.6rem] font-extrabold tracking-tight ${text}`}>
          {siteConfig.shortName}
        </span>
      </span>
    </span>
  );
}
