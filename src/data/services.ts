import {
  Briefcase,
  Bus,
  CarFront,
  Flower2,
  MapPinned,
  Moon,
  Package,
  Plane,
  Rings,
} from './icons'

export type Service = {
  id: string
  name: string
  description: string
  icon: typeof Bus
}

export type FeaturedService = {
  id: string
  title: string
  description: string
  image: string
  alt: string
  /** CSS object-position, so the subject stays centred in the circular crop. */
  position: string
  message: string
}

const enquiry = (what: string) =>
  `Hi, I'm interested in ${what} with Mgwezane Shuttle Services. Please share more information.`

export const featuredServices: FeaturedService[] = [
  {
    id: 'private-trips',
    title: 'Private Trips',
    description:
      'Private transport for individual journeys, with routes and arrangements discussed when booking.',
    image: 'private-trips.webp',
    alt: 'A uniformed chauffeur standing beside a black SUV',
    position: '50% 50%',
    message: enquiry('booking a private trip'),
  },
  {
    id: 'shuttle-services',
    title: 'Shuttle Services',
    description:
      'Shuttle transport between Polokwane, Mokopane, Pretoria, Johannesburg and other destinations.',
    image: 'shuttle-services.webp',
    alt: 'A white passenger minivan parked at an airport terminal',
    position: '50% 50%',
    message: enquiry('booking a shuttle service'),
  },
  {
    id: 'vacation-trips',
    title: 'Vacation Trips',
    description:
      'Transport for holiday trips and travel to destinations across South Africa.',
    image: 'vacation-trips.jpg',
    alt: 'The Blyde River Canyon in Mpumalanga, with the river winding below forested peaks',
    position: '50% 50%',
    message: enquiry('booking a vacation trip'),
  },
  {
    id: 'weddings-events',
    title: 'Weddings & Events',
    description: 'Transport for weddings, celebrations and special events.',
    image: 'weddings-events.webp',
    alt: 'A bride and groom standing in front of a flower-decorated car',
    position: '50% 50%',
    message: enquiry('transport for a wedding or event'),
  },
  {
    id: 'funeral-transport',
    title: 'Funeral Transport',
    description: 'Transport arrangements for funeral trips and related journeys.',
    image: 'funeral-transport.webp',
    alt: 'Pallbearers carrying a casket down the aisle of a church',
    position: '50% 50%',
    message: enquiry('funeral transport'),
  },
  {
    id: 'parcel-delivery',
    title: 'Parcel Delivery',
    description:
      'Parcel delivery services between available destinations. Contact us to confirm the route and price.',
    image: 'parcel-delivery.webp',
    alt: 'A smiling courier carrying a parcel beside a delivery van',
    position: '50% 50%',
    message: enquiry('parcel delivery'),
  },
]

export const otherServices = [
  'Interprovincial trips',
  'Overnight shuttle services',
  'Tender document services',
]

export const services: Service[] = [
  {
    id: 'private-trips',
    name: 'Private trips',
    description: 'Private transport for your journey.',
    icon: CarFront,
  },
  {
    id: 'shuttle-trips',
    name: 'Shuttle trips',
    description: 'Travel between Limpopo, Pretoria and Johannesburg.',
    icon: Bus,
  },
  {
    id: 'vacation-trips',
    name: 'Vacation trips',
    description: 'Transport for holidays and getaways.',
    icon: Plane,
  },
  {
    id: 'wedding-trips',
    name: 'Wedding trips',
    description: 'Travel for weddings and their guests.',
    icon: Rings,
  },
  {
    id: 'funeral-trips',
    name: 'Funeral trips',
    description: 'Transport for funeral services.',
    icon: Flower2,
  },
  {
    id: 'parcel-delivery',
    name: 'Parcel delivery',
    description: 'Parcel delivery between listed destinations.',
    icon: Package,
  },
  {
    id: 'interprovincial-trips',
    name: 'Interprovincial trips',
    description: 'Trips between provinces across South Africa.',
    icon: MapPinned,
  },
  {
    id: 'overnight-shuttle',
    name: 'Overnight shuttle services',
    description: 'Overnight shuttle bookings.',
    icon: Moon,
  },
  {
    id: 'tender-documents',
    name: 'Tender document services',
    description: 'Tender document collection and delivery.',
    icon: Briefcase,
  },
]
