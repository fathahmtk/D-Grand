import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { HERO_SLIDES, WHATSAPP_LINK } from '../constants';

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-emerald-950">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-6 md:px-24 flex items-center">
        <div className="max-w-4xl text-left">
          {HERO_SLIDES.map((slide, index) => {
            if (index !== current) return null;
            return (
              <div key={slide.id} className="animate-fade-in-up">
                 <div className="flex items-center gap-4 mb-6">
                     <div className="h-[2px] w-12 bg-gold-500"></div>
                     <h2 className="text-gold-300 text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] font-sans">
                        {slide.subtitle}
                     </h2>
                 </div>
                 <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-white drop-shadow-lg">
                    {slide.title}
                 </h1>
                 <div className="flex flex-wrap gap-6 mt-10">
                      <Link to={slide.link} className="group relative px-10 py-5 bg-transparent border border-gold-400 text-gold-100 text-xs font-bold uppercase tracking-[0.25em] hover:bg-gold-500 hover:text-emerald-950 hover:border-gold-500 transition-all duration-500 overflow-hidden">
                        <span className="relative z-10">{slide.cta}</span>
                        <div className="absolute inset-0 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      </Link>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-5 text-white/90 text-xs font-bold uppercase tracking-[0.25em] hover:text-gold-400 transition-colors group">
                        <MessageCircle size={18} className="text-gold-400" />
                        <span>Enquire</span>
                      </a>
                  </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-500 ${
              idx === current ? 'w-12 h-1 bg-gold-500' : 'w-2 h-1 bg-white/30 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};