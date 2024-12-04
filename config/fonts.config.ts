import type { DefineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export const fonts = {
  families: [
    {
      name: "Cal Sans",
      provider: "none",
      src: [
        "/fonts/CalSans/CalSansSemiBold.ttf",
        "/fonts/CalSans/CalSansSemiBold.woff",
        "/fonts/CalSans/CalSansSemiBold.woff2",
      ],
    },

    // If you're the author of this package, please make the documentation more clear with more examples or fix the library.
    {
      name: "Mona Sans 200",
      provider: "none",
      weight: "200",
      src: ["/fonts/MonaSans/mona-sans-200.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 300",
      provider: "none",
      weight: "300",
      src: ["/fonts/MonaSans/mona-sans-300.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 400",
      provider: "none",
      weight: "400",
      src: ["/fonts/MonaSans/mona-sans-400.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 500",
      provider: "none",
      weight: "500",
      src: ["/fonts/MonaSans/mona-sans-500.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 600",
      provider: "none",
      weight: "600",
      src: ["/fonts/MonaSans/mona-sans-600.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 700",
      provider: "none",
      weight: "700",
      src: ["/fonts/MonaSans/mona-sans-700.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 800",
      provider: "none",
      weight: "800",
      src: ["/fonts/MonaSans/mona-sans-800.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 900",
      provider: "none",
      weight: "900",
      src: ["/fonts/MonaSans/mona-sans-900.ttf"],
      style: "normal",
    },
    {
      name: "Mona Sans 200 Italic",
      provider: "none",
      weight: "200",
      src: ["/fonts/MonaSans/mona-sans-200-italic.ttf"],
      style: "italic",
    },
    {
      name: "Mona Sans 300 Italic",
      provider: "none",
      weight: "300",
      src: ["/fonts/MonaSans/mona-sans-300-italic.ttf"],
      style: "italic",
    },
    {
      name: "Mona Sans 400 Italic",
      provider: "none",
      weight: "400",
      src: ["/fonts/MonaSans/mona-sans-400-italic.ttf"],
      style: "italic",
    },
    {
      name: "Mona Sans 500 Italic",
      provider: "none",
      weight: "500",
      src: ["/fonts/MonaSans/mona-sans-500-italic.ttf"],
      style: "italic",
    },
    {
      name: "Mona Sans 600 Italic",
      provider: "none",
      weight: "600",
      src: ["/fonts/MonaSans/mona-sans-600-italic.ttf"],
      style: "italic",
    },
    {
      name: "Mona Sans 700 Italic",
      provider: "none",
      weight: "700",
      src: ["/fonts/MonaSans/mona-sans-700-italic.ttf"],
      style: "italic",
    },
    {
      name: "Mona Sans 800 Italic",
      provider: "none",
      weight: "800",
      src: ["/fonts/MonaSans/mona-sans-800-italic.ttf"],
      style: "italic",
    },
    {
      name: "Mona Sans 900 Italic",
      provider: "none",
      weight: "900",
      src: ["/fonts/MonaSans/mona-sans-900-italic.ttf"],
      style: "italic",
    },
  ],
} satisfies Parameters<DefineNuxtConfig>[0]["fonts"]
