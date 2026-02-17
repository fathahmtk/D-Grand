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
  "Necklaces",
  "Earrings",
  "Bridal Sets",
  "Bangles",
  "Temple Jewellery"
];

export const CATEGORY_IMAGES = [
  { name: 'Necklaces', img: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop' },
  { name: 'Earrings', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { name: 'Bangles', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Bridal Sets', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Temple Jewellery', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop' }
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
    title: 'The Party Edit: Styling Heavy Jewellery',
    excerpt: 'Discover the latest trends in party wear jewellery that will make you stand out at every occasion without overwhelming your outfit.',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
    date: 'Jun 12, 2024',
    content: [
      "When it comes to making a statement, nothing speaks louder than a well-chosen piece of heavy jewellery. Whether you are attending a wedding reception or a festive gala, the right accessories can transform a simple outfit into a regal ensemble.",
      "The key to styling heavy jewellery is balance. If you are wearing a heavily embroidered saree or lehenga, opt for a single statement piece—like a grand choker or oversized chandbalis—rather than a full set. This prevents the look from becoming cluttered and allows the craftsmanship to shine.",
      "For 2024, we are seeing a resurgence of antique gold finishes paired with pastel outfits. The contrast between the muted fabric and the rich, dark gold tones creates a sophisticated aesthetic that is both modern and rooted in tradition. Don't be afraid to mix metals; a hint of silver in your bangles can add an unexpected edge to a gold-dominated look.",
      "Remember, confidence is your best accessory. Wear pieces that make you feel powerful and beautiful, and you will turn heads wherever you go."
    ]
  },
  {
    id: '2',
    title: 'Modern Heirlooms: A Gift Guide',
    excerpt: 'The perfect gift guide for the most important woman in your life. Show her your love with timeless pieces that she can cherish forever.',
    category: 'Gifting',
    image: 'https://images.unsplash.com/photo-1617038224531-ab5d78665b1a?q=80&w=800&auto=format&fit=crop',
    date: 'May 08, 2024',
    content: [
      "Jewellery has always been more than just adornment; it is a vessel for memories and a symbol of love. Finding the perfect piece for a loved one can be daunting, but the trick lies in understanding their personal style and the sentiment you wish to convey.",
      "For the minimalist, consider delicate chains with solitaire pendants or sleek bracelets that can be worn daily. These pieces become a second skin, a constant reminder of the giver. Our 'Everyday Elegance' collection features high-quality AD stones set in rose gold plating, offering a subtle sparkle suitable for the office or brunch.",
      "If you are gifting for a significant milestone—like an anniversary or a wedding—opt for something with cultural significance. Temple jewellery, with its divine motifs and sturdy craftsmanship, serves as a modern heirloom. These pieces age beautifully and can be passed down through generations, carrying stories with them.",
      "Ultimately, the best gift is one chosen with thought. Pay attention to the jewellery she currently wears—does she prefer gold or silver? Heavy or light? Use these cues to find a treasure she will cherish forever."
    ]
  },
  {
    id: '3',
    title: 'The Bridal Trousseau Checklist',
    excerpt: 'Complete your bridal look with our exclusive wedding collection. From Maang Tikka to Toe Rings, here is everything you need.',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba420552259?q=80&w=800&auto=format&fit=crop',
    date: 'Apr 20, 2024',
    content: [
      "Every bride dreams of looking like royalty on her big day. While the outfit sets the tone, it is the jewellery that adds the finishing touch of grandeur. Building a bridal trousseau is an art, requiring a mix of statement pieces for the main events and lighter sets for post-wedding functions.",
      "1. The Maang Tikka & Matha Patti: These frame the face and are essential for the traditional Indian bridal look. Choose a size that complements your forehead width.",
      "2. The Choker & Long Haram: Layering is a trend that isn't going away. Pair a snug-fitting choker with a long, architectural haram to create depth and drama.",
      "3. Bangles & Kadas: A bride's hands are always in focus. Mix glass bangles with heavy gold-plated kadas for a rich, textured sound and look.",
      "4. Waist Belt (Vaddanam): Not only does it accentuate the waist, but it also holds the saree pleats in place, ensuring you look poised throughout the ceremony.",
      "At D GRAND, we specialize in complete bridal sets that ensure every piece matches perfectly in tone and finish, taking the stress out of your wedding shopping."
    ]
  },
  {
    id: '4',
    title: 'Everyday Luxury for the Workplace',
    excerpt: 'Minimalist designs that add a touch of sparkle to your 9-to-5 without breaking the dress code. Celebrate your success with elegance.',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1630568116558-8ba948ef53ac?q=80&w=800&auto=format&fit=crop',
    date: 'Feb 10, 2024',
    content: [
      "Gone are the days when jewellery was reserved for special occasions. The modern woman expresses herself through style every day, including in the boardroom. Workplace jewellery should be understated yet sophisticated, enhancing your professional attire without being distracting.",
      "Stick to the 'Less is More' philosophy. A pair of classic pearl studs or small geometric hoops can brighten your face during video calls. Avoid bangles that jingle, as they can be noisy while typing; instead, opt for a sleek watch or a fixed cuff bracelet.",
      "Pendants are a great way to add personality to a button-down shirt. Choose a chain length that sits just below the collarbone for the most flattering look.",
      "Investing in high-quality imitation jewellery allows you to rotate your look frequently without the fear of losing expensive real gold pieces during the commute. It's about feeling confident and put-together, ready to conquer the day."
    ]
  }
];

export const INSTAGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=400&q=80'
];