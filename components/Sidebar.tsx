import React from 'react';
import { ICONS } from '../constants';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: Page[] = [
    'Dashboard',
    'System Settings',
    'Time Sync',
    'Rates & Vouchers',
    'Portal Editor',
    'GPIO Assignment',
    'ZeroTier',
  ];

  return (
    <aside className="fixed top-0 left-0 h-full bg-gray-900 text-teal-300 w-16 md:w-64 border-r border-gray-700 shadow-lg flex flex-col transition-all duration-300 z-10">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <div className="text-2xl font-bold text-white hidden md:block">SULIT<span className="text-teal-400">PISO</span></div>
         <div className="text-2xl font-bold text-white block md:hidden">S<span className="text-teal-400">P</span></div>
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item} className="px-2">
              <button
                onClick={() => setCurrentPage(item)}
                className={`flex items-center w-full h-12 px-4 rounded-lg transition-colors duration-200 ${
                  currentPage === item
                    ? 'bg-teal-500/20 text-teal-300'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {ICONS[item]}
                <span className="ml-4 font-medium hidden md:block">{item}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
          <div className="text-gray-500 text-xs hidden md:block">
              <p>SULITPISO v1.0.0</p>
              <p>&copy; 2024 AJC IT Solutions</p>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;