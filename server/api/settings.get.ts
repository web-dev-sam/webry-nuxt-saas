import { HTTP } from "~/utils/defaults"
import { safe, useDB } from "../utils/db"

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const session = await getUserSession(event)
  const loggedInAccountId = session.secure?.account_id
  if (!loggedInAccountId) {
    return sendRedirect(event, "/login", HTTP.UNAUTHORIZED)
  }

  const db = useDB()

  const result = await safe(
    async () =>
      await db.query.pgtAccounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.account_id, loggedInAccountId),
        columns: {
          github_id: true,
          google_id: true,
          profile_picture: true,
          email: true,
          user_name: true,
          email_verified: true,
        },
      }),
  )
  if (!result.success || !result.data) {
    return sendRedirect(event, "/settings", HTTP.INTERNAL_SERVER_ERROR)
  }

  const account = result.data
  if (!account) {
    return sendRedirect(event, "/settings", HTTP.NOT_FOUND)
  }

  return {
    providers: {
      google: account.google_id != null,
      github: account.github_id != null,
    },
    profile_picture: account.profile_picture ?? undefined,
    user_name: result.data.user_name ?? undefined,
    email: result.data.email ?? undefined,
    email_verified: result.data.email_verified ?? undefined,
  }
})
