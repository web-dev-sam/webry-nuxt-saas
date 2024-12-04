import type { Result } from "./result"
import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"
import * as schema from "~/server/utils/drizzle/schema"
import { errorLog } from "./log"

export const tables = schema
export type DB = ReturnType<typeof useDB>

export function useDB() {
  const connectionString = useRuntimeConfig().postgresUrl
  if (!connectionString) {
    throw new Error("Missing `NUXT_POSTGRES_URL` environment variable")
  }

  return drizzle(new pg.Pool({ connectionString }), { schema })
}

export async function safe<T>(operation: () => Promise<T>): Promise<Result<T, unknown>> {
  try {
    const data = await operation()
    return { success: true, data }
  }
  catch (error) {
    errorLog(" ", error)

    return {
      success: false,
      error,
    }
  }
}
