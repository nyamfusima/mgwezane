import { useEffect, useState } from 'react'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

/**
 * The standing WhatsApp shortcut, in WhatsApp's own green with the official
 * mark. Held back until the reader has passed the hero so it does not compete
 * with the booking button there.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappLink('Good day Mgwezane, I would like to make a booking enquiry.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat to Mgwezane on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed right-5 bottom-5 z-40 inline-flex items-center justify-center rounded-full bg-whatsapp p-4 text-white shadow-lg shadow-ink-950/25 transition duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
