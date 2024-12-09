import { eq } from "drizzle-orm"
import { safe, useDB } from "../utils/db"
import { useResponse } from "../utils/log"
import { rateLimit } from "../utils/utils"

export default defineEventHandler(async (event) => {
  rateLimit(event, "verify.get", ["5 in 1m", "10 in 1h"])
  await requireUserSession(event)

  const { throw500, throw400, redirect400 } = useResponse(event)
  const token = getQuery(event).token
  if (token == null) {
    return redirect400("/settings", "", "No token provided")
  }

  const db = useDB()
  const emailDetailsResult = await safe(
    async () =>
      await db.query.pgtAccounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.email_verification_token, token.toString()),
        columns: {
          account_id: true,
          email_verification_expires_at: true,
          email_verification_token: true,
        },
      }),
  )
  if (!emailDetailsResult.success) {
    return throw500(emailDetailsResult.error, "The token is expired or invalid!")
  } else if (!emailDetailsResult.data || !emailDetailsResult.data.email_verification_expires_at) {
    return throw500("", "The token is expired or invalid!")
  }

  const isExpired = emailDetailsResult.data.email_verification_expires_at < new Date()
  if (isExpired) {
    return throw400(`Account ID: ${emailDetailsResult.data.account_id}`, "Email verification token has expired!")
  }

  const accountId = emailDetailsResult.data.account_id
  const updateResult = await safe(
    async () =>
      await db
        .update(pgtAccounts)
        .set({
          email_verified: new Date(),
          email_verification_token: null,
          email_verification_expires_at: null,
        })
        .where(eq(pgtAccounts.account_id, accountId)),
  )
  if (!updateResult.success) {
    return throw500(updateResult.error, "Unknown error")
  }

  return "Email verified! Thanks!!!"
})
