import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, CreditCard, MessageCircle, Search, ChevronRight, ShoppingBag, Heart, ArrowUp, ArrowRight, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_ITEMS, WHATSAPP_LINK, PRODUCTS } from '../constants';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { CartDrawer } from './CartDrawer';
import { QuickView } from './QuickView';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  
  const { toggleCart, cartCount, notification, showNotification, wishlist } = useShop();
  const wishlistCount = wishlist.length;

  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';

  // Close menu & search on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setHoveredNav(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const results = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.subCategory?.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/product/${searchResults[0].id}`);
      setIsSearchOpen(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showNotification("Thank you for subscribing to D GRAND!");
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-emerald-950 relative selection:bg-gold-500 selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
            <motion.div 
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 20, x: "-50%" }}
                className="fixed bottom-8 left-1/2 z-[110]"
            >
                <div className="bg-emerald-950 text-white px-8 py-4 shadow-2xl flex items-center gap-3 border border-gold-500/20 rounded-none">
                <ShoppingBag size={16} className="text-gold-400" />
                <span className="text-xs font-bold uppercase tracking-widest">{notification}</span>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
      <QuickView />

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
          scrolled || !isHome ? 'bg-emerald-950/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          <div className="flex-shrink-0 z-[60]">
             <NavLink to="/">
                <Logo 
                  variant="light" 
                  size="small"
                  className={`origin-left transform transition-transform duration-300 ${scrolled ? 'scale-75' : 'scale-90 md:scale-100'}`}
                />
             </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            <nav className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <div 
                  key={item.label} 
                  className="relative group"
                  onMouseEnter={() => setHoveredNav(item.label)}
                >
                  <NavLink
                    to={item.path || '#'}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 relative font-sans ${
                        isActive 
                          ? 'text-gold-400' 
                          : 'text-white hover:text-gold-400'
                      }`
                    }
                  >
                    {item.label}
                    {item.children && <ChevronDown size={10} />}
                  </NavLink>

                  {/* Desktop Dropdown */}
                  {item.children && hoveredNav === item.label && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56 z-50"
                    >
                      <div className="bg-white rounded-none shadow-xl border-t-2 border-gold-500 py-2">
                         <div className="flex flex-col">
                            {item.children.map((child, idx) => (
                                <Link 
                                  key={idx} 
                                  to={child.path}
                                  className="px-6 py-3 text-xs text-emerald-950 hover:bg-cream-100 hover:text-teal-600 transition-colors border-b border-gray-50 last:border-0"
                                >
                                   {child.label}
                                </Link>
                            ))}
                         </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="flex items-center gap-5 ml-6 pl-6 border-l border-white/10">
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="text-white hover:text-gold-400 transition-colors"
                >
                    <Search size={18} />
                </button>

                <a 
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-gold-400 transition-colors"
                    aria-label="Contact via WhatsApp"
                >
                    <MessageCircle size={18} />
                </a>

                <Link 
                    to="/wishlist"
                    className="text-white hover:text-gold-400 transition-colors relative"
                >
                    <Heart size={18} />
                    {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full"></span>
                    )}
                </Link>

                <button 
                    onClick={toggleCart}
                    className="text-white hover:text-gold-400 transition-colors relative"
                >
                    <ShoppingBag size={18} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full"></span>
                    )}
                </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-5 z-[60]">
             <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-gold-400">
                <MessageCircle size={20} />
             </a>
             <Link to="/wishlist" className="text-gold-400">
                <Heart size={20} />
            </Link>
            <button onClick={toggleCart} className="text-gold-400">
                <ShoppingBag size={20} />
            </button>
            <button
                className="text-gold-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-emerald-950/98 z-[70] backdrop-blur-xl flex flex-col"
            >
            <div className="container mx-auto px-6 py-6 flex justify-end">
                <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="group flex items-center gap-2 text-gold-400 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold"
                >
                    Close <X size={20} />
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto">
                <div className="container mx-auto px-6 max-w-4xl pt-10 pb-20">
                    <form onSubmit={handleSearchSubmit} className="relative mb-16">
                        <input 
                        type="text" 
                        autoFocus
                        placeholder="Search..." 
                        className="w-full bg-transparent text-4xl md:text-6xl font-display font-bold text-white py-6 border-b-2 border-white/10 focus:border-gold-500 focus:outline-none placeholder:text-white/10 transition-all uppercase"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    {searchQuery.length > 1 && (
                        <div className="space-y-4">
                            <h3 className="text-gold-400 text-[10px] uppercase tracking-[0.2em] mb-8 font-bold">
                                {searchResults.length} Results
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {searchResults.map(product => (
                                    <Link 
                                    key={product.id} 
                                    to={`/product/${product.id}`}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="flex items-center gap-6 p-4 bg-white/5 hover:bg-white/10 transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-emerald-900 overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[9px] text-gold-400 uppercase tracking-widest mb-1">{product.category}</p>
                                            <h4 className="text-lg font-display text-white group-hover:text-gold-200">{product.name}</h4>
                                        </div>
                                        <ArrowRight className="text-white/20 group-hover:text-gold-500" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 bg-emerald-950 z-[55] pt-24 px-6 flex flex-col overflow-y-auto"
            >
                <nav className="flex flex-col space-y-4 pb-20">
                {NAV_ITEMS.map((item) => (
                    <div key={item.label}>
                         <NavLink
                            to={item.path || '#'}
                            onClick={() => !item.children && setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-2xl font-display font-bold transition-colors block py-2 ${
                                isActive ? 'text-gold-400' : 'text-white/90'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                        {item.children && (
                            <div className="pl-4 border-l border-white/10 ml-2 space-y-2 mb-2">
                                {item.children.map((child, idx) => (
                                    <Link 
                                        key={idx} 
                                        to={child.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-sm text-white/70 py-1"
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                </nav>
            </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-emerald-950 text-white pt-24 pb-8 border-t border-white/5">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
               <div>
                  <h5 className="font-display text-lg mb-6 text-white">D GRAND</h5>
                  <p className="text-emerald-100/60 text-sm leading-relaxed max-w-xs mb-6">
                      Premium imitation jewellery crafted for the modern era. Wholesale & Retail excellence since 2018.
                  </p>
               </div>
               
               <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gold-400">Collections</h5>
                  <ul className="space-y-4 text-xs text-gray-400 font-medium">
                     <li><Link to="/collections?category=Bridal+Sets" className="hover:text-white transition-colors">Bridal Sets</Link></li>
                     <li><Link to="/collections?category=Temple" className="hover:text-white transition-colors">Temple Jewellery</Link></li>
                     <li><Link to="/collections?category=Bangles" className="hover:text-white transition-colors">Bangles</Link></li>
                     <li><Link to="/collections?style=Rose+Gold" className="hover:text-white transition-colors">Rose Gold</Link></li>
                  </ul>
               </div>

               <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gold-400">Support</h5>
                  <ul className="space-y-4 text-xs text-gray-400 font-medium">
                     <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                     <li><Link to="/wholesale" className="hover:text-white transition-colors">Wholesale Enquiry</Link></li>
                     <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                     <li><Link to="/return-policy" className="hover:text-white transition-colors">Returns</Link></li>
                     <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                     <li><Link to="/checkout" className="hover:text-white transition-colors">Secure Checkout</Link></li>
                  </ul>
               </div>

               <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gold-400">Newsletter</h5>
                  <form onSubmit={handleSubscribe} className="relative border-b border-white/20 pb-2">
                      <input 
                         type="email" 
                         placeholder="EMAIL ADDRESS" 
                         className="w-full bg-transparent text-xs text-white placeholder:text-white/20 focus:outline-none"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                      />
                      <button type="submit" className="absolute right-0 top-0 text-gold-400 hover:text-white transition-colors">
                          <ArrowRight size={16} />
                      </button>
                  </form>
               </div>
           </div>
           
           <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 uppercase tracking-widest">
               <p>© {new Date().getFullYear()} D GRAND Jewellery</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                   <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
                   <Link to="/return-policy" className="hover:text-white">Returns</Link>
               </div>
           </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
          <AnimatePresence>
            {showBackToTop && (
                <motion.button 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={scrollToTop}
                    className="w-12 h-12 bg-white text-emerald-950 flex items-center justify-center hover:bg-gold-500 transition-colors shadow-xl"
                >
                    <ArrowUp size={20} />
                </motion.button>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
};