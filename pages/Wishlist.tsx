import React from 'react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { wishlist } = useShop();
  
  // Filter products that are in the wishlist ID array
  const wishlistProducts = PRODUCTS.filter(product => wishlist.includes(product.id));

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="bg-emerald-950 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-3 text-white">
            Your Wishlist
          </h1>
          <p className="text-emerald-100/60 text-xs font-light uppercase tracking-[0.2em]">
            Saved Treasures | Review & Purchase
          </p>
        </div>
      </div>

      <Section background="cream">
        <div className="container mx-auto px-4 md:px-6">
            
            {/* Empty State */}
            {wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                        <Heart size={32} className="text-gray-300" strokeWidth={1} />
                    </div>
                    <h3 className="font-serif text-2xl text-emerald-950 mb-3">Your wishlist is empty</h3>
                    <p className="text-gray-400 font-light text-sm max-w-md mx-auto mb-8">
                        Save items you love here to review or buy later. Explore our collections to find your perfect match.
                    </p>
                    <Link 
                        to="/collections"
                        className="px-8 py-3 bg-emerald-950 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-emerald-950 transition-all shadow-lg flex items-center gap-2"
                    >
                        Start Shopping <ArrowRight size={14} />
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{wishlistProducts.length} Items Saved</span>
                        <Link to="/collections" className="text-[10px] uppercase tracking-widest text-emerald-950 hover:text-gold-600 transition-colors font-bold flex items-center gap-1">
                            Continue Shopping <ArrowRight size={12} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 min-h-[50vh]">
                        {wishlistProducts.map((product, index) => (
                            <div 
                                key={product.id} 
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </>
            )}
            
        </div>
      </Section>
    </div>
  );
};

export default Wishlist;