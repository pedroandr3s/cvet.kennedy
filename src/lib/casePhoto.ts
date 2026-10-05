import { existsSync } from "node:fs";
import path from "node:path";
import type { ImageAsset } from "@/content/site";
import type { CaseItem } from "@/content/cases";

/** Devuelve la foto del caso solo si el archivo ya está en /public/images/casos. */
export function casePhoto(c: CaseItem): ImageAsset | null {
  const file = path.join(process.cwd(), "public", "images", "casos", c.photo);
  if (!existsSync(file)) return null;
  return { src: `/images/casos/${c.photo}`, alt: c.photoAlt, focus: c.focus };
}
