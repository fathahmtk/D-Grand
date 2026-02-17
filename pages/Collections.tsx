import React, { useState } from 'react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';

const Collections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setIsAnimating(true);
    setActiveCategory(cat);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      <div className="bg-emerald-950 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">Collections</h1>
          <p className="text-gold-400 uppercase tracking-[0.3em] text-xs font-medium">Curated Excellence</p>
        </div>
      </div>

      <Section background="cream">
        {/* Minimalist Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-gray-200 pb-1">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`pb-4 uppercase text-xs tracking-[0.2em] transition-all relative group ${
                activeCategory === cat 
                  ? 'text-emerald-950 font-bold' 
                  : 'text-gray-400 hover:text-emerald-950'
              }`}
            >
              {cat}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 transform transition-transform duration-300 origin-center ${
                 activeCategory === cat ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
              }`}></span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {filteredProducts.map(product => (
            <div key={product.id} className="animate-fade-in-up">
               <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
           <div className="text-center py-24">
             <p className="text-gray-400 font-serif text-xl italic">No products found in this category.</p>
           </div>
        )}
      </Section>
    </>
  );
};

export default Collections;