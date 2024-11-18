import { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from '@/types';
import { formatCurrency, formatTime } from '@/lib/utils';
import { loadGoogleMapsApi, isGoogleMapsLoaded } from '@/lib/googleMapsLoader';

interface PropertyMapProps {
  properties: Property[];
  apiKey: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

export default function PropertyMap({ properties, apiKey }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [loaded, setLoaded] = useState(isGoogleMapsLoaded());
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Load Google Maps API
  useEffect(() => {
    if (!loaded && apiKey) {
      loadGoogleMapsApi()
        .then(() => setLoaded(true))
        .catch((error) => console.error("Error loading Google Maps API:", error));
    }
  }, [loaded, apiKey]);

  // Calculate center of the map based on property locations
  useEffect(() => {
    if (properties.length > 0) {
      const sumLat = properties.reduce((sum, property) => sum + property.location.lat, 0);
      const sumLng = properties.reduce((sum, property) => sum + property.location.lng, 0);

      const newCenter = {
        lat: sumLat / properties.length,
        lng: sumLng / properties.length,
      };

      setMapCenter(newCenter);

      // If we have an existing map and the center has changed, update it
      if (map) {
        map.setCenter(newCenter);
      }
    }
  }, [properties, map]);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleInfoWindowClose = () => {
    setSelectedProperty(null);
  };

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-700">Google Maps API key is required</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-700">Add properties to see them on the map</p>
      </div>
    );
  }

  if (!loaded || !window.google) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-700">Loading map...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={12}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
      }}
      onLoad={handleMapLoad}
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={property.location}
          onClick={() => handleMarkerClick(property)}
          label={{
            text: formatTime(property.viewingTime),
            className: 'bg-blue-600 text-white px-2 py-1 rounded-md font-medium text-xs'
          }}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={selectedProperty.location}
          onCloseClick={handleInfoWindowClose}
        >
          <div className="p-2 max-w-xs">
            {selectedProperty.imageUrl && (
              <img
                src={selectedProperty.imageUrl}
                alt={selectedProperty.address}
                className="w-full h-32 object-cover rounded-md mb-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            )}
            <div>
              <h3 className="font-semibold text-sm">{selectedProperty.address}</h3>
              <p className="text-blue-600 font-medium text-sm">
                {formatCurrency(selectedProperty.price)}
              </p>
              <div className="text-xs text-gray-600 mt-1">
                {selectedProperty.bedrooms} bed · {selectedProperty.bathrooms} bath · {selectedProperty.squareFootage.toLocaleString()} sqft
              </div>
              <div className="mt-1 text-xs font-semibold">
                Viewing Time: {formatTime(selectedProperty.viewingTime)}
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
