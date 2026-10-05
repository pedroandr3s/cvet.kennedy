import { copy, services } from "@/content/site";
import { bookingAction } from "@/lib/contact";
import { ActionIcon } from "./ActionIcon";
import { ButtonLink } from "./Button";
import { ServiceIcon } from "./ServiceIcon";

export function Services() {
  const booking = bookingAction();

  return (
    <section id="servicios" aria-labelledby="titulo-servicios" className="section bg-mist">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="titulo-servicios">{copy.services.title}</h2>
          <p className="mt-4 text-lg text-muted">{copy.services.intro}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.id}
              className="flex gap-4 rounded-card bg-paper p-5 lg:flex-col lg:gap-5 lg:p-7"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mist text-brand">
                <ServiceIcon name={s.icon} />
              </span>
              <div>
                <h3>{s.title}</h3>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">
                  {s.description}
                </p>
              </div>
            </li>
          ))}

          <li className="on-dark flex flex-col justify-between gap-6 rounded-card bg-ink p-6 text-paper lg:p-7">
            <div>
              <h3 className="text-2xl">¿No ves lo que buscas?</h3>
              <p className="mt-2 text-paper/80">
                Cuéntanos qué necesita tu mascota y te orientamos.
              </p>
            </div>
            <ButtonLink href={booking.href} external={booking.external} className="self-start">
              <ActionIcon kind={booking.kind} />
              Consultar
            </ButtonLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
