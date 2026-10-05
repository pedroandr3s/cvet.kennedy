/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FUENTE ÚNICA DE DATOS DEL NEGOCIO
 * ─────────────────────────────────────────────────────────────────────────────
 *  Todo lo que la web muestra (nombre, contacto, horarios, servicios, fotos,
 *  SEO) sale de este archivo. Para cambiar un dato, se cambia aquí y nada más.
 *
 *  Cómo leer las marcas:
 *   [IG]        Dato entregado en el encargo (handle de Instagram).
 *   [TERCEROS]  Dato encontrado en fuentes públicas distintas a Instagram
 *               (directorios y una publicación pública de Facebook). NO está
 *               confirmado por el negocio. Hay que validarlo antes de publicar.
 *   [FALTA]     No se encontró. Se deja vacío a propósito; la web se adapta.
 *
 *  Importante: Instagram bloquea el acceso automatizado, así que NO se pudo
 *  leer el perfil (logo, colores, fotos, bio, publicaciones). Nada de eso se
 *  inventó. Ver PENDIENTES.md.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ImageAsset = {
  /** Ruta dentro de /public, p. ej. "/images/hero.jpg" */
  src: string;
  /** Texto alternativo descriptivo (accesibilidad + SEO) */
  alt: string;
  /** Punto focal del recorte, p. ej. "center 30%" */
  focus?: string;
};

export type LogoAsset = ImageAsset & { width: number; height: number };

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Nombre del icono (ver components/ServiceIcon.tsx) */
  icon:
    | "stethoscope"
    | "syringe"
    | "bug"
    | "scissors"
    | "shield"
    | "flask"
    | "scan"
    | "smile"
    | "chip"
    | "bed"
    | "siren"
    | "sparkles";
};

export type Highlight = { title: string; text: string };

export type TeamMember = {
  name: string;
  role: string;
  photo?: ImageAsset;
};

export const siteConfig = {
  /**
   * Mientras sea `false` la web se publica con `noindex` y el script
   * `npm run check:content` avisa de lo que falta. Pasar a `true` SOLO cuando
   * el cliente haya confirmado todos los datos de PENDIENTES.md.
   */
  published: false,

  /** [FALTA] Dominio definitivo. También se puede definir con NEXT_PUBLIC_SITE_URL */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** [TERCEROS] Nombre tal como aparece en Facebook y directorios */
  name: "Clínica Veterinaria Kennedy",
  shortName: "Kennedy",

  /** Dato entregado por la clínica: atiende desde julio de 1996 */
  founded: { year: 1996, month: 7, label: "julio de 1996" },

  /** [IG] */
  instagram: {
    handle: "cvet.kennedy",
    url: "https://www.instagram.com/cvet.kennedy/",
    /** Abre un mensaje directo; se usa como respaldo si no hay WhatsApp */
    directMessageUrl: "https://ig.me/m/cvet.kennedy",
  },

  /** [TERCEROS] Página pública de Facebook. Confirmar que es del mismo negocio. */
  facebookUrl: "https://www.facebook.com/kennedyveterinaria/" as string | null,

  /**
   * [TERCEROS] Dirección. Aparece igual en un directorio de veterinarias
   * (elamigovet.com) y en el listado de AgendaPro, y la publicación de Facebook
   * indica Chillán. NO se pudo comprobar que el Instagram @cvet.kennedy
   * corresponda a esta misma clínica: confirmarlo es lo primero de PENDIENTES.md.
   */
  location: {
    street: "Arauco 15",
    city: "Chillán",
    region: "Ñuble",
    country: "CL",
  },

  /** [TERCEROS] Teléfono fijo publicado en elamigovet.com */
  phone: {
    display: "+56 42 227 1313",
    e164: "+56422271313",
  },

  /**
   * [FALTA] WhatsApp. No apareció en ninguna fuente pública.
   * Formato: solo dígitos con código de país, sin "+". Ej: "56912345678".
   * Mientras sea null, "Reservar hora" abre un mensaje directo de Instagram.
   */
  whatsapp: {
    digits: "56981377223",
    display: "+56 9 8137 7223",
  } as { digits: string; display: string } | null,

  /** [FALTA] Correo de contacto. Si queda null, no se muestra. */
  email: null as string | null,

  /** [FALTA] Si la clínica usa un sistema de agenda online, pegar aquí el enlace. */
  bookingUrl: null as string | null,

  /**
   * [TERCEROS] Horario: "lunes a domingo, 10:00 a 20:00" en elamigovet.com y
   * AgendaPro. Parece tomado de Google; confirmar (sobre todo domingos y festivos).
   */
  hours: {
    summary: "Todos los días, de 10:00 a 20:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ] as string[],
    opens: "10:00",
    closes: "20:00",
  },

  /** Mensaje que llega prellenado a WhatsApp / Instagram al reservar */
  bookingMessage: "Hola, quisiera reservar una hora para mi mascota.",

  /**
   * [FALTA] Imágenes reales. No se pudieron descargar de Instagram (acceso
   * automatizado bloqueado) y no se usan fotos de stock a propósito.
   * Copiar las fotos del cliente a /public/images y completar las rutas.
   * Cada sección sin foto muestra un bloque de color de marca; las secciones
   * Galería e Instagram se ocultan en producción hasta tener fotos.
   */
  images: {
    logo: {
      src: "/logo.webp",
      alt: "Clínica Veterinaria Kennedy",
      width: 512,
      height: 512,
    } as LogoAsset | null,
    hero: null as ImageAsset | null,
    about: {
      src: "/images/about.webp",
      alt: "Fachada de la Clínica Veterinaria Kennedy en Arauco 15, Chillán.",
      focus: "center",
    } as ImageAsset | null,
    gallery: [] as ImageAsset[],
    /** Publicaciones destacadas: cada una enlaza a su post en Instagram */
    instagram: [] as (ImageAsset & { href: string })[],
  },

  /**
   * [FALTA] Equipo. Un directorio menciona nombres de pila de tres doctoras,
   * pero salen de reseñas de terceros y no se publican sin confirmación.
   */
  team: [] as TeamMember[],

  seo: {
    title: "Clínica Veterinaria Kennedy | Veterinaria en Chillán desde 1996",
    description:
      "Clínica veterinaria en Chillán desde 1996, para perros y gatos: consulta, vacunación, peluquería canina, cirugía, laboratorio y ecografía. 20% de descuento en vacunas al agendar peluquería. Reserva tu hora.",
    locale: "es_CL",
  },
};

/* ───────────────────────────── Textos de la página ──────────────────────────
 * Redactados a partir de las descripciones públicas encontradas (servicios) y
 * de la publicación pública de Facebook (el planteamiento del cuidado).
 * Son borrador: el cliente debe aprobarlos.
 * ────────────────────────────────────────────────────────────────────────── */

const { city } = siteConfig.location;

/** Años completos de trayectoria, calculados a la fecha de hoy. */
export function yearsOpen(now = new Date()): number {
  const { year, month } = siteConfig.founded;
  const years = now.getFullYear() - year;
  return now.getMonth() + 1 < month ? years - 1 : years;
}

export const copy = {
  hero: {
    title: "Cuidar a tu mascota es más que quererla",
    lead: `${siteConfig.name}, en ${city}. Consulta, vacunas, peluquería canina, cirugía, laboratorio y diagnóstico por imágenes para perros y gatos.`,
  },

  services: {
    title: `Servicios veterinarios en ${city}`,
    intro:
      "Desde el control de rutina hasta una cirugía. Si no ves lo que buscas, escríbenos y te orientamos.",
  },

  about: {
    title: "Un compromiso real con su bienestar",
    paragraphs: [
      `Atendemos a las mascotas de ${city} desde ${siteConfig.founded.label}: más de ${yearsOpen()} años de trayectoria.`,
      "Partimos de una idea simple: cuidar a una mascota no se resuelve solo con cariño. También es asumir un compromiso real con su bienestar y su seguridad.",
      `Atendemos en ${siteConfig.location.street}, ${city}, con un trato cercano y empático hacia cada paciente y hacia quienes lo cuidan.`,
    ],
  },

  highlights: {
    title: "Qué encontrarás en la clínica",
    items: [
      {
        title: `Desde ${siteConfig.founded.year}`,
        text: `Más de ${yearsOpen()} años cuidando a las mascotas de ${city} y acompañando a sus familias.`,
      },
      {
        title: "Diagnóstico en el mismo lugar",
        text: "Laboratorio, radiografía y ecografía disponibles en la clínica para apoyar cada diagnóstico.",
      },
      {
        title: "Cirugía y hospitalización",
        text: "Intervenciones de rutina y procedimientos más complejos, con espacio para hospitalizar cuando hace falta.",
      },
      {
        title: "Abiertos todos los días",
        text: `Atendemos de lunes a domingo, de ${siteConfig.hours.opens} a ${siteConfig.hours.closes}.`,
      },
      {
        title: "Trato cercano",
        text: "Un trato empático con tu mascota y con quienes la cuidan.",
      },
    ] satisfies Highlight[],
  },

  promo: {
    eyebrow: "Promoción",
    title: "Vacuna + peluquería canina",
    lead: "¡Protege su salud y consiéntelo al mismo tiempo! Al realizar el servicio de peluquería canina, obtén un 20% de descuento en vacunas para tu mascota.",
    discount: "20%",
    discountLabel: "de descuento en la vacuna",
    points: [
      "Promoción válida para perros de menos de 15 kg",
      "Atención profesional y mucho cariño",
      "Todo en un solo lugar",
    ],
    conditions: "Promoción válida agendando previamente.",
    closing: "¡Tu mejor amigo se lo merece!",
    flyer: {
      src: "/images/promo-vacuna-peluqueria.webp",
      alt: "Afiche de la promoción: 20% de descuento en la vacuna al contratar peluquería canina, para perros de menos de 15 kg.",
    } as ImageAsset,
  },

  news: {
    eyebrow: "Informativo",
    title: "Información útil para cuidar a tu mascota",
    intro:
      "Compartimos avisos, consejos y recordatorios de salud y tenencia responsable. Volvemos a publicar cada cierto tiempo.",
  },

  gallery: {
    title: "La clínica por dentro",
    intro: "Fotos reales de nuestro espacio y de los pacientes que nos visitan.",
  },

  instagram: {
    title: "Síguenos en Instagram",
    text: `Mira lo último que publicamos en @${siteConfig.instagram.handle}.`,
  },

  contact: {
    title: `Contacto de la veterinaria en ${city}`,
    intro: "Pide tu hora por teléfono o mensaje. También puedes pasar por la clínica.",
  },
};

/**
 * [TERCEROS] Servicios. Todos aparecen en al menos una de dos fuentes públicas
 * (elamigovet.com y AgendaPro). Marcados con (1 fuente) los que solo aparecen
 * en una; confirmar cuáles ofrece realmente la clínica. Las descripciones son
 * genéricas a propósito: no prometen equipos ni plazos que no se puedan verificar.
 */
export const services: Service[] = [
  {
    id: "consulta",
    title: "Consulta veterinaria",
    description:
      "Revisión completa de tu mascota, análisis de síntomas y plan de tratamiento.",
    icon: "stethoscope",
  },
  {
    id: "vacunacion",
    title: "Vacunación",
    description:
      "Calendario de vacunas según la edad y las necesidades de tu mascota.",
    icon: "syringe",
  },
  {
    id: "desparasitacion", // (1 fuente: AgendaPro)
    title: "Desparasitación",
    description:
      "Control de parásitos para mantener a tu mascota sana y protegida.",
    icon: "bug",
  },
  {
    id: "peluqueria",
    title: "Peluquería canina",
    description:
      "Higiene, belleza y mucho cariño para tu perro. Al agendarla, 20% de descuento en vacunas (perros de menos de 15 kg).",
    icon: "sparkles",
  },
  {
    id: "cirugia",
    title: "Cirugía",
    description:
      "Procedimientos de rutina y más complejos, con la seguridad del paciente como prioridad.",
    icon: "scissors",
  },
  {
    id: "esterilizacion",
    title: "Esterilización y castración",
    description:
      "Procedimientos que previenen enfermedades y ayudan a controlar la población de mascotas.",
    icon: "shield",
  },
  {
    id: "laboratorio",
    title: "Laboratorio clínico",
    description:
      "Exámenes y análisis de sangre para diagnosticar y hacer seguimiento de su salud.",
    icon: "flask",
  },
  {
    id: "imagenes", // ecografía: (1 fuente: elamigovet)
    title: "Radiografía y ecografía",
    description:
      "Imágenes del interior del cuerpo para detectar y seguir problemas que no se ven a simple vista.",
    icon: "scan",
  },
  {
    id: "odontologia",
    title: "Odontología",
    description:
      "Limpieza dental y cuidado de la salud bucal de tu mascota.",
    icon: "smile",
  },
  {
    id: "microchip", // (1 fuente: elamigovet)
    title: "Implantación de microchip",
    description:
      "Identificación segura para encontrarla más fácilmente si se pierde.",
    icon: "chip",
  },
  {
    id: "hospitalizacion", // (1 fuente: AgendaPro)
    title: "Hospitalización",
    description:
      "Cuidado y observación cuando tu mascota necesita quedarse en la clínica.",
    icon: "bed",
  },
  {
    id: "urgencias",
    title: "Urgencias",
    description:
      "Si tu mascota está mal, escríbenos o llámanos y te orientamos.",
    icon: "siren",
  },
];
