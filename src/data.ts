// Everything you will want to edit lives in this file:
// shop name, hours, contact links, categories and bouquets.
// Contact handles and bouquet prices below are placeholders.

// Finds an image in src/assets by its file name, whatever the extension is
// (png, jpg, webp...). Returns undefined if it isn't there, and the site
// falls back to the shop name and the Phosphor flower icons.
const assetUrls = import.meta.glob<string>('./assets/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const asset = (name: string): string | undefined => {
  const key = Object.keys(assetUrls).find((k) =>
    k.toLowerCase().includes(`/${name.toLowerCase()}.`),
  )
  return key ? assetUrls[key] : undefined
}

export type Location = {
  title: string
  address: string
  detail?: string
  mapQuery: string
}

export const SHOP = {
  name: 'Likha',
  tagline: 'Artfully arranged to honor the moments and people that matter most.',
  logo: asset('likha'),
  currency: '₱',
  address: '17th Lacson St., beside Yoyoland, Bacolod',
  locations: [
    {
      title: 'Flower shop',
      address: '17th Lacson St., beside Yoyoland, Bacolod',
      detail: 'Main shop for bouquet pickups and walk-in orders.',
      mapQuery: '17th Lacson St, Bacolod',
    },
    {
      title: 'Accessories shop',
      address: 'Shop Samahan, Ayala Malls Bacolod',
      detail: '2F beside CLN — find Likha on one of the shelves there.',
      mapQuery: 'Ayala Malls Bacolod',
    },
  ] satisfies Location[],
  hours: [
    { days: 'Monday to Saturday', time: '9:00 am to 6:00 pm' },
    { days: 'Sunday', time: '10:00 am to 1:00 pm' },
  ],
  notes: [
    {
      title: 'Same-day orders',
      text: 'Message us before 2:00 pm and we will do our best to get it out the same day.',
    },
    {
      title: 'Weddings and events',
      text: 'Contact us 2 to 4 weeks ahead so we can plan the flowers and send you a quote.',
    },
    {
      title: 'Sympathy flowers',
      text: 'Call or message us with the service date and venue, and we will take care of the rest.',
    },
  ],
}

export type Channel = {
  id: string
  label: string
  handle: string
  href: string
  bestFor: string
  reply: string
  cta: string
  primary?: boolean
}

// The first channel is treated as the main one (header button, "Order" buttons).
// Messenger link format: https://m.me/YOUR_PAGE_USERNAME
// Instagram DM link format: https://ig.me/m/YOUR_USERNAME
export const CHANNELS: Channel[] = [
  {
    id: 'messenger',
    label: 'Messenger',
    handle: 'YourPageName',
    href: 'https://m.me/YourPageName',
    bestFor: 'Orders, custom bouquets, and sending us a photo of what you have in mind.',
    reply: 'Usually within 15 minutes during opening hours.',
    cta: 'Open Messenger',
    primary: true,
  },
  {
    id: 'phone',
    label: 'Phone or text',
    handle: '+63 900 000 0000',
    href: 'tel:+639000000000',
    bestFor: 'Urgent same-day orders and sympathy flowers.',
    reply: 'Answered during opening hours.',
    cta: 'Call us',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@yourshop',
    href: 'https://ig.me/m/yourshop',
    bestFor: 'Seeing this week’s arrangements and asking about styling ideas.',
    reply: 'Within a day.',
    cta: 'Message on Instagram',
  },
  {
    id: 'facebook',
    label: 'Facebook page',
    handle: 'facebook.com/YourPageName',
    href: 'https://facebook.com/YourPageName',
    bestFor: 'Photos of recent work, announcements, and customer reviews.',
    reply: 'Within a day.',
    cta: 'Visit our page',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'hello@yourshop.com',
    href: 'mailto:hello@yourshop.com',
    bestFor: 'Wedding and event quotes, and bulk or corporate orders that need details.',
    reply: 'Within one business day.',
    cta: 'Send an email',
  },
]

export const MESSENGER = CHANNELS[0]

// Opens http(s) links in a new tab; leaves tel: and mailto: links alone.
export const linkProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

export type FlowerIcon = 'flower' | 'flower-lotus' | 'flower-tulip'

export type Category = {
  id: string
  name: string
  blurb: string
  icon: FlowerIcon
  petal: string // filter chip dot color
  bg: string // soft background behind the flower
  heart: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'romantic',
    name: 'Romantic',
    blurb: 'Roses and soft pinks for anniversaries, dates, and making up.',
    icon: 'flower-tulip',
    petal: '#F891EC',
    bg: '#fdebfa',
    heart: '#649D4E',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    blurb: 'Bright, cheerful bunches that make the day feel like a party.',
    icon: 'flower',
    petal: '#F891EC',
    bg: '#fdf0fc',
    heart: '#17372b',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    blurb: 'Bridal bouquets and bridesmaid posies, made to order.',
    icon: 'flower-lotus',
    petal: '#FCFAEE',
    bg: '#e9f2e5',
    heart: '#F891EC',
  },
  {
    id: 'sympathy',
    name: 'Sympathy',
    blurb: 'Quiet whites and greens to send comfort and respect.',
    icon: 'flower-lotus',
    petal: '#FCFAEE',
    bg: '#e2ede0',
    heart: '#649D4E',
  },
  {
    id: 'thanks',
    name: 'Thanks and congrats',
    blurb: 'For promotions, graduations, new babies, and a simple thank you.',
    icon: 'flower-tulip',
    petal: '#649D4E',
    bg: '#e9f2e5',
    heart: '#F891EC',
  },
  {
    id: 'get-well',
    name: 'Get well',
    blurb: 'Fresh, calm flowers for a hospital room or a recovery at home.',
    icon: 'flower',
    petal: '#649D4E',
    bg: '#eef4ea',
    heart: '#F891EC',
  },
]

export type Bouquet = {
  id: string
  code: string // customers send this code when they message you
  name: string
  category: Category['id']
  price: number
  custom?: boolean // true shows "From ₱price"
  size: string
  flowers: string
  description: string
  badge?: string
  image?: string // optional photo, e.g. image: asset('sample1'); falls back to a Phosphor icon
}

const BOUQUET_LIST: Bouquet[] = [
  {
    id: 'classic-dozen',
    code: 'R-01',
    name: 'Classic dozen',
    category: 'romantic',
    price: 65,
    size: '12 stems',
    flowers: 'Red roses, eucalyptus, baby’s breath',
    description: 'Twelve long-stemmed red roses wrapped in paper.',
    badge: 'Bestseller',
  },
  {
    id: 'blush-garden',
    code: 'R-02',
    name: 'Blush garden',
    category: 'romantic',
    price: 58,
    size: 'Medium bunch',
    flowers: 'Pink roses, ranunculus, lisianthus',
    description: 'Soft pink blooms in a loose, garden-picked style.',
  },
  {
    id: 'sunny-day',
    code: 'B-01',
    name: 'Sunny day',
    category: 'birthday',
    price: 42,
    size: 'Medium bunch',
    flowers: 'Sunflowers, yellow gerberas, greenery',
    description: 'Sunflowers and gerberas that bring the sunshine indoors.',
    badge: 'Bestseller',
  },
  {
    id: 'confetti-mix',
    code: 'B-02',
    name: 'Confetti mix',
    category: 'birthday',
    price: 38,
    size: 'Medium bunch',
    flowers: 'Gerberas, carnations, alstroemeria',
    description: 'A colorful mix that is cheerful and lasts for weeks.',
  },
  {
    id: 'bridal-bouquet',
    code: 'W-01',
    name: 'Bridal bouquet',
    category: 'wedding',
    price: 120,
    custom: true,
    size: 'Made to order',
    flowers: 'White roses, peonies, eucalyptus',
    description: 'Tell us your colors, dress style, and date, and we will design it with you.',
    badge: 'Made to order',
  },
  {
    id: 'bridesmaid-posy',
    code: 'W-02',
    name: 'Bridesmaid posy',
    category: 'wedding',
    price: 45,
    custom: true,
    size: 'Small posy',
    flowers: 'Spray roses, freesia, gypsophila',
    description: 'A smaller posy that matches the bridal bouquet. Priced per posy.',
  },
  {
    id: 'white-tribute',
    code: 'S-01',
    name: 'White tribute',
    category: 'sympathy',
    price: 80,
    size: 'Large bunch',
    flowers: 'White lilies, white roses, ferns',
    description: 'Arranged for a service or for the family’s home.',
  },
  {
    id: 'standing-wreath',
    code: 'S-02',
    name: 'Standing wreath',
    category: 'sympathy',
    price: 150,
    custom: true,
    size: 'Wreath on stand',
    flowers: 'White chrysanthemums, carnations, foliage',
    description: 'A round wreath on a stand. Tell us the service date and venue.',
  },
  {
    id: 'thank-you-posy',
    code: 'T-01',
    name: 'Thank you posy',
    category: 'thanks',
    price: 35,
    size: 'Small posy',
    flowers: 'Tulips, snapdragons, waxflower',
    description: 'Bright spring colors, simple and sincere.',
  },
  {
    id: 'congrats-bouquet',
    code: 'T-02',
    name: 'Congrats bouquet',
    category: 'thanks',
    price: 55,
    size: 'Medium bunch',
    flowers: 'Orange roses, lisianthus, eucalyptus',
    description: 'For promotions, graduations, and new babies.',
  },
  {
    id: 'cheer-up-bunch',
    code: 'G-01',
    name: 'Cheer-up bunch',
    category: 'get-well',
    price: 36,
    size: 'Small bunch',
    flowers: 'Daisies, yellow roses, freesia',
    description: 'Brightens a hospital bedside or a kitchen table.',
  },
  {
    id: 'hydrangea-bloom',
    code: 'G-02',
    name: 'Hydrangea bloom',
    category: 'get-well',
    price: 48,
    size: 'Medium bunch',
    flowers: 'Blue hydrangeas, eucalyptus',
    description: 'Calm, fresh, and easy to keep in a single vase.',
  },
]

// Placeholder photos: sample1 through sample4 rotate across the bouquets.
// Add `image: asset('sample3')` inside a bouquet above to assign a specific photo to it.
const SAMPLE_PHOTOS = [
  asset('sample1'),
  asset('sample2'),
  asset('sample3'),
  asset('sample4'),
].filter((url): url is string => Boolean(url))

export const BOUQUETS: Bouquet[] = BOUQUET_LIST.map((b, i) => ({
  image: SAMPLE_PHOTOS.length ? SAMPLE_PHOTOS[i % SAMPLE_PHOTOS.length] : undefined,
  ...b,
}))