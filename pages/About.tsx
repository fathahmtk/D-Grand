import React from 'react';
import { Section } from '../components/Section';
import { Gem, Handshake, Palette } from 'lucide-react';
import { FALLBACK_IMAGE } from '../constants';

const About: React.FC = () => {
  return (
    <>
      <div className="relative bg-emerald-950 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        <div className="relative z-10 px-4">
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Our Legacy</h1>
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs font-medium">The Story of D GRAND</p>
        </div>
      </div>

      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 leading-relaxed">
               "Jewellery is not just an accessory; it is an emotion, a memory, and a statement of elegance."
             </h2>
             <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="absolute top-4 left-4 w-full h-full border border-gold-500/30 z-0"></div>
              <img 
                 src="https://images.unsplash.com/photo-1576906231649-14a5840d4f47?q=80&w=1000&auto=format&fit=crop" 
                 alt="Jewellery Craft" 
                 className="relative z-10 w-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                 onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
              />
            </div>
            <div className="space-y-6 text-gray-600 font-light leading-loose text-lg">
              <p>
                Founded in the heart of <span className="text-emerald-950 font-medium">Bangalore</span>, D GRAND Jewellery has established itself as a beacon of trust and quality in the world of imitation jewellery. 
              </p>
              <p>
                Located in <span className="text-emerald-950 font-medium">Mamulpete</span>, a historic hub of commerce, we have been serving thousands of retail and wholesale customers with unwavering dedication.
              </p>
              <p>
                Our designs are inspired by traditional Indian artistry, blended with contemporary trends to suit the modern woman. Whether it's a heavy bridal set or a chic office-wear earring, we ensure every piece undergoes rigorous quality checks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-cream-50 p-10 text-center hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <Gem strokeWidth={1} size={32} className="text-gold-500" />
                </div>
                <h4 className="font-serif text-xl mb-3 text-emerald-950">Premium Quality</h4>
                <p className="text-sm text-gray-500 leading-relaxed">High-grade stones and gold plating that stands the test of time.</p>
             </div>
             
             <div className="bg-cream-50 p-10 text-center hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <Handshake strokeWidth={1} size={32} className="text-gold-500" />
                </div>
                <h4 className="font-serif text-xl mb-3 text-emerald-950">Trusted Integrity</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Transparent wholesale pricing and honest business practices.</p>
             </div>

             <div className="bg-cream-50 p-10 text-center hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <Palette strokeWidth={1} size={32} className="text-gold-500" />
                </div>
                <h4 className="font-serif text-xl mb-3 text-emerald-950">Exclusive Design</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Curated collections that blend tradition with modernity.</p>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default About;