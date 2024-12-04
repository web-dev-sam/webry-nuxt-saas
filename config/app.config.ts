import type { DefineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export const app = {
  keepalive: true,
  head: {
    htmlAttrs: { lang: "en", class: "dark" },
    viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
    link: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/android-chrome-512x512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },

      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },

      { name: "language", content: "English" },

      { name: "theme-color", content: "#0e0e0e" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    bodyAttrs: { class: "overflow-x-hidden" },
  },
} satisfies Parameters<DefineNuxtConfig>[0]["app"]
