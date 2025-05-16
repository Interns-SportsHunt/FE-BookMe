import React from "react";

interface SportIconProps {
  className?: string;
  size?: number;
}

// Custom Football icon component
export const FootballIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
      <path d="M4.93 4.93l4.24 4.24" />
      <path d="M14.83 14.83l4.24 4.24" />
      <path d="M14.83 9.17l4.24-4.24" />
      <path d="M14.83 9.17l3.53-3.53" />
      <path d="M4.93 19.07l4.24-4.24" />
    </svg>
  );
};

// Custom Basketball icon component
export const BasketballIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M4.93 4.93L19.07 19.07" />
      <path d="M19.07 4.93L4.93 19.07" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
};

// Custom Cricket icon component
export const CricketIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <path d="M12 22v-5" />
      <path d="M9 8l3 3 3-3" />
      <path d="M9 2v6l3 3 3-3V2" />
      <path d="M3 10h6" />
      <path d="M15 10h6" />
    </svg>
  );
};

// Custom Tennis icon component
export const TennisIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M18.09 5.91A8 8 0 0 0 5.91 18.09" />
      <path d="M5.91 5.91A8 8 0 0 1 18.09 18.09" />
    </svg>
  );
};

// Custom Badminton icon component
export const BadmintonIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <path d="M12 6v8l4 4" />
      <path d="M12 14l-4 4" />
      <path d="M12 2v4" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  );
};

// Custom Volleyball icon component
export const VolleyballIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M6 2l12 20" />
      <path d="M18 2L6 22" />
    </svg>
  );
};

// Custom Swimming icon component
export const SwimmingIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <path d="M2 12h20" />
      <path d="M5 9c0 1.5.5 2 2 3s2 2 2 3" />
      <path d="M19 9c0 1.5-.5 2-2 3s-2 2-2 3" />
      <path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M4 22c1-5 2-6 6-6s5 1 6 6" />
      <path d="M20 22c-1-5-2-6-6-6" />
    </svg>
  );
};

// General Activity icon for fallback
export const ActivityIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
};

// Sport icon mapping
export const sportIconMap: Record<string, React.FC<SportIconProps>> = {
  "football": FootballIcon,
  "cricket": CricketIcon,
  "basketball": BasketballIcon,
  "tennis": TennisIcon,
  "badminton": BadmintonIcon,
  "volleyball": VolleyballIcon,
  "swimming": SwimmingIcon,
  "default": FootballIcon
};

// Function to get the icon component for a sport
export const getSportIcon = (sport: string): React.FC<SportIconProps> => {
  return sportIconMap[sport] || sportIconMap.default;
};
