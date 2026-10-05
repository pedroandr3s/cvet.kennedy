import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineLight" | "dark" | "sun";

const variants: Record<Variant, string> = {
  primary: "bg-hot text-white hover:bg-hot-hover",
  sun: "bg-sun text-ink hover:bg-sun-hover",
  dark: "bg-ink text-paper hover:bg-brand",
  outline: "border-2 border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  outlineLight:
    "border-2 border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
};

/**
 * Enlace con aspecto de botón. Alto mínimo de 48 px (objetivo táctil cómodo)
 * y una respuesta física al pulsar (se hunde un poco).
 */
export function ButtonLink({
  href,
  variant = "primary",
  external,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-base font-semibold transition duration-200 active:scale-[0.97] ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
