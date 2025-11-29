import React from 'react';

interface ServicesProps {
  isBlueprint: boolean;
}

const Services: React.FC<ServicesProps> = ({ isBlueprint }) => {
  const services = [
    {
      id: '01',
      title: 'PROCUREMENT',
      icon: '🧾',
      desc: ['Vendor Sourcing', 'Contract Neg.', 'Supply Chain'],
      col: 'md:col-span-1',
      row: 'md:row-span-2'
    },
    {
      id: '02',
      title: 'FACILITIES',
      icon: '🏢',
      desc: ['Space Planning', 'Cleaning Ops', 'Security'],
      col: 'md:col-span-2',
      row: 'md:row-span-1'
    },
    {
      id: '03',
      title: 'INSPECTIONS',
      icon: '🔍',
      desc: ['Safety Audits', 'Compliance', 'Risk Assess.'],
      col: 'md:col-span-1',
      row: 'md:row-span-1'
    },
    {
      id: '04',
      title: 'MAINTENANCE',
      icon: '🔧',
      desc: ['HVAC Repair', 'Electrical', 'Plumbing'],
      col: 'md:col-span-1',
      row: 'md:row-span-1'
    }
  ];

  const borderColor = isBlueprint ? 'border-white/30' : 'border-[#121212]/20';
  const cardBg = isBlueprint ? 'hover:bg-white/10' : 'hover:bg-black/5';
  const accentColor = isBlueprint ? 'text-[#FFCC00]' : 'text-[#FF5722]';

  return (
    <section className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 border-b pb-4 border-current opacity-80">
        <h2 className="font-['Archivo_Black'] text-4xl tracking-tight">THE_ASSEMBLY</h2>
        <span className="font-mono text-xs">[ MODULES_LOADED: 4 ]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`
              relative group overflow-hidden border ${borderColor} p-6 flex flex-col justify-between transition-all duration-300 ${cardBg}
              ${service.col} ${service.row}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-start z-10">
              <span className={`font-mono text-sm opacity-60 ${accentColor}`}>
                {service.id} //
              </span>
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
            </div>

            {/* Content - Slides up on hover */}
            <div className="z-10 mt-auto transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-['Archivo_Black'] text-2xl mb-2">{service.title}</h3>
              <ul className="font-mono text-sm space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {service.desc.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={`w-1 h-1 ${isBlueprint ? 'bg-[#FFCC00]' : 'bg-[#FF5722]'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative Grid Background on Hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-[length:10px_10px]" />
            {isBlueprint && (
               <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:10px_10px]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;