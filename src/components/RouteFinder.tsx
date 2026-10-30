import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown, Search, X } from '../data/icons'
import { priceDisclaimer } from '../data/business'
import {
  destinationsFor,
  findRoutes,
  routeOrigins,
  searchRoutes,
  type RouteOption,
} from '../lib/routeFinder'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

const EASE = [0.22, 1, 0.36, 1] as const

const enquire = (route: RouteOption) =>
  whatsappLink(
    `Hi Mgwezane Shuttle Services, I would like to enquire about travelling from ${route.from} to ${route.to}` +
      `${route.kind === 'Whole vehicle' ? ' (whole vehicle)' : route.kind === 'Parcel delivery' ? ' (parcel delivery)' : ''}` +
      `${route.note ? ` — ${route.note}` : ''}. The listed fare is ${route.price}. Please confirm availability and pricing.`,
  )

const fieldClass =
  'h-14 w-full appearance-none rounded-xl border border-ink-900/15 bg-white pr-11 pl-4 text-[0.95rem] font-semibold text-ink-900 outline-none transition focus:border-azure'

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="micro block text-slate-ink">
        {label}
      </label>
      <div className="relative mt-2">{children}</div>
    </div>
  )
}

function Result({ route }: { route: RouteOption }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-xl border border-ink-900/10 bg-white p-5">
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[1.05rem] font-extrabold text-ink-900">
          {route.from}
          <ArrowRight size={16} className="text-azure" aria-hidden />
          {route.to}
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.78rem] text-slate-ink">
          <span className="rounded-full bg-azure/10 px-2.5 py-1 font-bold text-azure">
            {route.kind}
          </span>
          {route.note && <span>{route.note}</span>}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <p className="font-display text-[2rem] leading-none font-extrabold text-azure">
          {route.price}
        </p>
        <a
          href={enquire(route)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-[0.72rem] font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
        >
          <WhatsAppIcon size={15} />
          Enquire
        </a>
      </div>
    </li>
  )
}

export function RouteFinder() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [query, setQuery] = useState('')
  const reduced = useReducedMotion()

  const destinations = useMemo(() => (from ? destinationsFor(from) : []), [from])

  const searching = query.trim().length > 0
  const results = useMemo(() => {
    if (searching) return searchRoutes(query)
    return from && to ? findRoutes(from, to) : []
  }, [searching, query, from, to])

  const chooseFrom = (value: string) => {
    setFrom(value)
    // Keep the destination only if the new origin still travels there.
    setTo((current) => (current && destinationsFor(value).includes(current) ? current : ''))
  }

  const status = searching
    ? `${results.length} ${results.length === 1 ? 'route' : 'routes'} matching “${query.trim()}”`
    : from && to
      ? `${results.length} published ${results.length === 1 ? 'fare' : 'fares'} for this route`
      : 'Choose where you are leaving from and where you are going.'

  return (
    <div className="rounded-3xl border border-ink-900/10 bg-paper/70 p-6 shadow-[0_20px_50px_-32px_rgba(5,42,69,0.45)] sm:p-8">
      <h3 className="display-md text-ink-900">Find your fare</h3>
      <p className="mt-2 max-w-[54ch] text-[0.9rem] leading-relaxed text-slate-ink">
        Pick your pickup point and destination, or search for a place by name.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field id="route-from" label="From">
          <select
            id="route-from"
            value={from}
            onChange={(event) => chooseFrom(event.target.value)}
            className={fieldClass}
          >
            <option value="">Select pickup point</option>
            {routeOrigins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-azure"
          />
        </Field>

        <Field id="route-to" label="To">
          <select
            id="route-to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            disabled={!from}
            className={`${fieldClass} disabled:cursor-not-allowed disabled:bg-ink-900/[0.04] disabled:text-slate-ink`}
          >
            <option value="">{from ? 'Select destination' : 'Choose a pickup point first'}</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-azure"
          />
        </Field>
      </div>

      <div className="mt-4">
        <label htmlFor="route-search" className="micro block text-slate-ink">
          Or search a route
        </label>
        <div className="relative mt-2">
          <Search
            size={18}
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-azure"
          />
          <input
            id="route-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Sandton, OR Tambo or Durban"
            className="h-14 w-full rounded-xl border border-ink-900/15 bg-white pr-11 pl-12 text-[0.95rem] font-semibold text-ink-900 outline-none transition placeholder:font-normal placeholder:text-slate-ink/80 focus:border-azure"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear the route search"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-2 text-slate-ink transition hover:bg-ink-900/5 hover:text-ink-900"
            >
              <X size={16} aria-hidden />
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-[0.8rem] font-semibold text-slate-ink">
        {status}
      </p>

      <AnimatePresence initial={false} mode="popLayout">
        {results.length > 0 && (
          <motion.ul
            key={searching ? `q-${query}` : `${from}-${to}`}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-3 grid gap-3"
          >
            {results.map((route) => (
              <Result key={route.id} route={route} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {((searching && results.length === 0) || (!searching && from && to && results.length === 0)) && (
        <p className="mt-3 rounded-xl border border-ink-900/10 bg-white px-5 py-5 text-[0.88rem] leading-relaxed text-slate-ink">
          We have no published fare for that route yet. We travel well beyond this list — send us
          the journey and we will quote you.{' '}
          <a
            href={whatsappLink(
              'Hi Mgwezane Shuttle Services, I would like a quote for a route that is not on your price list. Pickup location: \nDestination: \nTravel date: \nNumber of passengers: ',
            )}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-azure underline underline-offset-4"
          >
            Ask for a quote
          </a>
          .
        </p>
      )}

      <p className="mt-6 border-t border-ink-900/10 pt-5 text-[0.76rem] leading-relaxed text-slate-ink">
        {priceDisclaimer}
      </p>
    </div>
  )
}
