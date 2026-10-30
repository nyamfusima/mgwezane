import { useEffect, useState } from 'react'
import { Facebook, Mail, Phone } from '../data/icons'
import { business } from '../data/business'
import { services } from '../data/services'
import { enquiryMessage, whatsappLink } from '../lib/whatsapp'
import { Reveal } from './motion/Reveal'
import { WhatsAppIcon } from './WhatsAppIcon'

export type BookingPrefill = {
  pickup?: string
  destination?: string
  /** Bumped every time a route is chosen, so repeat choices still re-apply. */
  key: number
}

type Fields = {
  name: string
  pickup: string
  destination: string
  date: string
  passengers: string
  service: string
  notes: string
}

const emptyFields: Fields = {
  name: '',
  pickup: '',
  destination: '',
  date: '',
  passengers: '1',
  service: '',
  notes: '',
}

const passengerOptions = ['1', '2', '3', '4', '5', '6', '7', '8 or more']

const fieldClass =
  'mt-1.5 h-12 w-full border border-ink-900/15 bg-paper px-3.5 text-[0.9rem] text-ink-900 outline-none transition placeholder:text-slate-ink focus:border-azure'

const labelClass = 'block text-[0.78rem] font-medium text-ink-900'

export function Booking({ prefill }: { prefill: BookingPrefill }) {
  const [fields, setFields] = useState<Fields>(emptyFields)

  useEffect(() => {
    if (prefill.key === 0) return
    setFields((current) => ({
      ...current,
      pickup: prefill.pickup ?? current.pickup,
      destination: prefill.destination ?? current.destination,
    }))
  }, [prefill])

  const update = (name: keyof Fields) => (event: { target: { value: string } }) =>
    setFields((current) => ({ ...current, [name]: event.target.value }))

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = enquiryMessage(
      'Good day Mgwezane, I would like to request a trip. Please confirm availability and the price.',
      [
        ['Name', fields.name],
        ['Service', fields.service],
        ['Pickup', fields.pickup],
        ['Destination', fields.destination],
        ['Travel date', fields.date],
        ['Passengers', fields.passengers],
        ['Additional information', fields.notes],
      ],
    )
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="bg-white py-20 text-ink-900 sm:py-24 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="display-lg max-w-[12ch] text-balance text-ink-900">
              Book your journey.
            </h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-slate-ink">
              Share your trip details and continue in WhatsApp. Your enquiry is not a confirmed
              booking.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
              <div className="flex items-center gap-4 py-4">
                <Phone size={17} aria-hidden className="shrink-0 text-azure" />
                <div>
                  <dt className="text-[0.74rem] text-slate-ink">Phone and WhatsApp</dt>
                  <dd>
                    <a
                      href={business.phoneHref}
                      className="inline-block py-0.5 font-display text-[1.1rem] font-bold text-ink-900 hover:text-azure"
                    >
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4">
                <Mail size={17} aria-hidden className="shrink-0 text-azure" />
                <div className="min-w-0">
                  <dt className="text-[0.74rem] text-slate-ink">Email</dt>
                  <dd className="truncate">
                    <a
                      href={`mailto:${business.email}`}
                      className="inline-block py-0.5 font-display text-[1.1rem] font-bold text-ink-900 hover:text-azure"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4">
                <Facebook size={17} aria-hidden className="shrink-0 text-azure" />
                <div>
                  <dt className="text-[0.74rem] text-slate-ink">Facebook</dt>
                  <dd className="font-display text-[1.1rem] font-bold text-ink-900">
                    {business.facebookUrl ? (
                      <a
                        href={business.facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-azure"
                      >
                        {business.facebookPage}
                      </a>
                    ) : (
                      business.facebookPage
                    )}
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={submit} className="rounded-2xl border border-ink-900/10 bg-parchment/50 p-6 text-ink-900 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <p className="sm:col-span-2">
                <label className={labelClass} htmlFor="booking-name">
                  Full name
                </label>
                <input
                  id="booking-name"
                  className={fieldClass}
                  value={fields.name}
                  onChange={update('name')}
                  required
                  autoComplete="name"
                  placeholder="Who should we reply to?"
                />
              </p>

              <p className="sm:col-span-2">
                <label className={labelClass} htmlFor="booking-service">
                  Service type
                </label>
                <select
                  id="booking-service"
                  className={fieldClass}
                  value={fields.service}
                  onChange={update('service')}
                  required
                >
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </p>

              <p>
                <label className={labelClass} htmlFor="booking-pickup">
                  Pickup location
                </label>
                <input
                  id="booking-pickup"
                  className={fieldClass}
                  value={fields.pickup}
                  onChange={update('pickup')}
                  required
                  placeholder="Where do we collect you?"
                />
              </p>

              <p>
                <label className={labelClass} htmlFor="booking-destination">
                  Destination
                </label>
                <input
                  id="booking-destination"
                  className={fieldClass}
                  value={fields.destination}
                  onChange={update('destination')}
                  required
                  placeholder="Where are you going?"
                />
              </p>

              <p>
                <label className={labelClass} htmlFor="booking-date">
                  Travel date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  className={fieldClass}
                  value={fields.date}
                  onChange={update('date')}
                />
              </p>

              <p>
                <label className={labelClass} htmlFor="booking-passengers">
                  Passengers
                </label>
                <select
                  id="booking-passengers"
                  className={fieldClass}
                  value={fields.passengers}
                  onChange={update('passengers')}
                >
                  {passengerOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </p>

              <p className="sm:col-span-2">
                <label className={labelClass} htmlFor="booking-notes">
                  Additional message
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  className={`${fieldClass} h-auto py-3 leading-relaxed`}
                  value={fields.notes}
                  onChange={update('notes')}
                  placeholder="Luggage, a return trip, a pickup time, a parcel to send"
                />
              </p>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-3 bg-azure px-7 py-4 text-[0.88rem] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800 sm:w-auto"
            >
              <WhatsAppIcon size={18} />
              Send this request on WhatsApp
            </button>
            <p className="mt-3 text-[0.76rem] leading-relaxed text-slate-ink">
              This opens WhatsApp with your details written out. Your booking is confirmed by
              Mgwezane in that conversation, not on this page. All trips are subject to
              availability.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
