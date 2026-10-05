# Fotos del sitio

Copia aquí las fotos REALES que entregue el cliente y luego completa las rutas
en `src/content/site.ts` (sección `images`). No uses fotos de stock.

| Campo               | Uso                                  | Recomendado                         |
| ------------------- | ------------------------------------ | ----------------------------------- |
| `images.logo`       | Logo en header y footer              | SVG o PNG con fondo transparente    |
| `images.hero`       | Foto principal (se recorta en arco)  | Vertical 4:5, mínimo 1000×1250 px   |
| `images.about`      | Sección "Nosotros"                   | Vertical 5:6, mínimo 1000×1200 px   |
| `images.gallery`    | Galería (6 a 12 fotos)               | Cualquier orientación, mín. 1000 px |
| `images.instagram`  | Publicaciones destacadas             | Cuadradas, mínimo 600×600 px        |

Ejemplo:

```ts
hero: {
  src: "/images/hero.jpg",
  alt: "Veterinaria revisando a un perro en la clínica",
  focus: "center 30%", // opcional: punto focal del recorte
},
```

- El `alt` debe describir lo que se ve (accesibilidad y SEO). No pongas "foto de veterinaria".
- Guarda las fotos ya en **WebP** (calidad ~80, máx. ~1600 px de ancho): pesan 10 veces
  menos que PNG/JPG y cargan rápido. Los originales se guardan fuera de `public`,
  en `_originales/`. Next.js además las sirve en varios tamaños.
- Usa solo fotos que el cliente tenga derecho a publicar (las de su propio Instagram
  suelen ser suyas, pero si aparecen clientes o personas, confirma el permiso).
