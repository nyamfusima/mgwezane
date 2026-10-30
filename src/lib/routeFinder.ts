import { fareGroups } from '../data/fares'

export type RouteKind = 'Seat fare' | 'Whole vehicle' | 'Parcel delivery'

export type RouteOption = {
  id: string
  from: string
  to: string
  price: string
  /** Only set where the business stated one, e.g. "per person" or "7-seater". */
  note?: string
  kind: RouteKind
}

/** Groups whose rows are a straight origin-to-destination seat fare. */
const SEAT_GROUPS = new Set([
  'pretoria',
  'johannesburg',
  'johannesburg-south',
  'johannesburg-west',
  'interprovincial',
])

/** "Johannesburg to Polokwane" -> ["Johannesburg", "Polokwane"]. */
function splitPair(label: string): [string, string] | null {
  const parts = label.split(' to ')
  return parts.length === 2 ? [parts[0].trim(), parts[1].trim()] : null
}

/**
 * Turns the published fare list into from/to pairs the finder can offer.
 *
 * Rows that are a service rather than a journey — the overnight shuttle and the
 * tender document service — have no origin and destination, so they are left
 * out of the picker. They stay in the full price list below it.
 */
function buildRoutes(): RouteOption[] {
  const routes: RouteOption[] = []

  for (const group of fareGroups) {
    for (const fare of group.fares) {
      const common = { price: fare.price, note: fare.note }

      if (SEAT_GROUPS.has(group.id)) {
        routes.push({
          id: `${group.id}-${fare.destination}-${fare.note ?? ''}`,
          from: fare.origin ?? group.origin,
          to: fare.destination,
          kind: 'Seat fare',
          ...common,
        })
        continue
      }

      if (group.id === 'whole-vehicle') {
        const pair = splitPair(fare.destination)
        if (!pair) continue
        routes.push({
          id: `${group.id}-${fare.destination}-${fare.note ?? ''}`,
          from: pair[0],
          to: pair[1],
          kind: 'Whole vehicle',
          ...common,
        })
        continue
      }

      if (group.id === 'other-services') {
        const parcel = fare.destination.match(/^Parcel delivery, (.+)$/)
        const pair = parcel && splitPair(parcel[1])
        if (!pair) continue
        routes.push({
          id: `${group.id}-${fare.destination}-${fare.note ?? ''}`,
          from: pair[0],
          to: pair[1],
          kind: 'Parcel delivery',
          ...common,
        })
      }
    }
  }

  return routes
}

export const routeOptions = buildRoutes()

/** The places people actually leave from, most-used first. */
const ORIGIN_ORDER = ['Polokwane & Mokopane', 'Polokwane', 'Tzaneen', 'Johannesburg', 'Pretoria']

export const routeOrigins = [...new Set(routeOptions.map((route) => route.from))].sort(
  (a, b) => {
    const rank = (value: string) => {
      const index = ORIGIN_ORDER.indexOf(value)
      return index === -1 ? ORIGIN_ORDER.length : index
    }
    return rank(a) - rank(b) || a.localeCompare(b)
  },
)

export function destinationsFor(from: string): string[] {
  return [...new Set(routeOptions.filter((route) => route.from === from).map((r) => r.to))].sort(
    (a, b) => a.localeCompare(b),
  )
}

export function findRoutes(from: string, to: string): RouteOption[] {
  return routeOptions.filter((route) => route.from === from && route.to === to)
}

/**
 * Free-text match across both ends of a route and what the fare buys, so that
 * "parcel" or "whole vehicle" find those rows as well as place names.
 */
export function searchRoutes(query: string, limit = 10): RouteOption[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  return routeOptions
    .filter((route) =>
      `${route.from} ${route.to} ${route.kind} ${route.note ?? ''}`.toLowerCase().includes(needle),
    )
    .slice(0, limit)
}
