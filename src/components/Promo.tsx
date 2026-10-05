import { Check, Scissors, Syringe } from "lucide-react";
import { copy } from "@/content/site";
import { bookingAction, telHref } from "@/lib/contact";
import { ActionIcon } from "./ActionIcon";
import { ButtonLink } from "./Button";

const { promo } = copy;

export function Promo() {
  const booking = bookingAction();

  return (
    <section
      id="promocion"
      aria-labelledby="titulo-promo"
      className="section screen on-dark relative overflow-hidden bg-brand text-white"
    >
      {/* Adornos: círculos suaves, sin significado */}
      <span aria-hidden className="absolute -top-24 -right-24 size-80 rounded-full bg-brand-deep" />
      <span aria-hidden className="absolute -bottom-32 -left-20 size-72 rounded-full bg-sun/15" />

      <div className="wrap relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-1.5 text-sm font-bold tracking-wide text-ink uppercase">
            {promo.eyebrow}
          </p>
          <h2 id="titulo-promo" className="mt-5">
            {promo.title}
          </h2>
          <p className="mt-5 max-w-[34rem] text-lg text-white/90">{promo.lead}</p>

          <ul className="mt-7 grid gap-3">
            {promo.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sun text-ink">
                  <Check size={15} strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={booking.href} external={booking.external} variant="sun">
              <ActionIcon kind={booking.kind} />
              Agendar mi hora
            </ButtonLink>
            <ButtonLink href={telHref} variant="outlineLight">
              Llamar
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-white/80">{promo.conditions}</p>
        </div>

        {/* Visual: el descuento al centro y los dos servicios que se combinan */}
        <div className="relative mx-auto grid w-full max-w-md gap-4">
          <div className="rounded-photo bg-white p-6 text-ink shadow-lift">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-mist text-brand">
                <Syringe size={28} aria-hidden />
              </span>
              <div>
                <h3>Vacunación</h3>
                <p className="text-[0.95rem] text-muted">Previene enfermedades y protege su vida.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto -my-7 grid size-36 rotate-[-6deg] place-items-center rounded-full bg-sun text-center text-ink shadow-lift ring-8 ring-brand">
            <div className="leading-none">
              <span className="font-display text-5xl font-extrabold">{promo.discount}</span>
              <span className="mt-1 block px-5 text-[0.7rem] font-bold uppercase leading-tight">
                {promo.discountLabel}
              </span>
            </div>
          </div>

          <div className="rounded-photo bg-white p-6 text-ink shadow-lift">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-mist text-hot">
                <Scissors size={28} aria-hidden />
              </span>
              <div>
                <h3>Peluquería canina</h3>
                <p className="text-[0.95rem] text-muted">Higiene, belleza y mucho amor para tu mascota.</p>
              </div>
            </div>
          </div>

          <p className="mt-2 text-center font-display text-xl font-semibold text-sun">
            {promo.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
