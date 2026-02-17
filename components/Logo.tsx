import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'default' | 'small';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light', size = 'default' }) => {
  const textColor = variant === 'light' ? '#D4AF37' : '#0F3B2E';
  
  const iconSize = size === 'small' ? "32" : "48";
  const titleSize = size === 'small' ? "text-lg" : "text-2xl";

  return (
    <div className={`flex items-center gap-3 transition-all duration-300 ${className}`}>
        {/* Geometric Abstract Logo */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
           <rect x="20" y="20" width="60" height="60" stroke={textColor} strokeWidth="4" />
           <rect x="35" y="35" width="30" height="30" fill={textColor} />
           <path d="M 20 20 L 35 35" stroke={textColor} strokeWidth="2" />
           <path d="M 80 20 L 65 35" stroke={textColor} strokeWidth="2" />
           <path d="M 20 80 L 35 65" stroke={textColor} strokeWidth="2" />
           <path d="M 80 80 L 65 65" stroke={textColor} strokeWidth="2" />
        </svg>

      <div className="flex flex-col">
        <span className={`font-display font-bold tracking-widest uppercase whitespace-nowrap leading-none ${titleSize}`} style={{ color: textColor }}>
          D GRAND
        </span>
      </div>
    </div>
  );
};