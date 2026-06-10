import React from 'react';
import clsx from 'clsx';

interface AuthContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AuthContainer - Split layout wrapper for auth pages
 * Left (50%): Form on desktop, full width on mobile
 * Right (50%): Hero image/gradient (hidden on mobile)
 */
export const AuthContainer: React.FC<AuthContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx('min-h-screen flex', className)}>
      {children}
    </div>
  );
};

export default AuthContainer;
