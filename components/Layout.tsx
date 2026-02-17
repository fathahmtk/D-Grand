import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, CreditCard, MessageCircle, Search, ChevronRight, ShoppingBag } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_ITEMS, WHATSAPP_LINK, PRODUCTS } from '../constants';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { CartDrawer } from './CartDrawer';

// Specific Header Navigation including Wholesale for business focus
const HEADER_NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Wholesale', path: '/wholesale' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  const { toggleCart, cartCount, notification } = useShop();

  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';

  // Close menu & search on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Search Logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const results = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Lock body scroll when overlays are open
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

  return (
    <div className="min-h-screen flex flex-col font-sans text-emerald-950 relative">
      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] transition-all duration-300 transform ${notification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-emerald-950 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
          <ShoppingBag size={16} className="text-gold-400" />
          <span className="text-xs font-bold uppercase tracking-widest">{notification}</span>
        </div>
      </div>

      <CartDrawer />

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-[60] bg-emerald-950 transition-all duration-300 shadow-md ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo - Aligned Left */}
          <div className="flex-shrink-0 z-[60]">
             <NavLink to="/">
                <Logo 
                  variant="light" 
                  size="small"
                  className="origin-left transform scale-90 md:scale-100"
                />
             </NavLink>
          </div>

          {/* Desktop Nav - Aligned Right */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <nav className="flex items-center gap-8">
              {HEADER_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 relative group ${
                      isActive 
                        ? 'text-gold-400' 
                        : 'text-white hover:text-gold-400'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-gold-400 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            
            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/10">
                {/* Search Icon Desktop */}
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="text-white hover:text-gold-400 transition-colors"
                    aria-label="Open Search"
                >
                    <Search size={20} />
                </button>

                {/* Cart Icon Desktop */}
                <button 
                    onClick={toggleCart}
                    className="text-white hover:text-gold-400 transition-colors relative group"
                    aria-label="Open Cart"
                >
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 text-emerald-950 text-[9px] font-bold flex items-center justify-center rounded-full animate-fade-in-up">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
          </div>

          {/* Mobile Actions - Right aligned */}
          <div className="md:hidden flex items-center gap-4 z-[60]">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gold-400 hover:text-white transition-colors"
            >
                <Search size={22} />
            </button>
            
            <button 
                onClick={toggleCart}
                className="text-gold-400 hover:text-white transition-colors relative"
            >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-emerald-950 text-[9px] font-bold flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                )}
            </button>

            <button
                className="text-gold-400 p-1 hover:text-white transition-colors ml-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-emerald-950/98 z-[70] backdrop-blur-md animate-fade-in flex flex-col">
           {/* Search Header */}
           <div className="container mx-auto px-6 py-6 flex justify-end">
              <button 
                onClick={() => setIsSearchOpen(false)} 
                className="group flex items-center gap-2 text-gold-400/70 hover:text-gold-400 transition-colors text-xs uppercase tracking-widest font-bold"
              >
                  Close <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
           </div>
           
           <div className="flex-grow overflow-y-auto">
             <div className="container mx-auto px-6 max-w-4xl pt-10 pb-20">
                 {/* Input */}
                 <form onSubmit={handleSearchSubmit} className="relative mb-16 group">
                     <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" size={32} />
                     <input 
                       type="text" 
                       autoFocus
                       placeholder="Search products..." 
                       className="w-full bg-transparent text-3xl md:text-5xl font-serif text-white py-6 pl-16 pr-4 border-b-2 border-white/10 focus:border-gold-500 focus:outline-none placeholder:text-white/10 transition-all"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                     />
                 </form>

                 {/* Results */}
                 {searchQuery.length > 1 && (
                     <div className="animate-fade-in-up">
                        <h3 className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-8 font-bold">
                            {searchResults.length} Result{searchResults.length !== 1 && 's'} Found
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {searchResults.map(product => (
                                <Link 
                                  key={product.id} 
                                  to={`/product/${product.id}`}
                                  onClick={() => setIsSearchOpen(false)}
                                  className="flex items-center gap-6 p-4 rounded-md bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-gold-500/30 group"
                                >
                                    <div className="w-20 h-20 bg-emerald-900 rounded-sm overflow-hidden flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-[10px] text-gold-400/70 uppercase tracking-widest mb-1 group-hover:text-gold-400">{product.category}</p>
                                        <h4 className="text-xl font-serif text-white group-hover:text-gold-200 transition-colors">{product.name}</h4>
                                        <p className="text-sm text-gray-400 mt-1 font-light">{product.price}</p>
                                    </div>
                                    <ChevronRight className="text-white/20 group-hover:text-gold-500 transition-colors transform group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                        {searchResults.length === 0 && (
                            <div className="text-center py-12 border border-white/5 rounded-lg bg-white/5">
                                <p className="text-white/40 text-lg font-serif italic">No treasures found matching "{searchQuery}"</p>
                            </div>
                        )}
                     </div>
                 )}
                 
                 {/* Suggestions when empty */}
                 {searchQuery.length <= 1 && (
                     <div className="text-center md:text-left animate-fade-in-up">
                         <h3 className="text-white/30 text-xs uppercase tracking-[0.2em] mb-6 font-bold">Popular Categories</h3>
                         <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {['Necklaces', 'Bridal Sets', 'Earrings', 'Temple'].map(tag => (
                                <button 
                                    key={tag}
                                    onClick={() => setSearchQuery(tag)}
                                    className="px-6 py-3 border border-white/10 rounded-full text-white/60 hover:text-emerald-950 hover:bg-gold-500 hover:border-gold-500 transition-all text-sm uppercase tracking-wider"
                                >
                                    {tag}
                                </button>
                            ))}
                         </div>
                     </div>
                 )}
             </div>
           </div>
        </div>
      )}

      {/* Mobile Nav Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-emerald-950 z-[55] flex items-center justify-center transition-all duration-500 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible delay-300'
        }`}
      >
        <nav className="flex flex-col space-y-8 text-center p-6 w-full">
          {HEADER_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-3xl font-serif tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-gold-400' : 'text-emerald-100 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="w-12 h-[1px] bg-white/10 mx-auto my-4"></div>
          <Link to="/marketplaces" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest text-emerald-200 hover:text-white">
            Marketplaces
          </Link>
        </nav>
      </div>

      {/* Main Content - Add padding top to account for fixed header */}
      <main className={`flex-grow ${isHome ? '' : 'pt-20'}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white border-t border-gold-500/10">
        
        {/* Top Info Section */}
        <div className="container mx-auto px-6 py-20 border-b border-emerald-900/50">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
              <div className="p-8 border border-emerald-900/30 rounded-sm hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1 bg-emerald-900/10">
                 <div className="w-12 h-12 mx-auto md:mx-0 bg-emerald-900 rounded-full flex items-center justify-center mb-6 text-gold-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                 </div>
                 <h4 className="font-serif text-xl mb-3">New Collections</h4>
                 <p className="text-xs text-gray-400 leading-relaxed font-light">Discover our latest designs updated weekly for wholesale partners.</p>
              </div>
              <div className="p-8 border border-emerald-900/30 rounded-sm hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1 bg-emerald-900/10">
                 <div className="w-12 h-12 mx-auto md:mx-0 bg-emerald-900 rounded-full flex items-center justify-center mb-6 text-gold-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                 </div>
                 <h4 className="font-serif text-xl mb-3">Festive Special</h4>
                 <p className="text-xs text-gray-400 leading-relaxed font-light">Exclusive bridal and festive sets curated for the season.</p>
              </div>
              <div className="p-8 border border-emerald-900/30 rounded-sm hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1 bg-emerald-900/10">
                 <div className="w-12 h-12 mx-auto md:mx-0 bg-emerald-900 rounded-full flex items-center justify-center mb-6 text-gold-400">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                 </div>
                 <h4 className="font-serif text-xl mb-3">Wholesale Rates</h4>
                 <p className="text-xs text-gray-400 leading-relaxed font-light">Direct factory pricing for bulk orders with worldwide shipping.</p>
              </div>
              
              <div className="flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-emerald-900/30 to-emerald-950 rounded-sm relative overflow-hidden border border-gold-500/20">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-3xl"></div>
                 <h3 className="font-serif text-3xl mb-2 text-gold-400">Since 2018</h3>
                 <p className="text-[10px] tracking-[0.3em] uppercase mb-6 text-emerald-200">Crafting Elegance</p>
                 <NavLink to="/about" className="px-8 py-3 border border-gold-500 text-gold-500 text-[10px] uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-emerald-950 transition-all duration-300">Our Story</NavLink>
              </div>
           </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
           <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gold-400">Quick Links</h5>
              <ul className="space-y-4 text-xs text-gray-400">
                {NAV_ITEMS.map(item => (
                  <li key={item.path}><NavLink to={item.path} className="hover:text-white transition-colors flex items-center gap-3 group"><span className="w-1 h-1 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>{item.label}</NavLink></li>
                ))}
              </ul>
           </div>
           
           <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gold-400">Customer Care</h5>
              <ul className="space-y-4 text-xs text-gray-400">
                 <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Shipping Information</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Returns & Exchange</a></li>
              </ul>
           </div>

           <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gold-400">Connect</h5>
              <div className="flex gap-4 mb-8">
                 <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-gold-500 hover:text-emerald-950 hover:border-gold-500 transition-all duration-300"><Instagram size={16} /></a>
                 <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-gold-500 hover:text-emerald-950 hover:border-gold-500 transition-all duration-300"><Facebook size={16} /></a>
                 <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-gold-500 hover:text-emerald-950 hover:border-gold-500 transition-all duration-300"><Twitter size={16} /></a>
              </div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gold-400">Payments</h5>
              <div className="flex gap-3 text-gray-500 items-center">
                 <CreditCard size={20} />
                 <span className="text-[10px] font-mono">SECURE PAYMENT</span>
              </div>
           </div>

           <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gold-400">Newsletter</h5>
              <p className="text-xs text-gray-400 mb-6 font-light leading-relaxed">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="relative">
                 <input type="email" placeholder="Email Address" className="w-full bg-white/5 border-b border-white/20 px-0 py-3 text-xs text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-gray-600" />
                 <button className="absolute right-0 top-0 h-full text-gold-500 text-[10px] font-bold uppercase hover:text-white transition-colors">Subscribe</button>
              </div>
           </div>
        </div>

        <div className="border-t border-emerald-900/50 py-8">
           <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              <p>© {new Date().getFullYear()} D GRAND Jewellery.</p>
              <p className="mt-2 md:mt-0">Designed for Elegance</p>
           </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-105 hover:shadow-[0_10px_30px_rgba(37,211,102,0.5)] transition-all duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="fill-current" />
      </a>
    </div>
  );
};