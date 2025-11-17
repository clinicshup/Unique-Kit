
import React, { useState } from 'react';
import Header from './components/Header';
import ItemDetail from './components/ItemDetail';
import ItemGrid from './components/ItemGrid';
import CreateListingForm from './components/CreateListingForm';
import AdManager from './components/AdManager';
import Hero from './components/Hero';
import type { Item, Bid, Seller } from './types';
import { MOCK_ITEMS } from './data/mockData';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleSelectItem = (id: string) => {
    setSelectedItemId(id);
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setSelectedItemId(null);
    setIsCreating(false);
  };

  const handleShowCreateForm = () => {
    setSelectedItemId(null);
    setIsCreating(true);
  };

  const handleAddItem = (item: Omit<Item, 'id' | 'bids' | 'status'>) => {
    const newItem: Item = {
      ...item,
      id: `item-${Date.now()}`,
      bids: [],
      status: 'active',
    };
    setItems(prevItems => [newItem, ...prevItems]);
    setIsCreating(false);
  };

  const handleAddBid = (itemId: string, bid: Bid) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, bids: [...item.bids, bid].sort((a, b) => b.amount - a.amount) }
          : item
      )
    );
  };

  const handleSelectWinner = (itemId: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: 'sold' } : item
      )
    );
  };

  const selectedItem = items.find(item => item.id === selectedItemId);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <AdManager />
      <Header onLogoClick={handleGoHome} />
      <main className="container mx-auto px-4 py-8">
        {selectedItem ? (
          <ItemDetail
            item={selectedItem}
            onAddBid={handleAddBid}
            onSelectWinner={handleSelectWinner}
            onBack={handleGoHome}
          />
        ) : isCreating ? (
          <CreateListingForm onAddItem={handleAddItem} onCancel={handleGoHome} />
        ) : (
          <>
            <Hero />
            <div className="text-center my-12">
              <button
                onClick={handleShowCreateForm}
                className="bg-brand-cta hover:bg-brand-cta-hover text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                List Your Item
              </button>
            </div>
            <ItemGrid items={items} onSelectItem={handleSelectItem} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
