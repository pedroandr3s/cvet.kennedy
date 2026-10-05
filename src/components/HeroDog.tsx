"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/site";

/**
 * Video del hero con el fondo verde eliminado (chroma key) en tiempo real.
 * El <video> va oculto; cada fotograma se pinta en un <canvas> transparente
 * quitándole el verde, así el fondo de la página se ve a través del perro.
 *
 * Carga pensada para visitas nuevas:
 *  1. Al instante se muestra un PÓSTER (primer fotograma ya sin fondo, WebP de
 *     ~20 KB). Es lo que cuenta como imagen principal de la página.
 *  2. El video (~480 KB, recortado, sin audio y con faststart) se pide recién
 *     cuando la página terminó de cargar y el navegador está libre.
 *  3. Con ahorro de datos, conexión 2G o "reducir movimiento" el video no se
 *     descarga: se queda el póster.
 *
 * Si el navegador no puede reproducir el video, se muestra el afiche.
 */

const SRC = "/hero-web.mp4";
const POSTER = "/hero-poster.webp";
// Dimensiones del video ya recortado a todo el recorrido del perro
const W = 900;
const H = 684;

// "Verdor" = g - max(r, b). Fondo ≈ 140, sombra del piso ≈ 80, pelaje ≤ 0.
const SOLID_BELOW = 6; // por debajo: píxel del perro, opaco
const CLEAR_ABOVE = 40; // por encima: fondo, transparente

function keyFrame(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const m = r > b ? r : b;
    const green = g - m;
    if (green <= 0) continue;
    if (green <= SOLID_BELOW) {
      data[i + 1] = m; // píxel del perro con un leve reflejo verde: se neutraliza
      continue;
    }
    if (green >= CLEAR_ABOVE) {
      data[i + 3] = 0;
      continue;
    }
    // Borde: transparencia progresiva y se retira el reflejo verde del fondo
    data[i + 3] = (255 * (CLEAR_ABOVE - green)) / (CLEAR_ABOVE - SOLID_BELOW);
    data[i + 1] = m;
  }
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function shouldSkipVideo() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const c = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return Boolean(c?.saveData) || c?.effectiveType === "slow-2g" || c?.effectiveType === "2g";
}

export function HeroDog() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || shouldSkipVideo()) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    let started = false;
    let idle = 0;
    let cancelIdle = () => {};
    let io: IntersectionObserver | undefined;

    const draw = () => {
      ctx.drawImage(video, 0, 0, W, H);
      const frame = ctx.getImageData(0, 0, W, H);
      keyFrame(frame.data);
      ctx.putImageData(frame, 0, 0);
      if (!started) {
        started = true;
        setLive(true);
      }
    };

    const schedule = () => {
      if (stopped) return;
      if ("requestVideoFrameCallback" in video) {
        video.requestVideoFrameCallback(() => {
          draw();
          schedule();
        });
      } else {
        raf = requestAnimationFrame(() => {
          draw();
          schedule();
        });
      }
    };

    const onReady = () => {
      video.play().catch(() => {});
      schedule();
      // No gastar CPU cuando el hero no está a la vista
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
      io.observe(canvas);
    };
    const onError = () => setFailed(true);

    const load = () => {
      if (stopped) return;
      video.addEventListener("loadeddata", onReady, { once: true });
      video.addEventListener("error", onError);
      video.src = SRC;
      video.load();
    };

    // El video se pide cuando la página ya cargó y el navegador está libre
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(load, { timeout: 2500 });
        cancelIdle = () => window.cancelIdleCallback(idle);
      } else {
        idle = window.setTimeout(load, 800);
        cancelIdle = () => window.clearTimeout(idle);
      }
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", whenIdle);
      cancelIdle();
      io?.disconnect();
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
    };
  }, []);

  if (failed) {
    return (
      <Image
        src={copy.promo.flyer.src}
        alt={copy.promo.flyer.alt}
        width={552}
        height={822}
        sizes="(min-width: 768px) 26rem, 20rem"
        className="mx-auto h-auto w-full max-w-[20rem] rotate-2 rounded-photo border-4 border-white shadow-lift"
        priority
      />
    );
  }

  return (
    <div className="relative z-10 aspect-[900/684] w-full">
      {/* Póster: primer fotograma sin fondo; se ve de inmediato, antes del video */}
      <Image
        src={POSTER}
        alt="Perro animado, contento, esperando su atención veterinaria"
        width={W}
        height={H}
        unoptimized
        priority
        sizes="(min-width: 768px) 46rem, 100vw"
        className={`absolute inset-0 size-full transition-opacity duration-300 ${
          live ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        className="pointer-events-none absolute size-px opacity-0"
      />
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        aria-hidden
        className={`absolute inset-0 size-full transition-opacity duration-300 ${
          live ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
