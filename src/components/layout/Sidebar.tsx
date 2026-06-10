import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Code2, Lightbulb, MessageSquare, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  userName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ userName = 'Student' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/dashboard/roadmap' },
    { icon: Code2, label: 'Projects', path: '/dashboard/projects' },
    { icon: Lightbulb, label: 'Opportunities', path: '/dashboard/opportunities' },
    { icon: FileText, label: 'Portfolio', path: '/dashboard/portfolio' },
    { icon: MessageSquare, label: 'ORDO AI', path: '/dashboard/chat' },
  ];

  return (
    <aside
      className={clsx(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-30 hidden md:flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-4 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-100 shadow-sm z-10"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                isActive
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer - User Info */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-500">Student</p>
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
export const MobileNavigation: React.FC<SidebarProps> = ({ userName = 'Student' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/dashboard/roadmap' },
    { icon: Code2, label: 'Projects', path: '/dashboard/projects' },
    { icon: Lightbulb, label: 'Opportunities', path: '/dashboard/opportunities' },
    { icon: FileText, label: 'Portfolio', path: '/dashboard/portfolio' },
    { icon: MessageSquare, label: 'ORDO AI', path: '/dashboard/chat' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={clsx(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-transform duration-300 md:hidden z-30 w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                  isActive ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
