import React, { useState, useMemo } from 'react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, COLLECTION_HEADERS, CATEGORY_IMAGES } from '../constants';
import { SlidersHorizontal, ChevronDown, Check, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const Collections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const getPrice = (priceStr?: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = activeCategory === 'All' 
      ? [...PRODUCTS] 
      : PRODUCTS.filter(p => p.category === activeCategory);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => getPrice(a.price) - getPrice(b.price));
        break;
      case 'price-high':
        result.sort((a, b) => getPrice(b.price) - getPrice(a.price));
        break;
      case 'newest':
        result.sort((a, b) => (b.tag === 'NEW' ? 1 : 0) - (a.tag === 'NEW' ? 1 : 0));
        break;
      default:
        break;
    }
    return result;
  }, [activeCategory, sortBy]);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Newest Arrivals', value: 'newest' },
  ];

  const currentHeaderImage = COLLECTION_HEADERS[activeCategory] || COLLECTION_HEADERS['All'];

  return (
    <div className="min-h-screen bg-white">
      {/* Industrial Hero */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-emerald-950">
         <motion.img 
            key={activeCategory}
            initial={{ opacity: 0.5, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.8 }}
            src={currentHeaderImage} 
            alt={activeCategory} 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 border-t border-white/10">
             <div className="container mx-auto">
                <span className="text-teal-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">
                    Catalog / 01
                </span>
                <h1 className="font-display text-5xl md:text-7xl text-white mb-2 uppercase tracking-tighter">
                    {activeCategory === 'All' ? 'All Products' : activeCategory}
                </h1>
             </div>
         </div>
      </div>

      {/* Category Rail - Squared */}
      <div className="bg-white border-b border-gray-100 py-8 overflow-x-auto scrollbar-hide">
         <div className="container mx-auto px-4">
             <div className="flex justify-start md:justify-center gap-4 md:gap-8 min-w-max">
                 <button 
                    onClick={() => setActiveCategory('All')}
                    className={`group flex items-center gap-3 px-6 py-3 border transition-all duration-300 ${activeCategory === 'All' ? 'border-emerald-950 bg-emerald-950 text-white' : 'border-gray-200 text-gray-500 hover:border-emerald-950 hover:text-emerald-950'}`}
                 >
                    <span className="text-[10px] uppercase tracking-widest font-bold">All</span>
                 </button>

                 {CATEGORY_IMAGES.map((cat, idx) => (
                     <button 
                        key={idx}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`group flex items-center gap-3 px-6 py-3 border transition-all duration-300 ${activeCategory === cat.name ? 'border-emerald-950 bg-emerald-950 text-white' : 'border-gray-200 text-gray-500 hover:border-emerald-950 hover:text-emerald-950'}`}
                     >
                        <span className="text-[10px] uppercase tracking-widest font-bold">{cat.name}</span>
                     </button>
                 ))}
             </div>
         </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[60px] md:top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between py-4">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {filteredAndSortedProducts.length} Items
                </span>

                <div className="relative">
                    <button 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider hover:text-teal-600 transition-colors"
                    >
                        <ArrowUpDown size={14} />
                        <span>Sort</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isSortOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl border border-gray-100 z-20 origin-top-right">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                                        className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                            sortBy === option.value ? 'text-emerald-950 font-bold bg-gray-50' : 'text-gray-500'
                                        }`}
                                    >
                                        {option.label}
                                        {sortBy === option.value && <Check size={12} />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
         </div>
      </div>

      <Section background="white">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 min-h-[50vh]">
            {filteredAndSortedProducts.map((product, index) => (
                <div 
                    key={product.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <ProductCard product={product} />
                </div>
            ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center opacity-0 animate-fade-in-up">
                    <div className="w-16 h-16 bg-gray-50 flex items-center justify-center mb-6">
                        <SlidersHorizontal size={24} className="text-gray-400" />
                    </div>
                    <h3 className="font-display text-2xl text-emerald-950 mb-3">No Items Found</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                        Try adjusting your filters or category selection.
                    </p>
                    <button 
                        onClick={() => setActiveCategory('All')}
                        className="px-8 py-3 bg-emerald-950 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-600 transition-all"
                    >
                        View All
                    </button>
                </div>
            )}
        </div>
      </Section>
    </div>
  );
};

export default Collections;