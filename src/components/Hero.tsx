import { useEffect, useRef, useState } from 'react'
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
  const [playVideo, setPlayVideo] = useState(false)
  const [ready, setReady] = useState(false)

  // Video only on desktop-sized screens, with motion allowed and no data-saver or slow connection.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')
    setPlayVideo(!reduced && !slow && window.matchMedia('(min-width: 768px)').matches)
  }, [reduced])

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
          <source media="(max-width: 767px)" srcSet="/assets/hero/hero-poster-mobile.webp" type="image/webp" />
          <img
            src="/assets/hero/hero-poster.webp"
            width={1600}
            height={900}
            alt=""
            {...{ fetchpriority: 'high' }}
            className="h-full w-full object-cover object-[60%_center]"
          />
        </picture>
        {playVideo && (
          <video
            className={`absolute inset-y-0 left-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
            poster="/assets/hero/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onCanPlay={() => setReady(true)}
            onError={() => setPlayVideo(false)}
          >
            <source src="/assets/hero/hero.webm" type="video/webm" />
            <source src="/assets/hero/hero.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-black/20 md:bg-transparent"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/45 to-black/10 md:bg-linear-to-r md:from-black/60 md:from-2% md:via-black/25 md:via-35% md:to-black/0 md:to-60%"
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
          MGWEZANE SHUTTLE SERVICES
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
              BOOK YOUR JOURNEY
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <a
              href="#services"
              className="group inline-flex items-center gap-2.5 border border-paper/35 px-7 py-4 text-[0.85rem] font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-400"
            >
              EXPLORE OUR SERVICES
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
