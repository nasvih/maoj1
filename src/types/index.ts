export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Destination {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  price: number;
  rating: number;
  category: 'historical' | 'modern' | 'religious' | 'nature';
}

export interface Booking {
  id: string;
  userId: string;
  destinationId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Flight {
  id: string;
  from: string;
  fromAr: string;
  to: string;
  toAr: string;
  departure: string;
  arrival: string;
  price: number;
  airline: string;
  duration: string;
}

export interface Hotel {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
  amenitiesAr: string[];
}