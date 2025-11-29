import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface HeroProps {
  isBlueprint: boolean;
}

const Hero: React.FC<HeroProps> = ({ isBlueprint }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  const [typedText, setTypedText] = useState('');
  const fullText = "CONSTRUCT_";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Physics Engine Setup
  useEffect(() => {
    if (!sceneRef.current) return;

    // Module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Common = Matter.Common;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });
    renderRef.current = render;

    // IMPORTANT: Allow touch scrolling on the canvas
    render.canvas.style.touchAction = 'pan-y';

    // Create bodies (The "Tools" and "Debris")
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Walls
    const ground = Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true, render: { visible: false } });

    // Falling objects
    const shapes = [];
    const colors = isBlueprint 
      ? ['#FFCC00', '#FFFFFF', '#002244'] 
      : ['#FF5722', '#121212', '#E0E0E0'];

    for (let i = 0; i < 12; i++) {
      const x = Common.random(0, width);
      const y = Common.random(-500, -50);
      const size = Common.random(40, 100);
      const color = Common.choose(colors);
      const stroke = isBlueprint ? '#FFFFFF' : '#121212';
      
      let body;
      const rand = Math.random();
      
      if (rand < 0.33) {
        // Box
        body = Bodies.rectangle(x, y, size, size, {
          chamfer: { radius: 4 },
          render: {
            fillStyle: color,
            strokeStyle: stroke,
            lineWidth: 2
          }
        });
      } else if (rand < 0.66) {
        // "Beam" (Long rectangle)
        body = Bodies.rectangle(x, y, size * 2, size / 2, {
          chamfer: { radius: 2 },
          render: {
            fillStyle: color,
            strokeStyle: stroke,
            lineWidth: 2
          }
        });
      } else {
        // "Pipe" (Circle)
        body = Bodies.circle(x, y, size / 2, {
          render: {
            fillStyle: color,
            strokeStyle: stroke,
            lineWidth: 2
          }
        });
      }
      shapes.push(body);
    }

    Composite.add(engine.world, [ground, leftWall, rightWall, ...shapes]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    
    // Scroll handling: Remove Matter.js event listeners that block scrolling
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel as any);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel as any);
    mouseConstraint.mouse.element.removeEventListener("wheel", mouseConstraint.mouse.mousewheel as any);

    // For mobile, remove touch listeners to prioritize page scrolling over physics dragging
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        mouseConstraint.mouse.element.removeEventListener("touchmove", mouseConstraint.mouse.mousemove as any);
        mouseConstraint.mouse.element.removeEventListener("touchstart", mouseConstraint.mouse.mousedown as any);
        mouseConstraint.mouse.element.removeEventListener("touchend", mouseConstraint.mouse.mouseup as any);
    }

    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine
    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Resize handler
    const handleResize = () => {
      if (!render.canvas) return;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Matter.Body.setPosition(ground, Matter.Vector.create(window.innerWidth / 2, window.innerHeight + 30));
      Matter.Body.setPosition(rightWall, Matter.Vector.create(window.innerWidth + 30, window.innerHeight / 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
    };
  }, [isBlueprint]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center border-b border-black/10">
      {/* Background Physics Layer */}
      <div ref={sceneRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Foreground Content */}
      <div className="relative z-10 text-center pointer-events-none mix-blend-difference">
        <h1 className="font-['Archivo_Black'] text-6xl md:text-9xl tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-current to-transparent opacity-90 stroke-current" style={{ WebkitTextStroke: isBlueprint ? '2px white' : '2px #121212', color: isBlueprint ? 'white' : '#121212' }}>
          {typedText}
        </h1>
        <div className="mt-4 flex justify-center gap-4 font-mono text-sm uppercase tracking-widest">
          <span className="bg-current text-white px-2 py-1" style={{ color: isBlueprint ? '#003366' : '#E0E0E0', backgroundColor: isBlueprint ? '#FFCC00' : '#FF5722' }}>
            System Online
          </span>
          <span className="border px-2 py-1" style={{ borderColor: isBlueprint ? '#FFCC00' : '#FF5722', color: isBlueprint ? '#FFCC00' : '#FF5722' }}>
            Grid Active
          </span>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden md:block max-w-xs text-xs font-mono opacity-60 pointer-events-none">
        <p>INTERACTION MODE: PHYSICS_ENABLED</p>
        <p>STATUS: AWAITING INPUT</p>
        <p>DRAG ELEMENTS TO REARRANGE</p>
      </div>
    </section>
  );
};

export default Hero;