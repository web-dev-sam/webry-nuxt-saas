import type { DefineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export const security = {
  nonce: true,
  csrf: true,
  hidePoweredBy: true,
  rateLimiter: process.env.NODE_ENV === "production" ? {} : false,
  headers: {
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      "img-src": ["'self'", "data:", "lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
    permissionsPolicy: {
      fullscreen: "*",
    },
  },
} satisfies Parameters<DefineNuxtConfig>[0]["security"]
