import React, { useState, useEffect, ReactNode } from 'react';

interface GlitchTextProps {
  text?: string;
  children?: ReactNode;
  as?: React.ElementType;
  className?: string;
  interval?: number; // approx ms between glitches
  duration?: number; // ms duration of glitch
  probability?: number; // 0-1 chance to trigger on interval
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
    text, 
    children,
    as: Component = 'span', 
    className = '',
    interval = 3000,
    duration = 200,
    probability = 0.7
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
        if (Math.random() < probability) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), duration);
        }
    }, interval);
    return () => clearInterval(timer);
  }, [interval, duration, probability]);

  return (
    <Component className={`${className} ${isGlitching ? 'animate-glitch text-white opacity-80' : ''} transition-colors duration-75`}>
      {text || children}
    </Component>
  );
};

export default GlitchText;