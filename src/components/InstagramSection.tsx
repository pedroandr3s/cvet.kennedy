import Image from "next/image";
import { copy, siteConfig } from "@/content/site";
import { hasInstagramPosts } from "@/lib/visibility";
import { ButtonLink } from "./Button";
import { InstagramIcon } from "./Icons";

/**
 * Invitación a seguir el Instagram. No se hace scraping ni se incrusta el feed
 * (Instagram bloquea el acceso automatizado): las publicaciones destacadas se
 * cargan a mano en images.instagram, cada una con el enlace a su post.
 */
export function InstagramSection() {
  const { handle, url } = siteConfig.instagram;
  const posts = siteConfig.images.instagram.slice(0, 6);

  return (
    <section id="instagram" aria-labelledby="titulo-instagram" className="section">
      <div className="wrap">
        <div className="on-dark grid items-center gap-10 rounded-photo bg-brand p-7 text-paper lg:grid-cols-[1fr_auto] lg:gap-14 md:p-14">
          <div>
            <h2 id="titulo-instagram">{copy.instagram.title}</h2>
            <p className="mt-4 text-lg">{copy.instagram.text}</p>
            <ButtonLink href={url} external className="mt-8">
              <InstagramIcon />
              Ver perfil en Instagram
            </ButtonLink>
          </div>

          {hasInstagramPosts ? (
            <ul className="grid grid-cols-3 gap-2 md:gap-3">
              {posts.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-square overflow-hidden rounded-xl bg-ink/20"
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 768px) 15vw, 28vw"
                      className="object-cover transition duration-300 hover:scale-105"
                    />
                    <span className="sr-only">(abre la publicación en Instagram)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="font-display text-[clamp(1.75rem,7.5vw,3rem)] font-extrabold leading-none tracking-tight whitespace-nowrap lg:text-right"
              aria-hidden
            >
              @{handle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
