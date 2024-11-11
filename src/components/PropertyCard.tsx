import { Property } from '@/types';
import { formatCurrency, formatTime } from '@/lib/utils';
import { usePropertyStore } from '@/store/propertyStore';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const removeProperty = usePropertyStore((state) => state.removeProperty);

  const {
    id,
    address,
    price,
    bedrooms,
    bathrooms,
    squareFootage,
    imageUrl,
    description,
    viewingTime,
  } = property;

  const handleRemove = () => {
    if (confirm('Are you sure you want to remove this property?')) {
      removeProperty(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 overflow-hidden">
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
          {formatTime(viewingTime)}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{address}</h3>
          <span className="text-lg font-bold text-blue-700">{formatCurrency(price)}</span>
        </div>

        <div className="flex space-x-4 mt-2 text-sm text-gray-700">
          <span>{bedrooms} bed</span>
          <span>{bathrooms} bath</span>
          <span>{squareFootage.toLocaleString()} sqft</span>
        </div>

        {description && (
          <p className="mt-2 text-sm text-gray-700 line-clamp-2">{description}</p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleRemove}
            className="px-3 py-1 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 rounded-md transition duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
