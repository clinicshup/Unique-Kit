
import React from 'react';

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div onClick={onClick} className="cursor-pointer flex items-center space-x-3">
    <div className="relative h-12 w-12">
      <img 
        src="https://picsum.photos/seed/ancientbronzecoin/150/150" 
        alt="Ancient Bronze Coin Logo" 
        className="h-full w-full rounded-full object-cover border-2 border-brand-yellow shadow-sm"
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10"></div>
    </div>
    <span className="text-2xl font-bold text-white">Unique Kit</span>
  </div>
);

const SocialIcons: React.FC = () => (
  <div className="flex items-center space-x-4">
    {/* Facebook */}
    <a href="#" className="text-gray-300 hover:text-brand-yellow transition-colors" aria-label="Facebook">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    </a>
    
    {/* YouTube */}
    <a href="#" className="text-gray-300 hover:text-brand-yellow transition-colors" aria-label="YouTube">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    </a>

    {/* TikTok */}
    <a href="#" className="text-gray-300 hover:text-brand-yellow transition-colors" aria-label="TikTok">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    </a>
  </div>
);

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-brand-green shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo onClick={onLogoClick} />
        <SocialIcons />
      </div>
    </header>
  );
};

export default Header;
