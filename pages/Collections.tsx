import React, { useState, useMemo } from 'react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, COLLECTION_HEADERS, CATEGORY_IMAGES } from '../constants';
import { SlidersHorizontal, ChevronDown, Check, ArrowUpDown } from 'lucide-react';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const Collections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Helper to parse price string "₹2,450" -> 2450
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
        // Assuming higher ID or specific tag implies newer for this mock
        result.sort((a, b) => (b.tag === 'NEW' ? 1 : 0) - (a.tag === 'NEW' ? 1 : 0));
        break;
      default:
        // Featured (Default order in constants)
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
    <div className="min-h-screen bg-cream-50">
      {/* Dynamic Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-emerald-950">
         <img 
            src={currentHeaderImage} 
            alt={activeCategory} 
            className="w-full h-full object-cover opacity-60 transition-opacity duration-700"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-center">
             <span className="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block animate-fade-in-up">
                D GRAND Collections
             </span>
             <h1 className="font-serif text-5xl md:text-7xl text-white mb-2 animate-fade-in-up delay-100">
                {activeCategory === 'All' ? 'All Jewellery' : activeCategory}
             </h1>
         </div>
      </div>

      {/* Visual Category Filter (Rail) */}
      <div className="bg-white border-b border-gray-100 py-8 overflow-x-auto scrollbar-hide">
         <div className="container mx-auto px-4">
             <div className="flex justify-center gap-6 md:gap-12 min-w-max">
                 <button 
                    onClick={() => setActiveCategory('All')}
                    className="group flex flex-col items-center gap-3 focus:outline-none"
                 >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all duration-300 p-0.5 ${activeCategory === 'All' ? 'border-gold-500 scale-110' : 'border-transparent group-hover:border-gold-200'}`}>
                        <div className="w-full h-full rounded-full bg-emerald-950 flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest">
                           All
                        </div>
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${activeCategory === 'All' ? 'text-emerald-950' : 'text-gray-400 group-hover:text-emerald-950'}`}>View All</span>
                 </button>

                 {CATEGORY_IMAGES.map((cat, idx) => (
                     <button 
                        key={idx}
                        onClick={() => setActiveCategory(cat.name)}
                        className="group flex flex-col items-center gap-3 focus:outline-none"
                     >
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all duration-300 p-0.5 ${activeCategory === cat.name ? 'border-gold-500 scale-110' : 'border-transparent group-hover:border-gold-200'}`}>
                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${activeCategory === cat.name ? 'text-emerald-950' : 'text-gray-400 group-hover:text-emerald-950'}`}>{cat.name}</span>
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
                    Showing {filteredAndSortedProducts.length} Results
                </span>

                <div className="relative">
                    <button 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider hover:text-gold-600 transition-colors"
                    >
                        <ArrowUpDown size={14} />
                        <span>Sort</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isSortOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-sm shadow-xl border border-gray-100 z-20 animate-fade-in-up origin-top-right">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                                        className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between hover:bg-cream-50 transition-colors ${
                                            sortBy === option.value ? 'text-gold-600 font-bold' : 'text-gray-600'
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

      <Section background="cream">
        <div className="container mx-auto px-4 md:px-6">
            
            {/* Product Grid */}
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

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center opacity-0 animate-fade-in-up">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                        <SlidersHorizontal size={24} className="text-gray-300" />
                    </div>
                    <h3 className="font-serif text-2xl text-emerald-950 mb-3">No collections found</h3>
                    <p className="text-gray-400 font-light text-sm max-w-md mx-auto mb-8">
                        We currently don't have items in the <span className="font-bold text-emerald-950">"{activeCategory}"</span> category. 
                        Our artisans are working on new designs.
                    </p>
                    <button 
                        onClick={() => setActiveCategory('All')}
                        className="px-8 py-3 bg-emerald-950 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-emerald-950 transition-all shadow-lg"
                    >
                        View All Collections
                    </button>
                </div>
            )}
            
            {/* End of list indicator */}
            {filteredAndSortedProducts.length > 0 && (
                <div className="mt-20 flex justify-center">
                    <div className="flex items-center gap-4 text-gray-300">
                        <span className="h-px w-12 bg-gray-200"></span>
                        <span className="text-[10px] uppercase tracking-widest font-medium">End of Results</span>
                        <span className="h-px w-12 bg-gray-200"></span>
                    </div>
                </div>
            )}
        </div>
      </Section>
    </div>
  );
};

export default Collections;