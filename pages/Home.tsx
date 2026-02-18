import React from 'react';
import { ProductCarousel } from '../components/ProductCarousel';
import { HeroSlider } from '../components/HeroSlider';
import { Section } from '../components/Section';
import { PRODUCTS, BLOG_POSTS, INSTAGRAM_IMAGES, CATEGORY_IMAGES, FALLBACK_IMAGE } from '../constants';
import { ArrowRight, Gem, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstagramIcon = () => (
   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Home: React.FC = () => {
  const trendingProducts = PRODUCTS.slice(0, 6);
  const featuredLookProducts = [PRODUCTS[1], PRODUCTS[2]];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="overflow-hidden bg-cream-50">
      
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. CATEGORIES - Responsive Square Grid */}
      <Section className="">
           <div className="text-center mb-16">
              <span className="text-gold-600 text-[10px] uppercase tracking-[0.3em] font-bold">Discover</span>
              <h2 className="font-display text-4xl md:text-5xl text-emerald-950 mt-2">Our Collections</h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 md:px-0">
              {CATEGORY_IMAGES.map((cat, idx) => (
                <Link 
                    to="/collections" 
                    key={idx} 
                    className="group relative block aspect-square overflow-hidden cursor-pointer bg-gray-100 border border-transparent hover:border-gold-500 transition-all duration-500"
                >
                   <img 
                    src={cat.img} 
                    alt={cat.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" 
                    onError={handleImageError}
                   />
                   
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/10 transition-colors duration-500"></div>
                   
                   {/* Content - Centered with Glass effect */}
                   <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 min-w-[100px] text-center shadow-xl border border-emerald-950/10">
                        <h3 className="font-display text-xs md:text-sm text-emerald-950 uppercase tracking-widest font-bold whitespace-nowrap">{cat.name}</h3>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
           
           <div className="flex justify-center mt-12">
               <Link to="/collections" className="text-emerald-950 text-xs font-bold uppercase tracking-[0.2em] hover:text-gold-600 transition-colors flex items-center gap-2 group border-b border-emerald-950 pb-1 hover:border-gold-600">
                 View All Categories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
      </Section>

      {/* 3. FEATURED LOOK - Architectural Layout */}
      <section className="bg-emerald-950 text-white py-0 overflow-hidden">
         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
             <div className="relative h-[60vh] lg:h-auto overflow-hidden group">
                 <img 
                    src="https://images.unsplash.com/photo-1616036740257-9449ea1f6605?q=80&w=1200&auto=format&fit=crop" 
                    alt="Editorial Model" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-emerald-950/20"></div>
             </div>
             
             <div className="flex flex-col justify-center p-12 lg:p-24 relative">
                 <div className="absolute top-0 left-0 w-full h-px bg-white/10 lg:hidden"></div>
                 <span className="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">The Edit</span>
                 <h2 className="font-display text-5xl lg:text-7xl mb-8 leading-[0.9]">Emerald <br/><span className="text-teal-500">Goddess</span></h2>
                 
                 <p className="text-emerald-100/70 font-light leading-relaxed mb-12 max-w-md">
                     A curation of deep green hues and architectural gold structures. Designed for the modern matriarch.
                 </p>

                 <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-8">
                     {featuredLookProducts.map(product => (
                         <Link key={product.id} to={`/product/${product.id}`} className="flex items-center gap-6 group">
                             <div className="w-16 h-16 bg-white/5 overflow-hidden">
                                <img src={product.image} className="w-full h-full object-cover" alt={product.name} loading="lazy" />
                             </div>
                             <div className="flex-grow">
                                 <h4 className="font-display text-lg group-hover:text-gold-400 transition-colors">{product.name}</h4>
                                 <p className="text-xs text-teal-400">{product.price}</p>
                             </div>
                             <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-950 transition-all">
                                 <ArrowRight size={14} />
                             </div>
                         </Link>
                     ))}
                 </div>
             </div>
         </div>
      </section>

      {/* 4. CURATED CAROUSEL */}
      <Section background="cream">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
               <h2 className="font-display text-4xl text-emerald-950">Curated Selection</h2>
               <p className="text-gray-500 mt-2 font-light text-sm">Handpicked favorites for the season.</p>
            </div>
            <Link to="/collections" className="text-gold-600 text-xs font-bold uppercase tracking-[0.2em] border-b border-gold-600/30 pb-1 hover:text-emerald-950 hover:border-emerald-950 transition-colors">View All Products</Link>
         </div>
         <ProductCarousel products={trendingProducts} />
      </Section>

      {/* 5. QUALITY GRID */}
      <section className="bg-white border-y border-emerald-950/5">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-950/5">
              {[
                { icon: <Gem size={20} />, title: "Premium Quality", desc: "High-grade materials mimicking real gold brilliance." },
                { icon: <ShieldCheck size={20} />, title: "Skin Friendly", desc: "Nickel-free plating for comfort and safety." },
                { icon: <Gem size={20} />, title: "Artisan Crafted", desc: "Handcrafted by skilled traditional artisans." }
              ].map((item, i) => (
                  <div key={i} className="p-12 md:p-16 flex flex-col items-center text-center hover:bg-cream-50 transition-colors duration-500">
                      <div className="text-gold-500 mb-6">{item.icon}</div>
                      <h4 className="font-display text-lg text-emerald-950 mb-3">{item.title}</h4>
                      <p className="text-gray-500 text-xs font-light leading-relaxed max-w-xs">{item.desc}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* 6. WHOLESALE CTA */}
      <Section background="dark" className="relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <span className="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">B2B Partnership</span>
                <h2 className="font-display text-4xl md:text-6xl mb-6 text-white leading-tight">Scale Your <br/>Business</h2>
                <p className="text-emerald-100/70 font-light leading-relaxed mb-10 max-w-md">
                   Join our network of retailers. We provide premium quality imitation jewellery at factory-direct wholesale prices.
                </p>
                <Link to="/wholesale" className="inline-block bg-white text-emerald-950 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-500 transition-colors">
                   Apply for Wholesale
                </Link>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <img 
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" 
                    className="w-full aspect-square object-cover opacity-80" 
                    alt="Bangles" 
                    loading="lazy"
                 />
                 <div className="w-full aspect-square bg-white/5 border border-white/10 flex items-center justify-center p-8 text-center">
                    <div>
                        <span className="block text-4xl font-display text-gold-400 mb-2">500+</span>
                        <span className="text-[10px] uppercase tracking-widest text-emerald-200">Retail Partners</span>
                    </div>
                 </div>
             </div>
         </div>
      </Section>

      {/* 7. JOURNAL PREVIEW */}
      <Section background="cream">
         <div className="flex justify-between items-end mb-16">
             <h2 className="font-display text-4xl text-emerald-950">The Journal</h2>
             <Link to="/journal" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gold-600 transition-colors">
                 Read All Stories <ArrowRight size={14} />
             </Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map(post => (
               <Link to={`/journal/${post.id}`} key={post.id} className="group cursor-pointer block">
                  <div className="overflow-hidden aspect-[4/3] mb-6 relative bg-gray-100">
                     <div className="absolute inset-0 bg-emerald-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                     <img 
                         src={post.image} 
                         alt={post.title} 
                         loading="lazy"
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                         onError={handleImageError}
                     />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-600">{post.category}</span>
                      <span className="w-8 h-px bg-gray-300"></span>
                      <span className="text-[10px] text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="font-display text-xl text-emerald-950 mb-3 group-hover:text-gold-600 transition-colors leading-snug">{post.title}</h3>
               </Link>
            ))}
         </div>
      </Section>

      {/* 8. INSTAGRAM FEED */}
      <div className="bg-white py-0 border-t border-emerald-950/5">
         <div className="grid grid-cols-2 md:grid-cols-5">
             {INSTAGRAM_IMAGES.map((img, idx) => (
                <div key={idx} className="relative group aspect-square overflow-hidden cursor-pointer bg-gray-100">
                    <img 
                       src={img} 
                       alt="Insta Feed" 
                       loading="lazy"
                       className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
                       onError={handleImageError}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                        <div className="text-white">
                            <InstagramIcon />
                        </div>
                    </div>
                </div>
             ))}
         </div>
         <div className="bg-emerald-950 text-white py-12 text-center">
             <h3 className="font-display text-2xl mb-2">@dgrandjewellery</h3>
             <p className="text-emerald-100/50 text-[10px] uppercase tracking-widest mb-6">Follow the journey</p>
             <a href="#" className="inline-block border border-white/20 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-emerald-950 transition-colors">Follow Us</a>
         </div>
      </div>
    </div>
  );
};

export default Home;