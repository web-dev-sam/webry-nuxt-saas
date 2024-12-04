import type { GoogleOAuthUser } from "../auth/google.get"
import { eq } from "drizzle-orm"
import { safe, useDB } from "~/server/utils/db"
import { errorAPIRedirect } from "~/server/utils/log"
import { HTTP, STATUS_MESSAGES, STATUS_MESSAGES_CONNECT_ACCOUNT } from "~/utils/defaults"

export default defineOAuthGoogleEventHandler({
  config: {
    redirectURL: `${process.env.NUXT_AUTH_ORIGIN}/api/connect/google`,
  },
  async onSuccess(event, { user }: { user: GoogleOAuthUser }) {
    await requireUserSession(event)

    const session = await getUserSession(event)
    const db = useDB()

    const loggedInAccountId = session.secure!.account_id
    const accountResult = await safe(
      async () =>
        await db
          .update(pgtAccounts)
          .set({
            google_id: user.sub,
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
