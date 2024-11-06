import { useState, ChangeEvent } from 'react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export default function ApiKeyInput({ apiKey, setApiKey }: ApiKeyInputProps) {
  const [isEditing, setIsEditing] = useState(!apiKey);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKey(e.target.value);
  };

  const handleSave = () => {
    setApiKey(inputKey);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Google Maps API Key</h2>

      {isEditing ? (
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-2">
            Enter your Google Maps API key. You can obtain one from the Google Cloud Console.
          </p>
          <input
            type="text"
            value={inputKey}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            placeholder="Your Google Maps API Key"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              {apiKey ? 'API Key is set' : 'No API Key is set'}
            </p>
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>
          {apiKey && (
            <p className="mt-1 text-xs text-gray-500">
              Key: {apiKey.substring(0, 4)}...{apiKey.substring(apiKey.length - 4)}
            </p>
          )}
        </div>
      )}

      {!apiKey && !isEditing && (
        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            A Google Maps API key is required to display the map.
          </p>
        </div>
      )}
    </div>
  );
}
