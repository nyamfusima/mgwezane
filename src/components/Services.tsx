import { motion, useReducedMotion } from 'motion/react'
import { featuredServices, otherServices } from '../data/services'
import { whatsappLink } from '../lib/whatsapp'
import { EASE, Reveal } from './motion/Reveal'

export function Services() {
  const reduced = useReducedMotion()

  return (
    <section id="services" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="micro text-gold-700">Our Services</p>
          <h2 className="display-lg mt-4 text-balance text-ink-900">
            Shuttle Services for Every Journey
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-slate-ink">
            Private trips, shuttles, vacations, weddings, funerals and parcel delivery.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <motion.li
              key={service.id}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
              className="group flex flex-col items-center text-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
            >
              <h3 className="font-display text-[1.45rem] font-extrabold tracking-tight text-ink-900">
                {service.title}
              </h3>

              <div className="mt-6 aspect-square w-full max-w-[17rem] overflow-hidden rounded-full bg-parchment shadow-[0_18px_40px_-18px_rgba(3,28,48,0.45)] ring-1 ring-ink-900/5">
                <img
                  src={`/assets/services/${service.image}.jpg`}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  alt={service.alt}
                  style={{ objectPosition: service.position }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
              </div>

              <p className="mt-7 max-w-[30ch] text-[0.95rem] leading-relaxed text-slate-ink">
                {service.description}
              </p>

              <a
                href={whatsappLink(service.message)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Enquire about ${service.title} on WhatsApp`}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-azure px-7 py-3.5 text-[0.72rem] font-bold tracking-[0.14em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-lg hover:shadow-ink-950/25"
              >
                Enquire now
              </a>
            </motion.li>
          ))}
        </ul>

        <Reveal>
          <p className="mx-auto mt-16 max-w-2xl border-t border-parchment-600/80 pt-8 text-center text-[0.9rem] text-slate-ink">
            <span className="font-bold text-ink-900">Also available: </span>
            {otherServices.join(' · ')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
