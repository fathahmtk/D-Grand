import React from 'react';
import { Section } from '../components/Section';
import { Gem, Handshake, Palette, Users, Globe, Trophy } from 'lucide-react';
import { FALLBACK_IMAGE } from '../constants';

const About: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-emerald-950 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        {/* Abstract Gold Line */}
        <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold-500"></div>
        
        <div className="relative z-10 px-4 animate-fade-in-up">
            <span className="inline-block mb-4 text-gold-400 uppercase tracking-[0.3em] text-[10px] font-bold border border-gold-500/20 px-4 py-2 rounded-full">Since 2018</span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">Crafting Legacy</h1>
            <p className="text-emerald-100/60 max-w-lg mx-auto text-sm font-light leading-relaxed">
                Where traditional artistry meets modern sophistication.
            </p>
        </div>
      </div>

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          
          {/* Brand Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gold-500/20 z-0 rounded-sm"></div>
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-sm shadow-2xl group">
                 <img 
                    src="https://images.unsplash.com/photo-1576906231649-14a5840d4f47?q=80&w=1000&auto=format&fit=crop" 
                    alt="Jewellery Craft" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                    onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                 />
                 <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply"></div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="font-serif text-4xl text-emerald-950 leading-tight">
                "Jewellery is an emotion, <br/>
                <span className="italic text-gold-600">a memory,</span> and a statement."
              </h2>
              <div className="w-20 h-1 bg-emerald-950"></div>
              
              <div className="space-y-6 text-gray-600 font-light leading-loose text-sm md:text-base text-justify">
                <p>
                  Founded in the vibrant heart of <span className="text-emerald-950 font-bold">Bangalore</span>, D GRAND Jewellery began with a simple vision: to make the grandeur of royal heritage accessible to everyone. What started as a small boutique in Mamulpete has blossomed into a trusted name for premium imitation jewellery across India.
                </p>
                <p>
                  We believe that every piece of jewellery tells a story. Whether it is the intricate 'Nakshi' work of our temple collections or the contemporary sparkle of our AD stones, our designs are curated to celebrate the diverse beauty of Indian culture.
                </p>
                <p>
                   Today, we serve thousands of retail customers and support hundreds of wholesale partners, ensuring that the legacy of fine craftsmanship continues to thrive.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-6">
                 <p className="font-serif text-2xl text-emerald-950">D GRAND Team</p>
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Founders & Curators</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-emerald-950 rounded-sm p-12 mb-24 relative overflow-hidden text-white">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800">
                  <div className="p-4">
                      <div className="flex justify-center mb-4 text-gold-400">
                          <Users size={32} strokeWidth={1} />
                      </div>
                      <h3 className="font-serif text-4xl mb-2">5,000+</h3>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200">Happy Customers</p>
                  </div>
                  <div className="p-4">
                      <div className="flex justify-center mb-4 text-gold-400">
                          <Trophy size={32} strokeWidth={1} />
                      </div>
                      <h3 className="font-serif text-4xl mb-2">500+</h3>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200">Unique Designs</p>
                  </div>
                  <div className="p-4">
                      <div className="flex justify-center mb-4 text-gold-400">
                          <Globe size={32} strokeWidth={1} />
                      </div>
                      <h3 className="font-serif text-4xl mb-2">15+</h3>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200">States Served</p>
                  </div>
              </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-16">
             <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">Our Principles</span>
             <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mt-3">Why Choose D GRAND?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-cream-50 p-10 text-center hover:-translate-y-2 transition-transform duration-300 group rounded-sm border border-transparent hover:border-gold-500/20 hover:shadow-xl hover:bg-white">
                <div className="w-16 h-16 bg-white group-hover:bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-colors duration-300">
                  <Gem strokeWidth={1.5} size={28} className="text-gold-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-serif text-xl mb-3 text-emerald-950">Premium Quality</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light">We use high-grade copper alloys and 1gm gold plating to ensure our jewellery looks and feels like the real thing.</p>
             </div>
             
             <div className="bg-cream-50 p-10 text-center hover:-translate-y-2 transition-transform duration-300 group rounded-sm border border-transparent hover:border-gold-500/20 hover:shadow-xl hover:bg-white">
                <div className="w-16 h-16 bg-white group-hover:bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-colors duration-300">
                  <Handshake strokeWidth={1.5} size={28} className="text-gold-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-serif text-xl mb-3 text-emerald-950">Trusted Integrity</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light">Transparency is key. Our wholesale pricing is fair, and we build long-term relationships based on trust.</p>
             </div>

             <div className="bg-cream-50 p-10 text-center hover:-translate-y-2 transition-transform duration-300 group rounded-sm border border-transparent hover:border-gold-500/20 hover:shadow-xl hover:bg-white">
                <div className="w-16 h-16 bg-white group-hover:bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-colors duration-300">
                  <Palette strokeWidth={1.5} size={28} className="text-gold-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-serif text-xl mb-3 text-emerald-950">Exclusive Design</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light">Our collections are curated to blend traditional motifs with modern aesthetics, ensuring you stand out.</p>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default About;