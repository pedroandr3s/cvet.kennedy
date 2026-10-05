import { Heart } from "lucide-react";
import { cases } from "@/content/cases";
import { casePhoto } from "@/lib/casePhoto";
import { PhotoSlot } from "./PhotoSlot";

export function Casos() {
  return (
    <section id="casos" aria-labelledby="titulo-casos" className="section screen bg-mist">
      <div className="wrap">
        <div className="grid gap-3 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
          <div>
            <p className="text-sm font-bold tracking-wide text-hot uppercase">Casos</p>
            <h2 id="titulo-casos" className="mt-1.5 lg:text-[clamp(1.6rem,2.4vw,2.25rem)]">
              Historias de nuestros pacientes
            </h2>
          </div>
          <p className="max-w-xl text-base text-muted lg:justify-self-end">
            Cada recuperación es un trabajo en equipo con quienes los cuidan en casa. Estos son
            algunos de nuestros pacientes.
          </p>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-2 md:gap-5">
          {cases.map((c) => (
            <li
              key={c.slug}
              className="flex flex-col overflow-hidden rounded-photo bg-paper shadow-lift"
            >
              <div className="relative">
                <PhotoSlot
                  image={casePhoto(c)}
                  slot={`cases/${c.photo}`}
                  className="aspect-[6/5] w-full lg:aspect-auto lg:h-[30vh]"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
                <span className="absolute top-4 left-4 rounded-full bg-sun px-3.5 py-1.5 text-sm font-bold text-ink shadow-lift">
                  {c.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 p-5 md:p-6">
                <h3 className="font-display text-xl font-bold tracking-tight">{c.name}</h3>
                <div className="space-y-2 text-[0.95rem] leading-snug">
                  {c.story.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <p className="mt-auto flex gap-3 rounded-card bg-hot/10 p-3.5 text-[0.9rem] leading-snug">
                  <Heart size={22} className="mt-0.5 shrink-0 text-hot" aria-hidden />
                  <span>{c.kudos}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
