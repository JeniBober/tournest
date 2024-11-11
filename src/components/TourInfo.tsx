import { ChangeEvent } from 'react';
import { usePropertyStore } from '@/store/propertyStore';

export default function TourInfo() {
  const { tourDate, agentName, clientName } = usePropertyStore((state) => state.schedule);
  const setTourDate = usePropertyStore((state) => state.setTourDate);
  const setAgentName = usePropertyStore((state) => state.setAgentName);
  const setClientName = usePropertyStore((state) => state.setClientName);

  const handleTourDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTourDate(e.target.value);
  };

  const handleAgentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgentName(e.target.value);
  };

  const handleClientNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Tour Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="tourDate" className="block text-sm font-medium text-gray-900 mb-1">
            Tour Date
          </label>
          <input
            type="date"
            id="tourDate"
            value={tourDate}
            onChange={handleTourDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="agentName" className="block text-sm font-medium text-gray-900 mb-1">
            Agent Name
          </label>
          <input
            type="text"
            id="agentName"
            value={agentName || ''}
            onChange={handleAgentNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-900 mb-1">
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            value={clientName || ''}
            onChange={handleClientNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Client's name"
          />
        </div>
      </div>
    </div>
  );
}
