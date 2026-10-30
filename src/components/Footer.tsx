import { ArrowRight } from '../data/icons'
import { business, navLinks } from '../data/business'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

export function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-white text-ink-900">
      <div className="shell flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-14">
        <div>
          <a href="/#top" aria-label={`${business.name} — back to top`}>
            <img
              src="/assets/brand/mgwezane-logo.png"
              alt={business.name}
              width={760}
              height={284}
              loading="lazy"
              className="h-10 w-auto"
            />
          </a>
          <p className="mt-4 max-w-[42ch] text-[0.86rem] leading-relaxed text-slate-ink">
            Shuttle and private transport from Polokwane and Mokopane to Pretoria, Johannesburg
            and destinations across South Africa.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:items-end">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem] text-slate-ink">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-azure">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={whatsappLink('Good day Mgwezane, I would like to make a booking enquiry.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-azure px-5 py-3 text-[0.82rem] font-bold text-white transition hover:-translate-y-0.5 hover:bg-ink-800"
          >
            <WhatsAppIcon size={17} />
            Book on WhatsApp
            <ArrowRight size={15} aria-hidden />
          </a>
        </div>
      </div>

      <div className="border-t border-ink-900/10">
        <div className="shell flex flex-col gap-2 py-5 text-[0.74rem] text-slate-ink sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {business.name}
          </p>
          <p>Prices and availability are confirmed at the time of booking.</p>
        </div>
      </div>
    </footer>
  )
}
