export function createProfilePicture() {
  const profilePictureSeed = Math.floor(Math.random() * 16) + 1 // 1-16
  return `/img/profile-placeholder/thumbs-${profilePictureSeed}.png`
}

export const HTTP = {
  OK: 200,
  SEE_OTHER: 303,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const
export type HttpCode = (typeof HTTP)[keyof typeof HTTP]

export const STATUS_MESSAGES = {
  UNKNOWN: "Unknown",
  NOT_FOUND: "The requested resource was not found",
  NOT_AUTHORIZED: "You need to be logged in for access",
  INVALID: "The provided data was invalid: ",
  RATE_LIMIT: "You are being rate limited",
  DUMB_DEV: "Oopsies! Must have forgotten how to code...",
} as const

export const STATUS_MESSAGES_SETTINGS = {
  ONLY_ONE_PROVIDER_CONNECTED: "You can't disconnect your last connected provider!",
  EMAIL_VERIFICATION_FAILED: "Failed to verify email",
  EMAIL_EXISTS: "Email already exists",
} as const

export const STATUS_MESSAGES_CONNECT_ACCOUNT = {
  CONFLICT_OTHER_ACCOUNT: "This account is already connected to another user!",
}

export function wrapUnknownClientError(message?: string) {
  const contactEmail = useRuntimeConfig().public.contactEmail
  return `Please reload the page and try again. If the issue persists, contact support: ${contactEmail}${
    message ? `\n\nError Type: ${message}` : ""
  }`
}

export const MAX_USER_NAME_LENGTH = 32
export const MAX_EMAIL_LENGTH = 256
export const MAX_PROFILE_PICTURE_LENGTH = 2048
export const MAX_NAME_LENGTH = 256
