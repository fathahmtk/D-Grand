import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { HERO_SLIDES, WHATSAPP_LINK } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={HERO_SLIDES[current].image}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Dark Emerald Overlay */}
          <div className="absolute inset-0 bg-emerald-950/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-5xl">
            <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                 <div className="flex items-center justify-center gap-4 mb-8">
                     <div className="h-px w-8 md:w-16 bg-gold-500/50"></div>
                     <span className="text-gold-400 text-xs md:text-sm font-bold uppercase tracking-[0.3em] font-sans">
                        Wholesale & Retail | Bangalore
                     </span>
                     <div className="h-px w-8 md:w-16 bg-gold-500/50"></div>
                 </div>
                 
                 <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-12 text-white tracking-tight drop-shadow-lg">
                    Timeless Imitation <br/> <span className="text-gold-200">Jewellery Collection</span>
                 </h1>
                 
                 <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <Link to="/collections" className="w-full md:w-auto bg-gold-500 text-emerald-950 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 min-w-[200px] shadow-lg shadow-gold-500/20">
                        View Collections
                      </Link>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full md:w-auto border border-white/30 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-emerald-950 transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] backdrop-blur-sm">
                         <MessageCircle size={16} /> Enquire on WhatsApp
                      </a>
                  </div>
            </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
          <motion.div 
            key={current}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-gold-500"
          />
      </div>
    </section>
  );
};