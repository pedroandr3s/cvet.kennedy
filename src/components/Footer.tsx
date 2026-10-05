import { siteConfig } from "@/content/site";
import { addressLine, telHref, whatsappAction } from "@/lib/contact";
import { Brand } from "./Brand";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./Icons";

const social =
  "inline-flex size-12 items-center justify-center rounded-full border border-paper/30 transition hover:border-paper hover:bg-paper hover:text-ink active:scale-95";

export function Footer() {
  const wa = whatsappAction();
  const { phone, instagram, facebookUrl, email } = siteConfig;

  return (
    <footer className="on-dark bg-ink text-paper">
      {/* En móvil se deja espacio para que la barra fija inferior no tape el final */}
      <div className="wrap pt-14 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
          <div>
            <Brand tone="light" />
            <p className="mt-4 max-w-xs text-paper/80">
              Veterinaria en {siteConfig.location.city}, {siteConfig.location.region}, desde {siteConfig.founded.year}.
            </p>
          </div>

          <address className="not-italic text-paper/90">
            <p className="py-2">{addressLine}</p>
            <p>
              <a href={telHref} className="inline-block py-2 underline underline-offset-4 hover:text-sun">
                {phone.display}
              </a>
            </p>
            {email && (
              <p>
                <a href={`mailto:${email}`} className="inline-block py-2 underline underline-offset-4 hover:text-sun">
                  {email}
                </a>
              </p>
            )}
            <p className="py-2">{siteConfig.hours.summary}</p>
          </address>

          <ul className="flex gap-3" aria-label="Redes y contacto">
            <li>
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={social}
                aria-label={`Instagram @${instagram.handle}`}
              >
                <InstagramIcon size={22} />
              </a>
            </li>
            {facebookUrl && (
              <li>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={social}
                  aria-label="Facebook"
                >
                  <FacebookIcon size={22} />
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a
                  href={wa.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={social}
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={22} />
                </a>
              </li>
            )}
          </ul>
        </div>

        <p className="mt-12 border-t border-paper/20 pt-6 text-sm text-paper/70">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
