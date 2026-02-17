import { Product, NavItem, BlogPost, Testimonial } from './types';

export const BRAND_NAME = "D GRAND Jewellery";
export const TAGLINE = "Premium Imitation Jewellery | Wholesale & Retail";
export const PHONE_PRIMARY = "8086690473";
export const PHONE_SECONDARY = "8086960473";
export const EMAIL = "dgrandimitationjewellery@gmail.com";
export const ADDRESS = "#104, R.B.D.G.T.C (JBR) Plaza, Near White Temple, Mamulpete, Bangalore – 560053";

export const WHATSAPP_LINK = `https://wa.me/91${PHONE_PRIMARY}?text=Hi,%20I%20am%20interested%20in%20your%20jewellery%20collection.`;
export const AMAZON_LINK = "https://www.amazon.in";
export const FLIPKART_LINK = "https://www.flipkart.com";
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1573408301185-a1d31e857545?q=80&w=800&auto=format&fit=crop";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Wholesale', path: '/wholesale' },
  { label: 'Marketplaces', path: '/marketplaces' },
  { label: 'Journal', path: '/journal' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1920&auto=format&fit=crop", // Emerald Choker
    title: "Imperial Emerald & Gold",
    subtitle: "Timeless Elegance | Handcrafted Perfection",
    cta: "Shop The Collection",
    link: "/collections"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1920&auto=format&fit=crop", // Indian Bride / Red & Gold
    title: "Bridal Majesty & Heritage",
    subtitle: "Premium Imitation Jewellery | Wholesale & Retail",
    cta: "Shop on Flipkart",
    link: "/marketplaces"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920&auto=format&fit=crop", // Gold Necklace Model
    title: "Wholesale & Retail Excellence",
    subtitle: "Premium Imitation Jewellery | Wholesale & Retail",
    cta: "Explore Collections",
    link: "/wholesale"
  }
];

export const CATEGORIES = [
  "Bangles",
  "Bridal Sets",
  "Temple Jewellery",
  "Earrings",
  "Daily Wear"
];

export const CATEGORY_IMAGES = [
  { name: 'Bangles', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Bridal Sets', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Temple Jewellery', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop' },
  { name: 'Earrings', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { name: 'Daily Wear', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop' }
];

export const COLLECTION_HEADERS: Record<string, string> = {
  'All': 'https://images.unsplash.com/photo-1576906231649-14a5840d4f47?q=80&w=1920&auto=format&fit=crop', // Workshop/General
  'Necklaces': 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1920&auto=format&fit=crop',
  'Earrings': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1920&auto=format&fit=crop',
  'Bridal Sets': 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=1920&auto=format&fit=crop',
  'Bangles': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1920&auto=format&fit=crop',
  'Temple Jewellery': 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1920&auto=format&fit=crop',
  'Daily Wear': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1920&auto=format&fit=crop',
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Kundan Choker',
    category: 'Bridal Sets',
    price: '₹4,500',
    originalPrice: '₹6,000',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    tag: 'NEW',
    description: 'Exquisite Kundan choker set with emerald beads and pearl drops. Perfect for bridal wear.'
  },
  {
    id: '2',
    name: 'Temple Lakshmi Haram',
    category: 'Temple Jewellery',
    price: '₹3,200',
    originalPrice: '₹4,000',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
    tag: 'SALE',
    description: 'Traditional matte finish long haram featuring Goddess Lakshmi motifs.'
  },
  {
    id: '3',
    name: 'Antique Gold Bangles',
    category: 'Bangles',
    price: '₹1,800',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    description: 'Set of 4 antique gold plated bangles with intricate ruby stone work.'
  },
  {
    id: '4',
    name: 'Diamond Polki Studs',
    category: 'Earrings',
    price: '₹1,200',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant American Diamond studs with rose gold plating.'
  },
   {
    id: '5',
    name: 'Minimalist Chain',
    category: 'Daily Wear',
    price: '₹850',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop',
    description: 'Simple gold plated chain for everyday elegance.'
  },
  {
    id: '6',
    name: 'Bridal Matha Patti',
    category: 'Bridal Sets',
    price: '₹2,100',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=800&auto=format&fit=crop',
    description: 'Heavy bridal matha patti with kundan and pearls.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Layering Jewellery',
    excerpt: 'Discover how to style multiple necklaces for a regal look.',
    image: 'https://images.unsplash.com/photo-1616036740257-9449ea1f6605?q=80&w=800&auto=format&fit=crop',
    date: 'Oct 12, 2023',
    category: 'Style Guide',
    content: ['Layering is an art...']
  },
  {
    id: '2',
    title: 'Caring for Imitation Jewellery',
    excerpt: 'Tips to keep your gold plating shiny for years.',
    image: 'https://images.unsplash.com/photo-1576906231649-14a5840d4f47?q=80&w=800&auto=format&fit=crop',
    date: 'Sep 28, 2023',
    category: 'Care',
    content: ['Avoid perfumes...']
  },
  {
     id: '3',
    title: 'Bridal Trends 2024',
    excerpt: 'What the modern bride is wearing this season.',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=800&auto=format&fit=crop',
    date: 'Aug 15, 2023',
    category: 'Trends',
    content: ['Pastels and Polki...']
  }
];

export const INSTAGRAM_IMAGES = [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400',
    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400',
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: '1',
        name: 'Priya S.',
        location: 'Bangalore',
        comment: 'The quality is indistinguishable from real gold. Amazing craftsmanship!',
        rating: 5
    },
    {
        id: '2',
        name: 'Anjali M.',
        location: 'Mumbai',
        comment: 'Best wholesale rates I found. My boutique customers love the collection.',
        rating: 5
    }
];

export const OCCASIONS = ['Bridal', 'Party', 'Office', 'Casual'];