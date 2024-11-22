import { useState, FormEvent, ChangeEvent } from 'react';
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);

      // Update the formData with the URL or leave it empty if you prefer to use the file itself
      setFormData(prev => ({ ...prev, imageUrl: fileUrl }));
    }
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
    setImageFile(null);
    setPreviewUrl('');
  };

  // Helper component for required field labels
  const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="block text-sm font-medium text-gray-900 mb-1">
      {children} <span className="text-red-500">*</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Add Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <RequiredLabel>Address</RequiredLabel>
          <AddressAutocomplete
            value={formData.address}
            onChange={handleAddressChange}
            required
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
          <RequiredLabel>Viewing Time</RequiredLabel>
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
          <RequiredLabel>Price ($)</RequiredLabel>
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
          <RequiredLabel>Bedrooms</RequiredLabel>
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
          <RequiredLabel>Bathrooms</RequiredLabel>
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
          <RequiredLabel>Square Footage</RequiredLabel>
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

        <div className="md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-900 mb-1">
            Property Image
          </label>
          <div className="flex flex-col">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {previewUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Property preview"
                  className="w-full max-h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>
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
      <p className="mt-2 text-xs text-gray-500">Fields marked with <span className="text-red-500">*</span> are required</p>
    </form>
  );
}
