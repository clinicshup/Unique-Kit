
import React, { useState } from 'react';
import Header from './components/Header';
import ItemDetail from './components/ItemDetail';
import ItemGrid from './components/ItemGrid';
import CreateListingForm from './components/CreateListingForm';
import AdManager from './components/AdManager';
import Hero from './components/Hero';
import ContactExchangeModal from './components/ContactExchangeModal';
import type { Item, Bid, Seller } from './types';
import { MOCK_ITEMS } from './data/mockData';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('item');
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactItem, setContactItem] = useState<Item | null>(null);

  const handleSelectItem = (id: string) => {
    setSelectedItemId(id);
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setSelectedItemId(null);
    setIsCreating(false);
    // Optional: Clean up URL if desired, though not strictly necessary for single-session nav
    const url = new URL(window.location.href);
    url.searchParams.delete('item');
    window.history.pushState({}, '', url);
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
    const itemToSell = items.find(i => i.id === itemId);
    if (itemToSell) {
      // Pass the item to the modal. We can treat it as effectively 'sold' for the display.
      setContactItem({ ...itemToSell, status: 'sold' });
      setIsContactModalOpen(true);
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: 'sold' } : item
      )
    );
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setContactItem(null);
  };

  const selectedItem = items.find(item => item.id === selectedItemId);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <AdManager />
      <ContactExchangeModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseContactModal} 
        item={contactItem} 
      />
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
