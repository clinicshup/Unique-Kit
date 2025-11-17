
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-brand-green-light rounded-lg shadow-xl p-4 md:p-6 mb-12">
      <div className="aspect-w-16 aspect-h-9 aspect-video">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md w-full h-full"
          title="Promotional Video"
        ></iframe>
      </div>
    </div>
  );
};

export default Hero;
