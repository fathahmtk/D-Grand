export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  amazonLink?: string;
  flipkartLink?: string;
  price?: string;
  originalPrice?: string;
  tag?: 'NEW' | 'SALE';
  description?: string;
  details?: Record<string, string>; // e.g. { "Material": "Brass", "Plating": "Gold" }
}

export interface NavItem {
  label: string;
  path: string;
}

export interface WholesaleForm {
  name: string;
  businessName: string;
  phone: string;
  city: string;
  requirement: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
}