import React from 'react';
import { Section } from '../components/Section';
import { BLOG_POSTS, FALLBACK_IMAGE } from '../constants';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Journal: React.FC = () => {
  return (
    <>
      {/* Editorial Hero */}
      <div className="bg-emerald-950 text-white pt-32 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <div className="relative z-10 container mx-auto px-6">
            <h1 className="font-serif text-6xl md:text-8xl mb-6 opacity-90 animate-fade-in-up">The Journal</h1>
            <p className="text-emerald-100/60 max-w-lg mx-auto text-sm font-light uppercase tracking-[0.2em] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Stories of Style, Tradition & Craftsmanship
            </p>
        </div>
      </div>

      <Section background="cream">
        <div className="container mx-auto px-4 md:px-6">
            
            {/* Featured Article - First Item */}
            {BLOG_POSTS.length > 0 && (
                <Link to={`/journal/${BLOG_POSTS[0].id}`} className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer block">
                    <div className="overflow-hidden rounded-sm shadow-xl aspect-[16/10]">
                        <img 
                            src={BLOG_POSTS[0].image} 
                            alt={BLOG_POSTS[0].title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                        />
                    </div>
                    <div className="lg:pl-8">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gold-600 mb-4">
                            <span>{BLOG_POSTS[0].category}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{BLOG_POSTS[0].date}</span>
                        </div>
                        <h2 className="font-serif text-4xl lg:text-5xl text-emerald-950 mb-6 leading-tight group-hover:text-gold-600 transition-colors">
                            {BLOG_POSTS[0].title}
                        </h2>
                        <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-lg">
                            {BLOG_POSTS[0].excerpt}
                        </p>
                        <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-950 hover:text-gold-600 transition-colors">
                            Read Article <ArrowRight size={14} />
                        </button>
                    </div>
                </Link>
            )}

            {/* Grid for remaining articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {BLOG_POSTS.slice(1).map(post => (
                    <Link to={`/journal/${post.id}`} key={post.id} className="group cursor-pointer flex flex-col h-full">
                        <div className="overflow-hidden aspect-[4/3] mb-6 rounded-sm relative">
                            <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                                onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-400 mb-3">
                            <span className="text-gold-600 font-bold">{post.category}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span className="flex items-center gap-1"><Clock size={10} /> {post.date}</span>
                        </div>

                        <h3 className="font-serif text-2xl text-emerald-950 mb-3 group-hover:text-gold-600 transition-colors leading-snug">
                            {post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-100">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-950 group-hover:text-gold-600 transition-colors">Read More</span>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="mt-24 flex justify-center">
                <button className="px-8 py-3 border border-emerald-950/10 text-emerald-950 text-xs uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all">
                    Load More Stories
                </button>
            </div>
        </div>
      </Section>
    </>
  );
};

export default Journal;