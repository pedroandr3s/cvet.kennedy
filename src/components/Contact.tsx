import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { copy, siteConfig } from "@/content/site";
import {
  addressLine,
  bookingAction,
  mapsDirectionsHref,
  mapsEmbedSrc,
  telHref,
  whatsappAction,
} from "@/lib/contact";
import { ActionIcon } from "./ActionIcon";
import { ButtonLink } from "./Button";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

const linkBase =
  "min-h-11 items-center font-semibold underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink";
const link = `-my-2 inline-flex ${linkBase}`;

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-brand">
        {icon}
      </span>
      <div>
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-0.5 text-lg leading-snug">{children}</dd>
      </div>
    </div>
  );
}

export function Contact() {
  const booking = bookingAction();
  const wa = whatsappAction();
  const { phone, hours, email, instagram } = siteConfig;

  return (
    <section id="contacto" aria-labelledby="titulo-contacto" className="section screen bg-mist">
      <div className="wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <h2 id="titulo-contacto">{copy.contact.title}</h2>
          <p className="mt-4 max-w-[34rem] text-lg text-muted">{copy.contact.intro}</p>

          <dl className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <Row icon={<MapPin size={22} aria-hidden />} label="Dirección">
              {addressLine}
              <a
                href={mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-fit ${linkBase} -mb-2 text-base text-brand`}
              >
                Cómo llegar
              </a>
            </Row>

            <Row icon={<Phone size={22} aria-hidden />} label="Teléfono">
              <a href={telHref} className={link}>
                {phone.display}
              </a>
            </Row>

            {wa && (
              <Row icon={<WhatsAppIcon size={22} />} label="WhatsApp">
                <a href={wa.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {siteConfig.whatsapp?.display}
                </a>
              </Row>
            )}

            <Row icon={<Clock size={22} aria-hidden />} label="Horario">
              {hours.summary}
            </Row>

            {email && (
              <Row icon={<Mail size={22} aria-hidden />} label="Correo">
                <a href={`mailto:${email}`} className={link}>
                  {email}
                </a>
              </Row>
            )}

            <Row icon={<InstagramIcon size={22} />} label="Instagram">
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={link}>
                @{instagram.handle}
              </a>
            </Row>
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={booking.href} external={booking.external}>
              <ActionIcon kind={booking.kind} />
              {booking.label}
            </ButtonLink>
            <ButtonLink href={telHref} variant="outline">
              <Phone size={20} aria-hidden />
              Llamar
            </ButtonLink>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-photo bg-paper shadow-lift lg:min-h-[30rem]">
          <iframe
            title={`Mapa de ${siteConfig.name}, ${addressLine}`}
            src={mapsEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none block aspect-[4/3] size-full min-h-80 border-0 md:pointer-events-auto lg:aspect-auto lg:h-full"
            allowFullScreen
          />
          {/*
            En móvil el mapa embebido captura el gesto de scroll y deja a la persona
            "atrapada". Por eso aquí un toque abre la app de mapas con la ruta.
            (El enlace "Cómo llegar" de arriba ya cubre a quien navega con teclado.)
          */}
          <a
            href={mapsDirectionsHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 md:hidden"
          />
        </div>
      </div>
    </section>
  );
}
