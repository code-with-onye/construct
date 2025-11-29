import React, { useState, useRef, useEffect } from 'react';

interface InspectionProps {
  isBlueprint: boolean;
}

const Inspection: React.FC<InspectionProps> = ({ isBlueprint }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="relative w-full py-24 bg-[#1a1a1a] overflow-hidden cursor-crosshair">
       <div className="absolute top-6 left-6 z-20 mix-blend-difference text-white">
        <h2 className="font-['Archivo_Black'] text-4xl tracking-tight">THE_X-RAY</h2>
        <p className="font-mono text-xs mt-2 opacity-80">HOVER TO INSPECT STRUCTURE</p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[600px] md:h-[800px] overflow-hidden"
      >
        {/* Layer 1: Normal View (Black and White Office) */}
        {/* Using a placeholder gradient/pattern to simulate an office if no image */}
        <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125" 
             style={{ 
               backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop")',
               filter: 'grayscale(100%) contrast(1.2) brightness(0.8)'
             }} 
        />

        {/* Layer 2: Thermal/Blueprint View (Revealed by Mask) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop")',
            // Using CSS filters to simulate a "blueprint" or "thermal" look
            filter: 'invert(1) sepia(1) saturate(5) hue-rotate(180deg)',
            clipPath: `circle(150px at ${mousePos.x}% ${mousePos.y}%)`,
            transition: 'clip-path 0.05s linear' // Smooth out the movement slightly
          }}
        >
          {/* Overlay grid for the "technical" look inside the reveal */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
        
        {/* Floating UI Elements inside the x-ray */}
        <div 
           className="absolute z-20 pointer-events-none text-[#00ff00] font-mono text-xs"
           style={{ top: `${mousePos.y}%`, left: `${mousePos.x}%`, transform: 'translate(100px, 100px)' }}
        >
          <div>TEMP: 22°C</div>
          <div>INTEGRITY: 98%</div>
          <div>PIPING: OK</div>
        </div>
      </div>
    </section>
  );
};

export default Inspection;