
import React, { useState } from 'react';
import Card from '../components/Card';
import { Rate } from '../types';

const initialRates: Rate[] = [
  { id: 1, pisoValue: 1, timeValue: 10, timeUnit: 'minutes' },
  { id: 2, pisoValue: 5, timeValue: 1, timeUnit: 'hours' },
  { id: 3, pisoValue: 10, timeValue: 3, timeUnit: 'hours' },
  { id: 4, pisoValue: 25, timeValue: 1, timeUnit: 'days' },
];

const Rates: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>(initialRates);
  const [pisoValue, setPisoValue] = useState<number | ''>('');
  const [timeValue, setTimeValue] = useState<number | ''>('');
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours' | 'days'>('minutes');

  const addRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pisoValue || !timeValue) return;
    const newRate: Rate = {
      id: Date.now(),
      pisoValue,
      timeValue,
      timeUnit,
    };
    setRates([...rates, newRate]);
    setPisoValue('');
    setTimeValue('');
  };
  
  const deleteRate = (id: number) => {
    if(window.confirm('Are you sure you want to delete this rate?')) {
        setRates(rates.filter(rate => rate.id !== id));
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">Rates Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Current Rates">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-600">
                  <tr>
                    <th className="p-3 text-sm font-semibold text-gray-300">Piso Value</th>
                    <th className="p-3 text-sm font-semibold text-gray-300">Time Credit</th>
                    <th className="p-3 text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map(rate => (
                    <tr key={rate.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="p-3 text-white">₱{rate.pisoValue}</td>
                      <td className="p-3 text-white">{`${rate.timeValue} ${rate.timeUnit}`}</td>
                      <td className="p-3">
                        <button onClick={() => deleteRate(rate.id)} className="text-red-400 hover:text-red-300">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Add New Rate">
            <form onSubmit={addRate} className="space-y-4">
              <div>
                <label htmlFor="pisoValue" className="block text-sm font-medium text-gray-300 mb-1">
                  Piso Value (₱)
                </label>
                <input
                  id="pisoValue"
                  type="number"
                  value={pisoValue}
                  onChange={e => setPisoValue(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  min="1"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="timeValue" className="block text-sm font-medium text-gray-300 mb-1">
                    Time Value
                  </label>
                  <input
                    id="timeValue"
                    type="number"
                    value={timeValue}
                    onChange={e => setTimeValue(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="timeUnit" className="block text-sm font-medium text-gray-300 mb-1">
                    Unit
                  </label>
                  <select
                    id="timeUnit"
                    value={timeUnit}
                    onChange={e => setTimeUnit(e.target.value as any)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
                >
                  Add Rate
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rates;
