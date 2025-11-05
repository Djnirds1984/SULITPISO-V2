
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

type Status = 'Connected' | 'Disconnected' | 'Connecting...' | 'Leaving...' | string;

interface ZeroTierState {
  networkId: string;
  status: Status;
  managedIp: string;
}

const ZeroTier: React.FC = () => {
  const [ztState, setZtState] = useState<ZeroTierState>({
    networkId: '',
    status: 'Disconnected',
    managedIp: 'N/A'
  });
  const [inputNetworkId, setInputNetworkId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/zerotier.php');
        const result = await response.json();
        if (result.status === 'success') {
          setZtState(result.data);
          setInputNetworkId(result.data.networkId);
        }
      } catch (error) {
        console.error('Failed to fetch ZeroTier status', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);
  
  const sendZtCommand = async (action: 'connect' | 'disconnect') => {
    if (!inputNetworkId) {
      alert('Please enter a Network ID.');
      return;
    }
    setZtState(prev => ({ ...prev, status: action === 'connect' ? 'Connecting...' : 'Leaving...' }));
    
    try {
      const response = await fetch('/api/zerotier.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, networkId: inputNetworkId }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setZtState(result.data);
        setInputNetworkId(result.data.networkId);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
      // Revert status on error
      setZtState(prev => ({ ...prev, status: prev.status === 'Connecting...' ? 'Disconnected' : 'Connected' }));
    }
  };

  if (loading) {
    return <div>Loading ZeroTier status...</div>;
  }

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
                    value={inputNetworkId}
                    onChange={(e) => setInputNetworkId(e.target.value)}
                    placeholder="e.g., 8056c2e21c000001"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-700/50 p-4 rounded-lg">
                <div>
                    <p className="text-sm font-medium text-gray-400">Status</p>
                    <p className={`text-lg font-semibold ${
                        ztState.status === 'Connected' ? 'text-green-400' : 
                        ztState.status === 'Connecting...' || ztState.status === 'Leaving...' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                        {ztState.status}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-400">Managed IP</p>
                    <p className="text-lg font-semibold text-gray-200">{ztState.managedIp}</p>
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button
                    onClick={() => sendZtCommand('disconnect')}
                    disabled={ztState.status !== 'Connected'}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Disconnect
                </button>
                <button
                    onClick={() => sendZtCommand('connect')}
                    disabled={ztState.status === 'Connected' || ztState.status === 'Connecting...'}
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