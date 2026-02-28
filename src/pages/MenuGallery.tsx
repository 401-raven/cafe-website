import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";

import imgLotusCake from "@/assets/menu-lotus-cake.jpeg";
import imgChocoPancake from "@/assets/menu-choco-pancake.jpeg";
import imgMoonCake from "@/assets/menu-moon-cake.jpeg";
import imgDryFruitBowl from "@/assets/menu-dry-fruit-bowl.jpeg";
import imgChocoShake from "@/assets/menu-choco-shake.jpeg";
import imgChocoChipsBowl from "@/assets/menu-choco-chips-bowl.jpeg";
import imgMangoBowl from "@/assets/menu-mango-bowl.jpeg";
import imgBlueLemonade from "@/assets/menu-blue-lemonade.jpeg";
import imgChocoStrawberry from "@/assets/menu-choco-strawberry.jpeg";
import imgBrownie from "@/assets/menu-brownie.jpeg";

const vibeBoard = [
  { image: imgBrownie, caption: "Midnight Therapy." },
  { image: imgMangoBowl, caption: "Golden Hour Sweetness." },
  { image: imgChocoStrawberry, caption: "Chocolate Therapy." },
  { image: imgChocoPancake, caption: "Layers on Layers." },
  { image: imgLotusCake, caption: "The One That Started It." },
  { image: imgBlueLemonade, caption: "Ocean in a Glass." },
  { image: imgMoonCake, caption: "Dark Side of Dessert." },
  { image: imgChocoChipsBowl, caption: "Friends + Fries + Shakes." },
  { image: imgDryFruitBowl, caption: "The Good Stuff." },
];

export default function MenuGallery() {
  const [hoveredVibe, setHoveredVibe] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.06 }
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => {
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  const scrollToContent = () => {
    document.getElementById("waffles-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* =====================================================
          HERO — "THIS ISN'T A MENU. IT'S A MOOD."
          ===================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/hero-waffle-drizzle.jpg"
            alt="Drizzle of chocolate on a golden waffle"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.05)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,108,120,0.4) 0%, rgba(8,62,69,0.55) 50%, rgba(8,62,69,0.75) 100%)",
            }}
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                background: `rgba(25,180,198,${0.15 + Math.random() * 0.2})`,
                animation: `aqua-float ${10 + Math.random() * 14}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Atmospheric glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(25,180,198,0.1), transparent 60%)",
            filter: "blur(50px)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32">
          <p
            className="font-handwritten text-xl md:text-2xl mb-6 reveal"
            style={{ color: "rgba(25,180,198,0.7)" }}
          >
            — enter the experience —
          </p>

          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] text-white mb-10 leading-[1.05] animate-text-glow"
            style={{
              textShadow: "0 4px 40px rgba(0,0,0,0.2)",
              letterSpacing: "-0.025em",
            }}
          >
            This Isn't a Menu.
            <br />
            <span className="gradient-text-aqua inline-block" style={{ fontSize: "1.1em" }}>
              It's a Mood.
            </span>
          </h1>

          <div className="max-w-xl mx-auto mb-14 reveal delay-200">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-2">
              Some nights need chocolate.
            </p>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-2">
              Some days deserve sweetness.
            </p>
            <p className="text-white/55 text-lg md:text-xl font-light leading-relaxed">
              Either way — <span className="italic font-handwritten text-2xl" style={{ color: "#19B4C6" }}>we're crafting something for you.</span>
            </p>
          </div>

          <button
            onClick={scrollToContent}
            className="reveal delay-400 inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-400 hover:scale-105"
            style={{
              border: "2px solid rgba(25,180,198,0.5)",
              color: "#FFFFFF",
              backdropFilter: "blur(10px)",
              background: "rgba(25,180,198,0.12)",
            }}
          >
            <span>Scroll to Indulge</span>
            <ArrowDown size={18} />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-white/40 animate-bounce-gentle" />
          </div>
        </div>
      </section>

      {/* WAVE */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,60 C200,0 400,80 600,40 C800,0 1000,70 1200,30 L1200,80 L0,80 Z" className="shape-fill" />
        </svg>
      </div>

      {/* =====================================================
          SECTION 1 — WAFFLES (Image left, Text right)
          ===================================================== */}
      <section
        id="waffles-section"
        className="relative overflow-hidden"
        style={{ background: "#F2FBFC", padding: "8rem 0 5rem" }}
      >
        {/* Atmospheric blob */}
        <div
          className="absolute top-10 right-0 w-[400px] h-[400px] pointer-events-none animate-drift"
          style={{
            background: "radial-gradient(circle, rgba(25,180,198,0.1), transparent 65%)",
            filter: "blur(70px)",
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="story-block" style={{ direction: "ltr" }}>
            {/* Image */}
            <div className="story-block-image reveal-left" style={{ direction: "ltr" }}>
              <img
                src="/hero-waffle-drizzle.jpg"
                alt="Golden waffle with chocolate drizzle"
              />
            </div>

            {/* Content */}
            <div className="story-block-content reveal-right delay-200" style={{ direction: "ltr" }}>
              <span className="section-tag mb-6 inline-flex">
                <Sparkles size={12} />
                Waffles
              </span>

              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.8rem] mb-3 leading-[1.15]"
                style={{ color: "#083E45", letterSpacing: "-0.01em" }}
              >
                Dreamy Waffles
              </h2>
              <p
                className="font-handwritten text-xl mb-8"
                style={{ color: "#19B4C6" }}
              >
                Golden. Loud. Soft Inside.
              </p>

              <div className="space-y-4" style={{ color: "#3A6E76" }}>
                <p className="text-base md:text-lg leading-[1.9] font-light">
                  That first crack you hear?
                  <br />
                  That's patience turning into perfection.
                </p>
                <p className="text-base md:text-lg leading-[1.9] font-light">
                  Pressed until the edges caramelize.
                  <br />
                  Lifted at just the right second.
                  <br />
                  Finished with warm Belgian chocolate
                  <br />
                  that melts before you do.
                </p>
                <p className="text-base md:text-lg leading-[1.9] font-light">
                  Every bite is contrast —
                  <br />
                  <span className="italic">crisp meeting silk,</span>
                  <br />
                  <span className="italic">heat meeting sweetness.</span>
                </p>
                <p className="font-display text-xl mt-6" style={{ color: "#083E45" }}>
                  Not just made. <span className="italic gradient-text-aqua">Crafted.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POETIC DIVIDER */}
      <div className="poetic-divider reveal" style={{ background: "#F2FBFC" }}>
        <p>"Sweetness takes time."</p>
      </div>

      {/* =====================================================
          SECTION 2 — SHAKES (Image right, Text left)
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ background: "#F2FBFC", padding: "5rem 0" }}>
        <div
          className="absolute bottom-10 left-0 w-[350px] h-[350px] pointer-events-none animate-drift"
          style={{
            background: "radial-gradient(circle, rgba(15,108,120,0.08), transparent 65%)",
            filter: "blur(70px)",
            animationDelay: "3s",
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="story-block" style={{ direction: "rtl" }}>
            {/* Image */}
            <div className="story-block-image reveal-right" style={{ direction: "ltr" }}>
              <img
                src={imgChocoShake}
                alt="Thick chocolate milkshake"
              />
            </div>

            {/* Content */}
            <div className="story-block-content reveal-left delay-200" style={{ direction: "ltr" }}>
              <span className="section-tag mb-6 inline-flex">
                <Sparkles size={12} />
                Shakes
              </span>

              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.8rem] mb-3 leading-[1.15]"
                style={{ color: "#083E45", letterSpacing: "-0.01em" }}
              >
                Thick Shakes
              </h2>
              <p
                className="font-handwritten text-xl mb-8"
                style={{ color: "#19B4C6" }}
              >
                Slow Down. Sip Deep.
              </p>

              <div className="space-y-4" style={{ color: "#3A6E76" }}>
                <p className="text-base md:text-lg leading-[1.9] font-light">
                  We don't do "light."
                </p>
                <p className="text-base md:text-lg leading-[1.9] font-light">
                  We do heavy glass.
                  <br />
                  Cold condensation.
                  <br />
                  A spoon standing tall in velvet thickness.
                </p>
                <p className="text-base md:text-lg leading-[1.9] font-light">
                  Each layer folds into the next —
                  <br />
                  <span className="italic">cream, cocoa, fruit, crunch.</span>
                </p>
                <p className="text-base md:text-lg leading-[1.9] font-light">
                  It's not something you rush.
                  <br />
                  It's something you settle into.
                </p>
                <p className="font-display text-xl mt-6" style={{ color: "#083E45" }}>
                  One sip. Pause. <span className="italic gradient-text-aqua">Repeat.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POETIC DIVIDER */}
      <div className="poetic-divider reveal" style={{ background: "#F2FBFC" }}>
        <p>"Some flavors deserve silence."</p>
      </div>

      {/* =====================================================
          SECTION 3 — CELEBRATION CAKES (Full-screen immersive)
          ===================================================== */}
      <section className="cinematic-break" style={{ minHeight: "85vh" }}>
        <div className="absolute inset-0">
          <img
            src={imgMoonCake}
            alt="Celebration cake cutting moment"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.1) saturate(1.1)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,62,69,0.5) 0%, rgba(15,108,120,0.55) 40%, rgba(8,62,69,0.7) 100%)",
            }}
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                background: `rgba(25,180,198,${0.12 + Math.random() * 0.15})`,
                animation: `aqua-float ${14 + Math.random() * 16}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <span className="section-tag mb-8 inline-flex reveal" style={{ background: "rgba(25,180,198,0.12)", borderColor: "rgba(25,180,198,0.2)", color: "#FFFFFF" }}>
            <Sparkles size={12} />
            Cakes
          </span>

          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.08] reveal delay-100 animate-text-glow"
            style={{
              textShadow: "0 4px 40px rgba(0,0,0,0.2)",
              letterSpacing: "-0.02em",
            }}
          >
            Celebration Cakes
          </h2>

          <p className="font-handwritten text-2xl mb-12 reveal delay-200" style={{ color: "#19B4C6" }}>
            Layered Like Memories.
          </p>

          <div className="space-y-3 mb-12 reveal delay-300">
            <p className="text-white/60 text-lg md:text-xl font-light">Birthdays that feel louder.</p>
            <p className="text-white/60 text-lg md:text-xl font-light">Anniversaries that feel softer.</p>
            <p className="text-white/55 text-lg md:text-xl font-light">Random Tuesdays that needed sparkle.</p>
          </div>

          <p className="text-white/50 text-base md:text-lg leading-[1.9] max-w-lg mx-auto mb-8 reveal delay-400">
            We design cakes the way moments should feel —
            <br />
            balanced, bold, unforgettable.
          </p>

          <p className="font-display text-2xl text-white mb-12 reveal delay-400">
            Not just baked. <span className="italic gradient-text-aqua">Composed.</span>
          </p>

          <Link
            to="/contact"
            className="reveal delay-500 inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-400 hover:scale-105 shadow-lg"
            style={{
              background: "#19B4C6",
              color: "#FFFFFF",
              boxShadow: "0 12px 40px rgba(25,180,198,0.3)",
            }}
          >
            <span>Create Your Celebration</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          SECTION 4 — THE DROP (Limited / Seasonal)
          ===================================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0F6C78 0%, #083E45 100%)",
          padding: "9rem 0",
        }}
      >
        {/* Atmospheric glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(25,180,198,0.12), transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                background: `rgba(25,180,198,${0.1 + Math.random() * 0.2})`,
                animation: `aqua-float ${12 + Math.random() * 14}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="section-tag mb-8 inline-flex reveal"
            style={{ background: "rgba(25,180,198,0.12)", borderColor: "rgba(25,180,198,0.2)", color: "rgba(255,255,255,0.9)" }}
          >
            Limited Edition
          </span>

          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-[1.08] reveal delay-100"
            style={{ letterSpacing: "-0.02em" }}
          >
            The Drop
          </h2>

          <p className="font-handwritten text-2xl mb-12 reveal delay-200" style={{ color: "rgba(25,180,198,0.7)" }}>
            Seasonal. Spontaneous. Gone Soon.
          </p>

          <div className="space-y-5 mb-14 reveal delay-300">
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
              We experiment.
            </p>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
              We remix.
            </p>
            <p className="text-white/45 text-lg md:text-xl font-light leading-relaxed">
              We create flavors that live briefly
              <br />
              and disappear dramatically.
            </p>
          </div>

          <p className="font-display text-xl text-white/70 mb-12 reveal delay-400">
            Follow the vibe. <span className="italic gradient-text-aqua">Catch the drop.</span>
          </p>

          <Link
            to="/our-specials"
            className="reveal delay-500 inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-400 hover:scale-105"
            style={{
              background: "#FFFFFF",
              color: "#0F6C78",
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            }}
          >
            <span>See What's New</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          SECTION 5 — THE VIBE BOARD (Masonry Gallery)
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ background: "#F2FBFC", padding: "9rem 0" }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="max-w-[650px] mx-auto text-center mb-20">
            <span className="section-tag mb-6 inline-flex reveal">The Vibe</span>

            <h2
              className="font-display text-4xl sm:text-5xl md:text-[3.5rem] mb-8 reveal delay-100"
              style={{ color: "#083E45", letterSpacing: "-0.01em" }}
            >
              Some Evenings
              <br />
              <span className="italic gradient-text-aqua">Look Like This.</span>
            </h2>

            <div className="space-y-2 reveal delay-200">
              <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: "#3A6E76" }}>
                Laughter that stretches.
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: "#3A6E76" }}>
                Conversations that spill.
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: "#3A6E76" }}>
                Chocolate that doesn't judge.
              </p>
            </div>
          </div>

          {/* Masonry Grid */}
          <div
            className="reveal delay-300"
            style={{
              columns: "3",
              columnGap: "1rem",
            }}
          >
            {vibeBoard.map((item, i) => (
              <div
                key={i}
                className="relative mb-4 break-inside-avoid group cursor-pointer"
                onMouseEnter={() => setHoveredVibe(i)}
                onMouseLeave={() => setHoveredVibe(null)}
                style={{ borderRadius: "1.25rem", overflow: "hidden" }}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full object-cover transition-transform duration-700"
                  style={{
                    borderRadius: "1.25rem",
                    transform: hoveredVibe === i ? "scale(1.04)" : "scale(1)",
                  }}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-end justify-start p-5 transition-opacity duration-500"
                  style={{
                    opacity: hoveredVibe === i ? 1 : 0,
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(8,62,69,0.7) 100%)",
                    borderRadius: "1.25rem",
                  }}
                >
                  <p className="font-handwritten text-xl text-white/90">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 6 — HOW IT FEELS (Editorial centered)
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ background: "#EAF8FA", padding: "9rem 0" }}>
        {/* Atmospheric glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(25,180,198,0.07), transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[650px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl mb-12 leading-[1.15] reveal"
            style={{ color: "#083E45", letterSpacing: "-0.01em" }}
          >
            Crafted to Make You
            <br />
            <span className="italic gradient-text-aqua">Feel Something.</span>
          </h2>

          <div className="space-y-5 reveal delay-200">
            <p className="text-base md:text-lg font-light leading-[2]" style={{ color: "#3A6E76" }}>
              The kind of place
              <br />
              where the lights glow softer,
              <br />
              where spoons hit glass slowly,
              <br />
              where time feels unimportant.
            </p>

            <div className="py-4">
              <div className="section-divider" />
            </div>

            <p className="text-base md:text-lg font-light leading-[2]" style={{ color: "#3A6E76" }}>
              This is dessert without urgency.
              <br />
              Indulgence without apology.
            </p>
          </div>

          <p className="font-display text-2xl md:text-3xl mt-12 reveal delay-300" style={{ color: "#083E45" }}>
            Come hungry.
            <br />
            <span className="italic gradient-text-aqua">Leave lighter.</span>
          </p>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA — FULL SCREEN IMMERSIVE
          ===================================================== */}
      <section className="cinematic-break" style={{ minHeight: "80vh" }}>
        <div className="absolute inset-0">
          <img
            src="/store-front.jpg"
            alt="Dezzove café at night"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,108,120,0.55) 0%, rgba(8,62,69,0.7) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-12 leading-[1.08] reveal animate-text-glow"
            style={{
              textShadow: "0 4px 40px rgba(0,0,0,0.2)",
              letterSpacing: "-0.02em",
            }}
          >
            We'll Save You
            <br />
            <span className="italic gradient-text-aqua" style={{ fontSize: "1.1em" }}>a Table.</span>
          </h2>

          <Link
            to="/contact"
            className="reveal delay-200 inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg tracking-wide transition-all duration-400 hover:scale-105 shadow-lg"
            style={{
              background: "#19B4C6",
              color: "#FFFFFF",
              boxShadow: "0 16px 50px rgba(25,180,198,0.35)",
            }}
          >
            <span>Visit Us Tonight</span>
            <ArrowRight size={20} />
          </Link>

          <div className="mt-10 space-y-1.5 reveal delay-400">
            <p className="text-white/45 text-sm font-light">Open till midnight.</p>
            <p className="text-white/40 text-sm font-light">Always worth the drive.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
