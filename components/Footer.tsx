import React from 'react';

interface FooterProps {
  isBlueprint: boolean;
}

const Footer: React.FC<FooterProps> = ({ isBlueprint }) => {
  const borderColor = isBlueprint ? 'border-white/30' : 'border-[#121212]/30';

  const playClick = () => {
    // Simple synthesized click sound or placeholder logic
    // In a real app, use new Audio('/click.mp3').play();
  };

  return (
    <footer className={`border-t ${borderColor} pt-12 pb-6 px-6 relative`}>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-['Archivo_Black'] text-6xl tracking-tighter mb-6">CONSTRUCT</h2>
            <p className="font-mono max-w-sm opacity-70">
              Modular order for chaos environments. We reassemble property management into a precision-engineered grid.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="font-mono text-sm space-y-4">
            <h4 className="font-bold mb-4 opacity-50">INDEX</h4>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:underline decoration-orange-500 interactive">ABOUT</li>
              <li className="cursor-pointer hover:underline decoration-orange-500 interactive">SERVICES</li>
              <li className="cursor-pointer hover:underline decoration-orange-500 interactive">CASE STUDIES</li>
              <li className="cursor-pointer hover:underline decoration-orange-500 interactive">LOGIN</li>
            </ul>
          </div>

          {/* Column 3: Action */}
          <div className="flex flex-col items-start justify-between h-full">
            <div className="w-full">
               <h4 className="font-mono font-bold mb-4 opacity-50">ACTION</h4>
               <button 
                onClick={playClick}
                className={`
                  interactive w-full py-4 px-6 border-2 font-mono font-bold uppercase tracking-widest transition-all
                  active:scale-95 flex items-center justify-between group
                  ${isBlueprint ? 'border-white hover:bg-white hover:text-[#003366]' : 'border-[#121212] hover:bg-[#121212] hover:text-white'}
                `}
               >
                 <span>INITIALIZE PROJECT</span>
                 <span className={`block w-3 h-3 rounded-full ${isBlueprint ? 'bg-[#FFCC00]' : 'bg-[#FF5722]'} group-hover:bg-current`} />
               </button>
            </div>
            
            <div className="mt-8 font-mono text-xs opacity-50 w-full flex justify-between">
               <span>REF: 44-902-X</span>
               <span>SECURE_CONN</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Manifest */}
        <div className={`border-t ${borderColor} pt-6 flex flex-col md:flex-row justify-between items-end md:items-center font-mono text-xs opacity-60`}>
          <div className="flex gap-4 mb-4 md:mb-0">
             <span>© 2024 CONSTRUCT FACILITIES GROUP</span>
             <span className="hidden md:inline">|</span>
             <span className="hidden md:inline">LONDON / NEW YORK / TOKYO</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-24 bg-current opacity-20" /> {/* Fake Barcode */}
            <div className="h-8 w-8 bg-current opacity-20" /> {/* Fake QR */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;