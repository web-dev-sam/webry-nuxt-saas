import { eq } from "drizzle-orm"
import { HTTP } from "~/utils/defaults"
import { safe, useDB } from "../utils/db"
import { errorLog } from "../utils/log"

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const db = useDB()

  const loggedInAccountId = session.secure?.account_id
  if (loggedInAccountId == null) {
    errorLog("User tried to delete account but is not logged in!")
    return sendRedirect(event, "/", HTTP.NOT_FOUND)
  }

  const result = await safe(
    async () =>
      await db.delete(pgtAccounts).where(eq(pgtAccounts.account_id, loggedInAccountId)).returning({
        account_id: pgtAccounts.account_id,
      }),
  )
  if (!result.success) {
    errorLog("Failed to delete account!", result.error, `Account ID: ${loggedInAccountId}`)
    return sendRedirect(event, "/dashboard", HTTP.INTERNAL_SERVER_ERROR)
  }

  await clearUserSession(event)
  return sendRedirect(event, "/")
})
