import { useState, useRef, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";

interface Ingredient {
  id: number;
  content: string | JSX.Element;
  angle: number;
  radius: number;
  delay: number;
  speed: number;
}

const INGREDIENTS: Ingredient[] = [
  { id: 1, content: "🍓", angle: 0, radius: 220, delay: 0, speed: 5 },
  { id: 2, content: "🍦", angle: 60, radius: 200, delay: 0.2, speed: 5.5 },
  { id: 3, content: "🍫", angle: 120, radius: 240, delay: 0.1, speed: 4.8 },
  { id: 4, content: "✨", angle: 180, radius: 180, delay: 0.3, speed: 6 },
  { id: 5, content: <div className="w-3 h-3 bg-dz-aqua rounded-full blur-[1px]" />, angle: 240, radius: 210, delay: 0.15, speed: 5.2 },
  { id: 6, content: "🍓", angle: 300, radius: 230, delay: 0.25, speed: 5.8 },
];

export default function HeroDessert({ videoSrc }: { videoSrc: string }) {
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInteraction = () => {
    if (isInteracting) return;
    setIsInteracting(true);
    
    // Duration of the full sequence
    setTimeout(() => {
      setIsInteracting(false);
    }, 4500);
  };

  return (
    <div 
      ref={containerRef}
      className="relative group cursor-pointer" 
      onClick={handleInteraction}
    >
      {/* Soft realistic shadow beneath the cake */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-10 bg-primary/20 blur-[40px] rounded-full opacity-60 animate-pulse-glow" />
      
      {/* Main Cake Container */}
      <div className={`relative transition-all duration-700 ${isInteracting ? 'scale-[1.02]' : 'hover:scale-[1.03]'}`}>
        
        {/* The Cake Image/Video with Levitation */}
        <div className={`relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white/30 backdrop-blur-sm ${isInteracting ? 'animate-dessert-bounce' : 'animate-float-slow'}`}>
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Subtle micro particles (crumbs/sparkles) always drifting */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-micro-particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          {/* Interaction hint */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isInteracting ? 'hidden' : ''}`}>
            <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">Tap to unlock magic</span>
            </div>
          </div>
        </div>

        {/* Ingredient Orbit Layer */}
        {isInteracting && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {INGREDIENTS.map((ing) => (
              <div
                key={ing.id}
                className="absolute top-1/2 left-1/2 flex items-center justify-center animate-ingredient-orbit"
                style={{
                  '--orbit-radius': `${ing.radius}px`,
                  '--orbit-angle': `${ing.angle}deg`,
                  '--orbit-delay': `${ing.delay}s`,
                  '--orbit-speed': `${ing.speed}s`,
                } as any}
              >
                <div className="text-2xl sm:text-4xl filter drop-shadow(0 0 12px rgba(255,255,255,0.6)) blur-[0.5px]">
                  {ing.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes dessert-bounce {
          0% { transform: translateY(0) scale(1); }
          15% { transform: translateY(12px) scale(1.05, 0.95); }
          40% { transform: translateY(-25px) scale(0.95, 1.05); }
          65% { transform: translateY(8px) scale(1.02, 0.98); }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes micro-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          50% { transform: translate(15px, -20px); opacity: 0.6; }
        }

        @keyframes ingredient-orbit {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
            filter: blur(12px) brightness(2);
          }
          15% {
            transform: translate(-50%, -50%) scale(1.1) rotate(var(--orbit-angle));
            opacity: 1;
            filter: blur(2px) brightness(1.2) drop-shadow(0 0 15px white);
          }
          /* Orbit phase with gradual slowdown */
          15%, 45% {
            transform: translate(-50%, -50%) 
                       rotate(calc(var(--orbit-angle) + 240deg)) 
                       translateX(var(--orbit-radius)) 
                       rotate(calc(-1 * (var(--orbit-angle) + 240deg)));
            opacity: 1;
            filter: blur(0.5px) brightness(1);
          }
          75% {
            transform: translate(-50%, -50%) 
                       rotate(calc(var(--orbit-angle) + 360deg)) 
                       translateX(var(--orbit-radius)) 
                       rotate(calc(-1 * (var(--orbit-angle) + 360deg)));
            opacity: 1;
            filter: blur(0px) brightness(1);
          }
          /* Return phase */
          100% {
            transform: translate(-50%, -50%) scale(0) rotate(540deg);
            opacity: 0;
            filter: blur(8px);
          }
        }

        .animate-dessert-bounce {
          animation: dessert-bounce 1s cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }

        .animate-micro-particle {
          animation: micro-particle infinite ease-in-out;
        }

        .animate-ingredient-orbit {
          animation: ingredient-orbit var(--orbit-speed) cubic-bezier(0.4, 0, 0.2, 1) var(--orbit-delay) forwards;
        }
      `}</style>
    </div>
  );
}
