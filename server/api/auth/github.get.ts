import type { DB } from "~/server/utils/db"
import type { GithubId } from "~/server/utils/drizzle/schema"
import type { OAuthH3Event } from "~/types/auth"
import { safe, useDB } from "~/server/utils/db"
import { createProfilePicture } from "~/server/utils/defaults"
import { errorAPIRedirect, infoLog } from "~/server/utils/log"
import { HTTP, STATUS_MESSAGES } from "~/utils/defaults"

export type GitHubOAuthUser = {
  id: GithubId
  name: string | null
  login: string
  email: string | null
  avatar_url: string | null
}

export default defineOAuthGitHubEventHandler({
  config: {
    scope: ["user:email"],
  },
  async onSuccess(event, { user }: { user: GitHubOAuthUser }) {
    const potentialSession = await getUserSession(event)
    const db = useDB()

    // ALREADY LOGGED IN
    if (potentialSession.secure?.account_id != null) {
      return sendRedirect(event, "/dashboard")
    }

    // LOGGED OUT
    const existingAccountRedirect = await handleExistingGitHubAccount(event, db, user)
    if (existingAccountRedirect !== false) {
      infoLog("User already has an account!", `GitHub ID: ${user.id}`)
      return existingAccountRedirect
    }
    return await handleNewGitHubAccount(event, db, user)
  },
})

/**
 * Handle logging in with an existing account.
 */
async function handleExistingGitHubAccount(event: OAuthH3Event, db: DB, user: GitHubOAuthUser) {
  const existingAccountResult = await safe(
    async () =>
      await db.query.pgtAccounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.github_id, user.id),
        columns: {
          account_id: true,
          google_id: true,
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
      `GitHub ID: ${user.id}`,
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
async function handleNewGitHubAccount(event: OAuthH3Event, db: DB, user: GitHubOAuthUser) {
  user.avatar_url ||= createProfilePicture()

  const newAccountResult = await safe(
    async () =>
      await db
        .insert(pgtAccounts)
        .values({
          github_id: user.id,
          email: user.email,
          name: user.name,
          profile_picture: user.avatar_url,
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
      email: user.email ?? undefined,
      email_verified: undefined, // GitHub doesn't provide email verification status
      name: user.name ?? undefined,
      user_name: undefined,
      profile_picture: user.avatar_url,
    },
    secure: {
      account_id: newAccount.account_id,
    },
  })
  return sendRedirect(event, "/dashboard")
}
