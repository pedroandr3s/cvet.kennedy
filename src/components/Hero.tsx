import { Award, Clock } from "lucide-react";
import type { CSSProperties } from "react";
import { copy, siteConfig } from "@/content/site";
import { bookingAction, secondaryAction } from "@/lib/contact";
import { ActionIcon } from "./ActionIcon";
import { ButtonLink } from "./Button";
import { HeroDog } from "./HeroDog";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const booking = bookingAction();
  const secondary = secondaryAction();

  return (
    <section id="inicio" aria-labelledby="titulo-hero">
      <div className="wrap grid gap-12 pt-10 pb-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-14 md:pt-16 md:pb-24 lg:pt-20">
        <div>
          <h1 id="titulo-hero" className="rise" style={delay(40)}>
            {copy.hero.title}
          </h1>

          <p
            className="rise mt-6 max-w-[34rem] text-base text-muted md:text-lg"
            style={delay(160)}
          >
            {copy.hero.lead}
          </p>

          <div
            className="rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={delay(280)}
          >
            <ButtonLink
              href={booking.href}
              external={booking.external}
              className="min-h-12! px-7! text-base"
            >
              <ActionIcon kind={booking.kind} />
              {booking.label}
            </ButtonLink>
            <ButtonLink
              href={secondary.href}
              external={secondary.external}
              variant="outline"
              className="min-h-12! px-7! text-base"
            >
              <ActionIcon kind={secondary.kind} />
              {secondary.label}
            </ButtonLink>
          </div>

          <p
            className="rise mt-7 flex items-center gap-2 text-[0.95rem] text-muted"
            style={delay(380)}
          >
            <Clock size={18} className="shrink-0 text-brand" aria-hidden />
            {siteConfig.hours.summary}
          </p>

          <p
            className="rise mt-5 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[0.95rem] font-semibold text-brand"
            style={delay(440)}
          >
            <Award size={18} className="shrink-0" aria-hidden />
            Cuidando mascotas en {siteConfig.location.city} desde {siteConfig.founded.year}
          </p>
        </div>

        {/*
          Perro animado (video con chroma key). En escritorio la capa es más ancha
          que su columna y se extiende hacia la izquierda por encima del texto, que
          no se mueve; pointer-events-none deja pasar los clics a los botones.
        */}
        <div className="relative">
          <div
            className="rise md:pointer-events-none md:absolute md:inset-y-0 md:right-0 md:z-20 md:flex md:items-center"
            style={delay(200)}
          >
            <div className="relative mx-auto w-full max-w-[30rem] md:mx-0 md:w-[min(44rem,52vw)] md:max-w-none">
              {/* Disco solar y sombra, bajo el punto donde el perro se queda parado */}
              <span
                aria-hidden
                className="absolute bottom-[5%] left-[54%] aspect-square w-[44%] -translate-x-1/2 rounded-full bg-sun"
              />
              <span
                aria-hidden
                className="absolute bottom-[3%] left-[54%] h-5 w-[28%] -translate-x-1/2 rounded-full bg-ink/30 blur-md"
              />
              <HeroDog />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
