import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"

export type AccountId = number & { __brand: "account_id" }
export type GoogleId = string & { __brand: "google_id" }
export type GithubId = number & { __brand: "github_id" }
export const pgtAccounts = pgTable("accounts", {
  account_id: integer().$type<AccountId>().primaryKey().generatedAlwaysAsIdentity(),
  google_id: varchar({ length: 256 }).$type<GoogleId>().unique(),
  github_id: integer().$type<GithubId>().unique(),
  email: varchar({ length: 256 }).unique(),
  email_verified: timestamp(),
  name: varchar({ length: 256 }),
  user_name: varchar({ length: 32 }).unique(),
  profile_picture: varchar({ length: 2048 }).default("/img/profile-placeholder/thumbs-1.png"),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
})
