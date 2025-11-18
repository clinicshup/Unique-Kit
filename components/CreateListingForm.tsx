
import React, { useState } from 'react';
import type { Item } from '../types';

interface CreateListingFormProps {
  onAddItem: (item: Omit<Item, 'id' | 'bids' | 'status'>) => void;
  onCancel: () => void;
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({ onAddItem, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [itemDate, setItemDate] = useState('');
  const [itemAge, setItemAge] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerContact, setSellerContact] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // Fix: Explicitly type `file` as `File` to resolve TypeScript inference issue where `file` was treated as `unknown`.
      const imagePromises = files.map((file: File) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(imagePromises).then(base64Images => {
        setImages(prev => [...prev, ...base64Images]);
      }).catch(err => setError('Error reading image files.'));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !startingBid || !sellerName || !sellerContact || images.length === 0) {
      setError('Please fill out all fields and upload at least one image.');
      return;
    }
    const newItem = {
      name,
      description,
      itemDate,
      itemAge: parseInt(itemAge, 10) || 0,
      startingBid: parseFloat(startingBid),
      seller: { name: sellerName, contactInfo: sellerContact },
      images,
    };
    onAddItem(newItem);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-brand-green mb-6">Create a New Listing</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Description</label>
          <p className="text-xs text-gray-500 mb-2">Please provide a detailed description including condition, history, and unique features.</p>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" required></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Item Date (e.g., "circa 1890")</label>
                <input type="text" value={itemDate} onChange={e => setItemDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Item Age (in years)</label>
                <input type="number" value={itemAge} onChange={e => setItemAge(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" />
            </div>
        </div>
         <div>
          <label className="block text-sm font-medium text-gray-700">Starting Bid ($)</label>
          <input type="number" value={startingBid} onChange={e => setStartingBid(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" required />
        </div>
        <hr/>
         <div>
          <h3 className="text-xl font-semibold text-brand-green mb-2">Seller Information</h3>
           <div>
              <label className="block text-sm font-medium text-gray-700">Your Name / Business Name</label>
              <input type="text" value={sellerName} onChange={e => setSellerName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" required />
          </div>
           <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Contact Info (Email/Phone)</label>
              <input type="text" value={sellerContact} onChange={e => setSellerContact(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" required />
              <p className="text-xs text-gray-500 mt-1">This will only be shared with the winning bidder.</p>
          </div>
        </div>
        <hr/>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm leading-5 font-medium text-blue-800">
                  Image Guidelines
                </h3>
                <div className="mt-2 text-sm leading-5 text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Format:</strong> JPG, PNG, or GIF are suitable for the application.</li>
                    <li><strong>Size:</strong> Minimum 800x600 pixels recommended.</li>
                    <li><strong>Quality:</strong> Ensure high resolution and good lighting for the best results.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-cta hover:text-brand-cta-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-yellow"><span>Upload files</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageUpload} accept="image/*" /></label><p className="pl-1">or drag and drop</p></div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {images.map((imgSrc, index) => <img key={index} src={imgSrc} className="h-20 w-20 object-cover rounded-md" alt="upload preview"/>)}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="bg-brand-cta hover:bg-brand-cta-hover text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform hover:scale-105">
            List Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingForm;
    