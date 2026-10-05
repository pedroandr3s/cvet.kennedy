# Pendientes antes de publicar

Estado: **borrador**. `published: false` en `src/content/site.ts` mantiene la web con
`noindex`. Cuando todo lo de abajo esté confirmado, cambiar a `true` y ejecutar
`npm run check:content`.

## 0. Lo más importante

Instagram bloquea el acceso automatizado, así que **no se pudo leer `@cvet.kennedy`**
(logo, colores, tipografías, fotos, bio, publicaciones). Los datos del negocio salen de
fuentes públicas de terceros (directorio elamigovet.com, listado de AgendaPro y una
publicación pública de Facebook) que describen una **"Clínica Veterinaria Kennedy" en
Arauco 15, Chillán**.

- [ ] Confirmar que `@cvet.kennedy` es esa misma clínica. Si no lo es, hay que cambiar
      dirección, ciudad, teléfono, horario y servicios (todo vive en `src/content/site.ts`).

## 1. Datos a confirmar (vienen de terceros, no del negocio)

- [ ] Dirección: Arauco 15, Chillán, Ñuble
- [ ] Teléfono: +56 42 227 1313
- [ ] Horario: todos los días, 10:00 a 20:00 (revisar domingos y festivos)
- [ ] Servicios. Aparecen en una sola fuente: Desparasitación, Hospitalización,
      Microchip y Ecografía. Quitar los que no ofrezcan.
- [ ] Especies que atienden. El texto dice "perros y gatos" (se infiere de una
      publicación de Facebook); confirmar si atienden otras especies.
- [ ] Página de Facebook (`facebookUrl`): confirmar que es del mismo negocio.
- [ ] Aprobar todos los textos (son borrador).

## 2. Datos que faltan

- [ ] WhatsApp (`whatsapp`). Mientras falte, "Reservar hora" abre un mensaje directo de Instagram.
- [ ] Correo (`email`). Sin él no se muestra.
- [ ] Sistema de agenda online, si existe (`bookingUrl`).
- [ ] Dominio definitivo (`url` o variable `NEXT_PUBLIC_SITE_URL`).

## 3. Identidad visual

- [ ] Logo real (`images.logo`). Hoy solo se compone el nombre con tipografía.
- [ ] Paleta y tipografías de la marca. **Los colores actuales son provisionales**
      (no salen del Instagram): se cambian en `src/app/globals.css`, bloque `@theme`.
- [ ] Favicon con el logo (reemplazar `src/app/icon.svg`).
- [ ] Imagen al compartir el enlace: hoy es una tarjeta de texto
      (`src/app/opengraph-image.tsx`); puede cambiarse por una foto 1200×630.

## 4. Contenido real

- [ ] Foto principal, foto de "Nosotros", 6–12 fotos de galería, publicaciones de Instagram.
      Ver `public/images/README.md`.
- [ ] Equipo (`team`). Un directorio menciona nombres de pila de tres doctoras, pero salen
      de reseñas de terceros: no se publicaron. Pedir nombres, cargos y fotos a la clínica.

## 5. Revisión final

- [ ] `npm run check:content` sin pendientes que bloqueen.
- [ ] Probar en un celular real: botones de reservar y llamar, menú, mapa.
- [ ] Revisar el mapa embebido (se carga desde Google Maps).
- [ ] Pasar Lighthouse (rendimiento, accesibilidad, SEO) con el dominio publicado.
- [ ] Dar de alta la ficha de Google Business Profile con los mismos datos (nombre,
      dirección y teléfono idénticos a la web) para el SEO local.
