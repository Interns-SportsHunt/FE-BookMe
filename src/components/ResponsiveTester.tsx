import { useState, useEffect } from "react";

export default function ResponsiveTester() {
  const [isVisible, setIsVisible] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [breakpoint, setBreakpoint] = useState("");

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Determine current breakpoint
    const determineBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) return "xs (< 640px)";
      if (width < 768) return "sm (640px - 767px)";
      if (width < 1024) return "md (768px - 1023px)";
      if (width < 1280) return "lg (1024px - 1279px)";
      if (width < 1536) return "xl (1280px - 1535px)";
      return "2xl (≥ 1536px)";
    };

    // Update on mount and when resizing
    handleResize();
    setBreakpoint(determineBreakpoint());

    window.addEventListener("resize", () => {
      handleResize();
      setBreakpoint(determineBreakpoint());
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white z-50 text-sm p-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div>
          <span className="font-mono">{screenSize.width}px × {screenSize.height}px</span>
        </div>
        <div>
          <span>Breakpoint: {breakpoint}</span>
        </div>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Close responsive tester"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
} 