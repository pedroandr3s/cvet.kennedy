import { bookingAction, secondaryAction } from "@/lib/contact";
import { ActionIcon } from "./ActionIcon";
import { ButtonLink } from "./Button";

/** Barra fija inferior solo en móvil: reservar y llamar siempre a un pulgar de distancia. */
export function StickyCta() {
  const booking = bookingAction();
  const secondary = secondaryAction();

  return (
    <div className="on-dark fixed inset-x-0 bottom-0 z-30 border-t border-paper/10 bg-ink/95 backdrop-blur lg:hidden">
      <div className="wrap grid grid-cols-2 gap-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <ButtonLink href={booking.href} external={booking.external} className="px-3!">
          <ActionIcon kind={booking.kind} />
          {booking.label}
        </ButtonLink>
        <ButtonLink href={secondary.href} external={secondary.external} variant="outlineLight" className="px-3!">
          <ActionIcon kind={secondary.kind} />
          {secondary.label}
        </ButtonLink>
      </div>
    </div>
  );
}
