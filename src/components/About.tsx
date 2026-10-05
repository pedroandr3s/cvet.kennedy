import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { copy, siteConfig } from "@/content/site";
import { addressLine, mapsDirectionsHref } from "@/lib/contact";
import { hasTeam } from "@/lib/visibility";
import { PhotoSlot } from "./PhotoSlot";

export function About() {
  return (
    <section id="nosotros" aria-labelledby="titulo-nosotros" className="section screen">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-2 md:items-center lg:gap-20">
          <PhotoSlot
            image={siteConfig.images.about}
            slot="about"
            className="aspect-[8/7] rounded-photo lg:aspect-auto lg:h-[min(64vh,34rem)]"
            sizes="(min-width: 768px) 45vw, 100vw"
          />

          <div>
            <h2 id="titulo-nosotros">{copy.about.title}</h2>
            <div className="mt-6 max-w-[34rem] space-y-4 text-lg">
              {copy.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <dl className="mt-8 grid gap-4 text-[0.98rem]">
              <div className="flex items-start gap-3">
                <dt className="sr-only">Dirección</dt>
                <MapPin size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <dd>
                  {addressLine}
                  <a
                    href={mapsDirectionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 w-fit items-center font-semibold text-brand underline underline-offset-4 hover:text-ink"
                  >
                    Ver en el mapa
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="sr-only">Horario</dt>
                <Clock size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <dd>{siteConfig.hours.summary}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Equipo: solo se muestra con personas confirmadas por el cliente */}
        {hasTeam ? (
          <div className="mt-16">
            <h3 className="text-2xl">Quiénes te atienden</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.team.map((m) => (
                <li key={m.name}>
                  {m.photo ? (
                    <div className="relative aspect-square overflow-hidden rounded-photo bg-mist">
                      <Image
                        src={m.photo.src}
                        alt={m.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 50vw"
                        className="object-cover"
                        style={m.photo.focus ? { objectPosition: m.photo.focus } : undefined}
                      />
                    </div>
                  ) : null}
                  <p className="mt-3 font-semibold">{m.name}</p>
                  <p className="text-[0.95rem] text-muted">{m.role}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
