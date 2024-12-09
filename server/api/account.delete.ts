import { eq } from "drizzle-orm"
import { safe, useDB } from "../utils/db"
import { useResponse } from "../utils/log"

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const session = await getUserSession(event)
  const { redirect400 } = useResponse(event)
  const db = useDB()

  const loggedInAccountId = session.secure?.account_id
  if (loggedInAccountId == null) {
    return redirect400("/login", "Unexpectedly missing account id from session.", "Please login again.")
  }

  const result = await safe(
    async () =>
      await db.delete(pgtAccounts).where(eq(pgtAccounts.account_id, loggedInAccountId)).returning({
        account_id: pgtAccounts.account_id,
      }),
  )
  if (!result.success) {
    return redirect400("/dashboard", `${result.error}\nAccount ID: ${loggedInAccountId}`, "Please try again.")
  }

  await clearUserSession(event)
  return sendRedirect(event, "/")
})
