import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Inspection from './components/Inspection';
import Maintenance from './components/Maintenance';
import Footer from './components/Footer';
import CustomCursor from './components/Cursor';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.CONCRETE);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => prev === ThemeMode.CONCRETE ? ThemeMode.BLUEPRINT : ThemeMode.CONCRETE);
  };

  const isBlueprint = theme === ThemeMode.BLUEPRINT;

  // Dynamic classes based on theme
  const containerClasses = isBlueprint 
    ? 'bg-[#003366] text-white selection:bg-[#FFCC00] selection:text-black theme-blueprint' 
    : 'bg-[#E0E0E0] text-[#121212] selection:bg-[#FF5722] selection:text-white theme-concrete';

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono ${containerClasses}`}>
      <CustomCursor isBlueprint={isBlueprint} />
      
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} isBlueprint={isBlueprint} />
      ) : (
        <>
          <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-50" />
          
          <div className="relative z-10">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Hero isBlueprint={isBlueprint} />
            <Services isBlueprint={isBlueprint} />
            <Process isBlueprint={isBlueprint} />
            <Inspection isBlueprint={isBlueprint} />
            <Maintenance isBlueprint={isBlueprint} />
            <Footer isBlueprint={isBlueprint} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;