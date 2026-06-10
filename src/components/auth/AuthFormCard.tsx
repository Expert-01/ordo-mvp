import React from 'react';
import clsx from 'clsx';

interface AuthFormCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * AuthFormCard - Left side form card container for auth pages
 * Includes ORDO branding and form
 */
export const AuthFormCard: React.FC<AuthFormCardProps> = ({ 
  title, 
  subtitle, 
  children, 
  className 
}) => {
  return (
    <div
      className={clsx(
        'w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-12 md:py-0',
        'bg-white',
        className
      )}
    >
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">ORDO</h1>
      </div>

      {/* Form Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-lg">{subtitle}</p>
        )}
      </div>

      {/* Form Content */}
      <div className="w-full max-w-md mx-auto md:mx-0">
        {children}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center md:text-left text-sm text-gray-500">
        <p>© 2026 ORDO. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthFormCard;
