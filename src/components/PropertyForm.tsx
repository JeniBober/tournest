import { useState, FormEvent } from 'react';
import { usePropertyStore } from '@/store/propertyStore';
import { generateId } from '@/lib/utils';
import { Property } from '@/types';
import AddressAutocomplete from './AddressAutocomplete';

export default function PropertyForm() {
  const addProperty = usePropertyStore((state) => state.addProperty);
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    imageUrl: '',
    description: '',
    viewingTime: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (address: string, lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      address,
      latitude: lat ? String(lat) : '',
      longitude: lng ? String(lng) : ''
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newProperty: Property = {
      id: generateId(),
      address: formData.address,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      squareFootage: Number(formData.squareFootage),
      imageUrl: formData.imageUrl,
      description: formData.description,
      viewingTime: formData.viewingTime,
      location: {
        lat: Number(formData.latitude),
        lng: Number(formData.longitude),
      },
    };

    addProperty(newProperty);

    // Reset form after submission
    setFormData({
      address: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      imageUrl: '',
      description: '',
      viewingTime: '',
      latitude: '',
      longitude: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Add Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-1">
            Address
          </label>
          <AddressAutocomplete
            value={formData.address}
            onChange={handleAddressChange}
          />
          {(formData.latitude && formData.longitude) ? (
            <p className="mt-1 text-xs text-gray-600">
              Coordinates: {Number(formData.latitude).toFixed(6)}, {Number(formData.longitude).toFixed(6)}
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-600">
              Type an address and select from the dropdown to get coordinates
            </p>
          )}
        </div>

        <div>
          <label htmlFor="viewingTime" className="block text-sm font-medium text-gray-900 mb-1">
            Viewing Time
          </label>
          <input
            type="time"
            id="viewingTime"
            name="viewingTime"
            value={formData.viewingTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="500000"
          />
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-900 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-900 mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            min="0"
            step="0.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-900 mb-1">
            Square Footage
          </label>
          <input
            type="number"
            id="squareFootage"
            name="squareFootage"
            value={formData.squareFootage}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Brief description of the property..."
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={!formData.latitude || !formData.longitude}
        >
          Add Property
        </button>
      </div>
    </form>
  );
}
