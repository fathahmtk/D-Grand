import React from 'react';
import { Section } from '../components/Section';
import { ExternalLink } from 'lucide-react';

const Marketplaces: React.FC = () => {
  return (
    <>
      <div className="bg-emerald-950 text-white py-24 text-center">
         <h1 className="font-serif text-4xl md:text-6xl mb-4">Shop Online</h1>
         <p className="text-gold-400 uppercase tracking-[0.2em] text-xs font-medium">Available on your favorite platforms</p>
      </div>

      <Section background="cream">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amazon */}
            <a href="#" className="group bg-white p-8 border border-transparent hover:border-gold-200 transition-all duration-500 flex flex-col items-center text-center hover:shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
               <div className="w-20 h-20 mb-6 bg-gray-50 rounded-full flex items-center justify-center text-3xl font-serif text-gray-400 group-hover:bg-[#FF9900] group-hover:text-white transition-colors duration-500">
                  A
               </div>
               <h3 className="font-serif text-2xl text-emerald-950 mb-2">Amazon Store</h3>
               <p className="text-gray-500 text-sm font-light mb-6">Fast delivery & trusted service</p>
               <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-950 group-hover:text-gold-600 transition-colors">
                  Visit Store <ExternalLink size={14} />
               </span>
            </a>

            {/* Flipkart */}
            <a href="#" className="group bg-white p-8 border border-transparent hover:border-gold-200 transition-all duration-500 flex flex-col items-center text-center hover:shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
               <div className="w-20 h-20 mb-6 bg-gray-50 rounded-full flex items-center justify-center text-3xl font-serif text-gray-400 group-hover:bg-[#2874F0] group-hover:text-white transition-colors duration-500">
                  F
               </div>
               <h3 className="font-serif text-2xl text-emerald-950 mb-2">Flipkart Store</h3>
               <p className="text-gray-500 text-sm font-light mb-6">Wide range of collections</p>
               <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-950 group-hover:text-gold-600 transition-colors">
                  Visit Store <ExternalLink size={14} />
               </span>
            </a>

            {/* Meesho */}
            <a href="#" className="group bg-white p-8 border border-transparent hover:border-gold-200 transition-all duration-500 flex flex-col items-center text-center hover:shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
               <div className="w-20 h-20 mb-6 bg-gray-50 rounded-full flex items-center justify-center text-3xl font-serif text-gray-400 group-hover:bg-[#f43397] group-hover:text-white transition-colors duration-500">
                  M
               </div>
               <h3 className="font-serif text-2xl text-emerald-950 mb-2">Meesho Store</h3>
               <p className="text-gray-500 text-sm font-light mb-6">Best prices for bulk orders</p>
               <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-950 group-hover:text-gold-600 transition-colors">
                  Visit Store <ExternalLink size={14} />
               </span>
            </a>

            {/* Instagram */}
            <a href="#" className="group bg-white p-8 border border-transparent hover:border-gold-200 transition-all duration-500 flex flex-col items-center text-center hover:shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
               <div className="w-20 h-20 mb-6 bg-gray-50 rounded-full flex items-center justify-center text-3xl font-serif text-gray-400 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-500">
                  I
               </div>
               <h3 className="font-serif text-2xl text-emerald-950 mb-2">Instagram Shop</h3>
               <p className="text-gray-500 text-sm font-light mb-6">New arrivals & daily updates</p>
               <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-950 group-hover:text-gold-600 transition-colors">
                  Visit Store <ExternalLink size={14} />
               </span>
            </a>
        </div>
      </Section>
    </>
  );
};

export default Marketplaces;