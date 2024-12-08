declare module "#auth-utils" {
  interface User {
    name?: string
    email?: string
    email_verified?: Date

    profile_picture?: string
    user_name?: string
  }

  interface UserSession {
    user: User
  }

  interface SecureSessionData {
    account_id: AccountId
  }
}

export type Provider = "Google" | "Github"
export type OAuthState = {
  auth_mode: "MERGE"
}
export type OAuthH3Event = Parameters<Parameters<typeof defineOAuthGitHubEventHandler>[0]["onSuccess"]>[0]

export {} // Ensure this file is treated as a module
