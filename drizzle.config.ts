import { defineConfig } from "drizzle-kit"
import "dotenv/config"

const connectionString = process.env.NUXT_POSTGRES_URL
if (!connectionString) {
  throw new Error("Missing `NUXT_POSTGRES_URL` environment variable")
}

export default defineConfig({
  out: "./.drizzle",
  schema: "./server/utils/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
})
