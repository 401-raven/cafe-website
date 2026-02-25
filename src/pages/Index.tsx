import { useState, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Gamepad2 } from "lucide-react";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";
import dezzoveLogo from "@/assets/dezzove-logo-new.png";
import cakeLevitate from "@/assets/cake-levitate.mp4";
import cakePour from "@/assets/cake-pour.mp4";

const DessertGame = lazy(() => import("@/components/DessertGame"));

export default function Index() {
  const [pouring, setPouring] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const handleVideoClick = () => {
    setPouring((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-20">
        {/* Background blobs */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(190,60%,70%) 0%, hsl(200,50%,40%,0.3) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(195,55%,50%,0.3) 0%, hsl(200,40%,35%,0.2) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left — Video */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div
                className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={handleVideoClick}
              >
                <video
                  ref={videoRef}
                  key={pouring ? "pour" : "levitate"}
                  src={pouring ? cakePour : cakeLevitate}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="glass text-xs px-3 py-1.5 rounded-full text-foreground font-medium">
                    {pouring ? "Click to stop" : "Click to pour chocolate 🍫"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Logo + CTA */}
            <div className="text-center lg:text-right order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="section-tag">
                  <Sparkles size={12} />
                  Gen-Z Dessert Experience
                </span>
              </div>

              {/* Circular Logo */}
              <div className="flex justify-center lg:justify-end mb-6">
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl">
                  <img
                    src={dezzoveLogo}
                    alt="Dezzove Dessert Shop Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:ml-auto lg:mr-0">
                From dreamy thick shakes to decadent waffles and signature cakes.
                Your sweetest escape awaits.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-end mb-10">
                <Link to="/menu-gallery" className="btn-primary text-sm">
                  <span>Explore Menu</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-outline text-sm">
                  <span>Reserve Table</span>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-end">
                {[
                  { value: "50+", label: "Sweet Creations" },
                  { value: "10K+", label: "Happy Foodies" },
                  { value: "4.9★", label: "Rating" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display font-bold text-2xl gradient-text" style={{ lineHeight: 1.2 }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary animate-bounce-gentle" />
          </div>
        </div>
      </section>

      {/* Game CTA */}
      <section className="section-pad bg-dessert-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
          {!gameOpen ? (
            <button
              onClick={() => {
                setGameOpen(true);
                setTimeout(() => gameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
              }}
              className="btn-primary text-base gap-3 px-8 py-4"
            >
              <Gamepad2 size={20} />
              <span>Wanna play a game? 🍩</span>
            </button>
          ) : (
            <div ref={gameRef} className="w-full animate-fade-in">
              <h2 className="font-display text-3xl sm:text-4xl font-black gradient-text text-center mb-2">Sweet Catch 🍰</h2>
              <p className="text-muted-foreground text-sm text-center mb-6">Catch the falling treats · Don't miss!</p>
              <Suspense fallback={<div className="text-center text-muted-foreground py-10">Loading game…</div>}>
                <DessertGame />
              </Suspense>
              <button
                onClick={() => setGameOpen(false)}
                className="btn-outline text-xs mt-6 mx-auto block"
              >
                Close Game
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
