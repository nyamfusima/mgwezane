/**
 * The fare list exactly as supplied by Mgwezane.
 *
 * Rules when editing:
 *  - `price` is printed on the page character for character. A trailing `+`
 *    means the fare is a starting price, so keep it.
 *  - `note` is only filled in where the business stated the basis of the fare
 *    (for example "per person" or the size of the vehicle). Leave it out
 *    rather than guessing — the page tells customers to confirm the basis.
 *  - `origin` overrides the group's departure point for a single row.
 */

export type Fare = {
  destination: string
  price: string
  note?: string
  origin?: string
}

export type FareGroup = {
  id: string
  origin: string
  region: string
  /** What the fares in this group cover, in plain words. */
  basis: string
  fares: Fare[]
}

export const fareGroups: FareGroup[] = [
  {
    id: 'pretoria',
    origin: 'Polokwane & Mokopane',
    region: 'Pretoria',
    basis: 'Seat fares. Confirm the basis and the final price when you book.',
    fares: [
      {
        destination:
          'Pretoria CBD, Menlyn, Brooklyn, Hatfield, Sunnyside, Montana & Arcadia',
        price: 'R500',
      },
      { destination: 'Orchards', price: 'R550' },
      { destination: 'Soshanguve', price: 'R600' },
      { destination: 'Ga-Rankuwa', price: 'R600' },
      { destination: 'Mamelodi', price: 'R550' },
      { destination: 'Atteridgeville', price: 'R550' },
      { destination: 'Centurion', price: 'R600' },
      { destination: 'Pretoria', price: 'R1,000', note: 'per person', origin: 'Tzaneen' },
    ],
  },
  {
    id: 'johannesburg',
    origin: 'Polokwane & Mokopane',
    region: 'Johannesburg north & central',
    basis: 'Seat fares. Confirm the basis and the final price when you book.',
    fares: [
      {
        destination: 'Johannesburg CBD, Auckland Park & surrounding areas',
        price: 'R700',
      },
      { destination: 'Doornfontein', price: 'R650' },
      { destination: 'Midrand', price: 'R600' },
      { destination: 'Diepsloot', price: 'R650' },
      { destination: 'Cosmo City', price: 'R650' },
      { destination: 'Sandton', price: 'R650' },
      { destination: 'Alexandra', price: 'R650' },
      { destination: 'Edenvale', price: 'R650' },
      { destination: 'Fourways', price: 'R650' },
      { destination: 'Randburg', price: 'R670' },
      { destination: 'Honeydew', price: 'R670' },
      { destination: 'Tembisa', price: 'R565' },
      { destination: 'Kempton Park', price: 'R650' },
      { destination: 'Roodepoort', price: 'R700+' },
      { destination: 'O.R. Tambo International Airport', price: 'R680' },
      { destination: 'Lanseria International Airport', price: 'R700' },
      { destination: 'Johannesburg', price: 'R1,150', note: 'per person', origin: 'Tzaneen' },
    ],
  },
  {
    id: 'johannesburg-south',
    origin: 'Polokwane & Mokopane',
    region: 'Johannesburg South',
    basis: 'Seat fares. Confirm the basis and the final price when you book.',
    fares: [
      { destination: 'Benoni', price: 'R700' },
      { destination: 'Alberton', price: 'R750' },
      { destination: 'Thokoza', price: 'R750' },
      { destination: 'Boksburg', price: 'R700' },
      { destination: 'Soweto', price: 'R850' },
      { destination: 'Glenvista', price: 'R750' },
      { destination: 'Germiston', price: 'R750' },
      { destination: 'Springs', price: 'R900' },
    ],
  },
  {
    id: 'johannesburg-west',
    origin: 'Polokwane',
    region: 'Johannesburg west & the Vaal',
    basis: 'Seat fares. Confirm the basis and the final price when you book.',
    fares: [
      { destination: 'West Rand', price: 'R800' },
      { destination: 'Krugersdorp', price: 'R800' },
      { destination: 'Randfontein', price: 'R900' },
      { destination: 'Vanderbijlpark, Vereeniging & the Vaal', price: 'R1,100' },
      { destination: 'Carletonville', price: 'R1,200' },
      { destination: 'Westonaria', price: 'R1,100' },
    ],
  },
  {
    id: 'interprovincial',
    origin: 'Polokwane',
    region: 'Interprovincial routes',
    basis: 'From Polokwane. Seat fares — confirm the basis and the final price when you book.',
    fares: [
      { destination: 'Rustenburg', price: 'R850' },
      { destination: 'Brits', price: 'R650' },
      { destination: 'Bloemfontein', price: 'R1,500' },
      { destination: 'Durban', price: 'R1,700' },
    ],
  },
  {
    id: 'whole-vehicle',
    origin: 'Whole vehicle',
    region: 'Full vehicle bookings',
    basis: 'The fare covers the vehicle rather than a seat.',
    fares: [
      { destination: 'Johannesburg to Polokwane', price: 'R2,500+', note: '4-seater' },
      { destination: 'Johannesburg to Polokwane', price: 'R3,000', note: '7-seater' },
      { destination: 'Pretoria to Polokwane', price: 'R2,000+', note: '4-seater' },
      { destination: 'Pretoria to Polokwane', price: 'R2,400+', note: '7-seater' },
    ],
  },
  {
    id: 'other-services',
    origin: 'Other services',
    region: 'Parcels & additional services',
    basis: 'Confirm what is included and the final price when you book.',
    fares: [
      { destination: 'Parcel delivery, Polokwane to Pretoria', price: 'R350+' },
      { destination: 'Parcel delivery, Polokwane to Johannesburg', price: 'R400+' },
      { destination: 'Overnight shuttle', price: 'R1,500+' },
      { destination: 'Tender document service', price: 'R1,000' },
    ],
  },
]

/** How a fare row should be written out in an enquiry message. */
export function fareRouteLabel(group: FareGroup, fare: Fare): string {
  if (group.id === 'whole-vehicle' || group.id === 'other-services') return fare.destination
  return `${fare.origin ?? group.origin} to ${fare.destination}`
}

export const fareCount = fareGroups.reduce((total, group) => total + group.fares.length, 0)
