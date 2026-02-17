import React, { ReactNode } from 'react';

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
    <section id={id} className={`py-16 md:py-24 ${bgClass} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};