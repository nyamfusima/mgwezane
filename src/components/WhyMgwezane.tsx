import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Reveal, staggerChild, staggerParent } from './motion/Reveal'

const reasons = [
  {
    title: 'A seat, or the whole vehicle',
    body: 'Travel on a scheduled run between Limpopo and Gauteng, or book the car privately for your family, your group or your occasion.',
  },
  {
    title: 'The routes people actually need',
    body: 'Pretoria, Johannesburg and the suburbs around them, with published fares for every destination we serve regularly.',
  },
  {
    title: 'Holiday travel, planned properly',
    body: 'We are a travel agent as well as a shuttle service, so the trip can be arranged end to end rather than just the drive.',
  },
  {
    title: 'Parcels on a trip already going',
    body: 'Send something to Pretoria or Johannesburg on a run that is leaving anyway, instead of waiting on a courier.',
  },
  {
    title: 'Anywhere else, on request',
    body: 'Rustenburg, Brits, Bloemfontein, Durban and the rest of the country. If it is not on the list, ask us for a quote.',
  },
]

export function WhyMgwezane() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ink-950 py-20 text-paper sm:py-24 lg:py-28"
    >
      <motion.img
        src="/assets/journeys/kalahari-dusk.jpg"
        srcSet="/assets/journeys/kalahari-dusk-820.jpg 820w, /assets/journeys/kalahari-dusk.jpg 1600w"
        sizes="100vw"
        width={1600}
        height={686}
        loading="lazy"
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-[116%] w-full object-cover"
        style={reduced ? undefined : { y: backgroundY }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink-950/82" />

      <div className="shell">
        <Reveal>
          <h2 className="display-lg max-w-[16ch] text-balance text-paper">
            Why travel with Mgwezane.
          </h2>
          <p className="mt-6 max-w-[48ch] leading-relaxed text-paper/75">
            We are a small transport and travel business, not a booking platform. What we offer
            is what we actually do.
          </p>
        </Reveal>

        <motion.ul
          variants={reduced ? undefined : staggerParent}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'shown'}
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.li
              key={reason.title}
              variants={reduced ? undefined : staggerChild}
              className="bg-ink-950/85 p-7 backdrop-blur-[2px] transition-colors duration-500 hover:bg-ink-900/90 sm:p-8"
            >
              <span aria-hidden className="block h-px w-9 bg-gold-500" />
              <h3 className="display-sm mt-5 text-paper">{reason.title}</h3>
              <p className="mt-3 text-[0.87rem] leading-relaxed text-paper/70">{reason.body}</p>
            </motion.li>
          ))}
          <li className="bg-ink-950/85 p-7 sm:p-8">
            <span aria-hidden className="block h-px w-9 bg-gold-500" />
            <h3 className="display-sm mt-5 text-gold-400">What we will not do</h3>
            <p className="mt-3 text-[0.87rem] leading-relaxed text-paper/70">
              Confirm a booking on a web page. Every trip is agreed with you directly, and
              secured by the deposit, before anything is final.
            </p>
          </li>
        </motion.ul>
      </div>
    </section>
  )
}
