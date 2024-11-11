import { useMemo } from 'react';
import { Property } from '@/types';
import PropertyCard from './PropertyCard';
import { sortPropertiesByTime } from '@/lib/utils';

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  const sortedProperties = useMemo(() => {
    return sortPropertiesByTime(properties);
  }, [properties]);

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-700">No properties added yet. Add your first property using the form above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
