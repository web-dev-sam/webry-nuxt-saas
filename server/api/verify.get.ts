import { eq } from "drizzle-orm"
import { HTTP } from "~/utils/defaults"
import { safe, useDB } from "../utils/db"
import { errorAPIResponse } from "../utils/log"

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const db = useDB()
  const query = getQuery(event)
  const token = query.token
  if (token == null) {
    return sendRedirect(event, "/settings", HTTP.BAD_REQUEST)
  }

  const result = await safe(
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
  if (!result.success || !result.data || !result.data.email_verification_expires_at) {
    return errorAPIResponse({
      clientMessage: "Unknown error",
      serverMessage: "error" in result ? result.error : "Unknown error",
      statusCode: HTTP.INTERNAL_SERVER_ERROR,
      statusMessage: "Unknown error",
    })
  }

  const isExpired = result.data.email_verification_expires_at < new Date()
  if (isExpired) {
    return errorAPIResponse({
      clientMessage: "Email verification token has expired",
      serverMessage: "Email verification token has expired",
      statusCode: HTTP.BAD_REQUEST,
      statusMessage: "Email verification token has expired",
    })
  }

  const accountId = result.data.account_id
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
      serverMessage: "Unknown error",
      statusCode: HTTP.INTERNAL_SERVER_ERROR,
      statusMessage: "Unknown error",
    })
  }

  return "Email verified! Thanks!!!"
})
