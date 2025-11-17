
import React, { useState, useEffect, useCallback } from 'react';
import type { Ad } from '../types';
import { MOCK_ADS } from '../data/mockData';

const AD_ROTATION_INTERVAL = 40000; // 40 seconds

const AdPopup: React.FC<{ ad: Ad; onClose: () => void }> = ({ ad, onClose }) => {
  const isPopup = ad.type === 'popup';

  const baseClasses = 'fixed z-50 transform transition-all duration-500 ease-out';
  const popupClasses = 'inset-0 bg-black bg-opacity-50 flex items-center justify-center';
  const popunderClasses = 'bottom-4 right-4';
  
  const containerClasses = isPopup ? `${baseClasses} ${popupClasses}` : `${baseClasses} ${popunderClasses}`;

  return (
    <div className={containerClasses}>
      <div className="bg-white rounded-lg shadow-2xl p-2 relative max-w-lg w-full m-4">
        <button 
          onClick={onClose} 
          className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg hover:bg-red-600 transition-colors"
          aria-label="Close ad"
        >
          &times;
        </button>
        <a href={ad.link} target="_blank" rel="noopener noreferrer">
          <img src={ad.imageUrl} alt={`Advertisement ${ad.id}`} className="rounded-md w-full" />
        </a>
      </div>
    </div>
  );
};

const AdManager: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isAdVisible, setIsAdVisible] = useState(false);

  const closeAd = useCallback(() => {
    setIsAdVisible(false);
  }, []);

  useEffect(() => {
    const showNextAd = () => {
      setIsAdVisible(true);
      setCurrentAdIndex(prevIndex => (prevIndex + 1) % MOCK_ADS.length);
    };
    
    // Show the first ad after a short delay
    const initialTimeout = setTimeout(showNextAd, 5000);

    const intervalId = setInterval(showNextAd, AD_ROTATION_INTERVAL);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, []);

  if (!isAdVisible) {
    return null;
  }

  const currentAd = MOCK_ADS[currentAdIndex];

  return <AdPopup ad={currentAd} onClose={closeAd} />;
};

export default AdManager;
