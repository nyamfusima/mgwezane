import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Reveal } from './motion/Reveal'

export function About() {
  const bandRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // The road photograph grows to full width as it is scrolled through.
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'center center'],
  })
  const width = useTransform(scrollYProgress, [0, 1], ['74%', '100%'])
  const radius = useTransform(scrollYProgress, [0, 1], [10, 0])

  return (
    <section id="about" className="bg-paper pt-20 pb-16 sm:pt-24 lg:pt-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="display-lg max-w-[15ch] text-balance text-ink-900">
              Run from Polokwane, trusted all the way to Gauteng.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="max-w-[60ch] space-y-5 text-[1rem] leading-[1.8] text-slate-ink">
              <p>
                Mgwezane Shuttle Services and Travel Agent moves people, parcels and plans
                between Limpopo and Gauteng. Our scheduled runs connect Polokwane and Mokopane
                with Pretoria and Johannesburg, in both directions, and we take private bookings
                for the whole vehicle when a seat is not enough.
              </p>
              <p>
                We are a travel agent as well as a transport operator, which means we help plan
                the trip itself and not only the drive to it — weddings, funerals, holidays,
                tender documents that have to reach an office before it closes, and journeys to
                provinces well beyond our published routes.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div ref={bandRef} className="mt-16 flex justify-center sm:mt-20">
        <motion.figure
          className="relative overflow-hidden"
          style={reduced ? { width: '100%' } : { width, borderRadius: radius }}
        >
          <img
            src="/assets/journeys/mountain-road.jpg"
            srcSet="/assets/journeys/mountain-road-800.jpg 760w, /assets/journeys/mountain-road.jpg 1500w"
            sizes="100vw"
            width={1500}
            height={844}
            loading="lazy"
            alt="A tarred road curving through mountains in South Africa"
            className="h-[46vw] max-h-[34rem] min-h-[14rem] w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink-950/92 via-ink-950/55 to-transparent"
          />
          <figcaption className="absolute bottom-5 left-5 max-w-[34ch] text-[0.82rem] leading-relaxed text-paper sm:bottom-8 sm:left-8 sm:text-[0.9rem]">
            The N1 between Limpopo and Gauteng — the road every one of our routes is built on.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
