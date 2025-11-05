
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { GpioPin } from '../types';

const orangePiPins = Array.from({ length: 26 }, (_, i) => i + 1);

const GpioAssignment: React.FC = () => {
  const [pinAssignments, setPinAssignments] = useState<GpioPin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gpio.php');
        const result = await response.json();
        if (result.status === 'success') {
          setPinAssignments(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch GPIO assignments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPins();
  }, []);

  const handlePinChange = (id: string, newPin: number) => {
    setPinAssignments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pin: newPin } : p))
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/gpio.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pinAssignments)
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('GPIO assignments saved!');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(`Error saving assignments: ${(error as Error).message}`);
    }
  };

  if (loading) {
    return <div>Loading GPIO assignments...</div>
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">GPIO Pin Assignment</h1>
      <Card title="Assign Functions to GPIO Pins">
        <div className="space-y-4">
          {pinAssignments.map(({ id, function: funcName, pin }) => (
            <div key={id} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
              <label htmlFor={`pin-${id}`} className="font-medium text-gray-200">
                {funcName}
              </label>
              <select
                id={`pin-${id}`}
                value={pin}
                onChange={(e) => handlePinChange(id, Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Not Assigned</option>
                {orangePiPins.map((pinNum) => (
                  <option key={pinNum} value={pinNum}>
                    GPIO {pinNum}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-6 mt-4 border-t border-gray-700">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-colors"
          >
            Save Assignments
          </button>
        </div>
      </Card>
    </div>
  );
};

export default GpioAssignment;