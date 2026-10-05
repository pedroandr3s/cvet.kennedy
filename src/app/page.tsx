import { About } from "@/components/About";
import { Casos } from "@/components/Casos";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Informativo } from "@/components/Informativo";
import { InstagramSection } from "@/components/InstagramSection";
import { Promo } from "@/components/Promo";
import { Services } from "@/components/Services";
import { StickyCta } from "@/components/StickyCta";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <Promo />
        <Services />
        <Informativo />
        <Casos />
        <About />
        <Highlights />
        <Gallery />
        <InstagramSection />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
