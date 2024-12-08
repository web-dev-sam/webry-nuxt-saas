import { randomBytes } from "node:crypto"
import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

export function generateEmailVerificationLink() {
  return randomBytes(64).toString("hex")
}
