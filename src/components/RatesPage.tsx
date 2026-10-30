import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  CarFront,
  FileText,
  MapPin,
  Moon,
  Package,
  Route,
  ShieldCheck,
  Users,
} from '../data/icons'
import { depositPolicy } from '../data/business'
import { fareGroups, type Fare, type FareGroup } from '../data/fares'
import { whatsappLink } from '../lib/whatsapp'
import { Reveal } from './motion/Reveal'
import { RouteFinder } from './RouteFinder'
import { WhatsAppIcon } from './WhatsAppIcon'

const EASE = [0.22, 1, 0.36, 1] as const

const enquire = (from: string, to: string) =>
  whatsappLink(
    `Hi Mgwezane Shuttle Services, I would like to enquire about travelling from ${from} to ${to}. Please confirm availability and pricing.`,
  )

const serviceEnquire = (service: string) =>
  whatsappLink(
    `Hi Mgwezane Shuttle Services, I would like to enquire about ${service}. Please confirm availability and pricing.`,
  )

const quoteLink = whatsappLink(
  'Hi Mgwezane Shuttle Services, I would like a custom quote. Pickup location: \nDestination: \nTravel date: \nNumber of passengers: ',
)

const group = (id: string) => fareGroups.find((g) => g.id === id) as FareGroup
const fare = (id: string, destination: string, note?: string) =>
  group(id).fares.find((f) => f.destination === destination && f.note === note) as Fare

const popular = [
  { to: 'Pretoria CBD', fare: fare('pretoria', 'Pretoria CBD, Menlyn, Brooklyn, Hatfield, Sunnyside, Montana & Arcadia') },
  { to: 'Johannesburg CBD', fare: fare('johannesburg', 'Johannesburg CBD, Auckland Park & surrounding areas') },
  { to: 'OR Tambo Airport', fare: fare('johannesburg', 'O.R. Tambo International Airport') },
  { to: 'Sandton', fare: fare('johannesburg', 'Sandton') },
  { to: 'Midrand', fare: fare('johannesburg', 'Midrand') },
  { to: 'Soweto', fare: fare('johannesburg-south', 'Soweto') },
]

const vehicles = [
  {
    seats: 4,
    routes: [
      { label: 'Pretoria → Polokwane', fare: fare('whole-vehicle', 'Pretoria to Polokwane', '4-seater'), from: 'Pretoria', to: 'Polokwane' },
      { label: 'Johannesburg → Polokwane', fare: fare('whole-vehicle', 'Johannesburg to Polokwane', '4-seater'), from: 'Johannesburg', to: 'Polokwane' },
    ],
  },
  {
    seats: 7,
    routes: [
      { label: 'Pretoria → Polokwane', fare: fare('whole-vehicle', 'Pretoria to Polokwane', '7-seater'), from: 'Pretoria', to: 'Polokwane' },
      { label: 'Johannesburg → Polokwane', fare: fare('whole-vehicle', 'Johannesburg to Polokwane', '7-seater'), from: 'Johannesburg', to: 'Polokwane' },
    ],
  },
]

const tables = [
  { id: 'pretoria', title: 'Polokwane / Mokopane → Pretoria', origin: 'Polokwane / Mokopane' },
  { id: 'johannesburg', title: 'Polokwane / Mokopane → Johannesburg', origin: 'Polokwane / Mokopane' },
  { id: 'johannesburg-south', title: 'Johannesburg South', origin: 'Polokwane / Mokopane' },
  { id: 'johannesburg-west', title: 'Johannesburg West', origin: 'Polokwane' },
  { id: 'interprovincial', title: 'Other Interprovincial Routes', origin: 'Polokwane' },
]

const steps = [
  'Choose your route.',
  'Confirm passengers and trip details.',
  'Request confirmation via WhatsApp.',
]

const btn =
  'inline-flex items-center justify-center gap-2 rounded-full bg-azure font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-lg hover:shadow-ink-950/25'

function Label({ children }: { children: string }) {
  return <p className="micro text-azure">{children}</p>
}

function SectionHead({ label, title, text }: { label?: string; title: string; text?: string }) {
  return (
    <Reveal className="max-w-2xl">
      {label && <Label>{label}</Label>}
      <h2 className="display-lg mt-3 text-balance text-ink-900">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-slate-ink">{text}</p>}
    </Reveal>
  )
}

export function RatesPage() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* Intro */}
      <section className="bg-white pt-36 pb-16 sm:pt-40 lg:pt-44">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Label>ROUTES & PRICES</Label>
            <h1 className="display-lg mt-4 text-balance text-ink-900">
              Mgwezane Shuttle Services Rates
            </h1>
            <p className="mx-auto mt-5 max-w-[56ch] leading-relaxed text-slate-ink">
              Choose your route, view our available fares and contact us on WhatsApp to arrange
              your journey. For custom routes and additional stops, contact us for a quotation.
            </p>
          </Reveal>

          <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal as="li" key={step} delay={index * 0.08}>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-ink-900/10 bg-paper/60 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-azure font-display text-[1rem] font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span className="text-[0.92rem] font-bold leading-snug text-ink-900">{step}</span>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mx-auto mt-12 max-w-4xl">
            <RouteFinder />
          </Reveal>

          <Reveal className="mt-10 text-center">
            <a href={quoteLink} target="_blank" rel="noreferrer" className={`${btn} px-8 py-4 text-[0.78rem] tracking-[0.14em] uppercase`}>
              <WhatsAppIcon size={17} />
              Request a custom quote
            </a>
          </Reveal>
        </div>
      </section>

      {/* Popular routes */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <SectionHead label="MOST REQUESTED" title="Popular Routes" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((route, index) => (
              <Reveal as="li" key={route.to} delay={(index % 3) * 0.07}>
                <motion.article
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex h-full flex-col rounded-2xl border border-ink-900/10 bg-white p-6 shadow-[0_14px_34px_-24px_rgba(5,42,69,0.35)] transition-shadow duration-300 hover:shadow-[0_22px_44px_-22px_rgba(5,42,69,0.4)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-azure/10 text-azure">
                      <Route size={18} aria-hidden />
                    </span>
                    <p className="micro text-slate-ink">Polokwane / Mokopane</p>
                  </div>
                  <h3 className="mt-5 flex items-center gap-2 font-display text-[1.3rem] font-extrabold text-ink-900">
                    <ArrowRight size={18} className="text-azure" aria-hidden />
                    {route.to}
                  </h3>
                  <p className="mt-4 font-display text-[2.4rem] leading-none font-extrabold text-azure">
                    {route.fare.price}
                  </p>
                  <a
                    href={enquire('Polokwane', route.to)}
                    target="_blank"
                    rel="noreferrer"
                    className={`${btn} mt-6 py-3.5 text-[0.72rem] tracking-[0.14em] uppercase`}
                  >
                    Book this route
                  </a>
                </motion.article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Vehicles */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <SectionHead
            label="PRIVATE VEHICLE BOOKINGS"
            title="Book a whole vehicle"
            text="The fare covers the vehicle rather than a seat."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {vehicles.map((vehicle, index) => (
              <Reveal key={vehicle.seats} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-ink-900/10 bg-paper/60 p-7">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="flex items-center gap-3 font-display text-[1.5rem] font-extrabold text-ink-900">
                      <CarFront size={24} className="text-azure" aria-hidden />
                      {vehicle.seats}-Seater Vehicle
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-bold text-ink-900 ring-1 ring-ink-900/10">
                      <Users size={14} className="text-azure" aria-hidden />
                      {vehicle.seats} passengers
                    </span>
                  </div>
                  <ul className="mt-6 divide-y divide-ink-900/10">
                    {vehicle.routes.map((row) => (
                      <li key={row.label} className="flex flex-wrap items-center justify-between gap-4 py-4">
                        <div>
                          <p className="font-bold text-ink-900">{row.label}</p>
                          <p className="mt-1 font-display text-[1.9rem] leading-none font-extrabold text-azure">
                            {row.fare.price}
                          </p>
                        </div>
                        <a
                          href={enquire(row.from, row.to).replace(
                            'Please confirm',
                            `I need a ${vehicle.seats}-seater vehicle. Please confirm`,
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className={`${btn} px-5 py-3 text-[0.7rem] tracking-[0.12em] uppercase`}
                        >
                          Enquire
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full price list */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <SectionHead
            label="FULL PRICE LIST"
            title="Every route and fare"
            text="Select a destination to start a WhatsApp enquiry."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {tables.map((table, index) => {
              const data = group(table.id)
              return (
                <Reveal
                  key={table.id}
                  delay={(index % 2) * 0.07}
                  className={index === 0 || index === 1 ? 'lg:row-span-1' : ''}
                >
                  <div className="h-full overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-[0_14px_34px_-26px_rgba(5,42,69,0.35)]">
                    <div className="flex items-center gap-3 border-b border-ink-900/10 bg-white px-5 py-4">
                      <span className="grid size-9 place-items-center rounded-full bg-azure/10 text-azure">
                        <MapPin size={17} aria-hidden />
                      </span>
                      <h3 className="font-display text-[1.1rem] font-extrabold text-ink-900">
                        {table.title}
                      </h3>
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-ink-900/[0.03] text-[0.68rem] font-bold tracking-[0.14em] text-slate-ink uppercase">
                          <th scope="col" className="px-5 py-2.5">Destination</th>
                          <th scope="col" className="px-2 py-2.5 text-right">Fare</th>
                          <th scope="col" className="py-2.5 pr-5 pl-2 text-right">
                            <span className="sr-only">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-900/[0.07]">
                        {data.fares.map((row) => {
                          const from = row.origin ?? table.origin
                          return (
                            <tr key={`${row.origin}-${row.destination}`} className="transition-colors hover:bg-azure/[0.04]">
                              <td className="px-5 py-3 text-[0.88rem] font-medium leading-snug text-ink-900">
                                {row.destination}
                                {(row.origin || row.note) && (
                                  <span className="mt-0.5 block text-[0.72rem] font-normal text-slate-ink">
                                    {row.origin && `From ${row.origin}`}
                                    {row.origin && row.note && ' · '}
                                    {row.note}
                                  </span>
                                )}
                              </td>
                              <td className="px-2 py-3 text-right font-display text-[1rem] font-extrabold whitespace-nowrap text-azure">
                                {row.price}
                              </td>
                              <td className="py-3 pr-5 pl-2 text-right">
                                <a
                                  href={enquire(from, row.destination)}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label={`Enquire on WhatsApp: ${from} to ${row.destination}`}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-azure/40 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.1em] text-azure uppercase transition-colors duration-300 hover:bg-azure hover:text-white"
                                >
                                  <WhatsAppIcon size={13} />
                                  Book
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <p className="border-t border-ink-900/10 px-5 py-3 text-[0.72rem] text-slate-ink">
                      From {table.origin}. Please confirm pricing basis when booking.
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="bg-white py-16 sm:py-20">
        <div className="shell">
          <SectionHead label="ADDITIONAL SERVICES" title="Parcels & other services" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Package, title: 'Parcel delivery', sub: 'Polokwane → Pretoria', row: 0, msg: 'parcel delivery from Polokwane to Pretoria' },
              { icon: Package, title: 'Parcel delivery', sub: 'Polokwane → Johannesburg', row: 1, msg: 'parcel delivery from Polokwane to Johannesburg' },
              { icon: Moon, title: 'Overnight shuttle', sub: '', row: 2, msg: 'an overnight shuttle' },
              { icon: FileText, title: 'Tender document services', sub: '', row: 3, msg: 'tender document services' },
            ].map((item, index) => {
              const Icon = item.icon
              const price = group('other-services').fares[item.row].price
              return (
                <Reveal as="li" key={item.msg} delay={index * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-ink-900/10 bg-paper/60 p-5">
                    <Icon size={22} className="text-azure" aria-hidden />
                    <h3 className="mt-4 font-display text-[1.05rem] font-extrabold text-ink-900">{item.title}</h3>
                    {item.sub && <p className="text-[0.82rem] text-slate-ink">{item.sub}</p>}
                    <p className="mt-3 font-display text-[1.7rem] leading-none font-extrabold text-azure">{price}</p>
                    <a
                      href={serviceEnquire(item.msg)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-[0.74rem] font-bold tracking-[0.1em] text-ink-900 uppercase transition-colors hover:text-azure"
                    >
                      Enquire <ArrowRight size={14} aria-hidden />
                    </a>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Deposit policy */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="shell">
          <Reveal>
            <div className="mx-auto flex max-w-4xl gap-5 rounded-2xl border border-azure/30 bg-azure/[0.05] p-6 sm:p-8">
              <ShieldCheck size={28} className="mt-1 shrink-0 text-azure" aria-hidden />
              <div>
                <h2 className="font-display text-[1.25rem] font-extrabold text-ink-900">Deposit policy</h2>
                <p className="mt-2 font-bold text-ink-900">{depositPolicy.rule}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-slate-ink">{depositPolicy.confirmation}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Custom quote */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="display-lg text-balance text-ink-900">Travelling somewhere else?</h2>
            <p className="mt-4 leading-relaxed text-slate-ink">
              Contact us with your pickup location, destination, travel date and number of
              passengers. We will confirm the arrangements and applicable fare.
            </p>
            <a href={quoteLink} target="_blank" rel="noreferrer" className={`${btn} mt-8 px-8 py-4 text-[0.78rem] tracking-[0.14em] uppercase`}>
              <WhatsAppIcon size={17} />
              Request a custom quote
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
