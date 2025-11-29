import React from 'react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const isBlueprint = theme === ThemeMode.BLUEPRINT;
  const borderColor = isBlueprint ? 'border-white/20' : 'border-[#121212]/20';
  const logoColor = isBlueprint ? 'text-white' : 'text-[#121212]';

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 border-b ${borderColor} backdrop-blur-sm px-6 py-4 flex justify-between items-center transition-colors duration-700`}>
      <div className="flex items-center gap-4">
        <div className={`font-['Archivo_Black'] text-2xl tracking-tighter ${logoColor}`}>
          CONSTRUCT
        </div>
        <div className={`hidden md:block text-xs font-mono px-2 py-1 border ${isBlueprint ? 'border-white text-white' : 'border-[#121212] text-[#121212]'}`}>
          EST. 2024
        </div>
      </div>

      <div className="flex items-center gap-8 font-mono text-sm">
        <ul className="hidden md:flex gap-6">
          {['SERVICES', 'PROCESS', 'INSPECTION'].map((item) => (
            <li key={item} className="relative group cursor-pointer interactive">
              <span className={isBlueprint ? 'text-white/70 group-hover:text-[#FFCC00]' : 'text-[#121212]/70 group-hover:text-[#FF5722]'}>
                {item}
              </span>
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isBlueprint ? 'bg-[#FFCC00]' : 'bg-[#FF5722]'}`} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase hidden sm:inline">
            {isBlueprint ? 'Blueprint Mode' : 'Standard Mode'}
          </span>
          <button 
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full p-1 border-2 transition-colors relative interactive ${
              isBlueprint ? 'border-white bg-[#002244]' : 'border-[#121212] bg-[#d0d0d0]'
            }`}
          >
            <div 
              className={`w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
                isBlueprint ? 'translate-x-6 bg-[#FFCC00]' : 'translate-x-0 bg-[#FF5722]'
              }`} 
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;