import type { GitHubOAuthUser } from "../auth/github.get"
import { eq } from "drizzle-orm"
import { safe, useDB } from "~/server/utils/db"
import { errorAPIRedirect } from "~/server/utils/log"
import { HTTP, STATUS_MESSAGES, STATUS_MESSAGES_CONNECT_ACCOUNT } from "~/utils/defaults"

export default defineOAuthGitHubEventHandler({
  config: {
    scope: ["user:email"],
    redirectURL: `${process.env.NUXT_AUTH_ORIGIN}/api/connect/github`,
    clientId: process.env.NUXT_OAUTH_GITHUB_CONNECT_CLIENT_ID,
    clientSecret: process.env.NUXT_OAUTH_GITHUB_CONNECT_CLIENT_SECRET,
  },
  async onSuccess(event, { user }: { user: GitHubOAuthUser }) {
    await requireUserSession(event)

    const session = await getUserSession(event)
    const db = useDB()

    const loggedInAccountId = session.secure!.account_id
    const accountResult = await safe(
      async () =>
        await db
          .update(pgtAccounts)
          .set({
            github_id: user.id,
          })
          .where(eq(pgtAccounts.account_id, loggedInAccountId)),
    )
    if (!accountResult.success) {
      if (accountResult.error instanceof Error && accountResult.error.message.includes("violates unique constraint")) {
        return errorAPIRedirect(
          {
            event,
            statusCode: HTTP.CONFLICT,
            clientMessage: "Failed to connect account",
            serverMessage: STATUS_MESSAGES_CONNECT_ACCOUNT.CONFLICT_OTHER_ACCOUNT,
            statusMessage: STATUS_MESSAGES_CONNECT_ACCOUNT.CONFLICT_OTHER_ACCOUNT,
            redirect: "/settings?connect-account-conflict",
          },
          `Account ID: ${loggedInAccountId}`,
          accountResult.error,
        )
      }

      return errorAPIRedirect(
        {
          event,
          statusCode: HTTP.BAD_REQUEST,
          clientMessage: "Failed to connect account",
          serverMessage: "Failed to find existing account to merge!",
          statusMessage: STATUS_MESSAGES.DUMB_DEV,
          redirect: "/settings?connect-account-failed",
        },
        `Account ID: ${loggedInAccountId}`,
        accountResult.error,
      )
    }

    return sendRedirect(event, "/settings")
  },
})
