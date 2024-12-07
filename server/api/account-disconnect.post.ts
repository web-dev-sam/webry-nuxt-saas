import type { Provider } from "~/types/auth"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { HTTP, STATUS_MESSAGES, STATUS_MESSAGES_SETTINGS } from "~/utils/defaults"
import { safe, useDB } from "../utils/db"
import { errorAPIResponse, successAPIResponse } from "../utils/log"

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  // VALIDATE REQUEST BODY
  const body = await readValidatedBody(event, body =>
    z
      .object({
        provider: z.union([z.literal<Provider>("Google"), z.literal<Provider>("Github")]),
      })
      .safeParse(body),
  )
  if (!body.success) {
    throw errorAPIResponse({
      clientMessage: "Invalid request body",
      serverMessage: JSON.stringify(body.error.errors, null, 2),
      statusCode: HTTP.BAD_REQUEST,
      statusMessage: STATUS_MESSAGES.DUMB_DEV,
      devOnly: true,
    })
  }

  // VALIDATE USER ID
  const db = useDB()
  const session = await getUserSession(event)
  const loggedInAccountId = session.secure?.account_id
  if (loggedInAccountId == null) {
    throw errorAPIResponse(
      {
        clientMessage: "Failed to disconnect account",
        serverMessage: "User doesn't have an account ID in their session!",
        statusCode: HTTP.NOT_FOUND,
        statusMessage: STATUS_MESSAGES.NOT_FOUND,
      },
      `Account ID: ${loggedInAccountId}`,
    )
  }

  // GET PROVIDERS
  const providersResult = await safe(
    async () =>
      await db.query.pgtAccounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.account_id, loggedInAccountId),
        columns: {
          github_id: true,
          google_id: true,
        },
      }),
  )
  if (!providersResult.success) {
    throw errorAPIResponse(
      {
        clientMessage: "Failed to disconnect account",
        serverMessage: providersResult.error,
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        statusMessage: STATUS_MESSAGES.UNKNOWN,
      },
      `Account ID: ${loggedInAccountId}`,
    )
  }

  // VALIDATE ACCOUNT EXISTENCE FOR DISCONNECT
  if (!providersResult.data) {
    throw errorAPIResponse(
      {
        clientMessage: "Failed to disconnect account",
        serverMessage: "Failed to find account to disconnect!",
        statusCode: HTTP.NOT_FOUND,
        statusMessage: STATUS_MESSAGES.UNKNOWN,
      },
      `Account ID: ${loggedInAccountId}`,
    )
  }

  // VALIDATE MULTIPLE PROVIDERS
  const connectedProviders = [providersResult.data.google_id, providersResult.data.github_id].filter(Boolean).length
  if (connectedProviders < 2) {
    throw errorAPIResponse(
      {
        clientMessage: "Failed to disconnect account",
        serverMessage: "User tried to disconnect account but only has one provider connected!",
        statusCode: HTTP.BAD_REQUEST,
        statusMessage: STATUS_MESSAGES_SETTINGS.ONLY_ONE_PROVIDER_CONNECTED,
      },
      `Account ID: ${loggedInAccountId}`,
    )
  }

  // DISCONNECT ACCOUNT
  const dbProviderKey = (
    {
      Google: "google_id",
      Github: "github_id",
    } as const
  )[body.data.provider]
  const disconnectResult = await safe(
    async () =>
      await db
        .update(pgtAccounts)
        .set({
          [dbProviderKey]: null,
        })
        .where(eq(pgtAccounts.account_id, loggedInAccountId)),
  )
  if (!disconnectResult.success) {
    throw errorAPIResponse(
      {
        clientMessage: "Failed to disconnect account",
        serverMessage: disconnectResult.error,
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        statusMessage: STATUS_MESSAGES.UNKNOWN,
      },
      `Account ID: ${loggedInAccountId}`,
    )
  }

  return successAPIResponse()
})
