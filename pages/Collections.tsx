import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, STYLES, OCCASIONS, REGIONS, COLLECTION_HEADERS } from '../constants';
import { SlidersHorizontal, ChevronDown, Check, ArrowUpDown, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const Collections: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  
  // Mobile Filter Drawer
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const catParam = queryParams.get('category');
    const styleParam = queryParams.get('style');
    const occasionParam = queryParams.get('occasion');
    
    if (catParam) setSelectedCategories([catParam]);
    if (styleParam) setSelectedStyles([styleParam]);
    if (occasionParam) setSelectedOccasions([occasionParam]);
    
    // Scroll to top when params change
    window.scrollTo(0, 0);
  }, [location.search]);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const clearFilters = () => {
      setSelectedCategories([]);
      setSelectedStyles([]);
      setSelectedOccasions([]);
      setSelectedRegions([]);
      navigate('/collections');
  };

  const getPrice = (priceStr?: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategories.length > 0) {
        result = result.filter(p => selectedCategories.includes(p.category) || (p.subCategory && selectedCategories.includes(p.subCategory)));
    }
    if (selectedStyles.length > 0) {
        result = result.filter(p => p.style && selectedStyles.includes(p.style));
    }
    if (selectedOccasions.length > 0) {
        result = result.filter(p => p.occasion && selectedOccasions.includes(p.occasion));
    }
    if (selectedRegions.length > 0) {
        result = result.filter(p => p.region && selectedRegions.includes(p.region));
    }

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
  }, [selectedCategories, selectedStyles, selectedOccasions, selectedRegions, sortBy]);

  const activeHeaderImage = selectedCategories.length === 1 
      ? COLLECTION_HEADERS[selectedCategories[0]] || COLLECTION_HEADERS['All'] 
      : COLLECTION_HEADERS['All'];

  const FilterGroup = ({ title, items, selected, setSelected }: any) => (
      <div className="mb-8">
          <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">{title}</h4>
          <div className="space-y-2">
              {items.map((item: string) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selected.includes(item) ? 'bg-emerald-950 border-emerald-950' : 'border-gray-300 group-hover:border-emerald-950'}`}>
                          {selected.includes(item) && <Check size={10} className="text-white" />}
                      </div>
                      <input 
                          type="checkbox" 
                          className="hidden"
                          checked={selected.includes(item)}
                          onChange={() => toggleFilter(selected, setSelected, item)}
                      />
                      <span className={`text-sm ${selected.includes(item) ? 'text-emerald-950 font-bold' : 'text-gray-500 group-hover:text-emerald-950'}`}>
                          {item}
                      </span>
                  </label>
              ))}
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24">
      {/* Mini Hero */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-emerald-950">
         <div className="absolute inset-0 opacity-40">
            <img src={activeHeaderImage} alt="Header" className="w-full h-full object-cover" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-transparent"></div>
         <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
             <h1 className="text-4xl md:text-5xl font-display text-white mb-2">
                 {selectedCategories.length === 1 ? selectedCategories[0] : 'Shop All'}
             </h1>
             <p className="text-emerald-100/60 text-xs font-bold uppercase tracking-[0.2em]">
                 {filteredAndSortedProducts.length} Premium Products
             </p>
         </div>
      </div>

      <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Sidebar Filters (Desktop) */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                  <div className="sticky top-32">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-display text-xl text-emerald-950">Filters</h3>
                        {(selectedCategories.length > 0 || selectedStyles.length > 0 || selectedOccasions.length > 0) && (
                            <button onClick={clearFilters} className="text-[10px] uppercase font-bold text-red-500 hover:text-red-700">Clear All</button>
                        )}
                      </div>
                      
                      <FilterGroup title="Category" items={CATEGORIES} selected={selectedCategories} setSelected={setSelectedCategories} />
                      <FilterGroup title="Style" items={STYLES} selected={selectedStyles} setSelected={setSelectedStyles} />
                      <FilterGroup title="Occasion" items={OCCASIONS} selected={selectedOccasions} setSelected={setSelectedOccasions} />
                      <FilterGroup title="Region" items={REGIONS} selected={selectedRegions} setSelected={setSelectedRegions} />
                  </div>
              </div>

              {/* Mobile Filter Bar */}
              <div className="lg:hidden flex items-center justify-between mb-6 border-b border-gray-100 pb-4 sticky top-16 bg-white z-30">
                  <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-950">
                      <Filter size={16} /> Filters
                  </button>
                  <div className="relative">
                     <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-950">
                        <ArrowUpDown size={16} /> Sort
                     </button>
                     {isSortOpen && (
                        <>
                         <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)}></div>
                         <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl border border-gray-100 z-50 py-2">
                             {[
                                 {l: 'Featured', v: 'featured'}, 
                                 {l: 'Price: Low-High', v: 'price-low'}, 
                                 {l: 'Price: High-Low', v: 'price-high'}, 
                                 {l: 'Newest', v: 'newest'}
                             ].map((opt: any) => (
                                 <button key={opt.v} onClick={() => {setSortBy(opt.v); setIsSortOpen(false)}} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">{opt.l}</button>
                             ))}
                         </div>
                        </>
                     )}
                  </div>
              </div>

              {/* Mobile Filter Drawer */}
              <AnimatePresence>
                  {isFilterOpen && (
                      <div className="fixed inset-0 z-[100] flex justify-end lg:hidden">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
                            onClick={() => setIsFilterOpen(false)}
                          />
                          <motion.div 
                             initial={{ x: '100%' }}
                             animate={{ x: 0 }}
                             exit={{ x: '100%' }}
                             transition={{ type: 'tween' }}
                             className="relative w-full max-w-xs bg-white h-full shadow-2xl overflow-y-auto p-6"
                          >
                              <div className="flex items-center justify-between mb-8">
                                  <h3 className="font-display text-xl">Filters</h3>
                                  <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
                              </div>
                              <FilterGroup title="Category" items={CATEGORIES} selected={selectedCategories} setSelected={setSelectedCategories} />
                              <FilterGroup title="Style" items={STYLES} selected={selectedStyles} setSelected={setSelectedStyles} />
                              <FilterGroup title="Occasion" items={OCCASIONS} selected={selectedOccasions} setSelected={setSelectedOccasions} />
                              
                              <div className="mt-8 pt-6 border-t border-gray-100">
                                  <button onClick={() => setIsFilterOpen(false)} className="w-full bg-emerald-950 text-white py-3 font-bold text-xs uppercase tracking-widest">
                                      Show {filteredAndSortedProducts.length} Results
                                  </button>
                              </div>
                          </motion.div>
                      </div>
                  )}
              </AnimatePresence>

              {/* Product Grid */}
              <div className="flex-grow">
                   {/* Desktop Sort Bar */}
                   <div className="hidden lg:flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                       <p className="text-gray-500 text-sm">Showing {filteredAndSortedProducts.length} results</p>
                       <select 
                          className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer font-bold text-emerald-950"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as SortOption)}
                       >
                           <option value="featured">Sort by Featured</option>
                           <option value="price-low">Price: Low to High</option>
                           <option value="price-high">Price: High to Low</option>
                           <option value="newest">Newest Arrivals</option>
                       </select>
                   </div>

                   {filteredAndSortedProducts.length > 0 ? (
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                           {filteredAndSortedProducts.map((product) => (
                               <ProductCard key={product.id} product={product} />
                           ))}
                       </div>
                   ) : (
                       <div className="text-center py-20">
                           <SlidersHorizontal size={32} className="mx-auto text-gray-300 mb-4" />
                           <h3 className="font-display text-2xl text-emerald-950 mb-2">No Products Found</h3>
                           <p className="text-gray-500 mb-6">Try adjusting your filters.</p>
                           <button onClick={clearFilters} className="px-6 py-2 bg-emerald-950 text-white text-xs uppercase font-bold tracking-widest">
                               Reset Filters
                           </button>
                       </div>
                   )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Collections;