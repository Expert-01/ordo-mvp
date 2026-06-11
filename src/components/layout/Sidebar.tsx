import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Code2, Lightbulb, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  userName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ userName = 'Gideon Johnson' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/dashboard/roadmap' },
    { icon: Code2, label: 'Projects', path: '/dashboard/projects' },
    { icon: Lightbulb, label: 'Opportunities', path: '/dashboard/opportunities' },
    { icon: MessageSquare, label: 'ORDO AI', path: '/dashboard/chat' },
  ];

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-30 hidden md:flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="orbitron text-xl font-bold text-gray-900">ORDO</h1>
              <p className="text-xs text-gray-500">Your Career Companion</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-[-16px] top-20 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-100 shadow-sm z-10"
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-gray-600" />
        ) : (
          <ChevronLeft size={16} className="text-gray-600" />
        )}
      </button>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium',
                isActive
                  ? 'bg-[#083417] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={20} 
                  className={clsx(
                    'flex-shrink-0',
                    isActive ? 'text-white' : 'text-gray-600'
                  )} 
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>



      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-600">Student</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

/**
 * Mobile Navigation Component (Hamburger Menu)
 */
export const MobileNavigation: React.FC<SidebarProps> = ({ userName = 'Gideon Johnson' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/dashboard/roadmap' },
    { icon: Code2, label: 'Projects', path: '/dashboard/projects' },
    { icon: Lightbulb, label: 'Opportunities', path: '/dashboard/opportunities' },
    { icon: MessageSquare, label: 'ORDO AI', path: '/dashboard/chat' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <div
        className={clsx(
          'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 md:hidden z-30 w-64 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo Section */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ORDO</h1>
              <p className="text-xs text-gray-500">Your Career Companion</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium',
                  isActive
                    ? 'bg-green-700 text-white shadow-lg border-l-4 border-green-500'
                    : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={20} 
                    className={clsx(
                      'flex-shrink-0',
                      isActive ? 'text-white' : 'text-gray-600'
                    )} 
                  />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Upgrade Section */}
        <div className="px-3 py-4 border-t border-gray-200">
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Upgrade Your Journey</h3>
            <p className="text-xs text-gray-700 mb-4 leading-relaxed">
              Unlock advanced ai insights and exclusive opportunities
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors">
              Go Premium
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-600">Student</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};