
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

interface Settings {
  ssid: string;
  password?: string; // Password might not be sent back from API for security
  uploadLimit: number;
  downloadLimit: number;
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    ssid: '',
    password: '',
    uploadLimit: 0,
    downloadLimit: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/settings.php');
        const result = await response.json();
        if (result.status === 'success') {
          setSettings(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [id]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/settings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('System settings saved!');
      } else {
        throw new Error(result.message || 'Failed to save settings');
      }
    } catch (error) {
      alert(`Error saving settings: ${(error as Error).message}`);
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">System Settings</h1>
      <Card title="Hotspot Configuration">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="ssid" className="block text-sm font-medium text-gray-300 mb-1">
              Hotspot Name (SSID)
            </label>
            <input
              type="text"
              id="ssid"
              value={settings.ssid}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={settings.password}
              onChange={handleInputChange}
              placeholder="Enter new password to change"
              className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="uploadLimit" className="block text-sm font-medium text-gray-300 mb-1">
                Upload Limit (Mbps)
              </label>
              <input
                type="number"
                id="uploadLimit"
                value={settings.uploadLimit}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label htmlFor="downloadLimit" className="block text-sm font-medium text-gray-300 mb-1">
                Download Limit (Mbps)
              </label>
              <input
                type="number"
                id="downloadLimit"
                value={settings.downloadLimit}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SystemSettings;