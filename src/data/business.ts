/**
 * Verified business details. Everything the website says about Mgwezane comes
 * from here — update this file and the change appears everywhere.
 */

export const business = {
  name: 'Mgwezane Shuttle Services and Travel Agent',
  shortName: 'Mgwezane',
  tagline: 'Every journey. Expertly planned.',
  /** International format, digits only — used to build wa.me links. */
  whatsappNumber: '27711047531',
  /** How the number is written for South African readers. */
  phoneDisplay: '071 104 7531',
  phoneHref: 'tel:+27711047531',
  email: 'janvusi.m@gmail.com',
  facebookPage: 'Mgwezane shuttle service',
  /**
   * Set this to the page's real URL once it has been confirmed with the
   * client. While it is null the website prints the page name as plain text
   * rather than guessing a link.
   */
  facebookUrl: null as string | null,
  bases: ['Polokwane', 'Mokopane'],
  mainRoutes: ['Johannesburg', 'Pretoria'],
} as const

export const depositPolicy = {
  rule: 'Deposits must be paid at least 3 days before the scheduled trip. No deposit, no trip.',
  confirmation:
    'A trip is only secured once the deposit has been received and the booking confirmed. Please contact us directly to confirm the deposit amount and payment details.',
  note: 'Deposit amounts and payment details are confirmed with you directly when you book.',
} as const

export const priceDisclaimer =
  'Prices may vary depending on pickup and drop-off locations, availability and travel arrangements. Please contact us to confirm your booking and final price.'

export const navLinks = [
  { label: 'Home', href: '/#top' },
  { label: 'Services', href: '/#services' },
  { label: 'Routes & prices', href: '/rates' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Book', href: '/#contact' },
] as const
