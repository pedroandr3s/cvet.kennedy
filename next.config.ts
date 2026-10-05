import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Next.js sirve WebP/AVIF automáticamente según el navegador.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
