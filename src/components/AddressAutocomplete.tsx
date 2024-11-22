import { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsApi, isGoogleMapsLoaded } from '@/lib/googleMapsLoader';

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  required?: boolean;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "123 Main St, City, State, ZIP",
  required = false
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loaded, setLoaded] = useState(isGoogleMapsLoaded());
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  // Load the Google Maps Places API
  useEffect(() => {
    if (!loaded && typeof window !== 'undefined') {
      loadGoogleMapsApi()
        .then(() => setLoaded(true))
        .catch((error) => console.error("Error loading Google Maps API:", error));
    }
  }, [loaded]);

  // Initialize autocomplete
  useEffect(() => {
    if (loaded && inputRef.current && !autocomplete && window.google?.maps?.places) {
      const autoCompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ['formatted_address', 'geometry']
      });

      autoCompleteInstance.addListener('place_changed', () => {
        const place = autoCompleteInstance.getPlace();
        if (place.geometry?.location && place.formatted_address) {
          onChange(
            place.formatted_address,
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        }
      });

      setAutocomplete(autoCompleteInstance);
    }
  }, [loaded, onChange, autocomplete]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value, 0, 0)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
      placeholder={placeholder}
      required={required}
    />
  );
}
