import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { ProductCarousel } from '../components/ProductCarousel';
import { PRODUCTS, PHONE_PRIMARY, FALLBACK_IMAGE } from '../constants';
import { Star, ShieldCheck, Truck, MessageCircle, ExternalLink, ChevronRight, ChevronLeft, Share2, Heart, ArrowRight, Ruler, X, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  // Zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const product = PRODUCTS.find(p => p.id === id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  // Shop Context
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const galleryImages = product ? [
    product.image,
    ...(product.images ?? [])
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
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-6 right-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
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
                        <button onClick={handleShare} className="text-gray-400 hover:text-emerald-950 transition-colors"><Share2 size={18} /></button>
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

                  {/* Size Guide Button */}
                  <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-950 hover:text-gold-600 transition-colors border-b border-emerald-950 hover:border-gold-600 pb-1"
                      >
                          <Ruler size={14} /> Size Guide
                      </button>
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm text-gray-500 font-light leading-relaxed">
                    <p>{product.description || "Experience the elegance of traditional craftsmanship with this exquisite piece. Designed for the modern woman who appreciates heritage, this jewellery item blends classic motifs with contemporary aesthetics."}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 pt-4">
                     {/* Add To Cart */}
                     <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-emerald-950 text-white py-5 px-6 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gold-500 hover:text-emerald-950 transition-all duration-300 shadow-xl shadow-emerald-900/10"
                     >
                        <ShoppingBag size={18} /> Add To Bag
                     </button>
                     
                     {/* Wholesale CTA */}
                     <button 
                        onClick={handleWholesaleEnquiry}
                        className="w-full bg-transparent border border-gray-200 text-gray-500 py-4 px-6 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:border-emerald-950 hover:text-emerald-950 transition-all duration-300"
                     >
                        <MessageCircle size={18} /> Bulk Enquiry
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
                        View All Collections <ArrowRight size={16} />
                    </Link>
                </div>
                <ProductCarousel products={relatedProducts} />
             </div>
          </Section>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)}></div>
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm relative z-10 animate-fade-in-up">
                <button 
                    onClick={() => setIsSizeGuideOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
                
                <div className="p-8 md:p-12">
                    <h2 className="font-serif text-3xl text-emerald-950 mb-2">Size Guide</h2>
                    <p className="text-sm text-gray-500 mb-8">Find the perfect fit for your D GRAND jewellery.</p>
                    
                    <div className="space-y-10">
                        {/* Bangles */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-950 mb-4 border-b border-gray-100 pb-2">Bangle Sizes</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-cream-50 text-emerald-950 font-bold uppercase">
                                        <tr>
                                            <th className="px-4 py-3">Size</th>
                                            <th className="px-4 py-3">Inner Diameter (Inches)</th>
                                            <th className="px-4 py-3">Inner Diameter (mm)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-600">
                                        <tr>
                                            <td className="px-4 py-3 font-bold">2.4</td>
                                            <td className="px-4 py-3">2.25"</td>
                                            <td className="px-4 py-3">57.2 mm</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold">2.6</td>
                                            <td className="px-4 py-3">2.37"</td>
                                            <td className="px-4 py-3">60.3 mm</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold">2.8</td>
                                            <td className="px-4 py-3">2.50"</td>
                                            <td className="px-4 py-3">63.5 mm</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold">2.10</td>
                                            <td className="px-4 py-3">2.62"</td>
                                            <td className="px-4 py-3">66.7 mm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Necklaces */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-950 mb-4 border-b border-gray-100 pb-2">Necklace Lengths</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
                                <ul className="space-y-3">
                                    <li className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="font-bold text-emerald-950">Choker</span>
                                        <span>14-16 inches</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="font-bold text-emerald-950">Princess</span>
                                        <span>17-19 inches</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="font-bold text-emerald-950">Matinee</span>
                                        <span>20-24 inches</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="font-bold text-emerald-950">Opera</span>
                                        <span>28-36 inches</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="font-bold text-emerald-950">Rope</span>
                                        <span>36+ inches</span>
                                    </li>
                                </ul>
                                <div className="bg-cream-50 p-4 rounded-sm flex items-center justify-center">
                                    <p className="text-center italic text-gray-500">
                                        "Most of our necklaces come with an adjustable dori (drawstring) or extension chain to fit all neck sizes comfortably."
                                    </p>
                                </div>
                            </div>
                        </div>

                         {/* Rings */}
                         <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-950 mb-4 border-b border-gray-100 pb-2">Ring Sizes</h3>
                            <p className="text-xs text-gray-500 mb-4">Most of our rings are <strong>adjustable</strong> to fit sizes 12-18 (Indian Standard). For fixed sizes, refer below:</p>
                             <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-cream-50 text-emerald-950 font-bold uppercase">
                                        <tr>
                                            <th className="px-4 py-3">Indian Size</th>
                                            <th className="px-4 py-3">Diameter (mm)</th>
                                            <th className="px-4 py-3">US Size</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-600">
                                        <tr>
                                            <td className="px-4 py-3 font-bold">12</td>
                                            <td className="px-4 py-3">16.5 mm</td>
                                            <td className="px-4 py-3">6</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold">14</td>
                                            <td className="px-4 py-3">17.2 mm</td>
                                            <td className="px-4 py-3">7</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold">17</td>
                                            <td className="px-4 py-3">18.1 mm</td>
                                            <td className="px-4 py-3">8</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
