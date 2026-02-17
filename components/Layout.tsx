import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, CreditCard, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_ITEMS, WHATSAPP_LINK } from '../constants';

// Specific Header Navigation as requested
const HEADER_NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Categories', path: '/collections' }, // Pointing to collections as per standard implementation
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-emerald-950 relative">
      {/* 
        Header Redesign:
        - Deep Emerald Green (#0F3B2E / bg-emerald-950)
        - Reduced Height (py-3)
        - Sticky/Fixed
        - Logo Left, Nav Right
      */}
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
          <nav className="hidden md:flex items-center gap-8 ml-auto">
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

          {/* Mobile Menu Button - Right aligned */}
          <button
            className="md:hidden text-gold-400 p-2 z-[60] hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

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
                `text-2xl font-serif tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-gold-400' : 'text-emerald-100 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {/* Add extra important links for mobile accessibility */}
           <div className="w-12 h-[1px] bg-white/10 mx-auto my-4"></div>
           <NavLink to="/wholesale" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest text-emerald-200 hover:text-white">Wholesale</NavLink>
        </nav>
      </div>

      {/* Main Content - Add padding top to account for fixed header */}
      <main className={`flex-grow ${isHome ? '' : 'pt-20'}`}>
        <Outlet />
      </main>

      {/* Footer - Keeps full navigation from constants */}
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