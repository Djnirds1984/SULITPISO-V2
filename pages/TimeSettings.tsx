
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const TimeSettings: React.FC = () => {
  const [ntpServer, setNtpServer] = useState('pool.ntp.org');
  const [isNtpEnabled, setIsNtpEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSave = () => {
    // Mock save
    console.log({ ntpServer, isNtpEnabled });
    alert('Time settings saved!');
  };

  const handleSync = () => {
    // Mock sync
    alert('Syncing time with NTP server...');
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">Time Sync Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="NTP Configuration">
          <form className="space-y-6">
            <div>
              <label htmlFor="ntp-server" className="block text-sm font-medium text-gray-300 mb-1">
                NTP Server
              </label>
              <input
                type="text"
                id="ntp-server"
                value={ntpServer}
                onChange={(e) => setNtpServer(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">Enable NTP Sync</span>
              <button
                type="button"
                onClick={() => setIsNtpEnabled(!isNtpEnabled)}
                className={`${
                  isNtpEnabled ? 'bg-teal-600' : 'bg-gray-600'
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500`}
              >
                <span
                  className={`${
                    isNtpEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </button>
            </div>
            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={handleSync}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
              >
                Sync Now
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </Card>

        <Card title="Current System Time">
          <div className="text-center">
            <p className="text-5xl font-mono font-bold text-teal-400">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-lg text-gray-300 mt-2">
              {currentTime.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TimeSettings;
