
export interface Seller {
  name: string;
  contactInfo: string;
}

export interface Bid {
  id: string;
  date: string;
  bidderName: string;
  bidderPhone: string;
  amount: number;
}

export interface Item {
  id: string;
  name: string;
  images: string[];
  seller: Seller;
  description: string;
  itemDate: string;
  itemAge: number;
  startingBid: number;
  bids: Bid[];
  status: 'active' | 'sold';
}

export interface Ad {
  id: number;
  type: 'popup' | 'popunder';
  imageUrl: string;
  link: string;
}
