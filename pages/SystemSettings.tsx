
import React, { useState } from 'react';
import Card from '../components/Card';

const SystemSettings: React.FC = () => {
  const [ssid, setSsid] = useState('PisoFi_Hotspot');
  const [password, setPassword] = useState('admin1234');
  const [uploadLimit, setUploadLimit] = useState(5);
  const [downloadLimit, setDownloadLimit] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save operation
    console.log({ ssid, password, uploadLimit, downloadLimit });
    alert('System settings saved!');
  };

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
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                value={uploadLimit}
                onChange={(e) => setUploadLimit(Number(e.target.value))}
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
                value={downloadLimit}
                onChange={(e) => setDownloadLimit(Number(e.target.value))}
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
