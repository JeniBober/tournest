export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  imageUrl: string;
  description: string;
  viewingTime: string; // Format: HH:MM
  location: {
    lat: number;
    lng: number;
  };
}

export interface TourSchedule {
  properties: Property[];
  tourDate: string; // ISO date string
  agentName?: string;
  clientName?: string;
}
