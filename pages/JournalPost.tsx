import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { BLOG_POSTS, FALLBACK_IMAGE } from '../constants';
import { Clock, Share2, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

const JournalPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = BLOG_POSTS.find(p => p.id === id);
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <h2 className="font-display text-3xl text-emerald-950 mb-4">404</h2>
            <button onClick={() => navigate('/journal')} className="px-8 py-3 bg-emerald-950 text-white uppercase tracking-widest text-xs hover:bg-teal-600 transition-all">Back to Journal</button>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="fixed top-0 left-0 h-1 bg-teal-500 z-[70] transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }}></div>

      <div className="h-[60vh] relative overflow-hidden bg-emerald-950">
         <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-60"
            onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-center">
            <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-1 border border-teal-500/50 text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    {post.category}
                </span>
                <h1 className="font-display text-4xl md:text-6xl text-white mb-6 leading-none uppercase tracking-tight max-w-4xl mx-auto">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-6 text-gray-400 text-xs uppercase tracking-widest">
                    <span>{post.date}</span>
                </div>
            </div>
         </div>
      </div>

      <Section background="white">
         <div className="max-w-4xl mx-auto px-4 relative">
             <div className="absolute -top-6 left-4 hidden md:block">
                 <button onClick={() => navigate('/journal')} className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-emerald-950 transition-colors">
                     <ArrowLeft size={14} /> Back
                 </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-[1fr_60px] gap-12">
                 <article className="prose prose-lg text-gray-800 font-light leading-loose">
                     <p className="font-display text-2xl text-emerald-950 leading-relaxed mb-8 border-l-2 border-teal-500 pl-6">
                         {post.excerpt}
                     </p>
                     
                     <div className="w-full h-px bg-gray-100 mb-10"></div>

                     {post.content.map((paragraph, idx) => (
                         <p key={idx} className="mb-6">{paragraph}</p>
                     ))}
                 </article>

                 <div className="hidden md:flex flex-col gap-6 sticky top-32 h-fit">
                     <p className="text-[10px] uppercase tracking-widest text-gray-400 [writing-mode:vertical-lr] rotate-180">Share</p>
                     <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-emerald-950 hover:text-white hover:border-emerald-950 transition-all"><Share2 size={16}/></button>
                 </div>
             </div>
         </div>
      </Section>
    </div>
  );
};

export default JournalPost;