import { eq } from "drizzle-orm"
import { safe, useDB } from "../utils/db"
import { generateEmailVerificationLink, resend } from "../utils/email"
import { useResponse } from "../utils/log"
import { rateLimit } from "../utils/utils"

export default defineEventHandler(async (event) => {
  rateLimit(event, "account-verify-email.post", ["1 in 1m", "5 in 1h"])
  await requireUserSession(event)

  // VALIDATE REQUEST BODY
  const { redirect400, throw500 } = useResponse(event)
  const session = await getUserSession(event)
  const db = useDB()
  const loggedInAccountId = session.secure?.account_id
  if (!loggedInAccountId) {
    return redirect400("/login", "Unexpectedly missing account id from session.", "Please login again.")
  }

  const emailResult = await safe(
    async () =>
      await db.query.pgtAccounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.account_id, loggedInAccountId),
        columns: {
          email: true,
        },
      }),
  )
  if (!emailResult.success) {
    return throw500(emailResult.error, "Unknown error")
  }

  const email = emailResult.data?.email
  if (email == null) {
    return throw500(`User doesn't have an email to verify. Account ID: ${loggedInAccountId}.`, "Please save your email first.", "email")
  }

  // SEND EMAIL VERIFICATION
  const token = generateEmailVerificationLink()
  const saveTokenResult = await safe(
    async () =>
      await db
        .update(pgtAccounts)
        .set({
          email_verification_token: token,
          email_verification_expires_at: new Date(Date.now() + 10 * 60 * 1000),
        })
        .where(eq(pgtAccounts.account_id, loggedInAccountId)),
  )
  if (!saveTokenResult.success) {
    return throw500(saveTokenResult.error, "Unknown error")
  }

  const data = await safe(
    async () => await resend.emails.send({
      from: "Sam <sam@saas-email.webry.com>",
      to: [email],
      subject: "Welcome to SaaS Starter Kit!",
      html: `Please verify your email, the link is only valid for 10 minutes:<br> <a href='https://saas.webry.com/verify?token=${token}'>https://saas.webry.com/verify?token=${token}</a>.`,
    }),
  )
  if (!data.success) {
    return throw500(data.error, "Unknown error")
  } else if (!data.data.data) {
    return throw500(data.data.error, "Unknown error")
  }

  return data.data
})
