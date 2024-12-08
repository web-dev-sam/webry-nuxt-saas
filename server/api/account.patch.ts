import { eq } from "drizzle-orm"
import { z } from "zod"
import { HTTP, MAX_USER_NAME_LENGTH, STATUS_MESSAGES } from "~/utils/defaults"
import { safe, useDB } from "../utils/db"
import { errorAPIRedirect, errorAPIResponse } from "../utils/log"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const db = useDB()

  const loggedInAccountId = session.secure?.account_id
  if (loggedInAccountId == null) {
    return errorAPIRedirect({
      event,
      redirect: "/login?redirect=/settings",
      statusCode: HTTP.NOT_AUTHORIZED,
      statusMessage: STATUS_MESSAGES.NOT_AUTHORIZED,
      clientMessage: "You need to modify your account settings while logged in.",
      serverMessage: "User attempted to modify account settings while not logged in.",
    })
  }

  const body = await readValidatedBody(event, body => (z.object({
    user_name: z.string().min(1).max(MAX_USER_NAME_LENGTH).nullable(),
    email: z.string().email().nullable(),
  })).safeParse(body))
  if (!body.success) {
    const errs = body.error.errors.map(error =>
      ["user_name", "email"].find(field => error.path.join(".").endsWith(field)),
    ).filter(Boolean) as string[]
    throw errorAPIResponse({
      statusCode: HTTP.BAD_REQUEST,
      statusMessage: STATUS_MESSAGES.INVALID + errs.join(", "),
      clientMessage: "Make sure all fields are filled out correctly.",
      serverMessage: `Incorrect fields: ${errs.join(", ")}`,
    })
  }

  // Not very clean as the user could have an old email in their session
  // But for now, saves a db query
  const emailChanged = session.user?.email !== body.data.email
  const updatedAccountResult = await safe(async () => await db
    .update(pgtAccounts)
    .set({
      user_name: body.data.user_name,
      email: body.data.email,
      updated_at: new Date(),
      ...(emailChanged && {
        email_verified: null,
        email_verification_token: null,
        email_verification_expires_at: null,
      }),
    })
    .where(eq(pgtAccounts.account_id, loggedInAccountId)),
  )
  if (!updatedAccountResult.success) {
    if (updatedAccountResult.error instanceof Error && updatedAccountResult.error.message.includes("violates unique constraint")) {
      throw errorAPIResponse({
        statusCode: HTTP.BAD_REQUEST,
        statusMessage: `${STATUS_MESSAGES.INVALID}email`,
        clientMessage: "This email already belongs to another account.",
        serverMessage: "Email already exists in the database.",
      })
    }

    throw errorAPIResponse({
      statusCode: HTTP.INTERNAL_SERVER_ERROR,
      statusMessage: STATUS_MESSAGES.UNKNOWN,
      clientMessage: "Failed to update account settings. Try again in 5 minutes.",
      serverMessage: "Failed to update account settings.",
    })
  }

  setUserSession(event, {
    user: {
      user_name: body.data.user_name ?? undefined,
      email: body.data.email ?? undefined,
    },
  })

  return "Account settings updated successfully!"
})
