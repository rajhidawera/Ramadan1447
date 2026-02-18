
import React, { useState, useEffect } from 'react';

export const BreathingCircle: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let timer: any;
    const cycle = () => {
      setPhase('Inhale');
      setScale(1.5);
      
      timer = setTimeout(() => {
        setPhase('Hold');
        timer = setTimeout(() => {
          setPhase('Exhale');
          setScale(1);
          timer = setTimeout(cycle, 4000);
        }, 4000);
      }, 4000);
    };

    cycle();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div 
        className="relative w-64 h-64 flex items-center justify-center transition-all duration-[4000ms] ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="absolute inset-0 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
           <div className="w-4 h-4 bg-white/40 rounded-full"></div>
        </div>
      </div>
      <div className="text-xl font-light tracking-widest text-white/60 uppercase transition-opacity duration-1000">
        {phase}
      </div>
    </div>
  );
};
