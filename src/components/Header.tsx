import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ChevronDown, Menu, Phone, X } from '../data/icons'
import { business, navLinks } from '../data/business'
import { featuredServices } from '../data/services'
import { whatsappLink } from '../lib/whatsapp'

const bookingEnquiry = whatsappLink('Good day Mgwezane, I would like to enquire about a booking.')

const navItemBase = 'rounded-lg px-4 py-2.5 text-[0.9rem] font-bold transition-colors'

export function Header({ solidAlways = false }: { solidAlways?: boolean }) {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 80))

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', close)
      document.body.style.overflow = ''
    }
  }, [open])

  const [menu, setMenu] = useState(false)
  const onHero = !solid && !open && !solidAlways
  const navItem = `${navItemBase} ${
    onHero ? 'text-white hover:bg-white/15' : 'text-ink-900 hover:bg-ink-900/5 hover:text-ink-800'
  }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        onHero
          ? 'bg-transparent'
          : 'bg-white shadow-[0_1px_0_rgba(5,42,69,0.1),0_8px_24px_-16px_rgba(5,42,69,0.25)]'
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-ink-950/60 to-transparent transition-opacity duration-500 ${
          onHero ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="shell relative flex h-[4.75rem] items-center justify-between gap-6 lg:h-[5.25rem]">
        <a href="/#top" aria-label={`${business.name} — home`} className="relative shrink-0">
          <img
            src="/assets/brand/mgwezane-logo.png"
            alt={business.name}
            width={760}
            height={284}
            className={`h-9 w-auto transition-opacity duration-500 sm:h-10 lg:h-12 ${
              onHero ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src="/assets/brand/mgwezane-logo-light.png"
            alt=""
            aria-hidden
            width={760}
            height={284}
            className={`absolute inset-0 h-9 w-auto transition-opacity duration-500 sm:h-10 lg:h-12 ${
              onHero ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </a>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          <a href="/#top" className={navItem}>
            Home
          </a>
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setMenu(false)
            }}
          >
            <button
              type="button"
              aria-expanded={menu}
              aria-haspopup="true"
              onClick={() => setMenu((value) => !value)}
              onKeyDown={(event) => event.key === 'Escape' && setMenu(false)}
              className={`${navItem} inline-flex items-center gap-1.5 ${menu ? (onHero ? 'bg-white/15' : 'bg-ink-900/5') : ''}`}
            >
              Services
              <ChevronDown
                size={14}
                aria-hidden
                className={`transition-transform duration-300 ${menu ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full z-10 w-64 rounded-xl border border-ink-900/10 bg-white p-2 shadow-xl shadow-ink-950/10"
                >
                  {featuredServices.map((service) => (
                    <li key={service.id}>
                      <a
                        href="/#services"
                        onClick={() => setMenu(false)}
                        className="block rounded-lg px-3 py-2.5 text-[0.85rem] font-medium text-ink-900 transition-colors hover:bg-ink-900/5"
                      >
                        {service.title}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <a href="/rates" className={navItem}>
            Routes &amp; prices
          </a>
                    <a href="/#destinations" className={navItem}>
            Destinations
          </a>
                    <a href="/#contact" className={navItem}>
            Talk to us
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={bookingEnquiry}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-azure px-5 py-3 text-[0.85rem] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-lg hover:shadow-ink-950/25 sm:px-6"
          >
            Book a Ride
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`-mr-2 p-2 transition-colors xl:hidden ${onHero ? 'text-white' : 'text-ink-900'}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-parchment-600/60 bg-white xl:hidden"
          >
            <div className="shell flex flex-col py-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.05, duration: 0.3 }}
                  className="border-b border-parchment-600/50 py-4 font-display text-[1.3rem] font-bold text-ink-900 last:border-0"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={business.phoneHref}
                className="mt-4 inline-flex items-center gap-2 py-2 text-[0.9rem] font-medium text-ink-800"
              >
                <Phone size={15} aria-hidden /> {business.phoneDisplay}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
