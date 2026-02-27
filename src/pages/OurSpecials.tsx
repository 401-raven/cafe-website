import { useEffect, useRef } from "react";
import { Flame, TrendingUp, Star } from "lucide-react";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";

const specials = [
    {
      id: 1,
      name: "The Dezzove Tower",
      desc: "A showstopper 5-layer chocolate tower with gold leaf, dark chocolate shards, and a molten core. Our most-photographed creation.",
      price: "₹549",
      tag: "#1 Trending",
      emoji: "🏆",
      color: "#0c3547",
      accent: "#1a7fa8",
      stats: { orders: "200+/week", rating: "5.0", saves: "12K+" },
    },
    {
      id: 2,
      name: "Unicorn Shake Jar",
      desc: "A pastel rainbow thick shake in a mason jar — layered butterfly pea, mango, and strawberry, topped with cotton candy clouds.",
      price: "₹299",
      tag: "Most Shared",
      emoji: "🦄",
      color: "#c05a5a",
      accent: "#e8a0a0",
      stats: { orders: "180+/week", rating: "4.9", saves: "18K+" },
    },
    {
      id: 3,
      name: "Caramel Cloud Waffle",
      desc: "Japanese-style fluffy soufflé waffle with burnt caramel sauce, praline dust, and a scoop of salted caramel gelato.",
      price: "₹349",
      tag: "Chef's Pick",
      emoji: "☁️",
      color: "#1a5070",
      accent: "#3aa8d0",
      stats: { orders: "150+/week", rating: "4.9", saves: "9K+" },
    },
];

const ticker = [
  "🥤 Thick Shakes from ₹149",
  "🧇 Waffles from ₹199",
  "🍰 Cake Slices from ₹99",
  "☕ Beverages from ₹79",
  "🎂 Custom Cakes available",
  "🚀 Open until 11 PM daily",
];

export default function OurSpecials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="section-pad bg-mocha-gradient relative overflow-hidden pt-28" ref={sectionRef}>
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 reveal">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(255,255,255,0.12)", color: "#f5ead6", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Flame size={12} />
              Trending Now
            </span>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "white" }}>
              Our <span style={{ color: "#d4956a" }} className="italic">Signature</span> Specials
            </h2>
            <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "rgba(245,234,214,0.8)" }}>
              These aren't just desserts — they're moments. Our most-loved, most-shared, most-craved creations that keep you coming back.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {specials.map((item, idx) => {
              const delays = ["reveal-left", "reveal", "reveal-right"];
              return (
                <div
                  key={item.id}
                  className={`${delays[idx]} group relative rounded-3xl overflow-hidden`}
                  style={{ background: `linear-gradient(160deg, ${item.color}F0 0%, ${item.accent}CC 100%)`, minHeight: "420px" }}
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500" style={{ background: "rgba(255,255,255,0.3)" }} />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-15 group-hover:scale-125 transition-transform duration-500" style={{ background: "rgba(255,255,255,0.2)" }} />

                  <div className="relative z-10 p-7 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.95)" }}>
                        <TrendingUp size={10} />
                        {item.tag}
                      </span>
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display font-bold text-2xl mb-3" style={{ lineHeight: 1.2, color: "white" }}>{item.name}</h3>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>{item.desc}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-5 rounded-2xl p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                      <div className="text-center">
                        <div className="font-bold text-xs" style={{ color: "white" }}>{item.stats.orders}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Orders</div>
                      </div>
                      <div className="text-center border-x" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                        <div className="font-bold text-xs flex items-center justify-center gap-0.5" style={{ color: "white" }}>
                          <Star size={9} fill="white" stroke="none" />
                          {item.stats.rating}
                        </div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-xs" style={{ color: "white" }}>{item.stats.saves}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Saves</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-2xl" style={{ color: "white" }}>{item.price}</span>
                      <button className="btn-white text-xs py-2.5 px-5" onClick={() => alert(`${item.name} added to order!`)}>
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticker */}
        <div className="py-4 overflow-hidden" style={{ background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="ticker-inner whitespace-nowrap">
            {[...ticker, ...ticker, ...ticker].map((item, idx) => (
              <span key={idx} className="inline-flex items-center mx-8 text-sm font-semibold" style={{ color: "rgba(245,234,214,0.85)" }}>
                {item}
                <span className="mx-8 opacity-40">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
