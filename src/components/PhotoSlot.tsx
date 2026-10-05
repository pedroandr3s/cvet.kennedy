import Image from "next/image";
import { PawPrint } from "lucide-react";
import type { ImageAsset } from "@/content/site";
import { showPending } from "@/lib/visibility";

type Props = {
  image: ImageAsset | null;
  /** Nombre del campo en site.ts, solo visible en desarrollo */
  slot: string;
  /** Clases de forma y proporción (p. ej. "arch" o "aspect-[4/5] rounded-photo") */
  className?: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Muestra una foto real si existe. Si no, un bloque del color de marca para
 * que el diseño se sostenga mientras llegan las fotos del cliente. Nunca se
 * rellena con fotos de stock.
 */
export function PhotoSlot({ image, slot, className = "", sizes, priority }: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-mist ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={image.focus ? { objectPosition: image.focus } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-brand text-paper ${className}`}
      role="img"
      aria-label="Espacio reservado para una fotografía de la clínica"
    >
      <PawPrint className="h-1/3 w-1/3 opacity-15" strokeWidth={1.2} aria-hidden />
      {showPending && (
        <span className="absolute inset-x-4 bottom-4 rounded-lg bg-ink/70 px-3 py-2 text-center text-xs leading-snug">
          Foto pendiente · <code>images.{slot}</code>
        </span>
      )}
    </div>
  );
}
