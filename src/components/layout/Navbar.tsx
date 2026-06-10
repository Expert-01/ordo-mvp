import React, { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { Button } from '../common/Button';

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userName = 'Student', onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <div className="text-2xl font-bold text-green-600">ORDO</div>
          <span className="ml-2 text-sm text-gray-600 hidden sm:inline">Your Career Companion</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* User Info */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Good Morning!</p>
                <p className="text-xs text-gray-500">{userName}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <span>👤</span> Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <span>⚙️</span> Settings
                </button>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout?.();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 space-y-3">
          <div className="text-sm font-medium text-gray-900">Hello, {userName}!</div>
          <Button fullWidth variant="ghost" onClick={onLogout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
