import { Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import DoracakeScene from "@/components/DoracakeScene";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-20">
        {/* Background blobs */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(30,30%,90%) 0%, hsl(24,50%,47%,0.3) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(36,45%,52%,0.3) 0%, hsl(33,32%,40%,0.2) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Floating food emojis */}
        {[
          { emoji: "🍰", pos: "top-[15%] left-[8%]", delay: "0s" },
          { emoji: "🥤", pos: "top-[22%] right-[10%]", delay: "0.8s" },
          { emoji: "🧇", pos: "bottom-[28%] left-[6%]", delay: "1.5s" },
          { emoji: "🍫", pos: "bottom-[20%] right-[8%]", delay: "0.4s" },
        ].map((item) => (
          <div
            key={item.emoji}
            className={`absolute ${item.pos} hidden md:flex flex-col items-center gap-1 animate-float-slow pointer-events-none`}
            style={{ animationDelay: item.delay }}
          >
            <div className="glass rounded-2xl p-3 shadow-lg">
              <span className="text-3xl">{item.emoji}</span>
            </div>
          </div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left — 3D Doracake */}
            <div className="order-2 lg:order-1">
              <Suspense
                fallback={
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <div className="text-4xl animate-bounce-gentle">🍩</div>
                  </div>
                }
              >
                <DoracakeScene />
              </Suspense>
            </div>

            {/* Right — CTA */}
            <div className="text-center lg:text-right order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="section-tag">
                  <Sparkles size={12} />
                  Gen-Z Dessert Experience
                </span>
              </div>

              <h1
                className="font-display font-black leading-[1.05] mb-5"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                <span className="gradient-text-warm">Artisan</span>
                <br />
                <span className="gradient-text">Desserts</span>
                <br />
                <span className="text-foreground">Crafted with 💕</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:ml-auto lg:mr-0">
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

      <Footer />
    </div>
  );
}
