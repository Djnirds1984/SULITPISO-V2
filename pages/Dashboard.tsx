
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';

interface DashboardData {
  onlineUsers: number;
  totalSales: number;
  systemUptime: string;
  networkStatus: 'OK' | 'Error' | 'N/A';
  weeklySales: { name: string; sales: number }[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard.php');
        const result = await response.json();
        if (result.status === 'success') {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading Dashboard...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Online Users" icon={<UserIcon />}>
          <p className="text-4xl font-bold text-teal-400">{data?.onlineUsers ?? 'N/A'}</p>
          <p className="text-sm text-gray-400">Currently connected</p>
        </Card>
        <Card title="Total Sales (Today)" icon={<CashIcon />}>
          <p className="text-4xl font-bold text-green-400">₱ {data?.totalSales.toLocaleString() ?? 'N/A'}</p>
          <p className="text-sm text-gray-400">Simulated data</p>
        </Card>
        <Card title="System Uptime" icon={<ClockIcon />}>
          <p className="text-4xl font-bold text-blue-400">{data?.systemUptime ?? 'N/A'}</p>
          <p className="text-sm text-gray-400">Since last reboot</p>
        </Card>
        <Card title="Network Status" icon={<WifiIcon />}>
          <p className={`text-4xl font-bold ${data?.networkStatus === 'OK' ? 'text-yellow-400' : 'text-red-400'}`}>
            {data?.networkStatus ?? 'N/A'}
          </p>
          <p className="text-sm text-gray-400">WAN connection active</p>
        </Card>
      </div>

      <Card title="Weekly Sales Overview">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.weeklySales} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="name" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4FD1C5" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const CashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.555a5.5 5.5 0 017.778 0M12 20.25a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.222 12.889a9.75 9.75 0 0115.556 0" /></svg>
);

export default Dashboard;