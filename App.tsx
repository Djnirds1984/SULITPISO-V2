
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SystemSettings from './pages/SystemSettings';
import TimeSettings from './pages/TimeSettings';
import PortalEditor from './pages/PortalEditor';
import ZeroTier from './pages/ZeroTier';
import GpioAssignment from './pages/GpioAssignment';
import Rates from './pages/Rates';

export type Page = 'Dashboard' | 'System Settings' | 'Time Sync' | 'Portal Editor' | 'ZeroTier' | 'GPIO Assignment' | 'Rates & Vouchers';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'System Settings':
        return <SystemSettings />;
      case 'Time Sync':
        return <TimeSettings />;
      case 'Portal Editor':
        return <PortalEditor />;
      case 'ZeroTier':
        return <ZeroTier />;
      case 'GPIO Assignment':
        return <GpioAssignment />;
      case 'Rates & Vouchers':
        return <Rates />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-16 md:ml-64 transition-all duration-300">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
