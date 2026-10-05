import { showPending } from "@/lib/visibility";

/** Recuadro de "falta contenido real". Solo existe en desarrollo. */
export function Pending({ children }: { children: React.ReactNode }) {
  if (!showPending) return null;
  return (
    <div className="rounded-card border-2 border-dashed border-ink/25 bg-paper/60 p-6 text-center text-sm text-muted">
      <strong className="text-ink">Pendiente.</strong> {children}
      <span className="mt-1 block text-xs">
        Este recuadro solo se ve en desarrollo; en producción la sección se oculta.
      </span>
    </div>
  );
}
