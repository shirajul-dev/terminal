import React, { useState, useEffect, useRef } from 'react';
import { playTypewriterKey } from '../utils/sound';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  soundEnabled?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 15, onComplete, className, soundEnabled = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  // Use a ref to track soundEnabled so we don't need to add it to the useEffect dependency array
  // This prevents the typing animation from restarting when sound is toggled.
  const soundEnabledRef = useRef(soundEnabled);
  const indexRef = useRef(0);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    setDisplayedText('');
    indexRef.current = 0;
    isCompleteRef.current = false;
    
    if (!text) return;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        
        if (soundEnabledRef.current) {
            playTypewriterKey();
        }

        indexRef.current++;
      } else {
        clearInterval(interval);
        if (!isCompleteRef.current) {
            isCompleteRef.current = true;
            if (onComplete) onComplete();
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]); // Removed soundEnabled from dependency array

  return <span className={className}>{displayedText}</span>;
};

export default Typewriter;