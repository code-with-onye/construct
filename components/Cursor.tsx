import React, { useEffect, useState } from 'react';

interface CursorProps {
  isBlueprint: boolean;
}

const CustomCursor: React.FC<CursorProps> = ({ isBlueprint }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  const color = isBlueprint ? '#FFCC00' : '#FF5722';

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[100] transition-transform duration-100 ease-out flex items-center justify-center"
      style={{ 
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
      }}
    >
      {/* Crosshair Lines */}
      <div 
        className={`absolute w-[1px] h-8 bg-current transition-all duration-200 ${hovering ? 'h-0' : 'h-8'}`}
        style={{ backgroundColor: color }}
      />
      <div 
        className={`absolute h-[1px] w-8 bg-current transition-all duration-200 ${hovering ? 'w-0' : 'w-8'}`}
        style={{ backgroundColor: color }}
      />

      {/* Bracket Expansion on Hover */}
      <div 
        className={`absolute w-12 h-12 border-2 border-transparent transition-all duration-200 flex items-center justify-center ${hovering ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
      >
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: color }}></span>
        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: color }}></span>
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: color }}></span>
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: color }}></span>
      </div>
    </div>
  );
};

export default CustomCursor;