import { useState, useEffect } from 'react';
import { usePropertyStore } from '@/store/propertyStore';
import ExportPDF from './ExportPDF';

export default function ShareLink() {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'link' | 'pdf'>('link');
  const { properties, tourDate, agentName, clientName } = usePropertyStore((state) => state.schedule);
  const shareTour = usePropertyStore((state) => state.shareTour);

  useEffect(() => {
    if (properties.length > 0) {
      // Create a unique ID based on the current timestamp
      const newId = Date.now().toString(36);

      // Save the current tour with this ID
      shareTour(newId);

      // Generate the share URL
      setShareUrl(`${window.location.origin}/view/${newId}`);
    } else {
      setShareUrl('');
    }
  }, [properties.length, shareTour]);

  const handleCopyClick = () => {
    if (!shareUrl) return;

    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Share with Client</h2>

      <div className="flex mb-4 border-b">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'link' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('link')}
        >
          Share Link
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'pdf' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('pdf')}
        >
          Export PDF
        </button>
      </div>

      {activeTab === 'link' && (
        <div>
          <p className="text-gray-700 mb-4">
            Share this link with your client to view the property tour schedule:
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <button
              onClick={handleCopyClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {shareUrl && (
            <div className="mt-4">
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm flex items-center"
              >
                <span>Preview client view</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}

      {activeTab === 'pdf' && (
        <div>
          <p className="text-gray-700 mb-4">
            Export a PDF version of the property tour schedule to share or print:
          </p>
          <ExportPDF
            properties={properties}
            tourDate={tourDate}
            agentName={agentName}
            clientName={clientName}
          />
        </div>
      )}
    </div>
  );
}
