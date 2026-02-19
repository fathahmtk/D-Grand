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
    <article
      className="group relative h-full flex flex-col rounded-xl border border-emerald-950/10 bg-white p-3 sm:p-4 shadow-soft hover:shadow-card transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 mb-4">
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={`Open ${product.name}`} />

        <motion.img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          onError={handleError}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          animate={{ scale: isHovered ? 1.08 : 1 }}
        />

        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        <button
          onClick={handleQuickView}
          className={`absolute top-3 right-3 z-20 w-9 h-9 bg-white/95 text-emerald-950 flex items-center justify-center rounded-full hover:bg-emerald-950 hover:text-white transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          aria-label={`Quick view ${product.name}`}
        >
          <Eye size={17} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center flex-1">
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold-600 mb-1.5 font-semibold">{product.category}</p>
        <h3 className="font-display text-lg leading-tight text-emerald-950 mb-2 group-hover:text-teal-600 transition-colors min-h-[56px] flex items-center">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-emerald-900 font-semibold text-sm mb-4">{product.price}</p>

        <button
          onClick={handleEnquire}
          className="mt-auto w-full px-4 py-2.5 border border-emerald-950/20 rounded-md text-emerald-950 text-[10px] font-semibold uppercase tracking-[0.18em] hover:bg-emerald-950 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircle size={14} /> Enquire on WhatsApp
        </button>
      </div>
    </article>
  );
};
