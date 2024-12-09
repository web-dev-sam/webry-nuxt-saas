import type { H3Event } from "h3"
import { RateLimiter as Limiter } from "limiter"
import { HTTP, STATUS_MESSAGES } from "~/utils/defaults"
import { errorAPIResponse } from "./log"

export type Result<T, E = Error> = { success: true, data: T } | { success: false, error: E }

export function createProfilePicture() {
  const profilePictureSeed = Math.floor(Math.random() * 16) + 1 // 1-16
  return `/img/profile-placeholder/thumbs-${profilePictureSeed}.png`
}

const limiters = new Map<string, Limiter>()
export function rateLimit(event: H3Event, key: string, limits: `${number} in ${number}${"h" | "m" | "s"}`[]) {
  const identifier = key
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || "unknown"

  for (const limit of limits) {
    const key: string = `${identifier}-${clientIp}-${limit}`
    const [max, frame] = limit.split(" in ")

    if (!limiters.has(key)) {
      limiters.set(
        key,
        new Limiter({
          tokensPerInterval: +max,
          interval: Number.parseInt(frame),
        }),
      )
    }

    const limiter = limiters.get(key)! // Cuz "limiters.has(key)"
    const remaining = limiter.getTokensRemaining()

    if (remaining < 1) {
      const resetTime = Date.now() + Number.parseInt(frame)
      throw errorAPIResponse({
        clientMessage: `Rate limit exceeded. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds`,
        serverMessage: `Email Verification: Rate limit exceeded for ${key}. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds`,
        statusCode: HTTP.TOO_MANY_REQUESTS,
        statusMessage: STATUS_MESSAGES.RATE_LIMIT,
      })
    }

    limiter.tryRemoveTokens(1)
  }
}
