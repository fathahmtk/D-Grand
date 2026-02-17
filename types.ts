export interface Product {
  id: string;
  name: string;
  category: string; // Main Category (e.g., Neckwear)
  subCategory?: string; // e.g., Choker
  style?: string; // e.g., Kundan
  occasion?: string; // e.g., Bridal
  region?: string; // e.g., South Indian
  finish?: string; // e.g., Matte Gold
  weight?: string; // e.g., 45g
  material?: string; // e.g., Copper Alloy
  plating?: string; // e.g., 1g Gold
  size?: string; // e.g., Adjustable or 2.4
  image: string;
  images?: string[]; // Multiple images for gallery
  amazonLink?: string;
  flipkartLink?: string;
  price?: string;
  originalPrice?: string;
  tag?: 'NEW' | 'SALE' | 'BESTSELLER';
  description?: string;
  details?: Record<string, string>; // Legacy support or extra details
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string; group?: string }[];
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
  content: string[]; // Array of paragraphs for the article body
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
}