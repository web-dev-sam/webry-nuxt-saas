import { eq } from "drizzle-orm"
import { HTTP } from "~/utils/defaults"
import { safe, useDB } from "../utils/db"
import { Time } from "../utils/defaults"
import { errorAPIResponse } from "../utils/log"
import { createRateLimit, rateLimit } from "../utils/rate-limit"

// TODO: Use redirects to show the user a message that their email has been verified
export default defineEventHandler(async (event) => {
  rateLimit(event, {
    key: "email-verification",
    limits: [
      createRateLimit(5, Time.Minute),
      createRateLimit(10, Time.Hour),
    ],
  })
  await requireUserSession(event)

  const db = useDB()
  const query = getQuery(event)
  const token = query.token
  if (token == null) {
    return sendRedirect(event, "/settings", HTTP.BAD_REQUEST)
  }

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
  if (!emailDetailsResult.success || !emailDetailsResult.data || !emailDetailsResult.data.email_verification_expires_at) {
    return errorAPIResponse({
      clientMessage: "The token is expired or invalid!",
      serverMessage: "error" in emailDetailsResult ? emailDetailsResult.error : "Unknown error (Probably the token is invalid or doesn't exist)",
      statusCode: HTTP.INTERNAL_SERVER_ERROR,
      statusMessage: "The token is expired or invalid!",
    })
  }

  const isExpired = emailDetailsResult.data.email_verification_expires_at < new Date()
  if (isExpired) {
    return errorAPIResponse({
      clientMessage: "Email verification token has expired",
      serverMessage: `Email verification token has expired. Account ID: ${emailDetailsResult.data.account_id}`,
      statusCode: HTTP.BAD_REQUEST,
      statusMessage: "Email verification token has expired",
    })
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
    return errorAPIResponse({
      clientMessage: "Unknown error",
      serverMessage: updateResult.error,
      statusCode: HTTP.INTERNAL_SERVER_ERROR,
      statusMessage: "Unknown error",
    })
  }

  return "Email verified! Thanks!!!"
})
