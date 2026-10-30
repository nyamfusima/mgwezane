import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import {
  corridorPath,
  mapArcs,
  mapCities,
  mapViewBox,
  provinces,
} from '../data/mapGeometry'
import { EASE, Reveal } from './motion/Reveal'

const CITY_RADIUS = { hub: 7, listed: 5, onward: 4.5 } as const

/** A small side-on shuttle, drawn around its own origin so it can be rotated. */
function Shuttle() {
  return (
    <g>
      <ellipse cx="0" cy="7.5" rx="18" ry="3.5" fill="#031c30" opacity="0.5" />
      {/* Outlined, because the corridor underneath it is the same ivory. */}
      <path
        d="M-15 4V0q0-2.2 2.1-2.9l6.2-2.1q3-1 6.2-1h4.9q2.9 0 4.7 2.1L12 0h1.6q2 0 2 2v2q0 1.6-1.6 1.6h-27.3Q-15 5.6-15 4Z"
        fill="#f8f7f3"
        stroke="#031c30"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M-9.6-1.6 -4.9-3.2q2.2-.8 4.5-.8h.9v4.4h-13zM2.4-4h3.3q1.9 0 3.1 1.4l1.8 2.4H2.4Z"
        fill="#0070b3"
      />
      <circle cx="-8" cy="5.6" r="3.1" fill="#031c30" />
      <circle cx="-8" cy="5.6" r="1.3" fill="#c5a15b" />
      <circle cx="8.2" cy="5.6" r="3.1" fill="#031c30" />
      <circle cx="8.2" cy="5.6" r="1.3" fill="#c5a15b" />
    </g>
  )
}

type Route = { id: string; d: string; label: string }

const cityName = (id: string) => mapCities.find((city) => city.id === id)?.name ?? id

const routes: Route[] = [
  { id: 'corridor', d: corridorPath, label: 'Polokwane to Johannesburg' },
  ...mapArcs.map((arc) => ({
    id: arc.id,
    d: arc.d,
    label: `${cityName(arc.from)} to ${cityName(arc.to)}`,
  })),
]

const pause = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

export function SouthAfricaMap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shuttleRef = useRef<SVGGElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px' })
  const reduced = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)
  const [routeIndex, setRouteIndex] = useState(0)

  // The vehicle is driven along each route's own path by sampling it, one route
  // after another. Nothing here tracks a vehicle; it is an illustration.
  useEffect(() => {
    const shuttle = shuttleRef.current
    if (!shuttle) return

    const measure = (d: string) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', d)
      return path
    }
    const measured = routes.map((route) => measure(route.d))

    const place = (path: SVGPathElement, t: number) => {
      const length = path.getTotalLength()
      const at = t * length
      const here = path.getPointAtLength(at)
      const behind = path.getPointAtLength(Math.max(0, at - 2))
      const ahead = path.getPointAtLength(Math.min(length, at + 2))
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI
      // Flip when heading left so the vehicle never drives upside down.
      const flip = Math.abs(angle) > 90 ? -1 : 1
      shuttle.setAttribute(
        'transform',
        `translate(${here.x} ${here.y}) rotate(${angle}) scale(1.75 ${1.75 * flip})`,
      )
    }

    // With reduced motion the vehicle is simply parked at the start of the
    // main route, whether or not the section has been scrolled to.
    if (reduced) {
      place(measured[0], 0)
      shuttle.style.opacity = '1'
      return
    }

    if (!inView) return

    let cancelled = false
    let controls: { stop: () => void } | null = null

    const run = async () => {
      await pause(1800)
      shuttle.style.opacity = '1'
      while (!cancelled) {
        for (let i = 0; i < measured.length && !cancelled; i += 1) {
          setRouteIndex(i)
          place(measured[i], 0)
          const driving = animate(0, 1, {
            duration: i === 0 ? 5 : 3,
            ease: 'easeInOut',
            onUpdate: (t) => place(measured[i], t),
          })
          controls = driving
          await driving.then(
            () => undefined,
            () => undefined,
          )
          await pause(650)
        }
      }
    }
    void run()

    return () => {
      cancelled = true
      controls?.stop()
    }
  }, [inView, reduced])
  const show = inView || reduced

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden text-ink-900"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <h3 className="display-md max-w-[14ch] text-balance text-ink-900">
              Where we travel.
            </h3>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-slate-ink">
              Our scheduled run follows the N1 between Polokwane, Mokopane, Pretoria and
              Johannesburg, in both directions. From there we travel onward across all nine
              provinces on request.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-9 space-y-4 border-t border-ink-900/15 pt-7">
              <li className="flex items-start gap-3.5">
                <span aria-hidden className="mt-2 h-0.5 w-7 shrink-0 bg-ink-900" />
                <span className="text-[0.86rem] leading-relaxed text-slate-ink">
                  <strong className="font-bold text-ink-900">The main corridor</strong> —
                  Polokwane and Mokopane to Pretoria and Johannesburg.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span
                  aria-hidden
                  className="mt-2 h-0.5 w-7 shrink-0 bg-azure"
                  style={{ maskImage: 'repeating-linear-gradient(to right,#000 0 4px,transparent 4px 7px)' }}
                />
                <span className="text-[0.86rem] leading-relaxed text-slate-ink">
                  <strong className="font-bold text-ink-900">Published routes</strong> —
                  Tzaneen, Rustenburg, Bloemfontein and Durban, with fares in the price list.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span
                  aria-hidden
                  className="mt-2 h-0.5 w-7 shrink-0 bg-ink-800"
                  style={{ maskImage: 'repeating-linear-gradient(to right,#000 0 2px,transparent 2px 6px)' }}
                />
                <span className="text-[0.86rem] leading-relaxed text-slate-ink">
                  <strong className="font-bold text-ink-900">On request</strong> — Mbombela,
                  Cape Town, Gqeberha and anywhere else you need to be.
                </span>
              </li>
            </ul>
            <p className="mt-7 text-[0.76rem] leading-relaxed text-slate-ink">
              An illustration of the routes we run, not live vehicle tracking.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <svg
            viewBox={`0 0 ${mapViewBox.width} ${mapViewBox.height}`}
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label="Map of South Africa showing all nine provinces, the Polokwane to Johannesburg corridor, and onward destinations"
          >
            <defs>
              <filter id="shuttle-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g>
              {provinces.map((province, index) => (
                <motion.path
                  key={province.id}
                  d={province.d}
                  fillRule="evenodd"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={show ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.6, delay: index * 0.055, ease: EASE }}
                  onMouseEnter={() => setActive(province.id)}
                  onMouseLeave={() => setActive(null)}
                  className="cursor-default transition-[fill] duration-300"
                  fill={active === province.id ? '#b8dcf5' : '#e3f2fc'}
                  stroke="#0090e0"
                  strokeWidth={active === province.id ? 2 : 1}
                  strokeOpacity={active === province.id ? 0.95 : 0.6}
                />
              ))}
            </g>

            <g className="pointer-events-none">
              {provinces.map((province, index) => (
                <motion.text
                  key={province.id}
                  x={province.labelX}
                  y={province.labelY}
                  textAnchor="middle"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={show ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.055 }}
                  className="font-sans text-[32px] font-semibold tracking-[0.08em] sm:text-[24px] lg:text-[19px]"
                  fill={active === province.id ? '#031c30' : '#0070b3'}
                  fillOpacity={active === province.id ? 1 : 0.75}
                >
                  {active === province.id ? province.name : province.abbr}
                </motion.text>
              ))}
            </g>

            {/* Onward arcs draw after the provinces have settled. */}
            <g className="pointer-events-none" fill="none" strokeLinecap="round">
              {mapArcs.map((arc, index) => (
                <motion.path
                  key={arc.id}
                  d={arc.d}
                  stroke={arc.kind === 'listed' ? '#0090e0' : '#6fb4e3'}
                  strokeWidth={routes[routeIndex]?.id === arc.id ? 3.4 : arc.kind === 'listed' ? 2 : 1.6}
                  strokeDasharray={arc.kind === 'listed' ? '7 7' : '2 7'}
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={
                    show
                      ? { pathLength: 1, opacity: !reduced && routes[routeIndex]?.id === arc.id ? 1 : 0.7 }
                      : undefined
                  }
                  transition={{ duration: 1.1, delay: 0.9 + index * 0.09, ease: EASE }}
                />
              ))}
            </g>

            {/* The corridor draws itself, then the shuttle runs along it. */}
            <motion.path
              d={corridorPath}
              fill="none"
              stroke="#031c30"
              strokeWidth={4.5}
              strokeLinecap="round"
              className="pointer-events-none"
              initial={reduced ? false : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
            />

            <g className="pointer-events-none">
              {mapCities.map((city, index) => (
                <motion.g
                  key={city.id}
                  initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                  animate={show ? { opacity: 1, scale: 1 } : undefined}
                  transition={{
                    duration: 0.5,
                    delay: 1.1 + index * 0.06,
                    ease: EASE,
                  }}
                  style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                >
                  {city.kind === 'hub' && (
                    <circle cx={city.x} cy={city.y} r={13} fill="#0090e0" fillOpacity={0.2} />
                  )}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={CITY_RADIUS[city.kind]}
                    fill={city.kind === 'hub' ? '#031c30' : '#0090e0'}
                    stroke="#ffffff"
                    strokeWidth={1.5}
                  />
                  {/* On a phone these labels are large in map units and would
                      cover the province names, so the corridor is named in text
                      under the map instead. */}
                  <text
                    x={city.x + city.dx}
                    y={city.y + city.dy}
                    textAnchor={city.anchor}
                    className={
                      city.kind === 'hub'
                        ? 'hidden font-sans font-semibold sm:block sm:text-[23px] lg:text-[19px]'
                        : 'hidden font-sans font-medium sm:block sm:text-[19px] lg:text-[16px]'
                    }
                    fill={city.kind === 'hub' ? '#031c30' : '#0070b3'}
                    fillOpacity={city.kind === 'hub' ? 1 : 0.82}
                  >
                    {city.name}
                  </text>
                </motion.g>
              ))}
            </g>

            <g
              ref={shuttleRef}
              className="pointer-events-none"
              filter="url(#shuttle-glow)"
              style={{ opacity: 0, transition: 'opacity 400ms' }}
            >
              <Shuttle />
            </g>
          </svg>

          {!reduced && (
            <p aria-hidden className="mt-4 text-center text-[0.82rem] font-bold text-azure">
              {routes[routeIndex]?.label}
            </p>
          )}

          <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.82rem] font-medium text-ink-900 sm:hidden">
            {mapCities
              .filter((city) => city.kind === 'hub')
              .map((city, index) => (
                <li key={city.id} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden className="h-px w-4 bg-azure/70" />
                  )}
                  <span aria-hidden className="size-1.5 rotate-45 bg-ink-900" />
                  {city.name}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
