import React, { useState } from 'react';
import { Product } from '../types';
import { MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FALLBACK_IMAGE, PHONE_PRIMARY } from '../constants';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [isHovered, setIsHovered] = useState(false);
  
  const { openQuickView } = useShop();

  const handleError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleEnquire = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const text = `Hi, I am interested in ${product.name} (Category: ${product.category}). Please share details.`;
      window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      className="group relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1:1 Aspect Ratio Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 mb-4 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />

        <motion.img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            onError={handleError}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            animate={{ scale: isHovered ? 1.1 : 1 }}
        />
        
        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

        <button 
            onClick={handleQuickView}
            className={`absolute top-4 right-4 z-20 w-10 h-10 bg-white/95 text-emerald-950 flex items-center justify-center rounded-full hover:bg-emerald-950 hover:text-white transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        >
            <Eye size={18} />
        </button>
      </div>

      {/* Info Area - Portfolio Style */}
      <div className="flex flex-col text-center items-center">
         <p className="text-[10px] uppercase tracking-[0.2em] text-gold-600 mb-2 font-bold">{product.category}</p>
         <h3 className="font-display text-lg text-emerald-950 mb-4 group-hover:text-teal-600 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
         </h3>
         
         {/* Button */}
         <button 
            onClick={handleEnquire}
            className="mt-auto px-6 py-3 border border-emerald-950/20 text-emerald-950 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-950 hover:text-white transition-all duration-300 flex items-center gap-2"
         >
             <MessageCircle size={14} /> Enquire on WhatsApp
         </button>
      </div>
    </div>
  );
};