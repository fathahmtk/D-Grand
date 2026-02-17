import React from 'react';
import { ProductCarousel } from '../components/ProductCarousel';
import { Testimonials } from '../components/Testimonials';
import { PRODUCTS, BLOG_POSTS, INSTAGRAM_IMAGES, TESTIMONIALS, CATEGORY_IMAGES, HERO_SLIDES, FALLBACK_IMAGE } from '../constants';
import { ArrowRight, Gem, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const trendingProducts = PRODUCTS.slice(0, 6);
  // Dynamically select products for the "Shop The Look" section (Emerald collection)
  // Using indices 1 (Emerald Choker) and 2 (Temple Jhumkas) from the constant array
  const featuredLookProducts = [PRODUCTS[1], PRODUCTS[2]];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="overflow-hidden">
      
      {/* 1. HERO SECTION - Strictly Left Aligned with 60px Padding */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-emerald-950 flex items-center pl-6 md:pl-[60px]">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
            <img 
                src={HERO_SLIDES[0].image} 
                alt="D GRAND Jewellery Hero" 
                className="w-full h-full object-cover"
                onError={handleImageError}
            />
        </div>
        
        {/* Overlays for luxury feel & readability - Adjusted for richer background */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/40 to-transparent"></div>
        
        {/* Content Container - No 'container' class, strictly padded */}
        <div className="relative z-10 max-w-5xl text-white animate-fade-in-up text-left pt-20">
              
              {/* Subheading */}
              <div className="flex items-center gap-6 mb-8">
                 <div className="h-[1px] w-16 bg-gold-400/80"></div>
                 <h2 className="text-gold-300 text-xs md:text-sm font-bold uppercase tracking-[0.35em] drop-shadow-sm font-sans">
                    Premium Imitation Jewellery | Wholesale & Retail
                 </h2>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 text-white drop-shadow-2xl">
                <span className="block font-light tracking-wide">Elegant Artificial</span>
                <span className="block italic font-normal text-cream-50">Jewellery Collection</span>
              </h1>
              
              <div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-[fadeInUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]">
                  <Link to="/collections" className="bg-white text-emerald-950 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-gold-500 hover:text-white transition-all duration-300 border border-white">
                    Shop Now
                  </Link>
                  <Link to="/wholesale" className="bg-transparent border border-white/30 text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-emerald-950 transition-all duration-300 backdrop-blur-sm">
                    Wholesale
                  </Link>
              </div>
        </div>
      </section>

      {/* 2. EDITORIAL CATEGORIES */}
      <section className="bg-cream-50 py-32">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                 <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">Collections</span>
                 <h2 className="font-serif text-4xl text-emerald-950 mt-3">Shop By Category</h2>
              </div>
              <Link to="/collections" className="text-emerald-950 text-xs uppercase tracking-[0.2em] border-b border-emerald-950/30 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors flex items-center gap-2">
                 View All Categories <ArrowRight size={14} />
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORY_IMAGES.map((cat, idx) => (
                <Link to="/collections" key={idx} className="group relative h-[500px] overflow-hidden rounded-sm">
                   <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    onError={handleImageError}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                   
                   <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-3xl text-white mb-2">{cat.name}</h3>
                      <p className="text-white/70 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                         Explore our latest designs tailored for the modern woman.
                      </p>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* 3. SHOP THE LOOK - New Feature */}
      <section className="bg-white py-32 border-t border-cream-200 overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="relative order-2 lg:order-1">
                  <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
                     <img 
                        src="https://images.unsplash.com/photo-1616036740257-9449ea1f6605?q=80&w=1000&auto=format&fit=crop" 
                        alt="Model wearing collection" 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                     />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cream-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
               </div>

               <div className="order-1 lg:order-2 space-y-8">
                   <div>
                       <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">Featured Look</span>
                       <h2 className="font-serif text-5xl text-emerald-950 mt-4 leading-tight">The Emerald <br/><span className="italic text-gold-500">Goddess</span> Edit</h2>
                   </div>
                   <p className="text-gray-500 font-light leading-relaxed max-w-md">
                       Embrace the allure of green. This curated look combines our signature emerald choker with matching teardrop earrings, creating a sophisticated ensemble perfect for evening soirees.
                   </p>
                   
                   <div className="space-y-4 border-t border-gray-100 pt-8">
                       {/* Dynamic Links to Product Details */}
                       {featuredLookProducts.map(product => (
                         <Link key={product.id} to={`/product/${product.id}`} className="flex items-center gap-6 p-4 border border-transparent hover:border-gray-100 rounded-lg transition-all cursor-pointer group">
                             <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-16 h-16 object-cover rounded-md" 
                                onError={handleImageError}
                             />
                             <div className="flex-grow">
                                 <h4 className="font-serif text-emerald-950 group-hover:text-gold-600 transition-colors">{product.name}</h4>
                                 <p className="text-sm text-gray-400">{product.price}</p>
                             </div>
                             <ChevronRight size={18} className="text-gray-300 group-hover:text-gold-500" />
                         </Link>
                       ))}
                   </div>

                   <div className="pt-4">
                        <Link to="/collections" className="inline-block bg-emerald-950 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-emerald-950 transition-colors">
                            Shop The Look
                        </Link>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. CURATED SELECTION - Carousel */}
      <section className="bg-emerald-950 py-32 relative">
         <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-white">Curated Selection</h2>
                  <p className="text-emerald-200/50 mt-2 font-light text-sm">Handpicked favorites for the season.</p>
               </div>
               <Link to="/collections" className="text-gold-400 text-xs uppercase tracking-[0.2em] border-b border-gold-400/30 pb-1 hover:text-white hover:border-white transition-colors">View All Products</Link>
            </div>
            <ProductCarousel products={trendingProducts} />
         </div>
      </section>

      {/* 5. QUALITY PROMISE */}
      <section className="bg-cream-50 py-24 border-b border-cream-200">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
                  <div className="px-4 py-4">
                      <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-gold-500 mb-6 shadow-sm">
                          <Gem size={24} strokeWidth={1} />
                      </div>
                      <h4 className="font-serif text-xl text-emerald-950 mb-3">Premium Quality</h4>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">Crafted with high-grade materials that mimic the brilliance of real gold and diamonds.</p>
                  </div>
                  <div className="px-4 py-4">
                      <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-gold-500 mb-6 shadow-sm">
                          <ShieldCheck size={24} strokeWidth={1} />
                      </div>
                      <h4 className="font-serif text-xl text-emerald-950 mb-3">Skin Friendly</h4>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">Nickel-free and lead-free plating ensures comfort for sensitive skin types.</p>
                  </div>
                  <div className="px-4 py-4">
                      <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-gold-500 mb-6 shadow-sm">
                          <Gem size={24} strokeWidth={1} /> 
                      </div>
                      <h4 className="font-serif text-xl text-emerald-950 mb-3">Artisan Crafted</h4>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">Designed by skilled artisans combining traditional techniques with modern aesthetics.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 6. WHOLESALE BANNER */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6">
            <div className="relative bg-emerald-900 rounded-sm overflow-hidden shadow-2xl">
               <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-12 lg:p-20 flex flex-col justify-center order-2 lg:order-1 relative z-10">
                     <span className="text-gold-400 text-[10px] uppercase tracking-[0.25em] font-bold mb-4">Business Partnership</span>
                     <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-tight">Grow Your Business With Us</h2>
                     <p className="text-emerald-100/70 font-light leading-relaxed mb-10 max-w-md">
                        Join our network of retailers. We provide premium quality imitation jewellery at factory-direct wholesale prices.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/wholesale" className="bg-gold-500 text-emerald-950 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-center hover:bg-white transition-colors">
                           Apply for Wholesale
                        </Link>
                     </div>
                  </div>
                  <div className="relative h-80 lg:h-auto order-1 lg:order-2">
                     <img 
                        src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000&auto=format&fit=crop" 
                        alt="Wholesale Jewellery" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        onError={handleImageError}
                     />
                     <div className="absolute inset-0 bg-gradient-to-l from-emerald-900 via-emerald-900/50 to-transparent"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-cream-50 py-24 border-t border-cream-100">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <span className="text-gold-600 text-[10px] uppercase tracking-[0.25em] font-bold">Testimonials</span>
              <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mt-3">What Our Customers Say</h2>
           </div>
           
           <Testimonials testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* 8. JOURNAL */}
      <section className="py-24 bg-white border-t border-cream-200">
         <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
               <h2 className="font-serif text-3xl md:text-4xl text-emerald-950">The Journal</h2>
               <div className="hidden md:block w-32 h-px bg-emerald-950/10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
               {BLOG_POSTS.map(post => (
                  <div key={post.id} className="group cursor-pointer">
                     <div className="overflow-hidden aspect-[4/3] mb-6 rounded-sm">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                            onError={handleImageError}
                        />
                     </div>
                     <p className="text-[10px] uppercase tracking-[0.2em] text-gold-600 mb-2">{post.category}</p>
                     <h3 className="font-serif text-xl text-emerald-950 mb-3 group-hover:text-gold-600 transition-colors">{post.title}</h3>
                     <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 9. INSTAGRAM */}
      <section className="bg-cream-50 py-20 border-t border-cream-200">
         <div className="container mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="font-serif text-2xl text-emerald-950">@dgrandjewellery</h2>
               <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Follow us for daily inspiration</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
               {INSTAGRAM_IMAGES.map((img, idx) => (
                  <a href="#" key={idx} className="block relative group overflow-hidden aspect-square">
                     <img 
                        src={img} 
                        alt="Instagram" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        onError={handleImageError}
                     />
                     <div className="absolute inset-0 bg-emerald-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <InstagramIcon />
                     </div>
                  </a>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

// Simple Icon component for the Insta section
const InstagramIcon = () => (
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

export default Home;