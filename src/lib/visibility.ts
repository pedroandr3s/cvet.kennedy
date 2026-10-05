import { siteConfig } from "@/content/site";

/**
 * En desarrollo (`npm run dev`) las secciones que aún no tienen contenido real
 * se muestran con un recuadro "Pendiente" para poder revisar el diseño completo.
 * En producción (`npm run build`) esas secciones simplemente no se renderizan:
 * nunca se publican recuadros vacíos ni contenido inventado.
 */
export const showPending = process.env.NODE_ENV !== "production";

export const hasGallery = siteConfig.images.gallery.length > 0;
export const hasInstagramPosts = siteConfig.images.instagram.length > 0;
export const hasTeam = siteConfig.team.length > 0;

export const galleryVisible = hasGallery;
