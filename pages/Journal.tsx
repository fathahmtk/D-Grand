import React from 'react';
import { Section } from '../components/Section';
import { BLOG_POSTS, FALLBACK_IMAGE } from '../constants';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Journal: React.FC = () => {
  return (
    <>
      <div className="bg-emerald-950 text-white pt-32 pb-24 text-center relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 animate-fade-in-up">
            <h1 className="font-display text-6xl md:text-8xl mb-6 uppercase tracking-tighter">Journal</h1>
            <p className="text-gray-400 max-w-lg mx-auto text-sm font-light uppercase tracking-[0.2em]">
                Archives of Style
            </p>
        </div>
      </div>

      <Section background="white">
        <div className="container mx-auto px-4 md:px-6">
            
            {BLOG_POSTS.length > 0 && (
                <Link to={`/journal/${BLOG_POSTS[0].id}`} className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer block border-b border-gray-100 pb-24">
                    <div className="overflow-hidden bg-gray-100 aspect-[16/10]">
                        <img 
                            src={BLOG_POSTS[0].image} 
                            alt={BLOG_POSTS[0].title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                        />
                    </div>
                    <div className="lg:pl-8">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-teal-600 mb-4">
                            <span>{BLOG_POSTS[0].category}</span>
                            <span className="w-px h-3 bg-gray-300"></span>
                            <span>{BLOG_POSTS[0].date}</span>
                        </div>
                        <h2 className="font-display text-4xl lg:text-5xl text-emerald-950 mb-6 leading-none uppercase tracking-tight group-hover:text-teal-600 transition-colors">
                            {BLOG_POSTS[0].title}
                        </h2>
                        <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-lg">
                            {BLOG_POSTS[0].excerpt}
                        </p>
                        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-950 hover:text-teal-600 transition-colors">
                            Read Entry <ArrowRight size={14} />
                        </span>
                    </div>
                </Link>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {BLOG_POSTS.slice(1).map(post => (
                    <Link to={`/journal/${post.id}`} key={post.id} className="group cursor-pointer flex flex-col h-full">
                        <div className="overflow-hidden aspect-[4/3] mb-6 bg-gray-100">
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-400 mb-3">
                            <span className="text-teal-600 font-bold">{post.category}</span>
                            <span className="flex items-center gap-1">{post.date}</span>
                        </div>

                        <h3 className="font-display text-2xl text-emerald-950 mb-3 group-hover:text-teal-600 transition-colors leading-tight uppercase tracking-tight">
                            {post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
      </Section>
    </>
  );
};

export default Journal;