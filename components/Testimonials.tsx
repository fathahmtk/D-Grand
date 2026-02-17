import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials.map((testimonial) => (
        <div 
          key={testimonial.id} 
          className="bg-cream-50 p-8 rounded-sm relative group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold-500/20"
        >
          <Quote className="absolute top-6 right-6 text-gold-200 fill-current w-12 h-12 opacity-50 group-hover:text-gold-100 transition-colors" />
          
          <div className="flex gap-1 mb-6 text-gold-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < testimonial.rating ? "currentColor" : "none"} 
                className={i < testimonial.rating ? "" : "text-gray-300"}
              />
            ))}
          </div>

          <p className="text-gray-600 italic font-light leading-relaxed mb-6 relative z-10">
            "{testimonial.comment}"
          </p>

          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-emerald-950 rounded-full flex items-center justify-center text-white font-serif text-sm">
                {testimonial.name.charAt(0)}
             </div>
             <div>
                <h4 className="font-serif text-emerald-950 text-sm font-bold">{testimonial.name}</h4>
                <p className="text-[10px] uppercase tracking-wider text-gray-400">{testimonial.location}</p>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};