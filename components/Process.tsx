import React, { useEffect, useRef, useState } from 'react';

interface ProcessProps {
  isBlueprint: boolean;
}

const Process: React.FC<ProcessProps> = ({ isBlueprint }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is scrolled into view
      // 0 when top enters bottom of screen, 1 when bottom leaves top of screen
      let percentage = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      // Clamp between 0 and 1
      percentage = Math.max(0, Math.min(1, percentage));
      
      // Map to a more usable range for the drawing animation (e.g., fully drawn when centered)
      const drawProgress = Math.min(1, Math.max(0, (percentage - 0.2) * 2)); // Starts drawing at 20% visibility, finishes at 70%
      
      setProgress(drawProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineColor = isBlueprint ? '#FFCC00' : '#121212';
  const steps = [
    { title: 'PROBLEM_DETECTED', sub: 'Input Stream' },
    { title: 'VENDOR_SOURCED', sub: 'Processing' },
    { title: 'QUALITY_CHECK', sub: 'Validation' },
    { title: 'JOB_COMPLETE', sub: 'Output' }
  ];

  return (
    <section ref={containerRef} className="py-32 overflow-hidden w-full relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-['Archivo_Black'] text-4xl mb-16 tracking-tight">LOGIC_GATE</h2>
        
        <div className="relative">
          {/* Base Line */}
          <div className={`absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 opacity-20 ${isBlueprint ? 'bg-white' : 'bg-[#121212]'}`} />
          
          {/* Active Line */}
          <div 
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 transition-all duration-100 ease-linear"
            style={{ 
              width: `${progress * 100}%`,
              backgroundColor: lineColor
            }} 
          />

          <div className="grid grid-cols-4 gap-4 relative z-10">
            {steps.map((step, index) => {
              const isActive = progress > (index / (steps.length - 1)) - 0.1;
              const isLast = index === steps.length - 1;
              const activeColor = isLast && isActive ? (isBlueprint ? 'text-[#FFCC00]' : 'text-[#FF5722]') : (isBlueprint ? 'text-white' : 'text-[#121212]');
              
              return (
                <div key={index} className="flex flex-col items-center text-center gap-6">
                  {/* Node */}
                  <div 
                    className={`w-6 h-6 border-2 transform rotate-45 transition-all duration-500 bg-current 
                    ${isActive ? 'scale-125' : 'scale-100 opacity-50'}
                    `}
                    style={{ 
                      backgroundColor: isActive ? lineColor : 'transparent',
                      borderColor: lineColor
                    }}
                  />
                  
                  {/* Text */}
                  <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}`}>
                    <h3 className={`font-mono font-bold text-sm md:text-base ${activeColor}`}>
                      {step.title}
                    </h3>
                    <p className="font-mono text-xs opacity-60 mt-1">{step.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;