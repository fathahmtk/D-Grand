import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'default' | 'small';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light', size = 'default' }) => {
  const textColor = variant === 'light' ? '#D4AF37' : '#0F3B2E';
  const dividerColor = variant === 'light' ? '#D4AF37' : '#9CA3AF';
  
  const iconSize = size === 'small' ? "40" : "54";
  const titleSize = size === 'small' ? "text-lg" : "text-xl md:text-2xl";
  const subtitleSize = size === 'small' ? "text-[0.5rem]" : "text-[0.6rem]";

  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-300 ${className}`}>
        {/* Logo Icon */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-1 transition-all duration-300"
        >
           <defs>
             <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#FDE68A" /> {/* Light Gold */}
               <stop offset="50%" stopColor="#D4AF37" /> {/* Standard Gold */}
               <stop offset="100%" stopColor="#B45309" /> {/* Bronze/Dark Gold */}
             </linearGradient>
             <linearGradient id="logoGreen" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" /> {/* Emerald 500 */}
                <stop offset="100%" stopColor="#064E3B" /> {/* Emerald 900 */}
             </linearGradient>
           </defs>

           {/* Green Accent (Inner Swoosh) */}
           <path 
             d="M 29 66 Q 26 52 40 40" 
             stroke="url(#logoGreen)" 
             strokeWidth="3.5" 
             strokeLinecap="round"
             className="opacity-90"
           />

           {/* Ring Band (Gold) */}
           {/* Arc from left to right going down, open at top */}
           <path 
             d="M 30 42 A 28 28 0 1 0 70 42" 
             stroke="url(#logoGold)" 
             strokeWidth="3.5" 
             strokeLinecap="round"
             fill="none"
           />

           {/* Diamond (Gold) */}
           <g transform="translate(0, -2)">
              {/* Top Table */}
              <path d="M 40 20 L 60 20" stroke="url(#logoGold)" strokeWidth="2" strokeLinecap="round" />
              {/* Outline */}
              <path 
                d="M 40 20 L 32 30 L 50 50 L 68 30 L 60 20" 
                stroke="url(#logoGold)" 
                strokeWidth="2" 
                strokeLinejoin="round"
                fill="none" 
              />
              {/* Inner Facets */}
              <path d="M 32 30 L 68 30" stroke="url(#logoGold)" strokeWidth="1" />
              <path d="M 40 20 L 50 30 L 60 20" stroke="url(#logoGold)" strokeWidth="1" />
              <path d="M 50 50 L 50 30" stroke="url(#logoGold)" strokeWidth="1" />
           </g>

        </svg>

      <div className="flex flex-col items-center">
        <span className={`font-serif tracking-[0.15em] font-bold uppercase whitespace-nowrap transition-all duration-300 ${titleSize}`} style={{ color: textColor }}>
          D GRAND
        </span>
        <div className="flex items-center gap-3 mt-1 opacity-90">
            <span className="h-[1px] w-6 md:w-8 transition-all duration-300" style={{ backgroundColor: dividerColor }}></span>
            <span className={`${subtitleSize} tracking-[0.25em] uppercase font-medium whitespace-nowrap transition-all duration-300`} style={{ color: dividerColor }}>
              Jewellery
            </span>
            <span className="h-[1px] w-6 md:w-8 transition-all duration-300" style={{ backgroundColor: dividerColor }}></span>
        </div>
      </div>
    </div>
  );
};