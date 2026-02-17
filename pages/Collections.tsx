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
      {/* Enhanced Hero Section */}
      <div className="bg-emerald-950 text-white pt-32 pb-20 text-center relative overflow-hidden">
        {/* Abstract luxury pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-950 via-emerald-950/90 to-emerald-900/50 pointer-events-none"></div>
        
        {/* Animated decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 container mx-auto px-6">
          <span className="inline-block py-1 px-3 border border-gold-500/30 rounded-full text-[10px] uppercase tracking-[0.3em] text-gold-400 mb-6 backdrop-blur-sm">
            Catalog 2025
          </span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-white leading-tight">
            Our Collections
          </h1>
          <p className="text-emerald-100/70 max-w-lg mx-auto text-sm font-light leading-relaxed">
            Explore our meticulously crafted imitation jewellery, designed to mirror the grandeur of royal heritage and modern aesthetics.
          </p>
        </div>
      </div>

      <Section background="cream" className="min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
            
            {/* Elegant Filter Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-emerald-950/10 pb-6 gap-6">
                <div className="text-emerald-950 text-xs font-bold uppercase tracking-widest">
                    Showing {filteredProducts.length} Result{filteredProducts.length !== 1 && 's'}
                </div>

                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {['All', ...CATEGORIES].map(cat => (
                        <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-full border ${
                            activeCategory === cat 
                            ? 'bg-emerald-950 text-white border-emerald-950 shadow-lg transform scale-105' 
                            : 'bg-transparent text-gray-500 border-transparent hover:border-gold-500/30 hover:text-emerald-950'
                        }`}
                        >
                        {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid with Staggered Animation */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {filteredProducts.map((product, index) => (
                <div 
                    key={product.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <ProductCard product={product} />
                </div>
            ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center opacity-0 animate-fade-in-up">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">💎</span>
                    </div>
                    <h3 className="font-serif text-2xl text-emerald-950 mb-2">No items found</h3>
                    <p className="text-gray-400 font-light text-sm max-w-md mx-auto">
                        We couldn't find any products in the <span className="font-bold text-emerald-950">"{activeCategory}"</span> category. Please try another category.
                    </p>
                    <button 
                        onClick={() => handleCategoryChange('All')}
                        className="mt-6 text-gold-600 border-b border-gold-600 pb-0.5 text-xs uppercase tracking-widest hover:text-emerald-950 hover:border-emerald-950 transition-all"
                    >
                        View All Products
                    </button>
                </div>
            )}
        </div>
      </Section>
    </>
  );
};

export default Collections;