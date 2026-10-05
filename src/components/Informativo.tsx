import {
  ClipboardCheck,
  Cpu,
  Droplets,
  Heart,
  PawPrint,
  Sun,
  Trees,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { copy } from "@/content/site";
import { news, type NewsIcon, type NewsSection, type NewsTone } from "@/content/news";

const icons: Record<NewsIcon, LucideIcon> = {
  chip: Cpu,
  registry: ClipboardCheck,
  sun: Sun,
  shade: Trees,
  water: Droplets,
  alert: TriangleAlert,
  heart: Heart,
  paw: PawPrint,
};

const tones: Record<NewsTone, { panel: string; chip: string }> = {
  blue: { panel: "bg-brand text-white", chip: "bg-white/15 text-white" },
  amber: { panel: "bg-sun text-ink", chip: "bg-ink/10 text-ink" },
  red: { panel: "bg-hot text-white", chip: "bg-white/15 text-white" },
};

function Icon({ name, size = 24 }: { name: NewsIcon; size?: number }) {
  const C = icons[name];
  return <C size={size} strokeWidth={1.8} aria-hidden />;
}

function Section({ s }: { s: NewsSection }) {
  switch (s.kind) {
    case "cards":
      return (
        <div className="grid gap-3">
          {s.items.map((c) => (
            <div key={c.title} className="flex gap-4 rounded-card bg-mist p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand">
                <Icon name={c.icon} />
              </span>
              <div>
                <h4 className="font-display text-base font-semibold">{c.title}</h4>
                <p className="mt-1 text-[0.92rem] leading-snug text-muted">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "checklist":
      return (
        <div>
          <h4 className="text-sm font-bold tracking-wide text-muted uppercase">{s.title}</h4>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {s.items.map((i) => (
              <li
                key={i.text}
                className="flex items-center gap-4 rounded-card bg-mist p-4 sm:flex-col sm:items-start sm:gap-2.5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand">
                  <Icon name={i.icon} />
                </span>
                <span className="text-[0.95rem] leading-snug font-medium">{i.text}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout": {
      const alert = s.tone === "alert";
      return (
        <div
          role="note"
          className={`flex gap-4 rounded-card border-l-8 p-4 ${
            alert ? "border-hot bg-hot/10" : "border-brand bg-brand/10"
          }`}
        >
          <span className={`mt-0.5 shrink-0 ${alert ? "text-hot" : "text-brand"}`}>
            <Icon name="alert" size={28} />
          </span>
          <div>
            <h4 className="font-display text-lg font-bold">{s.title}</h4>
            <p className="mt-1">{s.text}</p>
          </div>
        </div>
      );
    }
    case "qa":
      return (
        <div className="on-dark rounded-card bg-ink p-4 text-paper">
          <h4 className="font-display text-lg font-semibold text-sun">{s.question}</h4>
          <p className="mt-1.5 text-[0.95rem] text-paper/90">{s.answer}</p>
        </div>
      );
  }
}

export function Informativo() {
  return (
    <section id="informativo" aria-labelledby="titulo-informativo" className="section screen">
      <div className="wrap">
        <div className="grid gap-3 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
          <div>
            <p className="text-sm font-bold tracking-wide text-hot uppercase">{copy.news.eyebrow}</p>
            <h2 id="titulo-informativo" className="mt-1.5 lg:text-[clamp(1.6rem,2.4vw,2.25rem)]">
              {copy.news.title}
            </h2>
          </div>
          <p className="max-w-xl text-base text-muted lg:justify-self-end">{copy.news.intro}</p>
        </div>

        <div
          className={`mt-6 grid gap-5 lg:gap-5 ${news.length > 1 ? "lg:grid-cols-2" : ""}`}
        >
          {news.map((n) => {
            const t = tones[n.tone];
            return (
              <article
                key={n.slug}
                aria-labelledby={`n-${n.slug}`}
                className="flex flex-col overflow-hidden rounded-photo border border-ink/10 bg-paper shadow-lift"
              >
                {/* Banner compacto: ícono, categoría y título en una sola franja */}
                <header className={`relative overflow-hidden px-6 py-4 md:px-7 ${t.panel}`}>
                  <span
                    aria-hidden
                    className="absolute -top-10 -right-2 hidden opacity-15 md:block"
                  >
                    <Icon name={n.icon} size={200} />
                  </span>
                  <div className="relative flex items-center gap-4 md:gap-6">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink">
                      <Icon name={n.icon} size={26} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${t.chip}`}>
                          {n.category}
                        </span>
                        {n.date && <span className="text-sm opacity-80">{n.date}</span>}
                      </div>
                      <h3
                        id={`n-${n.slug}`}
                        className="mt-1.5 font-display text-2xl leading-tight font-bold tracking-tight"
                      >
                        {n.title}
                      </h3>
                    </div>
                  </div>
                </header>

                <div className="grid flex-1 content-start gap-4 p-5 md:p-6">
                  <p className="leading-relaxed font-medium">{n.intro}</p>
                  {n.sections.map((s, i) => (
                    <Section key={i} s={s} />
                  ))}
                </div>
                {n.source && (
                  <p className="border-t border-ink/10 px-6 py-3 text-sm text-muted md:px-8">
                    {n.source}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
