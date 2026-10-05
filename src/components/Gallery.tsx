import Image from "next/image";
import { copy, siteConfig } from "@/content/site";
import { hasGallery } from "@/lib/visibility";

// Proporciones alternadas para un mosaico con ritmo natural
const ratios = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
];

export function Gallery() {
  if (!hasGallery) return null;

  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="section bg-mist">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="titulo-galeria">{copy.gallery.title}</h2>
          <p className="mt-4 text-lg text-muted">{copy.gallery.intro}</p>
        </div>

        <ul className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4">
          {siteConfig.images.gallery.map((img, i) => (
            <li key={img.src} className="mb-3 break-inside-avoid md:mb-4">
              <div
                className={`relative overflow-hidden rounded-card bg-paper ${ratios[i % ratios.length]}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                  style={img.focus ? { objectPosition: img.focus } : undefined}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
