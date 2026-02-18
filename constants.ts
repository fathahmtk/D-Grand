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

// --- NAVIGATION & CATEGORIES ---

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { 
    label: 'Bangles', 
    path: '/collections?category=Bangles',
    children: [
        { label: 'Daily Wear', path: '/collections?category=Bangles&subCategory=Daily+Wear', group: 'Type' },
        { label: 'Stone Bangles', path: '/collections?category=Bangles&subCategory=Stone+Bangles', group: 'Type' },
        { label: 'Bridal Sets', path: '/collections?category=Bangles&subCategory=Bridal+Bangles', group: 'Type' },
        { label: 'Kadas & Cuffs', path: '/collections?category=Bangles&subCategory=Kadas', group: 'Type' },
        { label: 'Antique Finish', path: '/collections?category=Bangles&finish=Antique', group: 'Finish' },
        { label: 'Matte Gold', path: '/collections?category=Bangles&finish=Matte+Gold', group: 'Finish' },
    ]
  },
  { 
    label: 'Category', 
    path: '/collections',
    children: [
        { label: 'Head Jewellery', path: '/collections?category=Head+Jewellery', group: 'Head' },
        { label: 'Earrings', path: '/collections?category=Earrings', group: 'Ear' },
        { label: 'Neckwear', path: '/collections?category=Neckwear', group: 'Neck' },
        { label: 'Bangles & Bracelets', path: '/collections?category=Bangles', group: 'Hands' },
        { label: 'Rings', path: '/collections?category=Rings', group: 'Hands' },
        { label: 'Waist Jewellery', path: '/collections?category=Waist+Jewellery', group: 'Body' },
        { label: 'Feet Jewellery', path: '/collections?category=Feet+Jewellery', group: 'Body' },
        { label: 'Bridal Sets', path: '/collections?category=Bridal+Sets', group: 'Sets' },
    ]
  },
  { 
    label: 'Style', 
    path: '/collections',
    children: [
        { label: 'Kundan', path: '/collections?style=Kundan', group: 'Traditional' },
        { label: 'Polki', path: '/collections?style=Polki', group: 'Traditional' },
        { label: 'Temple', path: '/collections?style=Temple', group: 'Traditional' },
        { label: 'Antique', path: '/collections?style=Antique', group: 'Traditional' },
        { label: 'American Diamond', path: '/collections?style=AD', group: 'Modern' },
        { label: 'Rose Gold', path: '/collections?style=Rose+Gold', group: 'Modern' },
        { label: 'Oxidized', path: '/collections?style=Oxidized', group: 'Fusion' },
        { label: 'Matte Gold', path: '/collections?style=Matte+Gold', group: 'Traditional' },
    ]
  },
  { 
    label: 'Occasion', 
    path: '/collections',
    children: [
        { label: 'Bridal', path: '/collections?occasion=Bridal', group: 'Wedding' },
        { label: 'Reception', path: '/collections?occasion=Reception', group: 'Wedding' },
        { label: 'Haldi / Mehendi', path: '/collections?occasion=Haldi', group: 'Wedding' },
        { label: 'Party Wear', path: '/collections?occasion=Party', group: 'Social' },
        { label: 'Office Wear', path: '/collections?occasion=Office', group: 'Daily' },
        { label: 'Daily Wear', path: '/collections?occasion=Daily', group: 'Daily' },
    ]
  },
  { label: 'Wholesale', path: '/wholesale' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Account', path: '/account' },
];

export const CATEGORIES = [
  "Bangles",
  "Neckwear",
  "Earrings",
  "Bridal Sets",
  "Rings",
  "Head Jewellery",
  "Waist Jewellery",
  "Feet Jewellery"
];

export const STYLES = ["Kundan", "Polki", "Temple", "Antique", "AD", "Matte Gold", "Rose Gold", "Oxidized", "Minimal"];
export const OCCASIONS = ["Bridal", "Party", "Office", "Daily", "Festive", "Reception"];
export const REGIONS = ["South Indian", "Rajwadi", "Maharashtrian", "Bengali", "Punjabi", "Hyderabadi"];

export const CATEGORY_IMAGES = [
  { name: 'Bangles', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Bridal Sets', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Temple', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop' },
  { name: 'Earrings', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { name: 'Daily Wear', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop' }
];

export const COLLECTION_HEADERS: Record<string, string> = {
  'All': 'https://images.unsplash.com/photo-1576906231649-14a5840d4f47?q=80&w=1920&auto=format&fit=crop', 
  'Neckwear': 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1920&auto=format&fit=crop',
  'Earrings': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1920&auto=format&fit=crop',
  'Bridal Sets': 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=1920&auto=format&fit=crop',
  'Bangles': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1920&auto=format&fit=crop',
  'Temple': 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1920&auto=format&fit=crop',
  'Daily Wear': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1920&auto=format&fit=crop',
};

// --- HERO SLIDES ---

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1920&auto=format&fit=crop", 
    title: "Imperial Emerald & Gold",
    subtitle: "Timeless Elegance | Handcrafted Perfection",
    cta: "Shop The Collection",
    link: "/collections"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1920&auto=format&fit=crop", 
    title: "Bridal Majesty & Heritage",
    subtitle: "Premium Imitation Jewellery | Wholesale & Retail",
    cta: "Shop on Flipkart",
    link: "/marketplaces"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920&auto=format&fit=crop", 
    title: "Wholesale & Retail Excellence",
    subtitle: "Premium Imitation Jewellery | Wholesale & Retail",
    cta: "Explore Collections",
    link: "/wholesale"
  }
];

// --- PRODUCTS ---

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Kundan Choker',
    category: 'Bridal Sets',
    subCategory: 'Bridal Sets',
    style: 'Kundan',
    finish: 'Gold',
    material: 'Copper Alloy',
    plating: 'Micro Gold',
    occasion: 'Bridal',
    price: '₹4,500',
    originalPrice: '₹6,000',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    tag: 'NEW',
    description: 'Exquisite Kundan choker set with emerald beads and pearl drops. Perfect for bridal wear.',
    details: { "Weight": "120g", "Stones": "Kundan & Emerald Beads" }
  },
  {
    id: '2',
    name: 'Temple Lakshmi Haram',
    category: 'Neckwear',
    subCategory: 'Long Haar',
    style: 'Temple',
    finish: 'Matte Gold',
    region: 'South Indian',
    material: 'Brass',
    plating: 'Matte Gold',
    occasion: 'Festive',
    price: '₹3,200',
    originalPrice: '₹4,000',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
    tag: 'SALE',
    description: 'Traditional matte finish long haram featuring Goddess Lakshmi motifs.',
    details: { "Weight": "150g", "Design": "Nakshi Work" }
  },
  {
    id: '3',
    name: 'Antique Ruby Bangles',
    category: 'Bangles',
    subCategory: 'Stone Bangles',
    style: 'Antique',
    finish: 'Antique Gold',
    size: '2.4, 2.6, 2.8',
    material: 'Copper Alloy',
    plating: 'Antique Gold',
    occasion: 'Party',
    price: '₹1,800',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    description: 'Set of 4 antique gold plated bangles with intricate ruby stone work.',
    details: { "Set of": "4", "Stone": "Ruby Simulant" }
  },
  {
    id: '4',
    name: 'Diamond Polki Studs',
    category: 'Earrings',
    subCategory: 'Studs',
    style: 'Polki',
    finish: 'Gold',
    material: 'Alloy',
    plating: 'Gold',
    occasion: 'Party',
    price: '₹1,200',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant American Diamond studs with rose gold plating.',
    details: { "Closure": "Push Back", "Stone": "AD" }
  },
   {
    id: '5',
    name: 'Minimalist Chain',
    category: 'Neckwear',
    subCategory: 'Short Necklaces',
    style: 'Minimal',
    finish: 'Gold',
    material: 'Brass',
    plating: '1g Gold',
    occasion: 'Daily',
    price: '₹850',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop',
    description: 'Simple gold plated chain for everyday elegance.',
    details: { "Length": "18 inches", "Thickness": "2mm" }
  },
  {
    id: '6',
    name: 'Bridal Matha Patti',
    category: 'Head Jewellery',
    subCategory: 'Matha Patti',
    style: 'Kundan',
    finish: 'Gold',
    occasion: 'Bridal',
    region: 'North Indian',
    price: '₹2,100',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=800&auto=format&fit=crop',
    description: 'Heavy bridal matha patti with kundan and pearls.',
    details: { "Type": "Double Layer", "Pearl": "Faux Basra" }
  },
  {
    id: '7',
    name: 'Matte Gold Kada',
    category: 'Bangles',
    subCategory: 'Kadas',
    style: 'Temple',
    finish: 'Matte Gold',
    size: 'Openable',
    material: 'Brass',
    plating: 'Matte Gold',
    occasion: 'Wedding Guest',
    price: '₹1,500',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    description: 'Statement openable kada with peacock motif in matte finish.',
    details: { "Type": "Openable Screw", "Width": "20mm" }
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