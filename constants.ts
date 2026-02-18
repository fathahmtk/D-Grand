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
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹2,450',
    originalPrice: '₹4,500',
    tag: 'SALE',
    description: "A majestic bridal set featuring intricate peacock motifs and temple-style craftsmanship. This complete set includes a long haram, choker, matching earrings, and maang tikka.",
    details: {
        "Material": "Copper Alloy",
        "Plating": "Matte Gold Finish",
        "Stones": "Kemp & AD Stones",
        "Weight": "180g (Set)",
        "Care": "Keep away from perfumes and water. Store in a plastic pouch."
    }
  },
  {
    id: '2',
    name: 'Emerald Kundan Choker',
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹1,250',
    originalPrice: '₹1,800',
    tag: 'NEW',
    description: "Exquisite Kundan choker embellished with deep green emerald simulants and pearl drops. The adjustable dori ensures a perfect fit for any neck size.",
    details: {
        "Material": "Brass",
        "Plating": "High Gold",
        "Stones": "Kundan & Emerald Beads",
        "Closure": "Adjustable Drawstring",
        "Care": "Spot clean only."
    }
  },
  {
    id: '3',
    name: 'Temple Design Jhumkas',
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1633810542706-90e5ff7557be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹850',
    originalPrice: '₹1,200',
    description: "Traditional bell-shaped Jhumkas featuring Goddess Lakshmi motifs. The antique oxidation gives it a heritage look suitable for silk sarees.",
    details: {
        "Material": "Alloy",
        "Plating": "Antique Gold",
        "Type": "Jhumka",
        "Weight": "25g per earring",
        "Care": "Wipe with soft cloth after use."
    }
  },
  {
    id: '4',
    name: 'Matte Finish Bangles',
    category: 'Bangles',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹950',
    originalPrice: '₹1,450',
    tag: 'NEW',
    description: "Set of 4 matte finish bangles with ruby stone embellishments. The screw-open mechanism makes them easy to wear.",
    details: {
        "Material": "Copper",
        "Plating": "Reddish Matte Gold",
        "Size": "2.4, 2.6, 2.8 available",
        "Stones": "Semi-precious Ruby",
        "Care": "Avoid direct contact with chemicals."
    }
  },
   {
    id: '5',
    name: 'Ruby Stone Haram',
    category: 'Temple Jewellery',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹3,150',
    originalPrice: '₹4,200',
    tag: 'SALE',
    description: "Long architectural haram necklace with heavy ruby stone work. Designed to mimic the royal jewellery of ancient dynasties.",
    details: {
        "Material": "Brass Alloy",
        "Plating": "Gold Plated",
        "Length": "24 Inches",
        "Stones": "Synthetic Ruby",
        "Care": "Store in cotton or velvet box."
    }
  },
  {
    id: '6',
    name: 'AD Stone Necklace',
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹1,850',
    originalPrice: '₹2,200',
    description: "Contemporary necklace set studded with high-quality American Diamonds (AD) that sparkle like real diamonds. Perfect for receptions and cocktails.",
    details: {
        "Material": "Brass",
        "Plating": "Silver/Rhodium",
        "Stones": "American Diamond (CZ)",
        "Style": "Modern/Party Wear",
        "Care": "Clean with mild soapy water."
    }
  },
  {
    id: '7',
    name: 'Kundan Maang Tikka',
    category: 'Bridal Sets',
    image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹650',
    originalPrice: '₹999',
    description: "Oversized Maang Tikka with Kundan work and pearl chain. Adds a regal touch to any bridal hairstyle.",
    details: {
        "Material": "Alloy",
        "Plating": "Gold",
        "Stones": "Kundan & Pearl",
        "Weight": "30g",
        "Care": "Handle with care."
    }
  },
  {
    id: '8',
    name: 'Polki Diamond Ring',
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800'
    ],
    amazonLink: '#',
    flipkartLink: '#',
    price: '₹450',
    originalPrice: '₹750',
    tag: 'SALE',
    description: "Adjustable cocktail ring featuring uncut Polki style stones. A statement piece that complements both ethnic and western wear.",
    details: {
        "Material": "Brass",
        "Plating": "Gold",
        "Size": "Adjustable",
        "Stones": "Polki Simulant",
        "Care": "Keep dry."
    }
  },
  {
    id: '9',
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
  'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=400&q=80'
];
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
