import React from 'react';

interface HeroSectionProps {
  userName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ userName }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Good Morning, {userName}
      </h1>
      <p className="text-gray-600 text-lg">Let's build your future one step at a time</p>
    </div>
  );
};
