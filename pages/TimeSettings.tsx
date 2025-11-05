
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const TimeSettings: React.FC = () => {
  const [ntpServer, setNtpServer] = useState('pool.ntp.org');
  const [isNtpEnabled, setIsNtpEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/time.php');
        const result = await response.json();
        if (result.status === 'success') {
          setNtpServer(result.data.ntpServer);
          setIsNtpEnabled(result.data.isNtpEnabled);
          setCurrentTime(new Date(result.data.currentTime));
        }
      } catch (error) {
        console.error("Failed to fetch time settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(prev => new Date(prev.getTime() + 1000)), 1000);
    return () => clearInterval(timer);
  }, [currentTime]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/time.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ntpServer, isNtpEnabled }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('Time settings saved!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(`Error saving: ${(error as Error).message}`);
    }
  };

  const handleSync = async () => {
    alert('Syncing time with NTP server...');
    try {
      const response = await fetch('/api/time.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync' }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('Sync successful!');
        // Refetch time to update display
        const res = await fetch('/api/time.php');
        const timeResult = await res.json();
        if (timeResult.status === 'success') {
            setCurrentTime(new Date(timeResult.data.currentTime));
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(`Error syncing: ${(error as Error).message}`);
    }
  };

  if (loading) {
    return <div>Loading time settings...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">Time Sync Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="NTP Configuration">
          <div className="space-y-6">
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
          </div>
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