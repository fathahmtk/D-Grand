import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'cream' | 'dark';
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id, background = 'white' }) => {
  const bgClass = {
    white: 'bg-white',
    cream: 'bg-cream-50',
    dark: 'bg-emerald-950 text-white',
  }[background];

  return (
    <motion.section 
      id={id} 
      className={`py-20 md:py-32 ${bgClass} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12">
        {children}
      </div>
    </motion.section>
  );
};