import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from '../data/icons'
import { destinations } from '../data/destinations'
import { whatsappLink } from '../lib/whatsapp'
import { Reveal } from './motion/Reveal'

const FEATURED_IDS = [
  'blyde-river-canyon',
  'three-rondavels',
  'gods-window',
  'kruger',
  'magoebaskloof',
  'durban',
  'drakensberg',
  'clarens',
  'sun-city',
  'cape-town',
  'tsitsikamma',
  'hole-in-the-wall',
]

const featuredDestinations = FEATURED_IDS.map((id) => {
  const destination = destinations.find((item) => item.id === id)
  if (!destination) throw new Error(`Missing featured destination: ${id}`)
  return destination
})

export function Destinations() {
  const carouselRef = useRef<HTMLUListElement>(null)
  const resumeTimer = useRef<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const move = useCallback((direction: 1 | -1) => {
    const carousel = carouselRef.current
    const first = carousel?.querySelector<HTMLElement>('[data-slide]')
    const second = carousel?.querySelectorAll<HTMLElement>('[data-slide]')[1]
    if (!carousel || !first) return

    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth
    const maxScroll = carousel.scrollWidth - carousel.clientWidth
    const target = carousel.scrollLeft + step * direction
    carousel.scrollTo({
      left: target > maxScroll - 1 ? 0 : target < 0 ? maxScroll : target,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => move(1), 4500)
    return () => window.clearInterval(interval)
  }, [move, paused])

  useEffect(
    () => () => {
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current)
    },
    [],
  )

  const pauseBriefly = () => {
    setPaused(true)
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 5000)
  }

  const updateActiveIndex = (carousel: HTMLUListElement) => {
    const slides = Array.from(carousel.querySelectorAll<HTMLElement>('[data-slide]'))
    const index = slides.reduce(
      (nearest, slide, current) =>
        Math.abs(slide.offsetLeft - carousel.scrollLeft) <
        Math.abs(slides[nearest].offsetLeft - carousel.scrollLeft)
          ? current
          : nearest,
      0,
    )
    setActiveIndex(index)
  }

  return (
    <section id="destinations" className="overflow-hidden bg-paper py-20 text-ink-900 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="micro text-gold-700">South Africa, by road</p>
            <h2 className="display-lg mt-4 max-w-[16ch] text-balance text-ink-900">
              Pick a place. We’ll plan the journey.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex items-center gap-3">
            <p className="mr-3 text-[0.8rem] font-semibold text-slate-ink" aria-live="polite">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(featuredDestinations.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous destinations"
              className="grid size-12 place-items-center rounded-full border border-ink-900/25 text-ink-900 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next destinations"
              className="grid size-12 place-items-center rounded-full border border-ink-900/25 text-ink-900 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </Reveal>
        </div>

        <div
          className="mt-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured South African destinations"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={pauseBriefly}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (
              !(event.relatedTarget instanceof Node) ||
              !event.currentTarget.contains(event.relatedTarget)
            ) {
              setPaused(false)
            }
          }}
        >
          <ul
            ref={carouselRef}
            onScroll={(event) => updateActiveIndex(event.currentTarget)}
            className="destination-track flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-3"
          >
            {featuredDestinations.map((destination, index) => (
              <li
                key={destination.id}
                data-slide
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${featuredDestinations.length}: ${destination.name}`}
                className="group relative min-w-0 shrink-0 basis-[92%] snap-start sm:basis-[80%] lg:basis-[calc((100%-1.5rem)/2)]"
              >
                <a
                  href={whatsappLink(
                    `Good day Mgwezane, I would like to enquire about a trip to ${destination.name} in ${destination.province}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden bg-ink-800 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:[transform:perspective(1000px)_rotateY(-1deg)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[3/2]">
                    <img
                      src={`/assets/destinations/${destination.image}.jpg`}
                      srcSet={`/assets/destinations/${destination.image}-600.jpg 600w, /assets/destinations/${destination.image}.jpg 1100w`}
                      sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 90vw"
                      width={1100}
                      height={825}
                      loading="lazy"
                      decoding="async"
                      alt={`${destination.name}, ${destination.province}`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/10 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <div>
                        <p className="micro text-gold-400">{destination.province}</p>
                        <h3 className="display-md mt-2 text-paper">{destination.name}</h3>
                      </div>
                      <span
                        aria-hidden
                        className="mb-1 grid size-10 shrink-0 place-items-center rounded-full border border-paper/55 text-paper transition-colors group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-ink-950"
                      >
                        <ArrowRight size={17} />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-ink-900/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 border-b border-gold-600 pb-1 text-[0.84rem] font-bold text-ink-900 transition hover:text-gold-700"
          >
            Enquire about a trip <ArrowRight size={15} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
