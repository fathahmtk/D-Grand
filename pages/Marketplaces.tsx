import React from 'react';
import { Section } from '../components/Section';
import { ExternalLink, ShoppingBag, Box, CheckCircle, Truck } from 'lucide-react';

const Marketplaces: React.FC = () => {
  const marketplaces = [
    {
      name: 'Amazon',
      description: 'Prime delivery available. Best for individual orders.',
      color: '#FF9900', // Amazon Orange
      initial: 'A',
      link: '#'
    },
    {
      name: 'Flipkart',
      description: 'Wide range of regional collections and festive sales.',
      color: '#2874F0', // Flipkart Blue
      initial: 'F',
      link: '#'
    },
    {
      name: 'Meesho',
      description: 'Wholesale rates for resellers and bulk buyers.',
      color: '#f43397', // Meesho Pink
      initial: 'M',
      link: '#'
    },
    {
      name: 'Instagram',
      description: 'Daily updates, stories, and direct DM orders.',
      color: '#E1306C', // Insta Pink/Purple
      initial: 'I',
      link: '#'
    }
  ];

  return (
    <>
      <div className="bg-emerald-950 text-white pt-32 pb-20 text-center relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         
         <div className="relative z-10 px-6">
            <span className="text-gold-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block animate-fade-in-up">Online Presence</span>
            <h1 className="font-serif text-4xl md:text-6xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Shop Online</h1>
            <p className="text-emerald-100/60 text-sm font-light max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Experience D GRAND Jewellery on your favorite platforms. Secure payments and nationwide delivery.
            </p>
         </div>
      </div>

      <Section background="cream">
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {marketplaces.map((market, idx) => (
                    <a 
                        href={market.link} 
                        key={idx}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative bg-white p-10 rounded-sm overflow-hidden border border-gray-100 hover:border-gold-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                    >
                        {/* Decorative background circle */}
                        <div 
                            className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-5 transition-transform duration-700 group-hover:scale-150"
                            style={{ backgroundColor: market.color }}
                        ></div>

                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <div 
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif text-white mb-6 shadow-md transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundColor: market.color }}
                                >
                                    {market.initial}
                                </div>
                                <h3 className="font-serif text-2xl text-emerald-950 mb-2 group-hover:text-gold-600 transition-colors">{market.name}</h3>
                                <p className="text-gray-500 text-sm font-light mb-8 max-w-xs">{market.description}</p>
                                
                                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-950 border-b border-emerald-950/30 pb-1 group-hover:border-gold-600 group-hover:text-gold-600 transition-all">
                                    Visit Store <ExternalLink size={12} />
                                </span>
                            </div>

                            <div className="hidden sm:block text-gray-200 group-hover:text-gold-100 transition-colors duration-500">
                                <ShoppingBag size={120} strokeWidth={0.5} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Premium Promise Section */}
            <div className="bg-white rounded-sm border border-gold-500/20 p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-50 opacity-30"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="px-4">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-emerald-950/5 text-emerald-950 mb-6">
                            <Box size={28} strokeWidth={1} />
                        </div>
                        <h4 className="font-serif text-lg text-emerald-950 mb-2">Secure Packaging</h4>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                            Each piece is carefully packed in a hard-shell box with bubble wrap to ensure zero damage.
                        </p>
                    </div>
                    <div className="px-4">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-emerald-950/5 text-emerald-950 mb-6">
                            <Truck size={28} strokeWidth={1} />
                        </div>
                        <h4 className="font-serif text-lg text-emerald-950 mb-2">Insured Shipping</h4>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                            Full transit insurance. If a package is lost or damaged, we provide an immediate replacement.
                        </p>
                    </div>
                    <div className="px-4">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-emerald-950/5 text-emerald-950 mb-6">
                            <CheckCircle size={28} strokeWidth={1} />
                        </div>
                        <h4 className="font-serif text-lg text-emerald-950 mb-2">Authenticity Check</h4>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                            What you see is what you get. 100% genuine product photos with no heavy editing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </Section>
    </>
  );
};

export default Marketplaces;