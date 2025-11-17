
import React from 'react';
import type { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onSelect: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect }) => {
    const highestBid = item.bids.length > 0 ? Math.max(...item.bids.map(b => b.amount)) : item.startingBid;

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
            onClick={() => onSelect(item.id)}
        >
            <div className="relative">
                <img src={item.images[0]} alt={item.name} className="w-full h-56 object-cover" />
                <div className={`absolute top-0 right-0 m-2 px-2 py-1 text-xs font-bold text-white rounded ${item.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {item.status.toUpperCase()}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-brand-green group-hover:text-brand-cta transition-colors">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Sold by {item.seller.name}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Current Bid</span>
                    <span className="text-xl font-bold text-brand-green-light">${highestBid.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};


interface ItemGridProps {
  items: Item[];
  onSelectItem: (id: string) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, onSelectItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map(item => (
        <ItemCard key={item.id} item={item} onSelect={onSelectItem} />
      ))}
    </div>
  );
};

export default ItemGrid;
