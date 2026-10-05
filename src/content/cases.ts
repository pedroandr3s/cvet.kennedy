/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CASOS DE PACIENTES
 * ─────────────────────────────────────────────────────────────────────────────
 *  Historias de pacientes y tutores. Para sumar un caso, agrégalo AL INICIO de
 *  `cases` y guarda su foto en /public/images/casos con el nombre de `photo`.
 *  Si el archivo aún no existe, la tarjeta se muestra con un recuadro de color
 *  y la foto aparece sola en cuanto se guarda el archivo.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type CaseItem = {
  slug: string;
  /** Nombre del archivo dentro de /public/images/casos */
  photo: string;
  photoAlt: string;
  /** Punto focal del recorte, p. ej. "center 30%" */
  focus?: string;
  tag: string;
  name: string;
  story: string[];
  /** Felicitación a la tutora o tutor */
  kudos: string;
};

export const cases: CaseItem[] = [
  {
    slug: "kookie",
    photo: "kookie.webp",
    photoAlt: "Kookie, un gato blanco y negro con collar isabelino, en brazos de su tutora.",
    focus: "center 40%",
    tag: "Recuperación en casa",
    name: "Kookie y su collar isabelino",
    story: [
      "Kookie era un gato feliz, hasta que la nación de las garras felinas atacó y ahora debe usar collar isabelino. No le gustó para nada.",
      "Pero lo que sí nos alegra es que ha avanzado súper bien después de su tratamiento y manejos en casa.",
    ],
    kudos:
      "Queremos felicitar a su tutora por el gran compromiso con su recuperación. A pesar de la dificultad que puede generar este tipo de cuidados, ha seguido todas las indicaciones de forma ejemplar.",
  },
  {
    slug: "gorda",
    photo: "gorda.webp",
    photoAlt:
      "Gorda, una gata naranja y blanca con un vendaje en el cuello, mirando por la ventana.",
    focus: "center 35%",
    tag: "Reevaluación · Dermatitis por contacto",
    name: "La pequeña Gorda",
    story: [
      "Ella es la pequeña Gorda, muy melancólica ya que no le gustan los días nublados: prefería estar en su casita que venir al doctor.",
      "Pero debía venir a la clínica a su reevaluación por dermatitis por contacto, y ha tenido una buena evolución.",
    ],
    kudos: "Felicitamos a su tutora por su excelente trabajo y dedicación.",
  },
];
