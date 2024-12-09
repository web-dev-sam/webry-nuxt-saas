import type { H3Event } from "h3"
import { HTTP, type HttpCode } from "~/utils/defaults"

/**
 * Use this function for general server logging.
 */
export const logging = useLogging()
export function useLogging() {
  function createLogMessage(type: string, color: string, message: unknown, ...args: unknown[]): string {
    const timeStr = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    const prefix = `${color} ${type} \x1B[0m [${timeStr}] `
    return args.length > 0 ? `${prefix}${message}` : prefix + message
  }

  // eslint-disable-next-line no-console
  const log = console.log
  const debugLog = (message: unknown, ...args: unknown[]) => import.meta.dev && log(createLogMessage("DEBUG (app)", "\x1B[46;37m", message), ...args)
  const infoLog = (message: unknown, ...args: unknown[]) => log(createLogMessage("INFO (app)", "\x1B[44;37m", message), ...args)
  const warnLog = (message: unknown, ...args: unknown[]) => log(createLogMessage("WARN (app)", "\x1B[43;37m", message), ...args)
  const errorLog = (message: unknown, ...args: unknown[]) => log(createLogMessage("ERROR (app)", "\x1B[41;37m", message), ...args)

  return {
    debug: debugLog,
    info: infoLog,
    warn: warnLog,
    error: errorLog,
  }
}

/**
 * Wrapper function over `createError` to also log the error message.
 */
export function errorAPIResponse(
  {
    clientMessage,
    serverMessage,
    statusMessage,
    statusCode,
    devOnly,
  }: {
    clientMessage: string
    serverMessage: unknown
    statusCode: HttpCode
    statusMessage: string
    devOnly?: boolean
  },
  ...args: any[]
) {
  if (devOnly) {
    logging.debug(clientMessage, serverMessage, ...args)
  } else {
    logging.error(clientMessage, serverMessage, ...args)
  }

  return createError({
    statusCode,
    statusMessage,
    message: clientMessage,
  })
}

/**
 * Wrapper function over `createError` to also log the error message and redirect the user.
 */
export function errorAPIRedirect(
  {
    event,
    redirect,
    statusCode,
    clientMessage,
    serverMessage,
    statusMessage,
    devOnly,
  }: {
    event: H3Event
    redirect: string
    clientMessage: string
    serverMessage: unknown
    statusCode: HttpCode
    statusMessage: string
    devOnly?: boolean
  },
  ...args: any[]
) {
  errorAPIResponse(
    {
      clientMessage,
      serverMessage,
      statusCode,
      statusMessage,
      devOnly,
    },
    ...args,
  )
  return sendRedirect(event, redirect, statusCode)
}

export type ClientMessage = { message: string, field?: string }
/**
 * Use this function to send simple responses for API requests.
 */
export function useResponse(event: H3Event): {
  throw400: (serverContext: unknown, userMessage: string, field?: string) => never
  throw500: (serverContext: unknown, userMessage: string, field?: string) => never
  redirect400: (redirect: string, serverContext: unknown, userMessage: string, field?: string) => never
  redirect500: (redirect: string, serverContext: unknown, userMessage: string, field?: string) => never
} {
  return {
    throw400(serverContext: unknown, userMessage: string, field?: string): never {
      throw errorAPIResponse({
        clientMessage: JSON.stringify({
          message: userMessage,
          ...(field && {
            field,
          }),
        } satisfies ClientMessage),
        serverMessage: userMessage + serverContext,
        statusCode: HTTP.BAD_REQUEST,
        statusMessage: userMessage,
      })
    },
    throw500(serverContext: unknown, userMessage: string, field?: string): never {
      throw errorAPIResponse({
        clientMessage: JSON.stringify({
          message: userMessage,
          ...(field && {
            field,
          }),
        } satisfies ClientMessage),
        serverMessage: userMessage + serverContext,
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        statusMessage: userMessage,
      })
    },
    redirect400(redirect: string, serverContext: unknown, userMessage: string, field?: string): never {
      throw errorAPIRedirect({
        event,
        redirect,
        clientMessage: JSON.stringify({
          message: userMessage,
          ...(field && {
            field,
          }),
        } satisfies ClientMessage),
        serverMessage: userMessage + serverContext,
        statusCode: HTTP.BAD_REQUEST,
        statusMessage: userMessage,
      })
    },
    redirect500(redirect: string, serverContext: unknown, userMessage: string, field?: string): never {
      throw errorAPIRedirect({
        event,
        redirect,
        clientMessage: JSON.stringify({
          message: userMessage,
          ...(field && {
            field,
          }),
        } satisfies ClientMessage),
        serverMessage: userMessage + serverContext,
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        statusMessage: userMessage,
      })
    },
  }
}
