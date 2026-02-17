import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { ProductCarousel } from '../components/ProductCarousel';
import { PRODUCTS, PHONE_PRIMARY, FALLBACK_IMAGE } from '../constants';
import { Star, ShieldCheck, Truck, RotateCcw, MessageCircle, ExternalLink, ChevronRight } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const product = PRODUCTS.find(p => p.id === id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  // Set initial active image and dynamic title
  useEffect(() => {
    if (product) {
        setActiveImage(product.image);
        document.title = `${product.name} | D GRAND Jewellery`;
    }
    // Scroll to top
    window.scrollTo(0, 0);

    return () => {
        document.title = 'D GRAND Jewellery | Premium Imitation Jewellery';
    };
  }, [product]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
    // Also update active image state if the main image fails to prevent loop if thumbnail click logic reused it
    if (activeImage === product?.image) {
       // Optional: We can choose to not update state, just the DOM src
    }
  };

  if (!product) {
    return (
        <div className="h-[50vh] flex flex-col items-center justify-center">
            <h2 className="font-serif text-3xl text-emerald-950 mb-4">Product Not Found</h2>
            <button onClick={() => navigate('/collections')} className="text-gold-600 underline hover:text-gold-500">Back to Collections</button>
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

  return (
    <div className="pt-24 bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
         <Link to="/" className="hover:text-emerald-950">Home</Link>
         <ChevronRight size={10} />
         <Link to="/collections" className="hover:text-emerald-950">Collections</Link>
         <ChevronRight size={10} />
         <span className="text-emerald-950 font-bold">{product.name}</span>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column - Gallery */}
          <div className="space-y-4">
            <div 
                className="aspect-[4/5] w-full bg-cream-50 rounded-sm overflow-hidden relative cursor-zoom-in"
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
                    <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 uppercase tracking-widest pointer-events-none ${
                        product.tag === 'SALE' ? 'bg-red-500 text-white' : 'bg-emerald-950 text-white'
                    }`}>
                        {product.tag}
                    </span>
                )}
            </div>
            {/* Thumbnails (Simulated for now with the main image repeated as mock) */}
            <div className="grid grid-cols-4 gap-4">
                {[product.image, product.image, product.image, product.image].map((img, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setActiveImage(img)}
                        className={`aspect-square cursor-pointer overflow-hidden rounded-sm border-2 transition-all ${activeImage === img ? 'border-gold-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <img 
                            src={img} 
                            alt="Thumbnail" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                        />
                    </div>
                ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div>
              <p className="text-gold-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">{product.category}</p>
              <h1 className="font-serif text-4xl lg:text-5xl text-emerald-950 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-gold-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-xs text-gray-400">(24 Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-gray-100">
                  <span className="text-3xl font-serif text-emerald-950">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through font-light">{product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs text-red-600 font-bold px-2 py-1 bg-red-50 rounded-full">Save 30%</span>
                  )}
              </div>

              <p className="text-gray-600 leading-relaxed font-light mb-8">
                {product.description || "Experience the elegance of traditional craftsmanship with this exquisite piece. Designed for the modern woman who appreciates heritage, this jewellery item blends classic motifs with contemporary aesthetics."}
              </p>

              {/* Action Buttons */}
              <div className="space-y-4 mb-10">
                 {/* Retail Buttons */}
                 <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                        href={product.amazonLink || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-950 py-4 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg transition-shadow rounded-sm"
                    >
                        Buy on Amazon <ExternalLink size={14} />
                    </a>
                    <a 
                        href={product.flipkartLink || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 bg-[#2874F0] text-white py-4 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1e60d0] transition-colors rounded-sm"
                    >
                        Buy on Flipkart <ExternalLink size={14} />
                    </a>
                 </div>
                 
                 {/* Wholesale Button */}
                 <button 
                    onClick={handleWholesaleEnquiry}
                    className="w-full border border-emerald-950 text-emerald-950 py-4 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-950 hover:text-white transition-all duration-300 rounded-sm"
                 >
                    <MessageCircle size={16} /> Enquire for Wholesale / Bulk Order
                 </button>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="flex gap-3 items-center p-4 bg-cream-50 rounded-sm">
                    <Truck size={20} className="text-emerald-950" />
                    <div>
                        <h5 className="font-bold text-emerald-950 text-[10px] uppercase tracking-wider">Fast Shipping</h5>
                        <p className="text-[10px] text-gray-500">All over India</p>
                    </div>
                 </div>
                 <div className="flex gap-3 items-center p-4 bg-cream-50 rounded-sm">
                    <ShieldCheck size={20} className="text-emerald-950" />
                    <div>
                        <h5 className="font-bold text-emerald-950 text-[10px] uppercase tracking-wider">Quality Assured</h5>
                        <p className="text-[10px] text-gray-500">Premium Finish</p>
                    </div>
                 </div>
              </div>

              {/* Specifications */}
              <div>
                  <h3 className="font-serif text-xl text-emerald-950 mb-4">Product Details</h3>
                  <div className="bg-white border border-gray-100 rounded-sm">
                      {product.details ? (
                          Object.entries(product.details).map(([key, value], idx) => (
                            <div key={key} className={`flex justify-between py-3 px-4 ${idx % 2 === 0 ? 'bg-cream-50' : 'bg-white'}`}>
                                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">{key}</span>
                                <span className="text-xs text-gray-600">{value}</span>
                            </div>
                          ))
                      ) : (
                          <div className="p-4 text-sm text-gray-500">Detailed specifications unavailable.</div>
                      )}
                  </div>
              </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
          <Section background="cream" className="mt-12 border-t border-cream-200">
             <div className="flex justify-between items-end mb-12">
                <h2 className="font-serif text-3xl text-emerald-950">You May Also Like</h2>
                <Link to="/collections" className="text-gold-600 text-xs uppercase tracking-widest hover:underline">View All</Link>
             </div>
             <ProductCarousel products={relatedProducts} />
          </Section>
      )}
    </div>
  );
};

export default ProductDetail;