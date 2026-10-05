import { copy } from "@/content/site";

/**
 * "Especialidades / ventajas". Lista con divisores (no tarjetas) para que la
 * página no repita el mismo patrón de caja en cada sección.
 */
export function Highlights() {
  return (
    <section
      aria-labelledby="titulo-ventajas"
      className="section on-dark bg-ink text-paper"
    >
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 id="titulo-ventajas" className="lg:sticky lg:top-28 lg:self-start">
          {copy.highlights.title}
        </h2>

        <ul className="border-b border-paper/20">
          {copy.highlights.items.map((item) => (
            <li
              key={item.title}
              className="grid gap-2 border-t border-paper/20 py-7 md:grid-cols-[1fr_1.3fr] md:gap-8"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-paper/85">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
