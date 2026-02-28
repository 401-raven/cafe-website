import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, CalendarCheck, Quote, Sparkles } from "lucide-react";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";

export default function Index() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const journeySteps = [
    {
      num: 1,
      title: "It Starts With Batter",
      text: "Freshly mixed, poured gently into heat. The first promise of something extraordinary.",
      img: "/hero-waffle-drizzle.jpg",
    },
    {
      num: 2,
      title: "Golden Perfection",
      text: "Crisp outside. Soft inside. Exactly as it should be — patience turned into texture.",
      img: "/step2-crisp.jpg",
    },
    {
      num: 3,
      title: "The Drizzle Moment",
      text: "Warm Belgian chocolate cascading slowly. This is the moment that makes everything else worth it.",
      img: "/step3-chocolate-drizzle.jpg",
    },
    {
      num: 4,
      title: "Topped With Joy",
      text: "Fruits, crunch, cream — layered with care. Every topping tells its own story.",
      img: "/step4-fruit-topping.jpg",
    },
    {
      num: 5,
      title: "Served With A Smile",
      text: "Because presentation is part of the magic. The final touch before your first bite.",
      img: "/step5-serve-plated.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* =====================================================
          SECTION 1 — HERO (CINEMATIC)
          ===================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero-waffle-drizzle.jpg"
            alt="Dezzove signature waffle with Belgian chocolate drizzle"
            className="w-full h-full object-cover"
          />
          {/* Lighter overlay — let dessert warmth show through */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,108,120,0.45) 0%, rgba(8,62,69,0.6) 60%, rgba(8,62,69,0.75) 100%)",
            }}
          />
        </div>

        {/* Atmospheric floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                left: `${Math.random() * 100}%`,
                background: `rgba(25,180,198,${0.15 + Math.random() * 0.25})`,
                animation: `aqua-float ${10 + Math.random() * 15}s linear infinite`,
                animationDelay: `${Math.random() * 12}s`,
              }}
            />
          ))}
        </div>

        {/* Atmospheric blur blob */}
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(25,180,198,0.12), transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-36">
          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-white mb-10 leading-[1.05] animate-text-glow"
            style={{
              textShadow: "0 4px 40px rgba(0,0,0,0.25)",
              letterSpacing: "-0.02em",
            }}
          >
            Where Every Dessert
            <br />
            <span
              className="gradient-text-aqua inline-block"
              style={{
                fontSize: "1.15em",
                letterSpacing: "-0.03em",
              }}
            >
              Has a Story.
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-white/75 max-w-2xl mx-auto mb-14 leading-relaxed font-light reveal delay-200"
            style={{ textShadow: "0 2px 15px rgba(0,0,0,0.15)" }}
          >
            From the first drizzle of Belgian chocolate to the final bite of warmth,
            Dezzove isn't just dessert — it's a feeling you carry home.
          </p>

          <div className="flex flex-wrap gap-5 justify-center reveal delay-400">
            <Link
              to="/menu-gallery"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-400 shadow-lg hover:shadow-2xl hover:scale-105"
              style={{
                background: "#19B4C6",
                color: "#FFFFFF",
                backdropFilter: "blur(10px)",
                boxShadow: "0 12px 35px rgba(25,180,198,0.3)",
              }}
            >
              <span>Explore Our Menu</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-400 hover:scale-105"
              style={{
                border: "2px solid rgba(255,255,255,0.35)",
                color: "#FFFFFF",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <span>Visit Us Tonight</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] text-white/40 font-semibold tracking-[0.25em] uppercase">
            Scroll
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-white/40 animate-bounce-gentle" />
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER — hero → story */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,60 C200,0 400,80 600,40 C800,0 1000,70 1200,30 L1200,80 L0,80 Z" className="shape-fill" />
        </svg>
      </div>

      {/* =====================================================
          SECTION 2 — OUR STORY (EDITORIAL)
          ===================================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/cafe-interior-warm.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          padding: "9rem 0 7rem",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(242,251,252,0.93)" }} />

        {/* Atmospheric glow */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 40%, rgba(25,180,198,0.1) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5 reveal">
            <span className="section-tag mb-6 inline-flex">
              <Sparkles size={13} />
              Our Story
            </span>
          </div>

          <h2
            className="font-display text-4xl sm:text-5xl md:text-[3.8rem] text-center mb-14 leading-tight reveal"
            style={{ color: "#083E45", letterSpacing: "-0.01em" }}
          >
            Born From Late-Night
            <br />
            <span className="italic gradient-text-aqua">
              Cravings.
            </span>
          </h2>

          <div className="max-w-[680px] mx-auto space-y-7 reveal delay-200">
            <p className="text-lg md:text-xl leading-[1.85] text-center italic font-light" style={{ color: "#2E5F66" }}>
              It began with a single waffle iron, a handful of recipes, and an obsession with perfecting the crisp.
            </p>

            <p className="text-base md:text-lg leading-[1.85] text-center" style={{ color: "#3A6E76" }}>
              Dezzove was never meant to be just another dessert café. It was built as a sanctuary — a place where
              friends gather after long days, where birthdays turn into memories, and where chocolate flows a little
              more generously than expected.
            </p>

            <div className="py-6">
              <div className="section-divider" />
            </div>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="reveal delay-100">
                <p className="font-display text-xl mb-2" style={{ color: "#083E45" }}>Every shake</p>
                <p className="text-sm leading-relaxed" style={{ color: "#5E8C92" }}>is thick enough to slow you down.</p>
              </div>
              <div className="reveal delay-200">
                <p className="font-display text-xl mb-2" style={{ color: "#083E45" }}>Every waffle</p>
                <p className="text-sm leading-relaxed" style={{ color: "#5E8C92" }}>is golden enough to make you pause.</p>
              </div>
              <div className="reveal delay-300">
                <p className="font-display text-xl mb-2" style={{ color: "#083E45" }}>Every visit</p>
                <p className="text-sm leading-relaxed" style={{ color: "#5E8C92" }}>is meant to feel like a small escape.</p>
              </div>
            </div>

            <div className="py-6">
              <div className="section-divider" />
            </div>

            <p className="text-center font-display text-2xl md:text-3xl reveal" style={{ color: "#083E45" }}>
              We don't just serve desserts.
              <br />
              <span className="italic gradient-text-aqua">
                We craft moments.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* POETIC DIVIDER */}
      <div className="poetic-divider reveal" style={{ background: "#F2FBFC" }}>
        <p>"Sweetness takes time."</p>
      </div>

      {/* =====================================================
          SECTION 3 — FROM BATTER TO BLISS (STORYTELLING BLOCKS)
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ background: "#F2FBFC", padding: "5rem 0 8rem" }}>
        {/* Atmospheric blobs */}
        <div
          className="absolute top-20 right-0 w-[400px] h-[400px] pointer-events-none atmo-blob atmo-blob-aqua animate-drift"
          style={{ opacity: 0.4 }}
        />
        <div
          className="absolute bottom-40 left-0 w-[350px] h-[350px] pointer-events-none atmo-blob atmo-blob-deep animate-drift"
          style={{ animationDelay: "4s", opacity: 0.3 }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 reveal">
            <span className="section-tag mb-6 inline-flex">From Batter to Bliss</span>
          </div>

          <h2
            className="font-display text-4xl sm:text-5xl md:text-[3.5rem] text-center mb-24 reveal"
            style={{ color: "#083E45", letterSpacing: "-0.01em" }}
          >
            The Journey of a<br />
            <span className="italic gradient-text-aqua">
              Signature Waffle
            </span>
          </h2>

          {/* Alternating storytelling blocks */}
          {journeySteps.map((step, i) => (
            <div
              key={step.num}
              className="story-block"
              style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}
            >
              {/* Image */}
              <div
                className={`story-block-image ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
                style={{ direction: "ltr" }}
              >
                <img
                  src={step.img}
                  alt={step.title}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div
                className={`story-block-content ${i % 2 === 0 ? "reveal-right" : "reveal-left"} delay-200`}
                style={{ direction: "ltr" }}
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white font-display text-xl mb-6"
                  style={{
                    background: "linear-gradient(135deg, #19B4C6, #0F6C78)",
                    boxShadow: "0 10px 30px rgba(25,180,198,0.25)",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-display text-2xl md:text-3xl mb-4"
                  style={{ color: "#083E45", letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <p className="text-base md:text-lg leading-[1.8]" style={{ color: "#3A6E76" }}>
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CINEMATIC STORY BREAK — FULL SCREEN
          ===================================================== */}
      <section className="cinematic-break">
        <div className="absolute inset-0">
          <img
            src="/late-night-vibes.jpg"
            alt="Evening dessert atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="cinematic-overlay" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                background: `rgba(25,180,198,${0.15 + Math.random() * 0.2})`,
                animation: `aqua-float ${12 + Math.random() * 18}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <p
            className="font-handwritten text-2xl text-white/40 mb-8 tracking-wide reveal"
          >
            — a pause —
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] reveal delay-200 animate-text-glow"
            style={{
              textShadow: "0 4px 40px rgba(0,0,0,0.2)",
              letterSpacing: "-0.02em",
            }}
          >
            Some Evenings
            <br />
            <span className="italic gradient-text-aqua" style={{ fontSize: "1.1em" }}>
              Deserve Dessert.
            </span>
          </h2>
          <p
            className="font-handwritten text-xl text-white/35 mt-10 reveal delay-400"
          >
            "Some nights are meant to linger."
          </p>
        </div>
      </section>

      {/* =====================================================
          SECTION 4 — MORE THAN A CAFÉ (LIGHTER OVERLAY)
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ padding: "9rem 0" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/late-night-vibes.jpg"
            alt="Inside Dezzove café"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(8,62,69,0.72) 0%, rgba(15,108,120,0.5) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl reveal">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/35 mb-7">
              The Experience
            </span>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-12 leading-[1.08]"
              style={{
                textShadow: "0 4px 30px rgba(0,0,0,0.2)",
                letterSpacing: "-0.02em",
              }}
            >
              More Than a Café.
              <br />
              <span className="italic gradient-text-aqua" style={{ fontSize: "1.05em" }}>
                A Vibe.
              </span>
            </h2>

            <div className="space-y-4 mb-12 reveal delay-200">
              <p className="text-white/65 text-lg md:text-xl font-light">Soft lights.</p>
              <p className="text-white/65 text-lg md:text-xl font-light">Late-night conversations.</p>
              <p className="text-white/65 text-lg md:text-xl font-light">The sound of spoons against thick shakes.</p>
            </div>

            <p className="text-white/40 text-base leading-relaxed mb-8 reveal delay-300">
              We stay open till midnight because some stories begin after sunset.
            </p>

            <p className="text-white/60 text-lg font-light reveal delay-400">
              Bring your friends. Bring your date.
              <br />
              Or bring just yourself —{" "}
              <span className="italic font-handwritten text-2xl" style={{ color: "#19B4C6" }}>
                we'll handle the sweetness.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* POETIC DIVIDER */}
      <div className="poetic-divider reveal" style={{ background: "#F2FBFC" }}>
        <p>"These are not just desserts."</p>
      </div>

      {/* =====================================================
          SECTION 5 — SIGNATURE EXPERIENCES
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ background: "#F2FBFC", padding: "5rem 0 9rem" }}>
        {/* Atmospheric blob */}
        <div
          className="absolute bottom-0 right-10 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 70%, rgba(25,180,198,0.08) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <span className="section-tag mb-6 inline-flex">Signature Experiences</span>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-[3.5rem]"
              style={{ color: "#083E45", letterSpacing: "-0.01em" }}
            >
              Crafted to Make You
              <br />
              <span className="italic gradient-text-aqua">
                Feel Something.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-16">
            {[
              {
                title: "Dreamy Waffles",
                desc: "Crisp, indulgent, unforgettable. Each one a golden masterpiece pressed with patience and love.",
                emoji: "🧇",
              },
              {
                title: "Thick Shakes",
                desc: "So rich, you'll need a spoon. Every sip is a journey through layers of indulgent flavor.",
                emoji: "🥤",
              },
              {
                title: "Celebration Cakes",
                desc: "Layered happiness for your special moments. Because milestones deserve something extraordinary.",
                emoji: "🎂",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`experience-card reveal delay-${(i + 1) * 100}`}
              >
                <div className="text-5xl mb-6">{item.emoji}</div>
                <h3 className="font-display text-2xl mb-4" style={{ color: "#083E45" }}>
                  {item.title}
                </h3>
                <p className="leading-[1.8] text-[0.95rem]" style={{ color: "#3A6E76" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-400">
            <Link
              to="/menu-gallery"
              className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-base"
            >
              <span>View Full Menu</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 6 — A NOTE FROM THE FOUNDER
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ background: "#EAF8FA", padding: "8rem 0" }}>
        {/* Atmospheric glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(25,180,198,0.08), transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="founder-note reveal">
            <span className="section-tag mb-8 inline-flex">
              <Sparkles size={13} />
              A Personal Note
            </span>

            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl mb-10"
              style={{ color: "#083E45", letterSpacing: "-0.01em" }}
            >
              From Our Heart
              <br />
              <span className="italic gradient-text-aqua">to Your Table.</span>
            </h2>

            <p
              className="text-base md:text-lg leading-[2] mb-8 font-light reveal delay-200"
              style={{ color: "#3A6E76" }}
            >
              When I started Dezzove, I didn't have a business plan. I had a waffle iron, my grandmother's recipe,
              and this stubborn belief that food should make people feel something. Every evening at the café,
              I watch strangers become friends over shared plates. I watch couples steal bites from each other.
              I watch parents surprise their kids with an extra scoop.
            </p>

            <p
              className="text-base md:text-lg leading-[2] mb-10 font-light reveal delay-300"
              style={{ color: "#3A6E76" }}
            >
              That's what this place is about. Not just desserts — but the spaces between the bites.
              The laughter. The "remember when." The late nights that turn into lifelong memories.
            </p>

            <div className="reveal delay-400">
              <p className="signature">— The Founder</p>
              <p className="text-sm mt-2" style={{ color: "#5E8C92" }}>Dezzove, since day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 7 — TESTIMONIALS
          ===================================================== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#D6F0F3", padding: "9rem 0" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <span className="section-tag mb-6 inline-flex">
              <Quote size={13} />
              Testimonials
            </span>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-[3.5rem]"
              style={{ color: "#083E45", letterSpacing: "-0.01em" }}
            >
              Sweet Words From
              <br />
              <span className="italic gradient-text-aqua">
                Our Guests
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="testimonial-card reveal delay-100">
              <p className="text-lg md:text-xl leading-[1.85] mb-8 font-light italic pl-4" style={{ color: "#083E45" }}>
                "Dezzove is my midnight therapy. The chocolate lava cake never disappoints. It's the one place where I feel time stops."
              </p>
              <div className="flex items-center gap-4 pl-4">
                <div className="w-12 h-12 rounded-full overflow-hidden" style={{ boxShadow: "0 4px 15px rgba(25,180,198,0.15)" }}>
                  <img
                    src="/customer-1.jpg"
                    alt="Guest"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#083E45" }}>A Happy Guest</p>
                  <p className="text-xs" style={{ color: "#5E8C92" }}>Regular Visitor</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal delay-200">
              <p className="text-lg md:text-xl leading-[1.85] mb-8 font-light italic pl-4" style={{ color: "#083E45" }}>
                "It's not just dessert. It's where our friend group meets every weekend. The thick shakes and late-night laughter — that's our thing."
              </p>
              <div className="flex items-center gap-4 pl-4">
                <div className="w-12 h-12 rounded-full overflow-hidden" style={{ boxShadow: "0 4px 15px rgba(25,180,198,0.15)" }}>
                  <img
                    src="/customer-2.jpg"
                    alt="Guest"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#083E45" }}>Weekend Regulars</p>
                  <p className="text-xs" style={{ color: "#5E8C92" }}>Friend Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POETIC DIVIDER */}
      <div className="poetic-divider reveal" style={{ background: "#F2FBFC" }}>
        <p>"Come as you are. Leave a little sweeter."</p>
      </div>

      {/* =====================================================
          SECTION 8 — VISIT US (CTA - CINEMATIC)
          ===================================================== */}
      <section className="relative overflow-hidden" style={{ padding: "9rem 0" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/store-front.jpg"
            alt="Dezzove storefront"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,108,120,0.8) 0%, rgba(25,180,198,0.65) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-block font-handwritten text-xl mb-8 reveal"
            style={{ color: "rgba(25,180,198,0.7)" }}
          >
            Your table is waiting
          </span>

          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-10 leading-[1.08] reveal delay-100"
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.2)",
              letterSpacing: "-0.02em",
            }}
          >
            Come Stay
            <br />
            <span className="italic gradient-text-aqua" style={{ fontSize: "1.1em" }}>
              A While.
            </span>
          </h2>

          <div className="space-y-3 mb-14 reveal delay-200">
            <p className="text-white/60 text-lg md:text-xl font-light">Open till midnight.</p>
            <p className="text-white/60 text-lg md:text-xl font-light">Freshly made.</p>
            <p className="text-white/60 text-lg md:text-xl font-light">Always worth the drive.</p>
          </div>

          <div className="flex flex-wrap gap-5 justify-center reveal delay-300">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base tracking-wide hover:scale-105 transition-all duration-400 shadow-lg"
              style={{ background: "#FFFFFF", color: "#0F6C78" }}
            >
              <MapPin size={18} />
              <span>Find Our Location</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-400 hover:scale-105"
              style={{
                border: "2px solid rgba(255,255,255,0.35)",
                color: "#FFFFFF",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <CalendarCheck size={18} />
              <span>Reserve a Table</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
          ===================================================== */}
      <Footer />
    </div>
  );
}
