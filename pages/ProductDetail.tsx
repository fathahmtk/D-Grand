import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { ProductCarousel } from '../components/ProductCarousel';
import { PRODUCTS, PHONE_PRIMARY, FALLBACK_IMAGE } from '../constants';
import { Star, ShieldCheck, Truck, MessageCircle, ExternalLink, ChevronRight, ChevronLeft, Share2, Heart } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const product = PRODUCTS.find(p => p.id === id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const DUMMY_GALLERY = [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
  ];

  const galleryImages = product ? [
    product.image,
    ...(product.images && product.images.length > 0 ? product.images : DUMMY_GALLERY)
  ] : [];

  useEffect(() => {
    if (product) {
        setActiveImage(product.image);
        document.title = `${product.name} | D GRAND Jewellery`;
    }
    window.scrollTo(0, 0);

    return () => {
        document.title = 'D GRAND Jewellery | Premium Imitation Jewellery';
    };
  }, [product]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  if (!product) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-cream-50">
            <h2 className="font-serif text-3xl text-emerald-950 mb-4">Product Not Found</h2>
            <button onClick={() => navigate('/collections')} className="px-8 py-3 bg-emerald-950 text-white uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-emerald-950 transition-all">Back to Collections</button>
        </div>
    );
  }

  const handleWholesaleEnquiry = () => {
      const text = `Hi D GRAND, I am interested in wholesale pricing for Product: ${product.name} (ID: ${product.id})`;
      window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const scrollAmount = 100;
        const currentScroll = scrollRef.current.scrollLeft;
        const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
        scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-4 border-b border-gray-100">
         <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/collections" className="hover:text-gold-500 transition-colors">Collections</Link>
            <ChevronRight size={10} />
            <span className="text-emerald-950 font-bold">{product.name}</span>
         </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column - Gallery (7/12 width on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div 
                className="aspect-[4/5] w-full bg-cream-50 rounded-sm overflow-hidden relative cursor-zoom-in shadow-xl border border-gray-100/50 group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => { setIsZoomed(false); setMousePosition({ x: 50, y: 50 }); }}
                onMouseMove={handleMouseMove}
            >
                <img 
                    src={activeImage} 
                    alt={product.name} 
                    onError={handleImageError}
                    className={`w-full h-full object-cover transition-transform ${isZoomed ? 'duration-100 ease-linear' : 'duration-500 ease-out'}`} 
                    style={{
                        transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                />
                
                {/* Tags */}
                {product.tag && (
                    <span className={`absolute top-6 left-6 text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] shadow-sm backdrop-blur-md ${
                        product.tag === 'SALE' ? 'bg-white/90 text-red-800' : 'bg-emerald-950/90 text-white'
                    }`}>
                        {product.tag}
                    </span>
                )}

                {/* Wishlist Button Overlay */}
                <button className="absolute top-6 right-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                    <Heart size={18} />
                </button>
            </div>

            {/* Thumbnail Carousel */}
            <div className="relative group/thumbs px-8">
                <button 
                    onClick={() => scrollThumbnails('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-emerald-950 rounded-full hover:bg-emerald-950 hover:text-white transition-all disabled:opacity-50"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={16} />
                </button>
                
                <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-2 snap-x"
                >
                    {galleryImages.map((img, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setActiveImage(img)}
                            className={`flex-shrink-0 w-24 h-24 aspect-square cursor-pointer overflow-hidden rounded-sm border-2 transition-all snap-start ${
                                activeImage === img 
                                    ? 'border-emerald-950 opacity-100 ring-1 ring-emerald-950/20' 
                                    : 'border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                            }`}
                        >
                            <img 
                                src={img} 
                                alt={`View ${idx + 1}`} 
                                className="w-full h-full object-cover" 
                                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                            />
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => scrollThumbnails('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-emerald-950 rounded-full hover:bg-emerald-950 hover:text-white transition-all"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
          </div>

          {/* Right Column - Product Details (Sticky) (5/12 width) */}
          <div className="lg:col-span-5 relative">
              <div className="sticky top-32 space-y-8">
                  
                  {/* Header */}
                  <div>
                    <div className="flex justify-between items-start">
                        <p className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">{product.category}</p>
                        <button className="text-gray-400 hover:text-emerald-950 transition-colors"><Share2 size={18} /></button>
                    </div>
                    <h1 className="font-serif text-4xl lg:text-5xl text-emerald-950 mb-4 leading-tight">{product.name}</h1>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex text-gold-500 gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 border-l border-gray-300 pl-4">Verified Quality</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-4 pb-8 border-b border-gray-100/50">
                        <span className="text-3xl font-serif text-emerald-950">{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through font-light decoration-1">{product.originalPrice}</span>
                        )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm text-gray-500 font-light leading-relaxed">
                    <p>{product.description || "Experience the elegance of traditional craftsmanship with this exquisite piece. Designed for the modern woman who appreciates heritage, this jewellery item blends classic motifs with contemporary aesthetics."}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 pt-4">
                     {/* Retail Marketplaces */}
                     <div className="grid grid-cols-2 gap-4">
                        <a 
                            href={product.amazonLink || '#'} 
                            target="_blank" 
                            rel="noreferrer"
                            className="group flex flex-col items-center justify-center p-4 border border-gray-200 hover:border-gold-500 rounded-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
                        >
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 group-hover:text-gold-600">Buy On</span>
                            <span className="font-serif text-lg text-emerald-950">Amazon</span>
                        </a>
                        <a 
                            href={product.flipkartLink || '#'} 
                            target="_blank" 
                            rel="noreferrer"
                            className="group flex flex-col items-center justify-center p-4 border border-gray-200 hover:border-blue-500 rounded-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
                        >
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-600">Buy On</span>
                            <span className="font-serif text-lg text-emerald-950">Flipkart</span>
                        </a>
                     </div>
                     
                     {/* Wholesale CTA */}
                     <button 
                        onClick={handleWholesaleEnquiry}
                        className="w-full bg-emerald-950 text-white py-5 px-6 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gold-500 hover:text-emerald-950 transition-all duration-300 shadow-xl shadow-emerald-900/10"
                     >
                        <MessageCircle size={18} /> Get Wholesale Price
                     </button>
                  </div>

                  {/* Specifications Accordion/List */}
                  <div className="pt-8">
                      <h3 className="font-serif text-lg text-emerald-950 mb-4 flex items-center gap-3">
                          Product Specifications
                          <span className="h-px bg-gray-200 flex-grow"></span>
                      </h3>
                      <div className="space-y-3">
                          {product.details ? (
                              Object.entries(product.details).map(([key, value]) => (
                                <div key={key} className="grid grid-cols-[120px_1fr] gap-4 text-xs py-2 border-b border-gray-50 last:border-0">
                                    <span className="font-bold text-emerald-950 uppercase tracking-wider">{key}</span>
                                    <span className="text-gray-600 font-light">{value}</span>
                                </div>
                              ))
                          ) : (
                              <div className="text-sm text-gray-500 italic">Specifications loading...</div>
                          )}
                      </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-6">
                     <div className="flex flex-col items-center text-center p-3 bg-cream-50 rounded-sm">
                        <Truck size={20} className="text-gold-600 mb-2" strokeWidth={1.5} />
                        <span className="text-[9px] font-bold uppercase text-emerald-950">Fast Shipping</span>
                     </div>
                     <div className="flex flex-col items-center text-center p-3 bg-cream-50 rounded-sm">
                        <ShieldCheck size={20} className="text-gold-600 mb-2" strokeWidth={1.5} />
                        <span className="text-[9px] font-bold uppercase text-emerald-950">Quality Check</span>
                     </div>
                     <div className="flex flex-col items-center text-center p-3 bg-cream-50 rounded-sm">
                        <Star size={20} className="text-gold-600 mb-2" strokeWidth={1.5} />
                        <span className="text-[9px] font-bold uppercase text-emerald-950">Top Rated</span>
                     </div>
                  </div>

              </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
          <Section background="cream" className="mt-12 border-t border-cream-200">
             <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">Curated For You</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mt-2">Complete The Look</h2>
                    </div>
                    <Link to="/collections" className="group flex items-center gap-2 text-emerald-950 text-xs uppercase tracking-widest hover:text-gold-600 transition-colors">
                        View All Collections <ArrowRightIcon />
                    </Link>
                </div>
                <ProductCarousel products={relatedProducts} />
             </div>
          </Section>
      )}
    </div>
  );
};

// Simple arrow component to avoid extra imports if not needed, or just use Lucid
const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
)

export default ProductDetail;