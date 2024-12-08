import { eq } from "drizzle-orm"
import { HTTP, STATUS_MESSAGES_SETTINGS } from "~/utils/defaults"
import { safe, useDB } from "../utils/db"
import { Time } from "../utils/defaults"
import { errorAPIResponse } from "../utils/log"
import { createRateLimit, rateLimit } from "../utils/rate-limit"
import { generateEmailVerificationLink, resend } from "../utils/send"

export default defineEventHandler(async (event) => {
  rateLimit(event, {
    key: "email-verification",
    limits: [
      createRateLimit(1, Time.Minute),
      createRateLimit(5, Time.Hour),
    ],
  })

  await requireUserSession(event)

  // VALIDATE REQUEST BODY
  const session = await getUserSession(event)
  const db = useDB()
  const loggedInAccountId = session.secure?.account_id
  if (!loggedInAccountId) {
    return sendRedirect(event, "/login", HTTP.UNAUTHORIZED)
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
    throwUnknownError(emailResult.error)
  }

  const email = emailResult.data?.email
  if (email == null) {
    throw errorAPIResponse({
      clientMessage: "Failed to verify email. Please save your email in your settings first.",
      serverMessage: `User doesn't have an email to verify. Account ID: ${loggedInAccountId}.`,
      statusCode: HTTP.NOT_FOUND,
      statusMessage: STATUS_MESSAGES_SETTINGS.EMAIL_VERIFICATION_FAILED,
    })
  }

  // SEND EMAIL VERIFICATION
  const token = generateEmailVerificationLink()
  const saveTokenResult = await safe(
    async () =>
      await db
        .update(pgtAccounts)
        .set({
          email_verification_token: token,
          email_verification_expires_at: new Date(Date.now() + 10 * Time.Minute),
        })
        .where(eq(pgtAccounts.account_id, loggedInAccountId)),
  )
  if (!saveTokenResult.success) {
    throwUnknownError(saveTokenResult.error)
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
    throwUnknownError(data.error)
  }

  if (!data.data.data) {
    throwUnknownError(data.data.error)
  }

  return data.data
})

function throwUnknownError(error: unknown): never {
  throw errorAPIResponse({
    clientMessage: "Failed to send email verification",
    serverMessage: error,
    statusCode: HTTP.INTERNAL_SERVER_ERROR,
    statusMessage: STATUS_MESSAGES_SETTINGS.EMAIL_VERIFICATION_FAILED,
  })
}
