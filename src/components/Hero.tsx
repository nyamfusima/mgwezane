import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from '../data/icons'
import { EASE } from './motion/Reveal'

const LINES = ['Your Journey.', 'Our Priority.']

type HeroProps = {
  onBook: () => void
}

export function Hero({ onBook }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // The photograph drifts a little slower than the page, and dims as it leaves.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-ink-950 text-paper"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
        initial={reduced ? false : { scale: 1.08, x: '3%' }}
        animate={reduced ? undefined : { scale: 1, x: '0%' }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/assets/journeys/hero-vehicle-portrait-600.jpg 600w, /assets/journeys/hero-vehicle-portrait.jpg 900w"
            sizes="100vw"
          />
          <img
            src="/assets/journeys/hero-vehicle.jpg"
            srcSet="/assets/journeys/hero-vehicle-900.jpg 900w, /assets/journeys/hero-vehicle.jpg 1400w"
            sizes="100vw"
            width={1400}
            height={1050}
            alt="A silver Kia Sorento photographed beside a city bridge at night; illustrative stock photography, not a Mgwezane vehicle"
            {...{ fetchpriority: 'high' }}
            className="h-full w-full object-cover object-[58%_center] md:object-[center_55%]"
          />
        </picture>
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-ink-950/35"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950/95 via-ink-950/55 to-ink-950/25 md:bg-linear-to-r md:from-ink-950/95 md:from-5% md:via-ink-950/72 md:via-43% md:to-ink-950/5"
      />

      <motion.div
        className="shell pt-32 pb-20 sm:pb-24 lg:pt-36 lg:pb-28"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="micro mb-5 text-gold-400"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Shuttle & private transport
        </motion.p>
        <h1 className="display-hero max-w-[16ch] text-balance text-paper">
          {LINES.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={reduced ? undefined : { y: '0%' }}
                transition={{ duration: 1, delay: 0.15 + index * 0.13, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
        >
          <div className="mt-8 h-px w-24 bg-gold-500" aria-hidden />
          <p className="mt-7 max-w-[46ch] text-[1.02rem] leading-relaxed text-paper/85 sm:text-[1.1rem]">
            Shuttle services, private trips and travel arrangements between Polokwane,
            Pretoria, Johannesburg and destinations across South Africa.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
            <button
              type="button"
              onClick={onBook}
              className="group inline-flex items-center gap-3 bg-azure px-7 py-4 text-[0.85rem] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800"
            >
              Book Your Journey
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <a
              href="/rates"
              className="group inline-flex items-center gap-2.5 border border-paper/35 px-7 py-4 text-[0.85rem] font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-400"
            >
              View Routes & Prices
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
          <p className="mt-8 text-[0.78rem] font-medium tracking-wide text-paper/70">
            Polokwane <span className="px-2 text-gold-400">/</span> Pretoria
            <span className="px-2 text-gold-400">/</span> Johannesburg
          </p>
        </motion.div>
      </motion.div>

      <motion.span
        aria-hidden
        className="absolute bottom-7 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-paper/50 to-transparent lg:block"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: [0, 1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
      />
    </section>
  )
}
