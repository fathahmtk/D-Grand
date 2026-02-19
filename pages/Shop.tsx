import { useMemo, useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import Seo from '../components/Seo';

const Shop = () => {
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'low' | 'high'>('latest');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(6000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const withPrice = PRODUCTS.filter((p) => Number((p.price || '0').replace(/[^0-9]/g, '')) <= maxPrice);
    const withCategory = category === 'All' ? withPrice : withPrice.filter((p) => p.category === category);
    const withSearch = withCategory.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return [...withSearch].sort((a, b) => {
      const aPrice = Number((a.price || '0').replace(/[^0-9]/g, ''));
      const bPrice = Number((b.price || '0').replace(/[^0-9]/g, ''));
      if (sortBy === 'low') return aPrice - bPrice;
      if (sortBy === 'high') return bPrice - aPrice;
      if (sortBy === 'popular') return (b.tag ? 1 : 0) - (a.tag ? 1 : 0);
      return Number(b.id) - Number(a.id);
    });
  }, [category, search, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-cream-50 pt-24 md:pt-28 pb-16">
      <Seo title="Shop Fashion Jewellery" description="Explore premium fashion jewellery for Indian weddings, daily wear and gifting." />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12">
        <div className="bg-white border border-gold-200/80 p-4 md:p-6 mb-6 md:mb-8 rounded-xl shadow-soft">
          <div className="flex items-center justify-between mb-3 md:hidden">
            <h1 className="font-display text-2xl text-emerald-950">Shop</h1>
            <button
              className="text-[11px] uppercase tracking-[0.18em] border border-emerald-950/20 rounded-md px-3 py-2 font-medium"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className={`${showFilters ? 'grid' : 'hidden'} md:grid gap-3 md:gap-4 md:grid-cols-4`}>
            <input
              className="border border-emerald-950/15 rounded-md px-3 py-2.5 text-sm focus:border-gold-500"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="border border-emerald-950/15 rounded-md px-3 py-2.5 text-sm focus:border-gold-500" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select className="border border-emerald-950/15 rounded-md px-3 py-2.5 text-sm focus:border-gold-500" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-emerald-900/80 block mb-2">Max Price ₹{maxPrice.toLocaleString('en-IN')}</label>
              <input className="w-full accent-gold-500" type="range" min="500" max="6000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">Fashion Jewellery – Not Real Gold</p>
        <p className="text-sm text-emerald-900/70 mb-6">Showing {filtered.length} products</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default Shop;
