import { useEffect } from 'react'
import { Booking } from './components/Booking'
import { Destinations } from './components/Destinations'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { RatesPage } from './components/RatesPage'
import { RoutesPreview } from './components/RoutesPreview'
import { Services } from './components/Services'
import { WhatsAppButton } from './components/WhatsAppButton'

const goToBooking = () =>
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function App() {
  const isRates = window.location.pathname.replace(/\/+$/, '') === '/rates'

  useEffect(() => {
    if (isRates) document.title = 'Routes & Prices | Mgwezane Shuttle Services'
  }, [isRates])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink-950 focus:px-4 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <Header solidAlways={isRates} />

      <main id="main">
        {isRates ? (
          <RatesPage />
        ) : (
          <>
            <Hero onBook={goToBooking} />
            <Services />
            <RoutesPreview />
            <Destinations />
            <Booking prefill={{ key: 0 }} />
          </>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
