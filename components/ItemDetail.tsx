
import React, { useState } from 'react';
import type { Item, Bid } from '../types';

interface ItemDetailProps {
  item: Item;
  onAddBid: (itemId: string, bid: Bid) => void;
  onSelectWinner: (itemId: string) => void;
  onBack: () => void;
}

const ImageGallery: React.FC<{ images: string[], itemName: string }> = ({ images, itemName }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div>
      <img src={mainImage} alt={itemName} className="w-full h-96 object-cover rounded-lg shadow-lg mb-4" />
      <div className="flex space-x-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${itemName} thumbnail ${index + 1}`}
            onClick={() => setMainImage(img)}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-brand-cta' : 'border-transparent'} hover:border-brand-cta transition`}
          />
        ))}
      </div>
    </div>
  );
};

const BidForm: React.FC<{ item: Item, onAddBid: (itemId: string, bid: Bid) => void }> = ({ item, onAddBid }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const highestBid = item.bids.length > 0 ? item.bids[0].amount : item.startingBid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bidAmount = parseFloat(amount);
    if (!bidAmount || !name || !phone) {
      setError('All fields are required.');
      return;
    }
    if (bidAmount <= highestBid) {
      setError(`Your bid must be higher than the current bid of $${highestBid.toLocaleString()}.`);
      return;
    }
    
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      date: new Date().toISOString(),
      bidderName: name,
      bidderPhone: phone,
      amount: bidAmount,
    };
    onAddBid(item.id, newBid);
    setAmount('');
    setName('');
    setPhone('');
    setError('');
  };
  
  if (item.status === 'sold') {
    return <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert"><p className="font-bold">Auction Ended</p><p>This item has been sold.</p></div>
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-yellow-light p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-brand-green mb-4">Place Your Bid</h3>
      <p className="mb-4 text-gray-700">Current highest bid: <span className="font-bold">${highestBid.toLocaleString()}</span></p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="space-y-4">
        <input type="number" placeholder="Your Bid Amount" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow" min={highestBid + 1} required/>
        <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow" required/>
        <input type="tel" placeholder="Your Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow" required/>
      </div>
      <button type="submit" className="mt-6 w-full bg-brand-cta hover:bg-brand-cta-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        Submit Bid
      </button>
    </form>
  );
};

const BidsList: React.FC<{ item: Item, onSelectWinner: (itemId: string) => void }> = ({ item, onSelectWinner }) => {
    const winner = item.status === 'sold' ? item.bids[0] : null;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-brand-green mb-4 border-b-2 border-brand-yellow pb-2">Bidding History</h3>
            {item.bids.length === 0 ? (
                <p>No bids yet. Be the first!</p>
            ) : (
                <ul className="space-y-4">
                    {item.bids.map((bid, index) => (
                        <li key={bid.id} className={`p-4 rounded-lg flex justify-between items-center transition-all ${index === 0 ? 'bg-green-100 border-2 border-green-400' : 'bg-gray-100'} ${winner && winner.id === bid.id ? 'ring-4 ring-yellow-400' : ''}`}>
                            <div>
                                <p className="font-bold text-lg text-brand-green">${bid.amount.toLocaleString()}</p>
                                <p className="text-sm text-gray-700">{bid.bidderName} ({bid.bidderPhone})</p>
                                <p className="text-xs text-gray-500">{new Date(bid.date).toLocaleString()}</p>
                            </div>
                            {index === 0 && item.status === 'active' && (
                                <button onClick={() => onSelectWinner(item.id)} className="bg-brand-cta hover:bg-brand-cta-hover text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105">
                                    Select Highest Bidder
                                </button>
                            )}
                            {winner && winner.id === bid.id && (
                                <div className="text-right">
                                    <p className="font-bold text-yellow-600">WINNER!</p>
                                    <p className="text-sm text-gray-600">Contact info shared securely.</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onAddBid, onSelectWinner, onBack }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
      <button onClick={onBack} className="mb-6 text-brand-cta hover:text-brand-cta-hover font-semibold">
        &larr; Back to Listings
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-brand-green mb-2">{item.name}</h1>
          <p className="text-lg text-gray-600 mb-6">Dated: {item.itemDate} ({item.itemAge} years old)</p>
          <ImageGallery images={item.images} itemName={item.name} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-brand-green mb-2 border-b-2 border-brand-yellow pb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>
          </div>
           <div className="mt-8">
            <h2 className="text-2xl font-bold text-brand-green mb-2 border-b-2 border-brand-yellow pb-2">Seller Information</h2>
            <p className="text-gray-700"><strong>Name:</strong> {item.seller.name}</p>
            <p className="text-gray-700"><strong>Contact:</strong> A secure communication channel will be opened with the winning bidder.</p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BidForm item={item} onAddBid={onAddBid} />
            <BidsList item={item} onSelectWinner={onSelectWinner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
