import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { Gem, Handshake, Palette, Users, Globe, Trophy } from 'lucide-react';
import { FALLBACK_IMAGE } from '../constants';

const AnimatedCounter = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <>{count.toLocaleString()}+</>;
};

const About: React.FC = () => {
  return (
    <>
      <div className="relative bg-emerald-950 py-32 md:py-48 text-center overflow-hidden">
        <div className="relative z-10 px-4 animate-fade-in-up">
            <span className="inline-block mb-6 text-teal-400 uppercase tracking-[0.3em] text-[10px] font-bold border border-teal-500/30 px-4 py-2">Est. 2018</span>
            <h1 className="font-display text-6xl md:text-8xl text-white mb-6 uppercase tracking-tighter">The Legacy</h1>
            <p className="text-gray-400 max-w-lg mx-auto text-sm font-light leading-relaxed">
                Engineering perfection in imitation jewellery.
            </p>
        </div>
      </div>

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 relative group">
              <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                 <img 
                    src="https://images.unsplash.com/photo-1576906231649-14a5840d4f47?q=80&w=1000&auto=format&fit=crop" 
                    alt="Jewellery Craft" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                 />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="font-display text-4xl md:text-5xl text-emerald-950 leading-none">
                CRAFTING <br/> <span className="text-teal-600">DISTINCTION</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 font-light leading-loose text-sm text-justify">
                <p>
                  Founded in <span className="text-emerald-950 font-bold">Bangalore</span>, D GRAND Jewellery engineers the bridge between royal heritage and modern accessibility. From a boutique in Mamulpete to a pan-India brand.
                </p>
                <p>
                  We treat jewellery not as ornamentation, but as architecture for the body. Our 'Nakshi' work and contemporary cuts are precision-crafted to mimic the weight and brilliance of real gold.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                 <p className="font-display text-xl text-emerald-950">D GRAND Team</p>
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Founders & Curators</p>
              </div>
            </div>
          </div>

          {/* Stats Section - Industrial Grid */}
          <div className="bg-emerald-950 p-0 mb-24 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10">
              {[
                  { icon: Users, val: 5000, label: "Clients" },
                  { icon: Trophy, val: 500, label: "Designs" },
                  { icon: Globe, val: 15, label: "Regions" }
              ].map((stat, i) => (
                  <div key={i} className="p-12 text-center group hover:bg-white/5 transition-colors">
                      <div className="flex justify-center mb-6 text-teal-500">
                          <stat.icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-5xl mb-2 text-white">
                        <AnimatedCounter end={stat.val} duration={2000} />
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{stat.label}</p>
                  </div>
              ))}
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
             {[
                { icon: Gem, title: "Precision", desc: "High-grade copper alloys & 1gm gold plating." },
                { icon: Handshake, title: "Integrity", desc: "Transparent wholesale pricing & relationships." },
                { icon: Palette, title: "Innovation", desc: "Traditional motifs meets modern engineering." }
             ].map((item, i) => (
                 <div key={i} className="bg-gray-50 p-12 text-center hover:bg-emerald-950 hover:text-white transition-colors duration-500 group">
                    <div className="w-12 h-12 border border-gray-200 group-hover:border-white/20 flex items-center justify-center mx-auto mb-6">
                      <item.icon strokeWidth={1.5} size={20} />
                    </div>
                    <h4 className="font-display text-xl mb-3">{item.title}</h4>
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 leading-relaxed font-light">{item.desc}</p>
                 </div>
             ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default About;