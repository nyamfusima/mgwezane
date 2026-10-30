import { ArrowRight } from '../data/icons'
import { Reveal } from './motion/Reveal'
import { SouthAfricaMap } from './SouthAfricaMap'

export function RoutesPreview() {
  return (
    <section id="routes" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal>
          <SouthAfricaMap />
        </Reveal>
        <Reveal className="mt-10 text-center">
          <a
            href="/rates"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-azure px-8 py-4 text-[0.78rem] font-bold tracking-[0.14em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-lg hover:shadow-ink-950/25"
          >
            View rates
            <ArrowRight size={16} aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
