import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  isBlueprint: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, isBlueprint }) => {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSequence = [
    "INITIALIZING_GRID...",
    "LOADING_ASSETS...",
    "CHECKING_STRUCTURAL_INTEGRITY...",
    "CALIBRATING_SENSORS...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "SYSTEM_READY."
  ];

  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 5) + 1;
      if (currentPercent > 100) currentPercent = 100;
      setPercent(currentPercent);

      // Add logs based on percentage
      const logIndex = Math.floor((currentPercent / 100) * (bootSequence.length - 1));
      setLogs(prev => {
        const newLog = bootSequence[logIndex];
        if (!prev.includes(newLog)) return [...prev, newLog];
        return prev;
      });

      if (currentPercent === 100) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const accentColor = isBlueprint ? 'text-[#FFCC00]' : 'text-[#FF5722]';
  const bgColor = isBlueprint ? 'bg-[#003366]' : 'bg-[#E0E0E0]';
  const textColor = isBlueprint ? 'text-white' : 'text-[#121212]';

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col justify-between p-8 font-mono ${bgColor} ${textColor}`}>
      <div className="text-sm">
        <p>CONSTRUCT_OS v1.0.4</p>
        <p>MEM: 64GB OK</p>
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        {logs.map((log, i) => (
          <p key={i} className="text-xs uppercase opacity-70">
            {`> ${log}`}
          </p>
        ))}
      </div>

      <div className="w-full">
        <div className="flex justify-between mb-2 text-4xl font-bold tracking-tighter">
          <span>LOADING</span>
          <span className={accentColor}>{percent}%</span>
        </div>
        <div className={`w-full h-4 border-2 ${isBlueprint ? 'border-white' : 'border-[#121212]'} p-1`}>
          <div 
            className={`h-full transition-all duration-100 ${isBlueprint ? 'bg-[#FFCC00]' : 'bg-[#FF5722]'}`} 
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;