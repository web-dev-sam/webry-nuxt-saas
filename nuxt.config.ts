import { app } from "./config/app.config"
import { fonts } from "./config/fonts.config"
import { security } from "./config/security.config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  site: {
    url: "https://saas.webry.com/",
    name: "Nuxt SaaS Template",
    description: "A Nuxt.js template for building SaaS applications.",
    themeColor: "#21C45D",
    lang: "en",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/icon",
    "nuxt-security",
    "nuxt-auth-utils",
  ],
  runtimeConfig: {
    sessionPassword: "",
    authOrigin: "",

    oauthGoogleClientId: "",
    oauthGoogleClientPassword: "",
    oauthGithubClientId: "",
    oauthGithubClientPassword: "",
    oauthGithubConnectClientId: "",
    oauthGithubConnectClientPassword: "",

    postgresUrl: "",
  },
  experimental: {
    defaults: {
      nuxtLink: {
        externalRelAttribute: "noopener noreferrer",
        prefetch: true,
        prefetchOn: {
          interaction: true,
        },
        activeClass: "font-700",
      },
    },
  },
  typescript: {
    typeCheck: "build",
    tsConfig: {
      exclude: ["../service-worker"],
      include: ["./node_modules/@antfu/eslint-config/dist/index.d.ts"],
      vueCompilerOptions: {
        target: 3.5,
      },
    },
  },
  vue: {
    propsDestructure: true,
  },
  seo: {
    automaticDefaults: true,
    automaticOgAndTwitterTags: true,
    redirectToCanonicalSiteUrl: true,
  },
  nitro: {
    preset: "node-server",
  },
  robots: {
    blockNonSeoBots: true,
    sitemap: "/sitemap.xml",
    credits: false,
  },
  app,
  fonts,
  security,
})
