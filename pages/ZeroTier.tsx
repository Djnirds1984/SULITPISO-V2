
import React, { useState } from 'react';
import Card from '../components/Card';

const ZeroTier: React.FC = () => {
  const [networkId, setNetworkId] = useState('');
  const [status, setStatus] = useState<'Connected' | 'Disconnected' | 'Connecting...'>('Disconnected');
  const [managedIp, setManagedIp] = useState('N/A');

  const handleConnect = () => {
    if (!networkId) {
      alert('Please enter a Network ID.');
      return;
    }
    setStatus('Connecting...');
    // Mock connection
    setTimeout(() => {
      setStatus('Connected');
      setManagedIp('10.147.17.54');
    }, 2000);
  };
  
  const handleDisconnect = () => {
    setStatus('Disconnected');
    setManagedIp('N/A');
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">ZeroTier Management</h1>
      <Card title="ZeroTier Connection">
        <div className="space-y-6">
            <div>
                <label htmlFor="network-id" className="block text-sm font-medium text-gray-300 mb-1">
                    ZeroTier Network ID
                </label>
                <input
                    type="text"
                    id="network-id"
                    value={networkId}
                    onChange={(e) => setNetworkId(e.target.value)}
                    placeholder="e.g., 8056c2e21c000001"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-700/50 p-4 rounded-lg">
                <div>
                    <p className="text-sm font-medium text-gray-400">Status</p>
                    <p className={`text-lg font-semibold ${
                        status === 'Connected' ? 'text-green-400' : 
                        status === 'Connecting...' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                        {status}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-400">Managed IP</p>
                    <p className="text-lg font-semibold text-gray-200">{managedIp}</p>
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button
                    onClick={handleDisconnect}
                    disabled={status !== 'Connected'}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Disconnect
                </button>
                <button
                    onClick={handleConnect}
                    disabled={status === 'Connected' || status === 'Connecting...'}
                    className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Connect
                </button>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default ZeroTier;
