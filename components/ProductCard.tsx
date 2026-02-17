import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, ArrowRight, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FALLBACK_IMAGE } from '../constants';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);
  
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-sm overflow-hidden h-full flex flex-col transition-shadow duration-500 hover:shadow-2xl hover:shadow-emerald-900/10">
      
      {/* Image Area - Arch Design */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-50 mx-4 mt-4 rounded-t-[100px] rounded-b-md">
        <div className="absolute top-4 right-4 z-20 flex gap-2">
            {product.tag && (
            <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest backdrop-blur-md ${
                product.tag === 'SALE' ? 'bg-red-500/10 text-red-800' : 'bg-emerald-950/5 text-emerald-950'
            }`}>
                {product.tag}
            </span>
            )}
        </div>
        
        {/* Wishlist Button - Always visible on mobile, visible on hover on desktop */}
        <button 
          onClick={handleToggleWishlist}
          className={`absolute top-4 left-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/50 text-gray-400 hover:bg-white hover:text-red-500'}`}
        >
          <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Main Link Overlay for Image */}
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />

        <img
            src={imgSrc}
            alt={product.name}
            onError={handleError}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        
        {/* Quick Action Overlay Visuals */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
             <div className="bg-white text-emerald-950 px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center gap-2 shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest">View Details</span>
                <ArrowRight size={14} />
             </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-6 pt-5 pb-6 flex flex-col flex-grow justify-between">
         <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">{product.category}</p>
            <Link to={`/product/${product.id}`} className="block">
                <h3 className="font-serif text-lg text-emerald-950 leading-snug mb-4 group-hover:text-gold-600 transition-colors">{product.name}</h3>
            </Link>

            {/* Accordion Details */}
            {product.details && (
              <div className="mb-4 border-t border-gray-100 pt-3">
                 <button 
                   onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                   className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-600 hover:text-emerald-950 transition-colors w-full justify-between focus:outline-none"
                 >
                   <span>Specifications</span>
                   {isDetailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                 </button>
                 
                 <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDetailsOpen ? 'max-h-48 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                    <ul className="space-y-2">
                      {Object.entries(product.details).slice(0, 4).map(([key, value]) => (
                        <li key={key} className="grid grid-cols-[70px_1fr] gap-2 text-xs">
                           <span className="text-gray-400 font-light truncate" title={key}>{key}</span>
                           <span className="text-emerald-950 font-medium truncate" title={value}>{value}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>
            )}
         </div>
         
         <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
            <Link to={`/product/${product.id}`} className="flex items-baseline gap-3 group/price">
                <span className="text-lg font-serif text-emerald-950 group-hover/price:text-gold-600 transition-colors">{product.price}</span>
                {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-light">{product.originalPrice}</span>
                )}
            </Link>
            <button 
              onClick={handleAddToCart}
              className="text-emerald-950 hover:text-gold-600 transition-colors p-2 -mr-2 relative group/btn" 
              aria-label="Add to cart"
            >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="absolute -top-8 -right-4 bg-emerald-950 text-white text-[9px] py-1 px-2 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Add to Bag</span>
            </button>
         </div>
      </div>
    </div>
  );
};