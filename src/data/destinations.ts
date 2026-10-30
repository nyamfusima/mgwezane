/**
 * The destination gallery, ordered as a journey around the country: Limpopo and
 * Mpumalanga first, because those are the provinces Mgwezane works in, then
 * outward to the rest of South Africa.
 *
 * Every photograph is licensed stock from Wikimedia Commons and is labelled with
 * the place it actually shows — the subject of each file is recorded in
 * `public/assets/photo-credits.json`. The photographs were not taken by Mgwezane
 * and do not show trips the business has run, which the section states.
 *
 * To add a destination, drop a 4:3 photo into `public/assets/destinations/` as
 * `slug.jpg` (1100px wide) and `slug-600.jpg`, then add an entry here.
 */

export type Destination = {
  id: string
  name: string
  province: string
  /** One line. Describes the place, never a trip the business has sold. */
  blurb: string
  /** Filename stem under public/assets/destinations. */
  image: string
  /** Opens the tile to two columns in the mosaic. */
  wide?: boolean
}

export const destinations: Destination[] = [
  // Limpopo — home province
  {
    id: 'magoebaskloof',
    name: 'Magoebaskloof',
    province: 'Limpopo',
    blurb: 'Indigenous forest and tea country folded into the mountains above Tzaneen.',
    image: 'magoebaskloof',
    wide: true,
  },
  {
    id: 'kruger',
    name: 'Kruger National Park',
    province: 'Limpopo',
    blurb: 'Big game across the lowveld, entered from the north through Limpopo.',
    image: 'kruger-national-park',
  },
  {
    id: 'limpopo-mountains',
    name: 'The Limpopo ranges',
    province: 'Limpopo',
    blurb: 'Sundown over the valleys and ridges an afternoon from Polokwane.',
    image: 'limpopo-mountains',
    wide: true,
  },
  {
    id: 'mapungubwe',
    name: 'Mapungubwe',
    province: 'Limpopo',
    blurb: 'Sandstone koppies at the meeting of the Limpopo and Shashe rivers.',
    image: 'mapungubwe',
  },

  // Mpumalanga — the Panorama Route
  {
    id: 'blyde-river-canyon',
    name: 'Blyde River Canyon',
    province: 'Mpumalanga',
    blurb: 'One of the largest green canyons on earth, cut into the edge of the escarpment.',
    image: 'blyde-river-canyon',
    wide: true,
  },
  {
    id: 'three-rondavels',
    name: 'The Three Rondavels',
    province: 'Mpumalanga',
    blurb: 'Three round peaks standing over the Blyde dam, and the view everyone stops for.',
    image: 'three-rondavels',
  },
  {
    id: 'gods-window',
    name: "God's Window",
    province: 'Mpumalanga',
    blurb: 'An escarpment viewpoint above the Lowveld.',
    image: 'gods-window',
  },
  {
    id: 'lisbon-falls',
    name: 'Lisbon Falls',
    province: 'Mpumalanga',
    blurb: 'The tallest falls on the Panorama Route, dropping into a wooded pool.',
    image: 'lisbon-falls',
  },
  {
    id: 'bourkes-luck',
    name: "Bourke's Luck Potholes",
    province: 'Mpumalanga',
    blurb: 'Rock scoured into deep cylinders where the Treur meets the Blyde.',
    image: 'bourkes-luck-potholes',
  },
  {
    id: 'graskop-gorge',
    name: 'Graskop Gorge',
    province: 'Mpumalanga',
    blurb: 'Motitsi Falls dropping into forest at the head of the gorge.',
    image: 'graskop-gorge',
  },

  // Gauteng
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    province: 'Gauteng',
    blurb: 'The city our Gauteng routes run into and out of every week.',
    image: 'johannesburg',
  },
  {
    id: 'union-buildings',
    name: 'Union Buildings gardens',
    province: 'Gauteng',
    blurb: 'Terraced gardens above Pretoria, and a short hop from our Pretoria drop-offs.',
    image: 'union-buildings',
  },
  {
    id: 'hartbeespoort',
    name: 'Hartbeespoort Dam',
    province: 'Gauteng',
    blurb: 'Open water under the Magaliesberg, an hour out of the city.',
    image: 'hartbeespoort-dam',
  },

  // North West
  {
    id: 'pilanesberg',
    name: 'Pilanesberg',
    province: 'North West',
    blurb: 'Game country inside the crater of an extinct volcano.',
    image: 'pilanesberg',
    wide: true,
  },
  {
    id: 'sun-city',
    name: 'Sun City',
    province: 'North West',
    blurb: 'The resort beside Pilanesberg, built into the bushveld.',
    image: 'sun-city',
  },

  // Free State
  {
    id: 'golden-gate',
    name: 'Golden Gate Highlands',
    province: 'Free State',
    blurb: 'Sandstone cliffs that turn gold in the late afternoon.',
    image: 'golden-gate-highlands',
    wide: true,
  },
  {
    id: 'clarens',
    name: 'Clarens',
    province: 'Free State',
    blurb: 'A small town below the Maluti mountains, on the road south.',
    image: 'clarens',
  },

  // KwaZulu-Natal
  {
    id: 'drakensberg',
    name: 'The Drakensberg',
    province: 'KwaZulu-Natal',
    blurb: 'High peaks, cold streams and mountain passes along the Lesotho border.',
    image: 'drakensberg',
  },
  {
    id: 'durban',
    name: 'Durban beachfront',
    province: 'KwaZulu-Natal',
    blurb: 'Warm Indian Ocean, piers and promenade. A listed route from Polokwane.',
    image: 'durban-beachfront',
  },
  {
    id: 'howick-falls',
    name: 'Howick Falls',
    province: 'KwaZulu-Natal',
    blurb: 'The Umgeni dropping ninety-five metres in the middle of the Midlands.',
    image: 'howick-falls',
  },

  // Eastern Cape
  {
    id: 'hole-in-the-wall',
    name: 'Hole in the Wall',
    province: 'Eastern Cape',
    blurb: 'The sea cut clean through a headland on the Wild Coast.',
    image: 'hole-in-the-wall',
  },
  {
    id: 'tsitsikamma',
    name: 'Tsitsikamma',
    province: 'Eastern Cape',
    blurb: 'Indigenous forest running down to rock and surf on the Garden Route.',
    image: 'tsitsikamma',
  },
  {
    id: 'addo',
    name: 'Addo Elephant Park',
    province: 'Eastern Cape',
    blurb: 'Elephant herds at the waterholes, an easy drive from Gqeberha.',
    image: 'addo-elephant-park',
  },

  // Western Cape
  {
    id: 'cape-town',
    name: 'Cape Town',
    province: 'Western Cape',
    blurb: 'Mountain, harbour and city together at the foot of the country.',
    image: 'cape-town',
    wide: true,
  },
  {
    id: 'camps-bay',
    name: 'Camps Bay',
    province: 'Western Cape',
    blurb: 'White sand under the Twelve Apostles, on the Atlantic side.',
    image: 'camps-bay',
  },
  {
    id: 'cape-point',
    name: 'Cape Point',
    province: 'Western Cape',
    blurb: 'Cliffs and cold blue water at the end of the peninsula.',
    image: 'cape-point',
    wide: true,
  },
  {
    id: 'boulders-beach',
    name: 'Boulders Beach',
    province: 'Western Cape',
    blurb: 'Granite boulders, sheltered water and a resident penguin colony.',
    image: 'boulders-beach',
  },
  {
    id: 'knysna',
    name: 'Knysna Heads',
    province: 'Western Cape',
    blurb: 'Two sandstone cliffs guarding the lagoon mouth on the Garden Route.',
    image: 'knysna-heads',
    wide: true,
  },
  {
    id: 'paarl',
    name: 'Paarl winelands',
    province: 'Western Cape',
    blurb: 'Vineyard rows turning colour under the Cape fold mountains.',
    image: 'paarl-winelands',
  },

  // Northern Cape
  {
    id: 'namaqualand',
    name: 'Namaqualand',
    province: 'Northern Cape',
    blurb: 'For a few weeks each spring the dry north turns to open fields of colour.',
    image: 'namaqualand',
  },
  {
    id: 'augrabies',
    name: 'Augrabies Falls',
    province: 'Northern Cape',
    blurb: 'The Orange River falling into a granite gorge in the desert.',
    image: 'augrabies-falls',
  },
  {
    id: 'kgalagadi',
    name: 'Kgalagadi',
    province: 'Northern Cape',
    blurb: 'Red dunes, camelthorn and predators in the far Kalahari.',
    image: 'kgalagadi',
  },
]

/** Provinces in the order they appear, for the section's standfirst. */
export const coveredProvinces = [...new Set(destinations.map((d) => d.province))]
