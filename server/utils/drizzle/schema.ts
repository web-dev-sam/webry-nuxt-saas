import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH, MAX_PROFILE_PICTURE_LENGTH, MAX_USER_NAME_LENGTH } from "../../../utils/defaults"

export type AccountId = number & { __brand: "account_id" }
export type GoogleId = string & { __brand: "google_id" }
export type GithubId = number & { __brand: "github_id" }
export const pgtAccounts = pgTable("accounts", {
  account_id: integer().$type<AccountId>().primaryKey().generatedAlwaysAsIdentity(),
  google_id: varchar({ length: 256 }).$type<GoogleId>().unique(),
  github_id: integer().$type<GithubId>().unique(),
  email: varchar({ length: MAX_EMAIL_LENGTH }).unique(),
  email_verified: timestamp(),
  email_verification_token: varchar({ length: 256 }).unique(),
  email_verification_expires_at: timestamp(),
  name: varchar({ length: MAX_NAME_LENGTH }),
  user_name: varchar({ length: MAX_USER_NAME_LENGTH }).unique(),
  profile_picture: varchar({ length: MAX_PROFILE_PICTURE_LENGTH }).default("/img/profile-placeholder/thumbs-1.png"),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
})
