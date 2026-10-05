/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  INFORMATIVO
 * ─────────────────────────────────────────────────────────────────────────────
 *  Para publicar un aviso nuevo basta con agregar un objeto AL INICIO de la
 *  lista `news` (las más nuevas se muestran primero). Nada más que tocar.
 *
 *  - `tone` define los colores de la tarjeta; `icon`, la ilustración.
 *  - `date` es opcional (texto libre: "Marzo 2026"). Si no se pone, no se muestra.
 *  - `sections` admite bloques de 4 tipos: cards, checklist, callout y qa.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type NewsIcon =
  | "chip"
  | "registry"
  | "sun"
  | "shade"
  | "water"
  | "alert"
  | "heart"
  | "paw";

export type NewsTone = "blue" | "amber" | "red";

export type NewsSection =
  | { kind: "cards"; items: { icon: NewsIcon; title: string; text: string }[] }
  | { kind: "checklist"; title: string; items: { icon: NewsIcon; text: string }[] }
  | { kind: "callout"; tone: "alert" | "info"; title: string; text: string }
  | { kind: "qa"; question: string; answer: string };

export type NewsItem = {
  slug: string;
  category: string;
  tone: NewsTone;
  icon: NewsIcon;
  date?: string;
  title: string;
  intro: string;
  sections: NewsSection[];
  /** Quién emite la información, si no es la clínica */
  source?: string;
};

export const news: NewsItem[] = [
  {
    slug: "olas-de-calor",
    category: "Cómo actuar en caso de…",
    tone: "amber",
    icon: "sun",
    title: "Olas de calor",
    intro:
      "Las olas de calor afectan tanto a las personas como a los animales. Para proteger a tu mascota, te recomendamos seguir estos consejos:",
    sections: [
      {
        kind: "checklist",
        title: "Qué hacer",
        items: [
          { icon: "sun", text: "No pasees a tu mascota en los horarios de mayor temperatura." },
          {
            icon: "shade",
            text: "Asegura lugares con sombra para los animales que están en el exterior.",
          },
          { icon: "water", text: "Mantén siempre fuentes de agua disponibles." },
        ],
      },
      {
        kind: "callout",
        tone: "alert",
        title: "Señales de golpe de calor",
        text: "Si tu mascota tiene vómitos, jadeo intenso o se desmaya, llévala de urgencia a un centro de atención veterinaria.",
      },
    ],
    source:
      "Emisor: Colegio Médico Veterinario de Chile – Emergencias (Comisión Nacional de Respuesta a Desastres).",
  },
  {
    slug: "tenencia-responsable",
    category: "Tenencia responsable",
    tone: "blue",
    icon: "chip",
    title: "Microchip y registro nacional de mascotas",
    intro:
      "La ley 21.020 obliga a cada propietario a tener a su mascota con microchip y registrada en el Registro Nacional de Mascotas.",
    sections: [
      {
        kind: "cards",
        items: [
          {
            icon: "chip",
            title: "¿Qué guarda el microchip?",
            text: "No tiene GPS, pero sí datos importantes de tu mascota: nombre, raza y si tiene propietario. Si lo tiene, quedan registrados los datos de este.",
          },
          {
            icon: "registry",
            title: "Inscríbela en el registro",
            text: "Si no la inscribes, al leer el microchip no saldrá la información y no podremos localizar al propietario ni devolverla a su familia. Además, no tenerla inscrita es una falta a la ley.",
          },
        ],
      },
      {
        kind: "qa",
        question: "Si mi mascota fallece y tiene microchip, ¿qué debo hacer?",
        answer:
          "Hay que dar de baja el microchip, ingresando un certificado otorgado por el médico veterinario. Es importante hacerlo para tener un total real de las mascotas de la comuna.",
      },
    ],
  },
];
