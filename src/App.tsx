import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, BusFront, CalendarDays, Check, ChevronDown, Clock3, MapPin, Menu, Package, Plane, ShieldCheck, Sparkles, Users, Wallet, X, Phone, Mail, Facebook, CarFront, HeartHandshake, BriefcaseBusiness } from 'lucide-react'

type Fare = { area: string; price: string; search?: string }
type FareGroup = { title: string; subtitle: string; fares: Fare[] }

const fareGroups: FareGroup[] = [
  { title: 'Pretoria & surrounds', subtitle: 'Polokwane / Mokopane to Pretoria destinations', fares: [
    { area: 'Pretoria CBD, Menlyn, Brooklyn, Hatfield, Sunnyside, Montana & Arcadia', price: 'R500' },
    { area: 'Orchards', price: 'R550' }, { area: 'Soshanguve', price: 'R600' }, { area: 'Ga-Rankuwa', price: 'R600' },
    { area: 'Mamelodi', price: 'R550' }, { area: 'Atteridgeville', price: 'R550' }, { area: 'Centurion', price: 'R600' },
    { area: 'Tzaneen to Pretoria', price: 'R1,000 pp' },
  ]},
  { title: 'Johannesburg & surrounds', subtitle: 'Polokwane / Mokopane to Johannesburg destinations', fares: [
    { area: 'Johannesburg CBD & Auckland Park', price: 'R700' }, { area: 'Doornfontein', price: 'R650' }, { area: 'Midrand', price: 'R600' },
    { area: 'Diepsloot', price: 'R650' }, { area: 'Cosmo City', price: 'R650' }, { area: 'Sandton', price: 'R650' },
    { area: 'Alexandra', price: 'R650' }, { area: 'Edenvale', price: 'R650' }, { area: 'Fourways', price: 'R650' },
    { area: 'Randburg', price: 'R670' }, { area: 'Honeydew', price: 'R670' }, { area: 'Tembisa', price: 'R565' },
    { area: 'Kempton Park', price: 'R650' }, { area: 'Roodepoort', price: 'R700+' }, { area: 'O.R. Tambo Airport', price: 'R680' },
    { area: 'Lanseria Airport', price: 'R700' }, { area: 'Tzaneen to Johannesburg', price: 'R1,150 pp' },
  ]},
  { title: 'Johannesburg South & East', subtitle: 'Polokwane to southern and eastern Johannesburg', fares: [
    { area: 'Benoni', price: 'R700' }, { area: 'Alberton', price: 'R750' }, { area: 'Thokoza', price: 'R750' },
    { area: 'Boksburg', price: 'R700' }, { area: 'Soweto', price: 'R850' }, { area: 'Glenvista', price: 'R750' },
    { area: 'Germiston', price: 'R750' }, { area: 'Springs', price: 'R900' },
  ]},
  { title: 'Johannesburg West & beyond', subtitle: 'Long-distance routes from Polokwane', fares: [
    { area: 'West Rand', price: 'R800' }, { area: 'Krugersdorp', price: 'R800' }, { area: 'Randfontein', price: 'R900' },
    { area: 'Vanderbijlpark / Vereeniging / Vaal', price: 'R1,100' }, { area: 'Carletonville', price: 'R1,200' },
    { area: 'Westonaria', price: 'R1,100' }, { area: 'Rustenburg', price: 'R850' }, { area: 'Brits', price: 'R650' },
    { area: 'Bloemfontein', price: 'R1,500' }, { area: 'Durban', price: 'R1,700' },
  ]},
  { title: 'Private vehicle & other services', subtitle: 'Book a vehicle or arrange a special service', fares: [
    { area: 'Entire car: Johannesburg ↔ Polokwane (4-seater)', price: 'R2,500+' },
    { area: 'Entire car: Johannesburg ↔ Polokwane (7-seater)', price: 'R3,000' },
    { area: 'Entire car: Pretoria ↔ Polokwane (4-seater)', price: 'R2,000+' },
    { area: 'Entire car: Pretoria ↔ Polokwane (7-seater)', price: 'R2,400+' },
    { area: 'Parcel delivery: Polokwane ↔ Pretoria', price: 'R350+' },
    { area: 'Parcel delivery: Polokwane ↔ Johannesburg', price: 'R400+' },
    { area: 'Overnight shuttle', price: 'R1,500+' }, { area: 'Tender document service', price: 'R1,000' },
  ]},
]

const phone = '27711047531'
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
const services = [
  { icon: CarFront, title: 'Private trips', text: 'Personalised point-to-point travel for individuals, families and groups.' },
  { icon: BusFront, title: 'Shuttle trips', text: 'Regular and pre-arranged journeys between Polokwane, Johannesburg and Pretoria.' },
  { icon: Plane, title: 'Vacation trips', text: 'Let us help you get to your next getaway. Destination packages and trip enquiries welcome.' },
  { icon: Package, title: 'Parcel delivery', text: 'Convenient parcel transport between Polokwane, Pretoria and Johannesburg.' },
  { icon: HeartHandshake, title: 'Weddings & funerals', text: 'Thoughtful transport arrangements for important family occasions.' },
  { icon: BriefcaseBusiness, title: 'Overnight & tender services', text: 'Overnight shuttle arrangements and tender document services.' },
]

function App() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string>('Pretoria & surrounds')
  const [form, setForm] = useState({ from: 'Polokwane', to: '', date: '', passengers: '1' })
  const visibleGroups = useMemo(() => fareGroups.map(group => ({ ...group, fares: group.fares.filter(f => `${f.area} ${f.price} ${group.title}`.toLowerCase().includes(query.toLowerCase())) })).filter(group => group.fares.length), [query])
  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(wa(`Hello Mgwezane, I would like to request a trip quote.\nFrom: ${form.from}\nTo: ${form.to}\nTravel date: ${form.date || 'To be confirmed'}\nPassengers: ${form.passengers}\nPlease confirm availability and the total price.`), '_blank', 'noopener,noreferrer')
  }
  return <>
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={14}/> Polokwane • Johannesburg • Pretoria • Nationwide on request</span><a href="tel:+27711047531"><Phone size={14}/> 071 104 7531</a></div></div>
    <header className="header"><div className="container nav-wrap">
      <a href="#home" className="brand"><img src="/mgwezane-logo.png" alt="Mgwezane Shuttle Services logo"/><span className="brand-fallback">MGWE<span>ZANE</span><small>SHUTTLE SERVICES</small></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{[['Home','#home'],['Our services','#services'],['Price list','#prices'],['Vacation trips','#vacations'],['Contact','#contact']].map(([label,href])=><a key={label} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href={wa('Hello Mgwezane, I would like to make a booking enquiry.')} target="_blank" rel="noreferrer">Book a trip <ArrowUpRight size={16}/></a></nav>
    </div></header>

    <main>
      <section className="hero" id="home"><div className="hero-bg"/><div className="container hero-content"><div className="hero-copy"><div className="eyebrow"><span/> YOUR JOURNEY STARTS HERE</div><h1>Every journey.<br/><em>Expertly planned.</em></h1><p className="hero-lead">Reliable shuttle services, private trips and travel arrangements connecting Polokwane with Johannesburg, Pretoria and destinations across South Africa.</p><div className="hero-actions"><a className="btn btn-gold" href={wa('Hello Mgwezane, I would like to book a shuttle.')} target="_blank" rel="noreferrer">Book on WhatsApp <ArrowUpRight size={18}/></a><a className="text-link" href="#prices">Explore our routes <ArrowRight size={17}/></a></div><div className="hero-trust"><span><ShieldCheck/> Pre-arranged trips</span><span><Clock3/> Plan ahead with confidence</span></div></div><div className="booking-card"><div className="booking-head"><span className="booking-icon"><CalendarDays/></span><div><strong>Plan your trip</strong><small>Request a quick quote</small></div></div><form onSubmit={submitBooking}><label>Pickup location<input value={form.from} onChange={e=>setForm({...form,from:e.target.value})} required placeholder="e.g. Polokwane"/></label><label>Destination<input value={form.to} onChange={e=>setForm({...form,to:e.target.value})} required placeholder="Where are you going?"/></label><div className="form-row"><label>Travel date<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label><label>Passengers<select value={form.passengers} onChange={e=>setForm({...form,passengers:e.target.value})}>{['1','2','3','4','5','6','7+'].map(n=><option key={n}>{n}</option>)}</select></label></div><button className="btn btn-dark full" type="submit">Request a quote <ArrowUpRight size={17}/></button><p className="form-note">Your request opens directly in WhatsApp.</p></form></div></div><div className="hero-bottom"><div className="container hero-bottom-inner"><span>PRIVATE & SHUTTLE TRIPS</span><i/><span>PARCEL DELIVERY</span><i/><span>VACATION & SPECIAL-EVENT TRAVEL</span></div></div></section>

      <section className="intro section-pad"><div className="container intro-grid"><div><div className="eyebrow dark"><span/> MGWEZANE SHUTTLE SERVICES</div><h2>More than a ride.<br/><em>A better way to travel.</em></h2></div><div className="intro-text"><p>Whether you're travelling between cities, planning a holiday, sending a parcel or arranging transport for a special occasion, Mgwezane is ready to help you plan the journey.</p><a className="under-link" href="#contact">Talk to our team <ArrowUpRight size={16}/></a></div></div></section>

      <section className="services section-pad" id="services"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span/> HOW WE CAN HELP</div><h2>Travel that works<br/><em>around you.</em></h2></div><p>Choose the service you need and get in touch for availability, arrangements and a personalised quote.</p></div><div className="service-grid">{services.map((s,i)=><article className="service-card" key={s.title}><div className="service-icon"><s.icon size={24}/></div><span className="service-num">0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p><a href={wa(`Hello Mgwezane, I am interested in your ${s.title.toLowerCase()} service. Please share more details.`)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${s.title}`}><ArrowUpRight/></a></article>)}</div></div></section>

      <section className="routes section-pad" id="prices"><div className="container"><div className="section-heading routes-heading"><div><div className="eyebrow dark"><span/> ROUTES & FARES</div><h2>Know your route.<br/><em>Know your fare.</em></h2></div><p>Our listed fares are a guide for the routes below. Contact us to confirm availability, pickup details and your final trip price.</p></div><div className="price-toolbar"><div className="price-search"><MapPin size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a suburb, airport or route..."/></div><span>{visibleGroups.reduce((n,g)=>n+g.fares.length,0)} fares listed</span></div><div className="fare-groups">{visibleGroups.map(group=><div className="fare-group" key={group.title}><button className="fare-group-head" onClick={()=>setOpenGroup(openGroup===group.title?'':group.title)}><span><strong>{group.title}</strong><small>{group.subtitle}</small></span><ChevronDown className={openGroup===group.title?'rotated':''}/></button>{openGroup===group.title&&<div className="fare-list">{group.fares.map(f=><div className="fare-row" key={f.area}><span>{f.area}</span><strong>{f.price}</strong><a href={wa(`Hello Mgwezane, please confirm the fare and availability for: ${f.area} (${f.price}).`)} target="_blank" rel="noreferrer">Enquire <ArrowUpRight size={14}/></a></div>)}</div>}</div>)}{!visibleGroups.length&&<div className="no-results">No matching fares. Try another suburb or contact us for a custom quote.</div>}</div><div className="price-footnote"><span><Wallet size={18}/></span><p><strong>Please note:</strong> Prices marked with “+” may vary depending on the exact pickup/drop-off point and trip requirements. Per-person fares are marked “pp”. Confirm all fares with Mgwezane before making payment.</p></div></div></section>

      <section className="deposit-band"><div className="container deposit-inner"><div className="deposit-icon"><CalendarDays size={28}/></div><div><div className="eyebrow">IMPORTANT BOOKING INFORMATION</div><h2>Secure your trip in advance.</h2><p>A deposit must be paid at least <strong>3 days before your trip.</strong> No deposit, no trip. Please confirm the deposit amount and payment details directly with Mgwezane when booking.</p></div><a className="btn btn-gold" href={wa('Hello Mgwezane, I would like to confirm your deposit requirements and payment details.')} target="_blank" rel="noreferrer">Confirm booking terms <ArrowUpRight size={17}/></a></div></section>

      <section className="vacations section-pad" id="vacations"><div className="container vacation-grid"><div className="vacation-copy"><div className="eyebrow dark"><span/> TAKE THE SCENIC ROUTE</div><h2>Your next getaway<br/><em>starts with us.</em></h2><p>Planning a holiday, group outing or weekend escape? Mgwezane also offers vacation trip transport. Share your destination, dates and group size and we'll help you plan the journey.</p><a className="btn btn-dark" href={wa('Hello Mgwezane, I am interested in a vacation trip. Please share available destinations and transport options.')} target="_blank" rel="noreferrer">Enquire about vacation trips <ArrowUpRight size={17}/></a><div className="photo-coming"><Sparkles size={17}/> Holiday destination photos coming soon</div></div><div className="vacation-image"><div className="vacation-image-main"/><div className="vacation-stamp"><Plane size={22}/><span>GO FURTHER<br/><strong>SEE MORE</strong></span></div><div className="vacation-caption">MAKE YOUR NEXT JOURNEY A MEMORY</div></div></div></section>

      <section className="why section-pad"><div className="container why-grid"><div><div className="eyebrow"><span/> THE MGWEZANE DIFFERENCE</div><h2>Good journeys<br/><em>begin with a plan.</em></h2></div><div className="why-points"><div><Check/><span><strong>Clear route pricing</strong><small>Explore listed fares and ask us to confirm your trip.</small></span></div><div><Check/><span><strong>Trips planned ahead</strong><small>Arrange your transport and deposit before departure.</small></span></div><div><Check/><span><strong>More ways to travel</strong><small>From private rides and parcels to holidays and special events.</small></span></div></div></div></section>

      <section className="contact section-pad" id="contact"><div className="container contact-grid"><div><div className="eyebrow dark"><span/> LET'S GET YOU THERE</div><h2>Have a destination<br/><em>in mind?</em></h2><p>Send us your pickup point, destination and travel date. We'll help you with the next step.</p><a className="btn btn-dark" href={wa('Hello Mgwezane, I would like to make an enquiry.')} target="_blank" rel="noreferrer">Chat to us on WhatsApp <ArrowUpRight size={18}/></a></div><div className="contact-details"><a href="tel:+27711047531"><span><Phone/></span><div><small>CALL / WHATSAPP</small><strong>071 104 7531</strong></div><ArrowUpRight/></a><a href="mailto:janvusi.m@gmail.com"><span><Mail/></span><div><small>EMAIL</small><strong>janvusi.m@gmail.com</strong></div><ArrowUpRight/></a><a href="https://www.facebook.com/search/top?q=mgwezane%20shuttle%20service" target="_blank" rel="noreferrer"><span><Facebook/></span><div><small>FACEBOOK</small><strong>Mgwezane shuttle service</strong></div><ArrowUpRight/></a></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-top"><a href="#home" className="footer-brand"><img src="/mgwezane-logo.png" alt="Mgwezane logo"/></a><p>Every journey. Expertly planned.</p><a href={wa('Hello Mgwezane, I would like to book a trip.')} target="_blank" rel="noreferrer" className="footer-book">Start a booking <ArrowUpRight size={16}/></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Mgwezane Shuttle Services and Travel Agent.</span><span>Polokwane • Johannesburg • Pretoria • South Africa</span></div></footer>
    <a className="floating-wa" href={wa('Hello Mgwezane, I would like to make a booking enquiry.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><Phone size={20}/><span>WhatsApp us</span></a>
  </>
}

export default App
