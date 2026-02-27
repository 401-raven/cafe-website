import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Gamepad2, Star, ShieldCheck, Truck, Clock, Heart, Coffee, Utensils } from "lucide-react";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";
import HeroDessert from "@/components/HeroDessert";
import dezzoveLogo from "@/assets/dezzove-logo-new.png";
import cakeLevitate from "@/assets/cake-levitate.mp4";

const DessertGame = lazy(() => import("@/components/DessertGame"));

export default function Index() {
  const [gameOpen, setGameOpen] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background animate-ambient bg-hero-gradient">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated Background Blobs */}
        <div
          className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none animate-blob"
          style={{
            background: "radial-gradient(circle, hsl(190,70%,70%) 0%, hsl(200,50%,40%,0.3) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none animate-blob"
          style={{
            background: "radial-gradient(circle, hsl(195,55%,50%,0.3) 0%, hsl(200,40%,35%,0.2) 40%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "-5s",
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none animate-blob"
          style={{
            background: "radial-gradient(circle, hsl(185,60%,60%,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "-2s",
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-particle opacity-0"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            >
              {i % 3 === 0 ? "✨" : i % 3 === 1 ? "🍩" : "💖"}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Video / Dessert */}
            <div className="order-2 lg:order-1 flex justify-center reveal-left">
              <HeroDessert videoSrc={cakeLevitate} />
            </div>

            {/* Right — Logo + CTA Panel */}
            <div className="order-1 lg:order-2 reveal-right">
              <div className="glass-card p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border-white/50 relative overflow-hidden group">
                {/* Decorative background icon */}
                <Heart className="absolute -top-10 -right-10 w-40 h-40 text-primary/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <Coffee className="absolute -bottom-10 -left-10 w-32 h-32 text-primary/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />

                <div className="text-center lg:text-right relative z-10">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="section-tag bg-white/50 backdrop-blur-sm">
                      <Sparkles size={14} className="animate-pulse" />
                      Gen-Z Dessert Experience
                    </span>
                  </div>

                  {/* Circular Logo with Glow */}
                  <div className="flex justify-center lg:justify-end mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-glow" />
                      <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500">
                        <img
                          src={dezzoveLogo}
                          alt="Dezzove Dessert Shop Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-1.5 z-20 animate-bounce-gentle">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" className="text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-black">4.9/5</span>
                      </div>
                    </div>
                  </div>

                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black gradient-text mb-6 leading-tight">
                    Sweet Dreams <br className="hidden sm:block" />
                    <span className="text-dz-navy">Are Made Of This</span>
                  </h1>

                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:ml-auto lg:mr-0 font-medium">
                    From dreamy thick shakes to decadent waffles and signature cakes.
                    Your sweetest escape awaits in every bite.
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center lg:justify-end mb-10">
                    <Link to="/menu-gallery" className="btn-primary group/btn">
                      <span>Explore Menu</span>
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/contact" className="btn-outline hover:shadow-primary/20">
                      <span>Reserve Table</span>
                    </Link>
                  </div>

                  {/* Trust Row */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-end py-6 border-t border-primary/10">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full">
                      <ShieldCheck size={14} className="text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Freshly Made</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-dz-teal/5 rounded-full">
                      <Clock size={14} className="text-dz-teal" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Under 20 Mins</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full">
                      <Truck size={14} className="text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Free Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] text-muted-foreground font-black tracking-[0.2em] uppercase opacity-60">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5 shadow-lg shadow-primary/5 bg-white/50 backdrop-blur-sm">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce-gentle shadow-[0_0_8px_hsl(var(--primary))]" />
          </div>
        </div>
      </section>

      {/* Teaser Strip */}
      <div className="bg-dz-navy py-4 relative overflow-hidden">
        <div className="ticker-wrap flex">
          <div className="ticker-inner">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-4">
                <span className="text-white/80 text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={16} className="text-dz-aqua" />
                  Today's Special: Triple Chocolate Lava Cake
                </span>
                <span className="text-white/80 text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Star size={16} className="text-dz-aqua" />
                  Free Toppings on all Waffles
                </span>
                <span className="text-white/80 text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Heart size={16} className="text-dz-aqua" />
                  New: Blue Lagoon Thick Shake
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mid-Page Content: Quick Preview */}
      <section className="section-pad bg-white/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <span className="section-tag mb-4">Chef's Selection</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-dz-navy">Must-Try Delights</h2>
            <div className="deco-line mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                  title: "Dreamy Waffles",
                  desc: "Crispy outside, fluffy inside with Belgian chocolate.",
                  price: "₹189",
                  icon: <Utensils className="text-primary" size={24} />,
                  badge: "Popular"
                },
                {
                  title: "Thick Shakes",
                  desc: "So thick you'll need a spoon. Real fruit & cream.",
                  price: "₹199",
                  icon: <Coffee className="text-dz-teal" size={24} />,
                  badge: "New"
                },
                {
                  title: "Signature Cakes",
                  desc: "Multi-layered happiness for your special moments.",
                  price: "₹219",
                  icon: <Star className="text-primary" size={24} />,
                  badge: "Best Seller"
                }
            ].map((item, i) => (
              <div key={i} className={`glass-card p-8 rounded-[2rem] card-hover reveal delay-${(i + 1) * 100}`}>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display text-2xl font-bold text-dz-navy">{item.title}</h3>
                  <span className="badge-new bg-dz-aqua/20 text-dz-navy">{item.badge}</span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{item.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black gradient-text">{item.price}</span>
                  <Link to="/menu-gallery" className="p-2 rounded-full bg-primary/5 hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game CTA Section */}
      <section className="section-pad bg-dessert-gradient relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 relative z-10 reveal">
          {!gameOpen ? (
            <div className="text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-dz-navy mb-4">Feeling Lucky? 🎰</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">Play our mini-game</p>
              <button
                onClick={() => {
                  setGameOpen(true);
                  setTimeout(() => gameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
                }}
                className="btn-primary text-base gap-3 px-10 py-5 shadow-xl shadow-primary/20"
              >
                <Gamepad2 size={24} className="animate-bounce" />
                <span>Play Sweet Catch 🍩</span>
              </button>
            </div>
          ) : (
            <div ref={gameRef} className="w-full animate-fade-in glass-card p-8 rounded-[3rem]">
              <h2 className="font-display text-3xl sm:text-4xl font-black gradient-text text-center mb-2">Sweet Catch 🍰</h2>
              <p className="text-muted-foreground text-sm text-center mb-6">Catch the falling treats · Don't miss!</p>
              <Suspense fallback={<div className="text-center text-muted-foreground py-10">Loading game…</div>}>
                <DessertGame />
              </Suspense>
              <button
                onClick={() => setGameOpen(false)}
                className="btn-outline text-xs mt-8 mx-auto block hover:bg-destructive hover:border-destructive hover:text-white"
              >
                Exit Game
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Pre-Footer Discovery Section */}
      <section className="py-24 bg-dz-navy relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dz-aqua rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 reveal-scale">
          <span className="text-dz-aqua font-black tracking-[0.3em] uppercase text-xs mb-6 block">Stay Sweet</span>
          <h2 className="font-display text-4xl sm:text-6xl text-white font-black mb-8 leading-tight">
            Ready to taste the <br /> <span className="text-dz-aqua">Magic of Dezzove?</span>
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ happy foodies who have discovered their favorite dessert sanctuary.
            We're open until midnight every day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/menu-gallery" className="btn-white">
              View All Desserts
            </Link>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-dz-navy">
              Find Our Store
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
