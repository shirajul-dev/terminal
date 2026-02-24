import React, { useEffect, useState } from 'react';
import { INTRO_SEQUENCE } from '../constants';
import { playBootBeep, speakText } from '../utils/sound';

interface BootSequenceProps {
  onComplete: () => void;
  soundEnabled: boolean;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, soundEnabled }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= INTRO_SEQUENCE.length) {
      // Small delay before finishing to allow reading last line
      const timeout = setTimeout(() => {
          if (soundEnabled) {
              speakText("Welcome to Shirajul's Portfolio System. Access Granted.");
          }
          onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }

    const delay = Math.random() * 300 + 100; // Random delay for realism
    const timeout = setTimeout(() => {
      setLines(prev => [...prev, INTRO_SEQUENCE[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
      if (soundEnabled) playBootBeep();
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, onComplete, soundEnabled]);

  return (
    <div className="flex flex-col justify-center items-start min-h-screen p-4 sm:p-8 font-mono text-sm sm:text-base text-gray-300">
      {lines.map((line, index) => (
        <div key={index} className="mb-1">
          <span className="text-term-green mr-2">[{new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'})}]</span>
          {line.startsWith("Server Status") ? (
             <span className="text-term-green font-bold">{line}</span>
          ) : (
             <span>{line}</span>
          )}
        </div>
      ))}
      <div className="h-4 w-2 bg-gray-500 animate-blink mt-2"></div>
    </div>
  );
};

export default BootSequence;