import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { ProductCarousel } from '../components/ProductCarousel';
import { PRODUCTS, PHONE_PRIMARY, FALLBACK_IMAGE } from '../constants';
import { Star, ShieldCheck, Truck, MessageCircle, ChevronRight, ChevronLeft, Share2, Heart, ArrowRight, Ruler, X, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const product = PRODUCTS.find(p => p.id === id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const { addToCart, toggleWishlist, wishlist } = useShop();
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const DUMMY_GALLERY = [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800",
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
  }, [product]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  if (!product) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <h2 className="font-display text-3xl text-emerald-950 mb-4">Product Not Found</h2>
            <button onClick={() => navigate('/collections')} className="px-8 py-3 bg-emerald-950 text-white uppercase tracking-widest text-xs hover:bg-teal-600 transition-all">Back to Collections</button>
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

  const handleShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: product.name,
                text: `Check out ${product.name} on D GRAND Jewellery`,
                url: window.location.href,
            });
        } catch (error) {
            console.log('Error sharing', error);
        }
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-4 border-b border-gray-100">
         <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-emerald-950 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/collections" className="hover:text-emerald-950 transition-colors">Collections</Link>
            <ChevronRight size={10} />
            <span className="text-emerald-950 font-bold">{product.name}</span>
         </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column - Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div 
                className="aspect-[3/4] w-full bg-gray-50 overflow-hidden relative cursor-zoom-in group"
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
                
                {product.tag && (
                    <span className={`absolute top-0 left-0 text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] ${
                        product.tag === 'SALE' ? 'bg-red-600 text-white' : 'bg-gold-500 text-emerald-950'
                    }`}>
                        {product.tag}
                    </span>
                )}

                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 w-10 h-10 bg-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 ${isWishlisted ? 'text-red-600' : 'text-emerald-950 hover:bg-emerald-950 hover:text-white'}`}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-5 gap-2">
                {galleryImages.map((img, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setActiveImage(img)}
                        className={`aspect-[3/4] cursor-pointer overflow-hidden border-2 transition-all ${
                            activeImage === img 
                                ? 'border-emerald-950 opacity-100' 
                                : 'border-transparent opacity-60 hover:opacity-100'
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
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-5 relative">
              <div className="sticky top-32 space-y-8">
                  
                  <div>
                    <div className="flex justify-between items-start">
                        <p className="text-teal-600 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">{product.category}</p>
                        <button onClick={handleShare} className="text-gray-400 hover:text-emerald-950 transition-colors"><Share2 size={18} /></button>
                    </div>
                    <h1 className="font-display text-4xl lg:text-5xl text-emerald-950 mb-4 leading-tight uppercase tracking-tight">{product.name}</h1>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex text-emerald-950 gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 border-l border-gray-300 pl-4">Verified</span>
                    </div>

                    <div className="flex items-baseline gap-4 pb-8 border-b border-gray-100">
                        <span className="text-3xl font-display font-bold text-emerald-950">{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through decoration-1">{product.originalPrice}</span>
                        )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-950 hover:text-teal-600 transition-colors border-b border-gray-200 pb-1"
                      >
                          <Ruler size={14} /> Size Guide
                      </button>
                  </div>

                  <div className="prose prose-sm text-gray-600 leading-relaxed">
                    <p>{product.description}</p>
                  </div>

                  <div className="space-y-3 pt-4">
                     <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-emerald-950 text-white py-4 px-6 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-teal-600 transition-all duration-300"
                     >
                        <ShoppingBag size={18} /> Add To Bag
                     </button>
                     
                     <button 
                        onClick={handleWholesaleEnquiry}
                        className="w-full bg-transparent border border-emerald-950 text-emerald-950 py-4 px-6 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-950 hover:text-white transition-all duration-300"
                     >
                        <MessageCircle size={18} /> Bulk Enquiry
                     </button>
                  </div>

                  {/* Specifications */}
                  <div className="pt-8">
                      <h3 className="font-display text-lg text-emerald-950 mb-4 flex items-center gap-3">
                          Specifications
                      </h3>
                      <div className="space-y-2">
                          {product.details ? (
                              Object.entries(product.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-xs py-3 border-b border-gray-50 last:border-0">
                                    <span className="font-bold text-emerald-950 uppercase tracking-wider">{key}</span>
                                    <span className="text-gray-500 text-right">{value}</span>
                                </div>
                              ))
                          ) : null}
                      </div>
                  </div>

                  {/* Trust Grid */}
                  <div className="grid grid-cols-3 gap-1 pt-6">
                     {[
                       { icon: Truck, label: "Fast Ship" },
                       { icon: ShieldCheck, label: "Verified" },
                       { icon: Star, label: "Top Rated" }
                     ].map((item, i) => (
                       <div key={i} className="flex flex-col items-center text-center p-4 border border-gray-100">
                          <item.icon size={20} className="text-emerald-950 mb-2" strokeWidth={1.5} />
                          <span className="text-[9px] font-bold uppercase text-gray-500">{item.label}</span>
                       </div>
                     ))}
                  </div>

              </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal - Simplified */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)}></div>
            <div className="bg-white w-full max-w-lg p-8 relative z-10 animate-fade-in-up">
                <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4"><X size={20} /></button>
                <h2 className="font-display text-2xl text-emerald-950 mb-6">Size Guide</h2>
                <div className="space-y-4 text-sm text-gray-600">
                    <p>Refer to standard Indian sizing for bangles and rings.</p>
                    <div className="border border-gray-100 p-4">
                        <h4 className="font-bold text-emerald-950 mb-2">Bangles</h4>
                        <p>2.4 (2.25"), 2.6 (2.37"), 2.8 (2.50")</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;