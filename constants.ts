import { Product, NavItem, BlogPost, Testimonial } from './types';

export const BRAND_NAME = "D GRAND Jewellery";
export const TAGLINE = "Premium Imitation Jewellery | Wholesale & Retail";
export const PHONE_PRIMARY = "8086960473";
export const PHONE_SECONDARY = "8086690473";
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
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=1920&auto=format&fit=crop", // Gold Necklaces Display
    title: "Elegant Artificial Jewellery Collection",
    subtitle: "Premium Imitation Jewellery | Wholesale & Retail",
    cta: "Shop on Amazon",
    link: "/marketplaces"
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
  "Necklaces",
  "Earrings",
  "Bridal Sets",
  "Bangles",
  "Temple Jewellery"
];

export const CATEGORY_IMAGES = [
  { name: 'Necklaces', img: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop' },
  { name: 'Earrings', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { name: 'Bridal', img: 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=800&auto=format&fit=crop' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Priya Sharma",
    location: "Bangalore",
    comment: "Absolutely stunned by the quality. The antique finish looks exactly like real gold. Wore it to my cousin's wedding and got so many compliments!",
    rating: 5
  },
  {
    id: '2',
    name: "Anjali Menon",
    location: "Kochi",
    comment: "Ordered a bridal set for my sister. Packaging was secure, delivery was fast, and the intricate detailing is breathtaking. Highly recommend.",
    rating: 5
  },
  {
    id: '3',
    name: "Sneha Kapoor",
    location: "Mumbai",
    comment: "Best wholesaler in the market. My boutique customers love the designs, and the margins are excellent. D GRAND is my go-to supplier.",
    rating: 5
  },
  {
    id: '4',
    name: "Lakshmi R.",
    location: "Chennai",
    comment: "The temple jewellery collection is divine. It feels very heavy and premium, not like cheap plastic imitation. Worth every rupee.",
    rating: 4
  }
];

// Mock Products with Enhanced Details
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Antique Gold Bridal Set',
    category: 'Bridal Sets',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
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
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Party Edit',
    excerpt: 'Discover the latest trends in party wear jewellery that will make you stand out at every occasion.',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
    date: 'Jun 12, 2024'
  },
  {
    id: '2',
    title: 'Modern Heirlooms',
    excerpt: 'The perfect gift guide for the most important woman in your life. Show her your love with timeless pieces.',
    category: 'Gifting',
    image: 'https://images.unsplash.com/photo-1617038224531-ab5d78665b1a?q=80&w=800&auto=format&fit=crop',
    date: 'May 08, 2024'
  },
  {
    id: '3',
    title: 'The Bridal Guide',
    excerpt: 'Complete your bridal look with our exclusive wedding collection featuring intricate craftsmanship.',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=800&auto=format&fit=crop',
    date: 'Apr 20, 2024'
  },
  {
    id: '4',
    title: 'Everyday Luxury',
    excerpt: 'Matching sets and complementary pieces for the perfect couple. Celebrate your bond with elegance.',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1630568116558-8ba948ef53ac?q=80&w=800&auto=format&fit=crop',
    date: 'Feb 10, 2024'
  }
];

export const INSTAGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=400&q=80'
];