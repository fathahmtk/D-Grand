import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { BLOG_POSTS, FALLBACK_IMAGE } from '../constants';
import { Clock, Share2, ArrowLeft, ArrowRight, Facebook, Twitter, Linkedin } from 'lucide-react';

const JournalPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = BLOG_POSTS.find(p => p.id === id);
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  // Scroll Progress Bar
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
        <div className="h-screen flex flex-col items-center justify-center bg-cream-50">
            <h2 className="font-serif text-3xl text-emerald-950 mb-4">Article Not Found</h2>
            <button onClick={() => navigate('/journal')} className="px-8 py-3 bg-emerald-950 text-white uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-emerald-950 transition-all">Back to Journal</button>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gold-500 z-[70] transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Hero Image */}
      <div className="h-[60vh] md:h-[70vh] relative overflow-hidden">
         <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
         />
         <div className="absolute inset-0 bg-emerald-950/40"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-center">
            <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-1 bg-gold-500 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4">
                    {post.category}
                </span>
                <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 leading-tight max-w-4xl mx-auto">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-6 text-gray-300 text-xs uppercase tracking-widest">
                    <span>By D GRAND Editorial</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span className="flex items-center gap-2"><Clock size={12} /> {post.date}</span>
                </div>
            </div>
         </div>
      </div>

      <Section background="white">
         <div className="max-w-4xl mx-auto px-4 relative">
             
             {/* Back Button */}
             <div className="absolute -top-6 left-4 hidden md:block">
                 <button onClick={() => navigate('/journal')} className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-emerald-950 transition-colors">
                     <ArrowLeft size={14} /> Back
                 </button>
             </div>

             {/* Content */}
             <div className="grid grid-cols-1 md:grid-cols-[1fr_60px] gap-12">
                 <article className="prose prose-lg prose-emerald text-gray-600 font-light leading-loose">
                     <p className="font-serif text-2xl text-emerald-950 leading-relaxed mb-8 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-6px]">
                         {post.excerpt}
                     </p>
                     
                     <div className="w-24 h-[2px] bg-gold-500 mb-10"></div>

                     {post.content.map((paragraph, idx) => (
                         <p key={idx} className="mb-6">{paragraph}</p>
                     ))}
                     
                     <div className="mt-12 p-8 bg-cream-50 border-l-4 border-gold-500">
                         <p className="font-serif text-xl italic text-emerald-950 mb-4">"Jewellery is the most transformative thing you can wear."</p>
                         <p className="text-xs uppercase tracking-widest text-gray-500">— Iris Apfel</p>
                     </div>
                 </article>

                 {/* Sticky Share Sidebar */}
                 <div className="hidden md:flex flex-col gap-6 sticky top-32 h-fit">
                     <p className="text-[10px] uppercase tracking-widest text-gray-400 [writing-mode:vertical-lr] rotate-180">Share Story</p>
                     <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"><Facebook size={16}/></button>
                     <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all"><Twitter size={16}/></button>
                     <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-blue-800 hover:text-white hover:border-blue-800 transition-all"><Linkedin size={16}/></button>
                     <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-emerald-950 hover:text-white hover:border-emerald-950 transition-all"><Share2 size={16}/></button>
                 </div>
             </div>
         </div>
      </Section>

      {/* Related Stories */}
      <div className="bg-cream-50 py-24 border-t border-cream-200">
         <div className="container mx-auto px-6">
            <h3 className="font-serif text-3xl text-emerald-950 mb-12 text-center">Related Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relPost => (
                    <Link to={`/journal/${relPost.id}`} key={relPost.id} onClick={() => window.scrollTo(0,0)} className="group cursor-pointer">
                        <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
                            <img src={relPost.image} alt={relPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => e.currentTarget.src = FALLBACK_IMAGE} />
                        </div>
                        <p className="text-[9px] uppercase tracking-widest text-gold-600 mb-2">{relPost.category}</p>
                        <h4 className="font-serif text-xl text-emerald-950 mb-2 group-hover:text-gold-600 transition-colors">{relPost.title}</h4>
                    </Link>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default JournalPost;