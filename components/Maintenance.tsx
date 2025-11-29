import React from 'react';

interface MaintenanceProps {
  isBlueprint: boolean;
}

const Maintenance: React.FC<MaintenanceProps> = ({ isBlueprint }) => {
  const jobs = [
    "HVAC SERVICED IN LOBBY - 11:30 AM",
    "PLUMBING RESOLVED IN UNIT 4B - 10:00 AM",
    "ELEVATOR MAINTENANCE COMPLETE - TOWER A",
    "SECURITY SYSTEM REBOOT - 09:15 AM",
    "LIGHTING REPLACEMENT - FLOOR 3",
    "FIRE ALARM TEST - PASSED"
  ];

  const mapColor = isBlueprint ? '#004488' : '#cccccc';
  const dotColor = isBlueprint ? '#FFCC00' : '#FF5722';

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-current opacity-80">
        
        {/* Left: Map Visualization */}
        <div className={`relative h-[400px] overflow-hidden ${isBlueprint ? 'bg-[#001133]' : 'bg-[#f0f0f0]'}`}>
          <div className="absolute top-6 left-6 z-10">
            <h2 className="font-['Archivo_Black'] text-2xl">LIVE_DISPATCH</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs">REALTIME_FEED</span>
            </div>
          </div>
          
          {/* Abstract Map */}
          <div className="absolute inset-0 p-12">
            {/* Roads/Grid */}
            <div className="w-full h-full relative">
               <svg width="100%" height="100%" className="opacity-30">
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#grid)" />
                 
                 {/* Random "Routes" */}
                 <path d="M 50 50 L 200 50 L 200 250" fill="none" stroke="currentColor" strokeWidth="2" />
                 <path d="M 300 100 L 300 300 L 100 300" fill="none" stroke="currentColor" strokeWidth="2" />
               </svg>

               {/* Moving Dots (Agents) */}
               <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: dotColor }} />
               <div className="absolute top-3/4 left-3/4 w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: dotColor }} />
               <div className="absolute top-1/2 left-2/3 w-3 h-3 rounded-full" style={{ backgroundColor: dotColor }} />
            </div>
          </div>
        </div>

        {/* Right: Data Feed */}
        <div className={`flex flex-col justify-center p-8 border-l border-current ${isBlueprint ? 'bg-[#002244]' : 'bg-white'}`}>
          <div className="font-mono text-sm mb-4 opacity-50">/// ACTIVITY_LOG</div>
          
          <div className="space-y-4 font-mono text-sm h-[200px] overflow-hidden relative">
             <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-current to-transparent opacity-10 pointer-events-none z-10" />
             
             {/* Simple ticker effect */}
             <div className="animate-[translateY_-50%_10s_linear_infinite] space-y-4">
                {[...jobs, ...jobs].map((job, i) => (
                  <div key={i} className="flex gap-4 items-center border-b border-dashed border-current/20 pb-2">
                    <span className="opacity-50 text-xs">[{i < 10 ? `0${i}` : i}]</span>
                    <span>{job}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="mt-8 pt-6 border-t border-current/20 flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">98.4%</div>
              <div className="text-xs opacity-60">SLA COMPLIANCE</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12m</div>
              <div className="text-xs opacity-60">AVG RESPONSE</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Maintenance;