// server/utils/rateLimit.ts
import type { H3Event } from "h3"
import { RateLimiter } from "limiter"
import { HTTP, STATUS_MESSAGES } from "~/utils/defaults"
import { errorAPIResponse } from "./log"

interface RateLimit {
  max: number
  window: number
}

type RateLimitKey = `${string}-${string}-${number}`

const limiters = new Map<RateLimitKey, RateLimiter>()

interface RateLimitOptions {
  limits: RateLimit[]
  key?: string
}

export function createRateLimit(requests: number, window: number): RateLimit {
  return { max: requests, window }
}

export function rateLimit(event: H3Event, options: RateLimitOptions) {
  const identifier = options.key || event.node.req.url || "default"
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || "unknown"

  for (const limit of options.limits) {
    const key: RateLimitKey = `${identifier}-${clientIp}-${limit.window}`

    if (!limiters.has(key)) {
      limiters.set(
        key,
        new RateLimiter({
          tokensPerInterval: limit.max,
          interval: limit.window,
        }),
      )
    }

    const limiter = limiters.get(key)! // Cuz "limiters.has(key)"
    const remaining = limiter.getTokensRemaining()

    if (remaining < 1) {
      const resetTime = Date.now() + limit.window
      throw errorAPIResponse({
        clientMessage: `Rate limit exceeded. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds`,
        serverMessage: `Email Verification: Rate limit exceeded for ${key}. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds`,
        statusCode: HTTP.TOO_MANY_REQUESTS,
        statusMessage: STATUS_MESSAGES.RATE_LIMIT,
      })
    }

    limiter.tryRemoveTokens(1)
  }

  return true
}
