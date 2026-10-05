/**
 * Revisa qué falta antes de publicar. Uso:  npm run check:content
 * Si `published: true` y hay pendientes que bloquean, termina con error.
 */
import { siteConfig } from "../src/content/site";

type Issue = { blocking: boolean; text: string };
const issues: Issue[] = [];
const add = (blocking: boolean, text: string) => issues.push({ blocking, text });

const { images } = siteConfig;

if (siteConfig.url.includes("localhost")) add(true, "Dominio definitivo (siteConfig.url o NEXT_PUBLIC_SITE_URL).");
if (!siteConfig.whatsapp) add(true, "Número de WhatsApp (siteConfig.whatsapp). Hoy 'Reservar hora' usa un mensaje directo de Instagram.");
if (!images.logo) add(true, "Logo real del negocio (images.logo). Hoy se usa solo el nombre en tipografía.");
if (!images.hero) add(true, "Foto principal (images.hero).");
if (!images.about) add(false, "Foto para 'Nosotros' (images.about).");
if (images.gallery.length === 0) add(true, "Fotos reales para la galería (images.gallery).");
if (images.instagram.length === 0) add(false, "Publicaciones destacadas de Instagram (images.instagram).");
if (siteConfig.team.length === 0) add(false, "Equipo confirmado por la clínica (team).");
if (!siteConfig.email) add(false, "Correo de contacto (siteConfig.email). Sin él no se muestra.");

console.log("\nDatos tomados de fuentes de terceros que el cliente DEBE confirmar:");
console.log(" - Que @cvet.kennedy es la clínica de Arauco 15, Chillán");
console.log(" - Teléfono, horario, servicios y página de Facebook");
console.log(" - Paleta de colores y tipografías (son provisionales)\n");

if (issues.length === 0) {
  console.log("Sin pendientes de contenido.");
} else {
  console.log("Pendientes:");
  for (const i of issues) console.log(` ${i.blocking ? "[bloquea]" : "[opcional]"} ${i.text}`);
}

const blocking = issues.filter((i) => i.blocking).length;
console.log(`\nEstado: published = ${siteConfig.published}. ${blocking} pendiente(s) que bloquean.`);

if (siteConfig.published && blocking > 0) {
  console.error("\nNo se puede publicar con pendientes que bloquean.");
  process.exit(1);
}
