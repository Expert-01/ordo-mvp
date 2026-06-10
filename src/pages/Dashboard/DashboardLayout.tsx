import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar, MobileNavigation } from '../../components/layout/Sidebar';
import clsx from 'clsx';

interface DashboardLayoutProps {
  userName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userName = 'Gideon' }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    // Redirect to login or home page
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar userName={userName} onLogout={handleLogout} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar userName={userName} />

        {/* Mobile Navigation */}
        <MobileNavigation userName={userName} />

        {/* Main Content */}
        <main
          className={clsx(
            'flex-1 transition-all duration-300',
            'md:ml-64 md:pt-0', // Add left margin for desktop to account for sidebar
            'pt-4 px-4 md:px-8 py-6'
          )}
        >
          {/* Content Container with max-width */}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
