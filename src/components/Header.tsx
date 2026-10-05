"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { bookingAction } from "@/lib/contact";
import { galleryVisible } from "@/lib/visibility";
import { ActionIcon } from "./ActionIcon";
import { Brand } from "./Brand";
import { ButtonLink } from "./Button";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#promocion", label: "Promoción" },
  { href: "#informativo", label: "Informativo" },
  { href: "#casos", label: "Casos" },
  { href: "#nosotros", label: "Nosotros" },
  ...(galleryVisible ? [{ href: "#galeria", label: "Galería" }] : []),
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const booking = bookingAction();

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape cierra el menú y se bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  // Si se agranda la ventana con el menú abierto, se cierra solo.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <a href="#inicio" aria-label="Clínica Veterinaria Kennedy, ir al inicio" className="shrink-0">
          <Brand />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-[0.95rem] lg:gap-7 font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ButtonLink
              href={booking.href}
              external={booking.external}
              className="min-h-11! px-5!"
            >
              <ActionIcon kind={booking.kind} size={18} />
              {booking.label}
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full text-ink transition active:scale-95 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
          </button>
        </div>
      </div>
    </header>

    {/*
      Menú móvil: ocupa el alto restante de la pantalla. Va FUERA del <header>
      porque backdrop-filter crearía un contexto que rompe position: fixed.
    */}
      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Menú móvil" className="wrap py-6">
          <ul className="divide-y divide-ink/10">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center font-display text-3xl font-semibold tracking-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={booking.href}
            external={booking.external}
            className="mt-8 w-full"
            onClick={() => setOpen(false)}
          >
            <ActionIcon kind={booking.kind} />
            {booking.label}
          </ButtonLink>
        </nav>
      </div>
    </>
  );
}
