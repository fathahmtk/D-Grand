import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, PHONE_PRIMARY, FALLBACK_IMAGE } from '../constants';
import { Star, Truck, MessageCircle, ChevronRight, Share2, Heart, ShoppingBag, Info, Check, ShieldCheck, Ruler, ArrowLeft, ZoomIn } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Image Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { toggleWishlist, wishlist, showNotification } = useShop();
  
  const product = PRODUCTS.find((p) => p.id === id);
  
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50">
        <h2 className="font-display text-3xl mb-4 text-emerald-950">Product Not Found</h2>
        <button 
          onClick={() => navigate('/collections')}
          className="bg-emerald-950 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-gold-500 hover:text-emerald-950 transition-colors"
        >
          Back to Collections
        </button>
      </div>
    );
  }

  // Handle Image Zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleWhatsAppEnquiry = () => {
      const text = `Hi D GRAND, I am interested in *${product.name}* (ID: ${product.id}).%0A%0A
      *Specs:*%0A
      Category: ${product.category}%0A
      Style: ${product.style || 'N/A'}%0A
      Finish: ${product.finish || 'N/A'}%0A
      Price: ${product.price}%0A%0A
      Please share more details/availability.`;
      
      window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${text}`, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Link copied to clipboard");
  };

  const Specifications = [
      { label: "Category", value: product.category },
      { label: "Sub-Category", value: product.subCategory },
      { label: "Style", value: product.style },
      { label: "Finish", value: product.finish },
      { label: "Material", value: product.material },
      { label: "Plating", value: product.plating },
      { label: "Occasion", value: product.occasion },
      { label: "Region", value: product.region },
      { label: "Weight", value: product.details?.Weight || product.weight },
      { label: "Size", value: product.details?.Size || product.size },
  ].filter(s => s.value); // Only show existing values

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-emerald-950">Home</Link> 
            <ChevronRight size={10} />
            <Link to="/collections" className="hover:text-emerald-950">Collections</Link>
            <ChevronRight size={10} />
            <Link to={`/collections?category=${product.category}`} className="hover:text-emerald-950">{product.category}</Link>
            <ChevronRight size={10} />
            <span className="text-emerald-950 font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* LEFT: Image Gallery */}
            <div className="flex flex-col gap-4 sticky top-32 h-fit">
                <div 
                    className="relative w-full aspect-square bg-cream-50 overflow-hidden cursor-crosshair border border-gray-100 group"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                >
                    {/* Main Image */}
                    <img 
                        src={activeImage} 
                        alt={product.name} 
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                        onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                    />
                    
                    {/* Visual Hint for Zoom */}
                    <div className={`absolute bottom-4 right-4 bg-white/80 p-2 text-emerald-950 pointer-events-none transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                        <ZoomIn size={20} />
                    </div>
                    
                    {/* Zoomed Image Overlay */}
                    {isZoomed && (
                        <div 
                            className="absolute inset-0 pointer-events-none bg-no-repeat"
                            style={{
                                backgroundImage: `url(${activeImage})`,
                                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                                backgroundSize: '200%',
                            }}
                        />
                    )}

                    {product.tag && (
                        <span className="absolute top-0 left-0 bg-emerald-950 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 z-10">
                            {product.tag}
                        </span>
                    )}
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-5 gap-2">
                    {[product.image, ...(product.images || [])].slice(0, 5).map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`aspect-square border transition-all relative overflow-hidden ${activeImage === img ? 'border-emerald-950 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="flex flex-col">
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">{product.category}</span>
                    {product.style && (
                         <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="text-gray-400 text-[10px] uppercase tracking-[0.25em]">{product.style}</span>
                         </>
                    )}
                </div>

                <h1 className="font-display text-3xl md:text-5xl text-emerald-950 mb-4 leading-tight">{product.name}</h1>

                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-8">
                     <div className="flex items-baseline gap-4">
                         <span className="text-3xl font-display text-emerald-950">{product.price}</span>
                         {product.originalPrice && (
                             <span className="text-lg text-gray-400 line-through font-light decoration-1">{product.originalPrice}</span>
                         )}
                     </div>
                     <div className="flex gap-4">
                         <button onClick={() => toggleWishlist(product.id)} className={`transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`}>
                             <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                         </button>
                         <button onClick={handleShare} className="text-gray-400 hover:text-emerald-950 transition-colors">
                             <Share2 size={24} />
                         </button>
                     </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 font-light leading-relaxed mb-8">
                    {product.description || "Handcrafted with precision, this piece embodies the perfect blend of traditional artistry and modern aesthetics. Designed for those who seek elegance in every detail."}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-4 mb-12">
                    <button 
                        onClick={handleWhatsAppEnquiry}
                        className="w-full bg-[#25D366] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-105 transition-all shadow-lg shadow-green-100"
                    >
                        <MessageCircle size={18} /> Enquire / Buy on WhatsApp
                    </button>
                    <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">
                        Response time: Within 1 Hour
                    </p>
                </div>

                {/* Specs Grid */}
                <div className="bg-cream-50 border border-gray-100 p-8 mb-8">
                    <h3 className="font-display text-lg mb-6 border-b border-gray-200 pb-2">Technical Specifications</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        {Specifications.map((spec, idx) => (
                            <div key={idx}>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{spec.label}</p>
                                <p className="text-sm font-medium text-emerald-950">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 border border-gray-100 flex flex-col items-center gap-2">
                        <Truck className="text-gold-500" size={20} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-950">Insured Ship</span>
                    </div>
                    <div className="p-4 border border-gray-100 flex flex-col items-center gap-2">
                        <ShieldCheck className="text-gold-500" size={20} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-950">Quality Check</span>
                    </div>
                    <div className="p-4 border border-gray-100 flex flex-col items-center gap-2">
                        <Ruler className="text-gold-500" size={20} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-950">True Size</span>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;