import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";

/* ───────────────────────────────────────────
   AQUA PARTICLE BACKGROUND
   ─────────────────────────────────────────── */
function AquaParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; o: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.3 - 0.15,
        o: Math.random() * 0.35 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(25,180,198,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ───────────────────────────────────────────
   WAVE ANIMATION FOR DIVIDERS
   ─────────────────────────────────────────── */
function WaveAnimation() {
  return (
    <svg
      viewBox="0 0 1440 120"
      style={{ width: "100%", height: "80px", display: "block" }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(25,180,198,0.1)" />
          <stop offset="50%" stopColor="rgba(25,180,198,0.25)" />
          <stop offset="100%" stopColor="rgba(25,180,198,0.1)" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
        fill="url(#waveGrad)"
      >
        <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="
            M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z;
            M0,80 C240,20 480,100 720,40 C960,80 1200,20 1440,80 L1440,120 L0,120 Z;
            M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z
          "
        />
      </path>
      <path
        d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z"
        fill="rgba(25,180,198,0.08)"
      >
        <animate
          attributeName="d"
          dur="8s"
          repeatCount="indefinite"
          values="
            M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z;
            M0,60 C360,100 720,40 1080,80 C1260,60 1380,40 1440,60 L1440,120 L0,120 Z;
            M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z
          "
        />
      </path>
    </svg>
  );
}

/* ───────────────────────────────────────────
   SCROLL-DRIVEN REVEAL HOOK
   ─────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scene-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    const revealEls = el.querySelectorAll(".scene-reveal");
    revealEls.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ───────────────────────────────────────────
   PARALLAX SCROLL HOOK
   ─────────────────────────────────────────── */
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = 1 - (rect.top + rect.height) / (windowH + rect.height);
    setOffset(Math.max(0, Math.min(1, progress)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { ref, offset };
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function OurSpecials() {
  const heroRef = useScrollReveal();
  const scene1Ref = useScrollReveal();
  const scene2Ref = useScrollReveal();
  const scene3Ref = useScrollReveal();
  const closingRef = useScrollReveal();

  const p1 = useParallax();
  const p2 = useParallax();
  const p3 = useParallax();

  return (
    <div style={{ background: "#060D10" }}>
      <Navbar />

      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(180deg, #060D10 0%, #083E45 50%, #060D10 100%)",
          overflow: "hidden",
        }}
      >
        <AquaParticles />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 2rem" }}>
          <h1
            className="scene-reveal font-display"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Our Signature Creations
          </h1>
          <div
            className="scene-reveal"
            style={{
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.9,
            }}
          >
            <p style={{ color: "rgba(242,251,252,0.7)", fontSize: "1.05rem", fontStyle: "italic" }}>
              Not trends.
            </p>
            <p style={{ color: "rgba(242,251,252,0.7)", fontSize: "1.05rem", fontStyle: "italic" }}>
              Not just desserts.
            </p>
            <p style={{ color: "rgba(242,251,252,0.55)", fontSize: "1.05rem", fontStyle: "italic" }}>
              Moments engineered to stay with you.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scene-reveal"
          style={{
            position: "absolute",
            bottom: "3rem",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <p
            className="font-handwritten"
            style={{
              color: "rgba(25,180,198,0.6)",
              fontSize: "1.15rem",
              marginBottom: "0.75rem",
              letterSpacing: "0.04em",
            }}
          >
            Begin the experience
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "bounce-gentle 2s ease-in-out infinite",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(25,180,198,0.5)" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SCENE 1 — THE DEZZOVE TOWER
          ════════════════════════════════════════ */}
      <section
        ref={(el) => {
          (scene1Ref as any).current = el;
          (p1.ref as any).current = el;
        }}
        style={{
          position: "relative",
          minHeight: "120vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Parallax background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/dezzove-tower.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: `scale(${1 + p1.offset * 0.08})`,
            transition: "transform 0.1s linear",
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(8,62,69,0.55) 0%, rgba(8,62,69,0.75) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <h2
            className="scene-reveal font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "#FFFFFF",
              marginBottom: "1rem",
              letterSpacing: "-0.01em",
            }}
          >
            The Dezzove Tower
          </h2>

          <p
            className="scene-reveal"
            style={{
              color: "rgba(25,180,198,0.8)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              marginBottom: "2.5rem",
              transitionDelay: "0.2s",
            }}
          >
            Five layers. No restraint.
          </p>

          <div style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            {[
              "A towering composition of dark chocolate sponge,",
              "brushed with espresso warmth,",
              "layered with molten ganache that refuses to behave.",
              "",
              "Gold leaf catches the light.",
              "Chocolate shards crack under pressure.",
              "The center? Still warm.",
              "",
              "This isn't dessert.",
              "It's architecture in motion.",
            ].map((line, i) => (
              <p
                key={i}
                className="scene-reveal"
                style={{
                  color: line === "" ? "transparent" : "rgba(242,251,252,0.75)",
                  fontSize: "1.05rem",
                  lineHeight: line === "" ? "0.8" : "1.85",
                  transitionDelay: `${0.4 + i * 0.12}s`,
                  fontStyle: line.startsWith("This") || line.startsWith("It's") ? "italic" : "normal",
                  fontWeight: line.startsWith("This") || line.startsWith("It's") ? 500 : 400,
                }}
              >
                {line || "\u00A0"}
              </p>
            ))}
          </div>

          <a
            href="/contact"
            className="scene-reveal"
            style={{
              display: "inline-block",
              marginTop: "3rem",
              color: "rgba(25,180,198,0.7)",
              fontSize: "0.95rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1px solid rgba(25,180,198,0.3)",
              paddingBottom: "4px",
              transition: "all 0.4s ease",
              transitionDelay: "1.8s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(25,180,198,1)";
              e.currentTarget.style.borderBottomColor = "rgba(25,180,198,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(25,180,198,0.7)";
              e.currentTarget.style.borderBottomColor = "rgba(25,180,198,0.3)";
            }}
          >
            Experience It In Store
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRANSITION DIVIDER 1
          ════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #060D10 0%, #0A1F24 50%, #060D10 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Mist effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(25,180,198,0.06) 0%, transparent 70%)",
          }}
        />
        <WaveAnimation />
        <p
          className="font-display"
          style={{
            color: "rgba(242,251,252,0.45)",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontStyle: "italic",
            textAlign: "center",
            padding: "0 2rem",
            zIndex: 1,
          }}
        >
          "Some creations demand attention."
        </p>
        <WaveAnimation />
      </section>

      {/* ════════════════════════════════════════
          SCENE 2 — UNICORN SHAKE JAR
          ════════════════════════════════════════ */}
      <section
        ref={(el) => {
          (scene2Ref as any).current = el;
          (p2.ref as any).current = el;
        }}
        style={{
          position: "relative",
          minHeight: "120vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Pastel gradient bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/unicorn-shake.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: `scale(${1 + p2.offset * 0.08})`,
            transition: "transform 0.1s linear",
          }}
        />
        {/* Color shift overlay — shifts hue with scroll */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              ${160 + p2.offset * 40}deg,
              rgba(192,90,138,${0.45 + p2.offset * 0.15}) 0%,
              rgba(120,80,180,${0.35 + p2.offset * 0.2}) 40%,
              rgba(8,62,69,${0.55 + p2.offset * 0.1}) 100%
            )`,
            transition: "background 0.3s ease",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <h2
            className="scene-reveal font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "#FFFFFF",
              marginBottom: "1rem",
              letterSpacing: "-0.01em",
            }}
          >
            Unicorn Shake Jar
          </h2>

          <p
            className="scene-reveal"
            style={{
              color: "rgba(232,160,200,0.9)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              marginBottom: "2.5rem",
              transitionDelay: "0.2s",
            }}
          >
            Chaos, but curated.
          </p>

          <div style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            {[
              "A layered spectrum of mango silk,",
              "strawberry brightness,",
              "blueberry depth.",
              "",
              "Cotton candy dissolves into cream.",
              "Butterfly pea shifts color with citrus.",
              "",
              "It looks playful.",
              "It tastes deliberate.",
              "",
              "Every sip rewrites the last.",
            ].map((line, i) => (
              <p
                key={i}
                className="scene-reveal"
                style={{
                  color: line === "" ? "transparent" : "rgba(255,255,255,0.8)",
                  fontSize: "1.05rem",
                  lineHeight: line === "" ? "0.8" : "1.85",
                  transitionDelay: `${0.4 + i * 0.12}s`,
                  fontStyle: line.startsWith("It ") || line.startsWith("Every") ? "italic" : "normal",
                  fontWeight: line.startsWith("Every") ? 500 : 400,
                }}
              >
                {line || "\u00A0"}
              </p>
            ))}
          </div>

          <a
            href="/contact"
            className="scene-reveal"
            style={{
              display: "inline-block",
              marginTop: "3rem",
              color: "rgba(232,160,200,0.7)",
              fontSize: "0.95rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1px solid rgba(232,160,200,0.3)",
              paddingBottom: "4px",
              transition: "all 0.4s ease",
              transitionDelay: "1.8s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(232,160,200,1)";
              e.currentTarget.style.borderBottomColor = "rgba(232,160,200,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(232,160,200,0.7)";
              e.currentTarget.style.borderBottomColor = "rgba(232,160,200,0.3)";
            }}
          >
            Catch The Drop
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRANSITION DIVIDER 2
          ════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #060D10 0%, #0A1F24 50%, #060D10 100%)",
          position: "relative",
        }}
      >
        <p
          className="font-display"
          style={{
            color: "rgba(242,251,252,0.35)",
            fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
            fontStyle: "italic",
            textAlign: "center",
            padding: "0 2rem",
            animation: "text-glow-pulse 4s ease-in-out infinite",
          }}
        >
          "Not everything sweet is subtle."
        </p>
      </section>

      {/* ════════════════════════════════════════
          SCENE 3 — CARAMEL CLOUD WAFFLE
          ════════════════════════════════════════ */}
      <section
        ref={(el) => {
          (scene3Ref as any).current = el;
          (p3.ref as any).current = el;
        }}
        style={{
          position: "relative",
          minHeight: "120vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/caramel-waffle.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: `scale(${1 + p3.offset * 0.08})`,
            transition: "transform 0.1s linear",
          }}
        />
        {/* Deep lagoon overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(8,62,69,0.6) 0%, rgba(6,13,16,0.75) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <h2
            className="scene-reveal font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "#FFFFFF",
              marginBottom: "1rem",
              letterSpacing: "-0.01em",
            }}
          >
            Caramel Cloud Waffle
          </h2>

          <p
            className="scene-reveal"
            style={{
              color: "rgba(212,149,106,0.9)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              marginBottom: "2.5rem",
              transitionDelay: "0.2s",
            }}
          >
            Impossible lightness. Impossible softness.
          </p>

          <div style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            {[
              "Japanese-style soufflé structure.",
              "Impossible lightness.",
              "Impossible softness.",
              "",
              "Burnt caramel sauce drips slowly.",
              "Praline dust catches in the corners.",
              "Salted caramel gelato melts just enough.",
              "",
              "The fork sinks in.",
              "The room goes quiet.",
              "",
              "This is comfort engineered.",
            ].map((line, i) => (
              <p
                key={i}
                className="scene-reveal"
                style={{
                  color: line === "" ? "transparent" : "rgba(242,251,252,0.75)",
                  fontSize: "1.05rem",
                  lineHeight: line === "" ? "0.8" : "1.85",
                  transitionDelay: `${0.4 + i * 0.12}s`,
                  fontStyle: line.startsWith("This") || line.startsWith("The fork") || line.startsWith("The room") ? "italic" : "normal",
                  fontWeight: line.startsWith("This") ? 500 : 400,
                }}
              >
                {line || "\u00A0"}
              </p>
            ))}
          </div>

          <a
            href="/contact"
            className="scene-reveal"
            style={{
              display: "inline-block",
              marginTop: "3rem",
              color: "rgba(212,149,106,0.7)",
              fontSize: "0.95rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1px solid rgba(212,149,106,0.3)",
              paddingBottom: "4px",
              transition: "all 0.4s ease",
              transitionDelay: "2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(212,149,106,1)";
              e.currentTarget.style.borderBottomColor = "rgba(212,149,106,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(212,149,106,0.7)";
              e.currentTarget.style.borderBottomColor = "rgba(212,149,106,0.3)";
            }}
          >
            Reserve Your Moment
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL SECTION — IMMERSIVE CLOSE
          ════════════════════════════════════════ */}
      <section
        ref={closingRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Night café background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/night-cafe.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(6,13,16,0.7) 0%, rgba(8,62,69,0.6) 50%, rgba(6,13,16,0.8) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "4rem 2rem",
            maxWidth: "700px",
          }}
        >
          <h2
            className="scene-reveal font-display"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              color: "#FFFFFF",
              lineHeight: 1.25,
              marginBottom: "2rem",
            }}
          >
            Some nights deserve more than ordinary.
          </h2>

          <div className="scene-reveal" style={{ transitionDelay: "0.3s" }}>
            <p style={{ color: "rgba(242,251,252,0.6)", fontSize: "1.05rem", lineHeight: 2 }}>
              We're open.
            </p>
            <p style={{ color: "rgba(242,251,252,0.6)", fontSize: "1.05rem", lineHeight: 2 }}>
              The lights are warm.
            </p>
            <p style={{ color: "rgba(242,251,252,0.6)", fontSize: "1.05rem", lineHeight: 2 }}>
              The spoons are ready.
            </p>
          </div>

          <a
            href="/contact"
            className="scene-reveal btn-primary"
            style={{
              display: "inline-flex",
              marginTop: "3rem",
              transitionDelay: "0.6s",
              fontSize: "0.85rem",
              padding: "1rem 2.5rem",
              letterSpacing: "0.14em",
            }}
          >
            <span>Visit Us Tonight</span>
          </a>
        </div>
      </section>

      <Footer />

      {/* ── SCOPED STYLES ── */}
      <style>{`
        /* Scene reveal animation */
        .scene-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .scene-reveal.scene-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Smooth scrollbar for the specials page */
        html {
          scroll-behavior: smooth;
        }

        /* Mobile: disable background-attachment fixed (unsupported on iOS) */
        @media (max-width: 768px) {
          section [style*="background-attachment: fixed"] {
            background-attachment: scroll !important;
          }
        }
      `}</style>
    </div>
  );
}
