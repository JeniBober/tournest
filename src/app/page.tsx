'use client';

import { usePropertyStore } from '@/store/propertyStore';
import PropertyForm from '@/components/PropertyForm';
import PropertyList from '@/components/PropertyList';
import PropertyMap from '@/components/PropertyMap';
import TourInfo from '@/components/TourInfo';
import ExportPDF from '@/components/ExportPDF';
import ShareLink from '@/components/ShareLink';
import { config } from '@/lib/config';

export default function Home() {
  const { properties, tourDate, agentName, clientName } = usePropertyStore((state) => state.schedule);
  const clearProperties = usePropertyStore((state) => state.clear);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TourNest</h1>
          {properties.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all properties?')) {
                  clearProperties();
                }
              }}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Clear All
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-6">
          <TourInfo />
          {properties.length > 0 && <ShareLink />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <PropertyForm />
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Properties ({properties.length})</h2>
              <PropertyList properties={properties} />
            </div>
          </div>

          <div className="sticky top-4 h-[calc(100vh-2rem)]">
            <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Map View</h2>
              </div>

              <div className="flex-grow">
                <PropertyMap properties={properties} apiKey={config.googleMapsApiKey} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ExportPDF
            properties={properties}
            tourDate={tourDate}
            agentName={agentName}
            clientName={clientName}
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} TourNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
