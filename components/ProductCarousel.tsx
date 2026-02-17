import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Responsive items per page calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3); // Desktop
      else if (window.innerWidth >= 768) setItemsPerPage(2); // Tablet
      else setItemsPerPage(1); // Mobile
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [next]);

  // Ensure index is valid when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  return (
    <div className="relative group/carousel px-0 md:px-4">
      {/* Wrapper to handle shadow clipping and overflow */}
      <div className="overflow-hidden py-10 -my-10 px-2 -mx-2"> 
        <div
          className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-4 box-border"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Elegant & Minimal */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white border border-gold-200 text-emerald-950 rounded-full shadow-lg hover:bg-emerald-950 hover:text-gold-400 hover:border-emerald-950 transition-all duration-300 transform -translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 lg:translate-x-[-50%]"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={1} />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white border border-gold-200 text-emerald-950 rounded-full shadow-lg hover:bg-emerald-950 hover:text-gold-400 hover:border-emerald-950 transition-all duration-300 transform translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 lg:translate-x-[50%]"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={1} />
      </button>
      
      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: Math.max(1, products.length - itemsPerPage + 1) }).map((_, idx) => (
             <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-500 ease-out rounded-full ${
                  idx === currentIndex 
                    ? 'w-12 h-1 bg-emerald-950' 
                    : 'w-2 h-1 bg-gold-300 hover:bg-gold-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
             />
          ))}
      </div>
    </div>
  );
};