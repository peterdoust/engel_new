/**
 * Shared shape for the mailer unsubscribe list.
 *
 * The mailing list itself lives in an external mail tool, so a row here is a
 * *request* to be removed, not the removal. Staff export the new rows to CSV and
 * action them in that tool; exporting is what flips a row's status.
 */

export const UNSUBSCRIBES_COLLECTION = 'unsubscribes'

export type UnsubscribeStatus = 'new' | 'exported'

/**
 * Addresses arrive from a public form and from mailer links, so the same person
 * can submit ' Jane@Example.com ' and 'jane@example.com'. Normalising before the
 * upsert is what keeps those one row instead of two.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) return null
  return email
}
