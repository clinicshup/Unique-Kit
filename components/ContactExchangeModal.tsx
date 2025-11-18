
import React from 'react';
import type { Item } from '../types';

interface ContactExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
}

const ContactExchangeModal: React.FC<ContactExchangeModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  // Assumes bids are sorted descending as per App logic, so the first one is the winner
  const winningBid = item.bids.length > 0 ? item.bids[0] : null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all">
        <div className="bg-brand-green p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-brand-yellow" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Auction Concluded!
          </h2>
          <p className="mt-2 opacity-90">The item <strong>{item.name}</strong> has been successfully sold.</p>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-yellow-50 border-l-4 border-brand-yellow p-4">
            <p className="text-brand-green-light text-sm font-semibold uppercase tracking-wide">Secure Information Exchange</p>
            <p className="text-gray-700 mt-1">Please save this information. It has been securely shared between the seller and the winning bidder.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Winner Info */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-brand-green mb-3 border-b pb-2">Winning Bidder</h3>
              {winningBid ? (
                <div className="space-y-2">
                  <div>
                      <span className="block text-xs text-gray-500 uppercase">Name</span>
                      <span className="font-medium text-gray-900">{winningBid.bidderName}</span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-500 uppercase">Phone Contact</span>
                      <span className="font-medium text-gray-900">{winningBid.bidderPhone}</span>
                  </div>
                  <div>
                      <span className="block text-xs text-gray-500 uppercase">Winning Bid</span>
                      <span className="font-bold text-green-600 text-lg">${winningBid.amount.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">No bids found.</p>
              )}
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-brand-green mb-3 border-b pb-2">Seller Details</h3>
              <div className="space-y-2">
                 <div>
                    <span className="block text-xs text-gray-500 uppercase">Seller Name</span>
                    <span className="font-medium text-gray-900">{item.seller.name}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-500 uppercase">Contact Info</span>
                    <span className="font-medium text-gray-900">{item.seller.contactInfo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-brand-cta hover:bg-brand-cta-hover text-white font-bold py-2 px-6 rounded-lg shadow transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactExchangeModal;
