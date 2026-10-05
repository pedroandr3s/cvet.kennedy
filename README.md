# Clínica Veterinaria Kennedy: sitio web

Landing page en **Next.js 16 + TypeScript + Tailwind CSS 4**. Estática, sin base de
datos ni servicios externos (solo el mapa de Google Maps embebido).

> Estado: **borrador**. Lee `PENDIENTES.md` antes de publicar: varios datos vienen de
> fuentes de terceros y faltan WhatsApp, logo y fotos.

## Ejecutar

Requiere Node 20.9 o superior.

```bash
npm install
npm run dev            # http://localhost:3000 (con recuadros "Pendiente")
npm run build          # versión de producción
npm start              # sirve la versión de producción
npm run typecheck      # revisa los tipos
npm run check:content  # lista lo que falta antes de publicar
```

## Dónde se edita cada cosa

| Qué                                              | Dónde                          |
| ------------------------------------------------ | ------------------------------ |
| Teléfono, WhatsApp, horario, dirección, redes    | `src/content/site.ts`          |
| Textos de cada sección y lista de servicios      | `src/content/site.ts`          |
| Rutas de fotos, logo, testimonios, equipo        | `src/content/site.ts`          |
| Colores, tipografías, radios, sombras            | `src/app/globals.css` (`@theme`) |
| SEO (title, description, Open Graph)             | `src/content/site.ts` (`seo`)  |
| Datos estructurados para Google (VeterinaryCare) | `src/lib/schema.ts`            |

## Cómo se comportan los datos que faltan

- **Sin WhatsApp:** "Reservar hora" abre un mensaje directo de Instagram. Al completar
  `whatsapp`, pasa solo a WhatsApp con mensaje prellenado.
- **Sin fotos:** cada espacio muestra un bloque del color de marca. Galería, testimonios
  y equipo se ocultan en producción hasta tener contenido real (en `npm run dev`
  aparecen como recuadros "Pendiente").
- **Sin correo:** no se muestra.
- **`published: false`:** la web lleva `noindex` y `robots.txt` bloquea todo el rastreo.

## Estructura

```
src/
  app/            layout, página, robots, sitemap, imagen Open Graph, favicon
  components/     una pieza por sección + componentes base (Button, PhotoSlot…)
  content/site.ts todos los datos del negocio y los textos
  lib/            enlaces de contacto, schema.org, visibilidad de secciones
scripts/          check-content.ts (control previo a publicar)
```

## Accesibilidad y rendimiento

Enlace "Saltar al contenido", foco visible, objetivos táctiles de 44 px, contraste AA,
`prefers-reduced-motion` respetado, menú móvil con Escape y retorno de foco, fuentes
alojadas en el propio proyecto (sin Google Fonts), imágenes con `next/image`
(AVIF/WebP, carga diferida) y mapa con carga diferida.
