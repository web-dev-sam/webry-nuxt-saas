import type { DB } from "~/server/utils/db"
import type { GoogleId } from "~/server/utils/drizzle/schema"
import type { OAuthH3Event } from "~/types/auth"
import { safe, useDB } from "~/server/utils/db"
import { createProfilePicture } from "~/server/utils/defaults"
import { errorAPIRedirect, infoLog } from "~/server/utils/log"
import { HTTP, STATUS_MESSAGES } from "~/utils/defaults"

export type GoogleOAuthUser = {
  sub: GoogleId
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
}

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }: { user: GoogleOAuthUser }) {
    const potentialSession = await getUserSession(event)
    const db = useDB()

    // LOGGED IN
    if (potentialSession.secure?.account_id != null) {
      return sendRedirect(event, "/dashboard")
    }

    // LOGGED OUT
    const existingAccountRedirect = await handleExistingGoogleAccount(event, db, user)
    if (existingAccountRedirect !== false) {
      infoLog("User already has an account!", `Google ID: ${user.sub}`)
      return existingAccountRedirect
    }
    return await handleNewGoogleAccount(event, db, user)
  },
})

/**
 * Handle logging in with an existing account.
 */
async function handleExistingGoogleAccount(event: OAuthH3Event, db: DB, user: GoogleOAuthUser) {
  const existingAccountResult = await safe(
    async () =>
      await db.query.pgtAccounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.google_id, user.sub),
        columns: {
          account_id: true,
          github_id: true,
          email: true,
          email_verified: true,
          name: true,
          user_name: true,
          profile_picture: true,
        },
      }),
  )
  if (!existingAccountResult.success) {
    return errorAPIRedirect(
      {
        event,
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        clientMessage: "Failed to create new account! Try again in 5 minutes.",
        serverMessage: "Failed to find existing account!",
        statusMessage: STATUS_MESSAGES.UNKNOWN,
        redirect: "/login",
      },
      `Account Email: ${user.email}`,
      `Google ID: ${user.sub}`,
      existingAccountResult.error,
    )
  }

  const existingAccount = existingAccountResult.data
  if (existingAccount != null) {
    await setUserSession(event, {
      user: {
        email: existingAccount.email ?? undefined,
        email_verified: existingAccount.email_verified ?? undefined,
        name: existingAccount.name ?? undefined,
        user_name: existingAccount.user_name ?? undefined,
        profile_picture: existingAccount.profile_picture ?? createProfilePicture(),
      },
      secure: {
        account_id: existingAccount.account_id,
      },
    })

    return sendRedirect(event, "/dashboard")
  }
  return false
}

/**
 * Handle creating a new account.
 */
async function handleNewGoogleAccount(event: OAuthH3Event, db: DB, user: GoogleOAuthUser) {
  user.picture ||= createProfilePicture()
  const newAccountResult = await safe(
    async () =>
      await db
        .insert(pgtAccounts)
        .values({
          google_id: user.sub,
          email: user.email,
          email_verified: user.email_verified ? new Date() : null,
          name: user.name,
          profile_picture: user.picture,
        })
        .returning({
          account_id: pgtAccounts.account_id,
        }),
  )
  if (!newAccountResult.success) {
    return errorAPIRedirect(
      {
        event,
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        clientMessage: "Failed to create new account! Try again in 5 minutes.",
        serverMessage: "Failed to create new account!",
        statusMessage: STATUS_MESSAGES.UNKNOWN,
        redirect: "/login",
      },
      `Account Email: ${user.email}\n`,
      newAccountResult.error,
    )
  }

  const [newAccount] = newAccountResult.data
  await setUserSession(event, {
    user: {
      email: user.email,
      email_verified: user.email_verified ? new Date() : undefined,
      name: user.name,
      user_name: undefined,
      profile_picture: user.picture,
    },
    secure: {
      account_id: newAccount.account_id,
    },
  })

  return sendRedirect(event, "/dashboard")
}
