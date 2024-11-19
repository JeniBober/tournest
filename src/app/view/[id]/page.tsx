'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Property, TourSchedule } from '@/types';
import PropertyMap from '@/components/PropertyMap';
import { config } from '@/lib/config';
import { formatCurrency, sortPropertiesByTime, formatTime } from '@/lib/utils';
import { usePropertyStore } from '@/store/propertyStore';
import { IoBed } from 'react-icons/io5';
import { FaBath } from 'react-icons/fa';
import { TbSquare } from 'react-icons/tb';
import { BiTimeFive } from 'react-icons/bi';
import { FaHouseUser } from 'react-icons/fa';

export default function ClientView() {
  const params = useParams();
  const id = params.id as string;
  const [schedule, setSchedule] = useState<TourSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getTourById = usePropertyStore((state) => state.getTourById);

  useEffect(() => {
    // Load the schedule from the store
    const loadSchedule = () => {
      try {
        const tourSchedule = getTourById(id);
        if (tourSchedule) {
          setSchedule(tourSchedule);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading schedule:', error);
        setIsLoading(false);
      }
    };

    loadSchedule();
  }, [id, getTourById]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!schedule || !schedule.properties.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Properties Found</h1>
          <p className="text-gray-700">This tour schedule doesn&apos;t exist or has no properties.</p>
        </div>
      </div>
    );
  }

  const sortedProperties = sortPropertiesByTime(schedule.properties);
  const formattedDate = new Date(schedule.tourDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl text-white! font-bold flex items-center">
            <FaHouseUser className="mr-2 text-2xl text-white!" />
            TourNest
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">Property Tour Schedule</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="mt-2 sm:mt-0">
            <p className="text-gray-700 font-medium">{formattedDate}</p>
            {(schedule.agentName || schedule.clientName) && (
                <>
                {schedule.agentName && <p className="mr-4 text-gray-700">Agent: {schedule.agentName}</p>}
                {schedule.clientName && <p className="text-gray-700">Client: {schedule.clientName}</p>}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold mb-4">Properties ({schedule.properties.length})</h2>
              <div className="space-y-4">
                {sortedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-4 h-[calc(100vh-2rem)]">
            <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Map View</h2>
              </div>

              <div className="flex-grow">
                <PropertyMap
                  properties={schedule.properties}
                  apiKey={config.googleMapsApiKey}
                />
              </div>
            </div>
          </div>
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

function PropertyCard({ property }: { property: Property }) {
  const {
    address,
    price,
    bedrooms,
    bathrooms,
    squareFootage,
    imageUrl,
    description,
    viewingTime,
  } = property;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={address}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-700">No Image</span>
          </div>
        )}
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-md font-medium">
          <div className="flex items-center">
            <BiTimeFive className="mr-1" />
            <span>{formatTime(viewingTime)}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{address}</h3>
          <span className="text-xl font-bold text-blue-700">{formatCurrency(price)}</span>
        </div>

        <div className="flex space-x-6 mb-3 text-sm text-gray-700">
          <div className="flex items-center">
            <IoBed className="text-gray-500 mr-1 text-lg" />
            <span>{bedrooms} bed</span>
          </div>

          <div className="flex items-center">
            <FaBath className="text-gray-500 mr-1" />
            <span>{bathrooms} bath</span>
          </div>

          <div className="flex items-center">
            <TbSquare className="text-gray-500 mr-1" />
            <span>{squareFootage.toLocaleString()} sqft</span>
          </div>
        </div>

        {description && (
          <p className="mt-2 text-base text-gray-700">{description}</p>
        )}
      </div>
    </div>
  );
}
