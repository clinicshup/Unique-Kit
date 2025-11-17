
import type { Item, Ad } from '../types';

export const MOCK_ITEMS: Item[] = [
  {
    id: 'item-1',
    name: 'Antique Astronomical Telescope',
    images: [
      'https://picsum.photos/seed/telescope1/800/600',
      'https://picsum.photos/seed/telescope2/800/600',
      'https://picsum.photos/seed/telescope3/800/600',
    ],
    seller: {
      name: 'Galileo’s Attic',
      contactInfo: 'seller1@example.com',
    },
    description:
      'A beautifully preserved brass telescope from the late 19th century. Features intricate engravings and comes with its original mahogany tripod. Optics are surprisingly clear for its age, offering a glimpse into the history of astronomy.',
    itemDate: 'circa 1890',
    itemAge: 134,
    startingBid: 1200,
    bids: [
        { id: 'bid-1', date: new Date(Date.now() - 86400000).toISOString(), bidderName: 'John Doe', bidderPhone: '555-1234', amount: 1250 },
        { id: 'bid-2', date: new Date(Date.now() - 43200000).toISOString(), bidderName: 'Jane Smith', bidderPhone: '555-5678', amount: 1300 },
    ].sort((a,b) => b.amount - a.amount),
    status: 'active',
  },
  {
    id: 'item-2',
    name: 'Signed First Edition "The Hobbit"',
    images: [
      'https://picsum.photos/seed/book1/800/600',
      'https://picsum.photos/seed/book2/800/600',
    ],
    seller: {
      name: 'Middle-earth Books',
      contactInfo: 'seller2@example.com',
    },
    description:
      'A rare first edition, first printing of J.R.R. Tolkien\'s classic, "The Hobbit". This copy is hand-signed by the author on the title page. The dust jacket has minor wear but is otherwise in excellent condition. A true collector\'s piece.',
    itemDate: '1937',
    itemAge: 87,
    startingBid: 25000,
    bids: [
        { id: 'bid-3', date: new Date(Date.now() - 172800000).toISOString(), bidderName: 'Bilbo Baggins', bidderPhone: '555-1111', amount: 26000 },
    ].sort((a,b) => b.amount - a.amount),
    status: 'active',
  },
  {
    id: 'item-3',
    name: 'Roman Denarius Coin',
    images: ['https://picsum.photos/seed/coin1/800/600'],
    seller: {
      name: 'Ancient Artifacts',
      contactInfo: 'seller3@example.com',
    },
    description:
      'A silver Denarius from the reign of Emperor Trajan (98-117 AD). The obverse features a clear portrait of the emperor. This coin is in Fine condition and is a tangible piece of Roman history.',
    itemDate: 'c. 110 AD',
    itemAge: 1914,
    startingBid: 150,
    bids: [],
    status: 'active',
  },
  {
    id: 'item-4',
    name: 'Vintage 1950s Wurlitzer Jukebox',
    images: [
      'https://picsum.photos/seed/juke1/800/600',
      'https://picsum.photos/seed/juke2/800/600',
    ],
    seller: {
      name: 'Retro Sounds Inc.',
      contactInfo: 'seller4@example.com',
    },
    description:
      'A fully restored Wurlitzer Model 1250 jukebox. Famous for its vibrant colors and bubbling tubes, this piece is the epitome of 1950s cool. Holds 24 records and plays beautifully. A stunning centerpiece for any room.',
    itemDate: '1952',
    itemAge: 72,
    startingBid: 8500,
    bids: [
        { id: 'bid-4', date: new Date(Date.now() - 259200000).toISOString(), bidderName: 'Fonzie', bidderPhone: '555-2222', amount: 8600 },
        { id: 'bid-5', date: new Date(Date.now() - 86400000).toISOString(), bidderName: 'Richie C.', bidderPhone: '555-3333', amount: 8750 },
    ].sort((a,b) => b.amount - a.amount),
    status: 'sold',
  },
];

export const MOCK_ADS: Ad[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    type: i % 3 === 0 ? 'popunder' : 'popup',
    imageUrl: `https://picsum.photos/seed/ad${i + 1}/600/150`,
    link: '#',
}));
