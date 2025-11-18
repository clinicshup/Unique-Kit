
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-brand-green rounded-xl shadow-2xl overflow-hidden mb-12 flex flex-col md:flex-row">
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Where History <br/> Meets <span className="text-brand-yellow">Possibility</span>
        </h1>
        <p className="text-lg mb-6 leading-relaxed text-gray-200">
          Welcome to <strong>Unique Kit</strong>, the premier auction platform for the extraordinary. 
          We curate a selection of rare artifacts, vintage collectibles, and historical masterpieces. 
          Connect with sellers globally and bid on items that tell a story.
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <div className="h-1 w-16 bg-brand-yellow rounded-full"></div>
          <span className="text-brand-yellow-light font-semibold tracking-wider text-sm uppercase">
            Discover Rare Items
          </span>
        </div>
      </div>
      <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
        <img 
          src="https://picsum.photos/seed/mamluklamp/800/800" 
          alt="Artistic depiction of a Mamluk-era lamp" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for better text contrast/blending on mobile or small screens if needed, and style */}
        <div className="absolute inset-0 bg-brand-green opacity-20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-green via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
