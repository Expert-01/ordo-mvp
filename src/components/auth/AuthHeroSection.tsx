import React from 'react';
import clsx from 'clsx';

interface AuthHeroSectionProps {
  className?: string;
}

/**
 * AuthHeroSection - Right side hero section for auth pages
 * Displays gradient background with hero message
 * Hidden on mobile
 */
export const AuthHeroSection: React.FC<AuthHeroSectionProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        'hidden md:flex w-1/2 flex-col justify-center items-center',
        'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600',
        'relative overflow-hidden p-12',
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-md">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to ORDO
        </h2>
        <p className="text-lg md:text-xl opacity-90">
          Let's build your journey from classroom to career.
        </p>
        
        {/* Optional: Add illustration or more content */}
        <div className="mt-12">
          <div className="inline-block">
            <div className="text-6xl">🚀</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
