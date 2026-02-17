import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FALLBACK_IMAGE } from '../constants';

export const QuickView: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart } = useShop();
  const [imgError, setImgError] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-fade-in-up max-h-[90vh]">
        <button 
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-cream-50 h-64 md:h-auto relative">
          <img 
            src={imgError ? FALLBACK_IMAGE : quickViewProduct.image} 
            alt={quickViewProduct.name} 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          {quickViewProduct.tag && (
            <span className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 uppercase tracking-widest bg-white/90 text-emerald-950">
                {quickViewProduct.tag}
            </span>
          )}
        </div>

        {/* Details Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <p className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold mb-3">{quickViewProduct.category}</p>
          <h2 className="font-serif text-3xl text-emerald-950 mb-4 leading-tight">{quickViewProduct.name}</h2>
          
          <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-serif text-emerald-950">{quickViewProduct.price}</span>
              {quickViewProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through font-light">{quickViewProduct.originalPrice}</span>
              )}
          </div>

          <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-8">
             <div className="flex text-gold-500">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
             </div>
             <span className="text-[10px] text-gray-400 uppercase tracking-widest">Top Rated</span>
          </div>

          <div className="prose prose-sm text-gray-500 font-light mb-8 line-clamp-4">
             {quickViewProduct.description || "Elegant craftsmanship meets timeless design. This piece is curated to add a touch of royalty to your collection."}
          </div>

          <div className="mt-auto space-y-4">
             <button 
                onClick={handleAddToCart}
                className="w-full bg-emerald-950 text-white py-4 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gold-500 hover:text-emerald-950 transition-all shadow-lg"
             >
                <ShoppingBag size={16} /> Add To Bag
             </button>
             
             <Link 
                to={`/product/${quickViewProduct.id}`}
                onClick={closeQuickView}
                className="block w-full text-center py-3 border border-emerald-950 text-emerald-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-emerald-50 transition-colors"
             >
                View Full Details
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};