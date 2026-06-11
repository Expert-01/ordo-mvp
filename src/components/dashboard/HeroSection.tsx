import React from 'react';

interface HeroSectionProps {
  userName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ userName }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg md:py-8">
      <div className="flex items-center justify-between">
        {/* Left side - Greeting and tagline */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-1">
            Good Morning, {userName}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Let's build your future one step at a time
          </p>
        </div>

        {/* Right side - Role badge */}
        <div className="ml-6 md:ml-8">
          <div className="text-lg md:text-xl font-semibold text-gray-900 whitespace-nowrap">
            Future AI Engineer
          </div>
        </div>
      </div>
    </div>
  );
};