import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, VolumeX, Battery, Lock, Server, Activity, Radio } from 'lucide-react';

interface StatusBarProps {
  soundEnabled: boolean;
  toggleSound: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ soundEnabled, toggleSound }) => {
  const [time, setTime] = useState(new Date());
  const [ledActive, setLedActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Simulate random network/server activity blink
    const blinkInterval = setInterval(() => {
        setLedActive(Math.random() > 0.5);
    }, 150);

    return () => {
        clearInterval(timer);
        clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-[#0f0f18] border-t border-gray-800 flex items-center justify-between px-4 text-xs font-mono text-gray-500 z-50 select-none">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-term-main">
            <div className={`w-2 h-2 rounded-full transition-colors duration-100 ${ledActive ? 'bg-term-main shadow-[0_0_8px_var(--term-color)]' : 'bg-term-main/20'}`}></div>
            <span className="font-bold tracking-wider">SERVER_STATUS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 border-l border-gray-800 pl-4">
            <Server size={12} />
            <span>Ubuntu 22.04 LTS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 border-l border-gray-800 pl-4">
            <Lock size={12} />
            <span>SSH-2.0</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggleSound} className="hover:text-gray-300 focus:outline-none flex items-center gap-1 transition-colors">
             {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
             <span className="hidden sm:inline">SFX</span>
        </button>
        <div className="flex items-center gap-1 border-l border-gray-800 pl-4">
            <Wifi size={14} className={ledActive ? "text-term-main transition-colors duration-100" : "text-gray-600 transition-colors duration-100"} />
            <span className="hidden sm:inline">5ms</span>
        </div>
        <div className="flex items-center gap-1 border-l border-gray-800 pl-4">
            <Battery size={14} />
            <span>100%</span>
        </div>
        <div className="text-gray-300 font-bold border-l border-gray-800 pl-4">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;