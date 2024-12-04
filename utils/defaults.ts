export function createProfilePicture() {
  const profilePictureSeed = Math.floor(Math.random() * 16) + 1 // 1-16
  return `/img/profile-placeholder/thumbs-${profilePictureSeed}.png`
}

export const HTTP = {
  OK: 200,
  SEE_OTHER: 303,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const
export type HttpCode = (typeof HTTP)[keyof typeof HTTP]

export const STATUS_MESSAGES = {
  UNKNOWN: "Unknown",
  NOT_FOUND: "The requested resource was not found",
  DUMB_DEV: "Oopsies! Must have forgotten how to code...",
} as const

export const STATUS_MESSAGES_SETTINGS = {
  ONLY_ONE_PROVIDER_CONNECTED: "You can't disconnect your last connected provider!",
} as const

export const STATUS_MESSAGES_CONNECT_ACCOUNT = {
  CONFLICT_OTHER_ACCOUNT: "This account is already connected to another user!",
}

export function wrapUnknownClientError(message?: string) {
  return `Please reload the page and try again. If the issue persists, contact support: sam@webry.com${
    message ? `\n\nError Type: ${message}` : ""
  }`
}
