import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FST Advisory",
    short_name: "FST",
    description: "Multidisciplinary advisory support for executable outcomes.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf7",
    theme_color: "#102635",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
