import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DELGRAÇA – Comércio Geral e Prestação de Serviços, Lda",
    short_name: "DELGRAÇA",
    description:
      "Empresa angolana especializada em soluções técnicas integradas.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0047CA",
    lang: "pt-AO",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
