import type { OAuthH3Event } from "~/types/auth"
import { HTTP, type HttpCode } from "~/utils/defaults"

/**
 * ## Only for development
 */
export function debugLog(message: unknown, ...args: unknown[]) {
  if (import.meta.dev) {
    // eslint-disable-next-line no-console
    console.log(createLogMessage("DEBUG (app)", "\x1B[46;37m", message), ...args)
  }
}

export function infoLog(message: unknown, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(createLogMessage("INFO (app)", "\x1B[44;37m", message), ...args)
}

export function warnLog(message: unknown, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(createLogMessage("WARN (app)", "\x1B[43;37m", message), ...args)
}

export function errorLog(message: unknown, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(createLogMessage("ERROR (app)", "\x1B[41;37m", message), ...args)
}

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
    debugLog(clientMessage, serverMessage, ...args)
  } else {
    errorLog(clientMessage, serverMessage, ...args)
  }

  return createError({
    statusCode,
    statusMessage,
    message: clientMessage,
  })
}

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
    event: OAuthH3Event
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

export function successAPIResponse() {
  return {
    statusCode: HTTP.OK,
    body: JSON.stringify({ success: true }),
  }
}

function createLogMessage(type: string, color: string, message: unknown, ...args: unknown[]): string {
  const timeStr = formatTime()
  const prefix = `${color} ${type} \x1B[0m [${timeStr}] `
  return args.length > 0 ? `${prefix}${message}` : prefix + message
}

function formatTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}
