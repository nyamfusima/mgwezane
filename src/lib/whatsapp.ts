import { business } from '../data/business'

/**
 * Builds a wa.me link with the enquiry text already filled in. Opening the
 * link starts a WhatsApp conversation — it does not send anything on its own,
 * and it never confirms a booking.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** Joins the filled-in parts of an enquiry into a readable WhatsApp message. */
export function enquiryMessage(intro: string, fields: Array<[string, string]>): string {
  const lines = fields
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value.trim()}`)
  return [intro, '', ...lines].join('\n')
}
