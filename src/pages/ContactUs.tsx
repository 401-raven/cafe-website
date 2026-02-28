import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/DezzoveNavbar";

export default function ContactUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroScaleRef = useRef<HTMLDivElement>(null);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showWhatsAppFloat, setShowWhatsAppFloat] = useState(false);
  const [instaHovered, setInstaHovered] = useState(false);

  useEffect(() => {
    // Intersection Observer for .in-view triggers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll(".cine-section");
    sections.forEach((s) => observer.observe(s));

    // Stagger reveal elements inside each section
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    const staggerEls = document.querySelectorAll(".cine-reveal");
    staggerEls.forEach((el) => staggerObserver.observe(el));

    // Map overlay — fades in when Scene 2 address hits 50%
    const mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mapOverlayRef.current) {
            mapOverlayRef.current.classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    const scene2 = document.getElementById("scene-invitation");
    if (scene2) mapObserver.observe(scene2);

    // WhatsApp float — appears after 60% scroll
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowWhatsAppFloat(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const scene3 = document.getElementById("scene-intimacy");
    if (scene3) scrollObserver.observe(scene3);

    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
      mapObserver.disconnect();
      scrollObserver.disconnect();
    };
  }, []);

  // Parallax zoom on scroll for hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroScaleRef.current) {
        const scrollY = window.scrollY;
        const sectionHeight = window.innerHeight;
        const scale = 1 + (scrollY / sectionHeight) * 0.08;
        heroScaleRef.current.style.transform = `scale(${Math.min(scale, 1.08)})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your message has been sent 💫\nWe'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // Premium click transitions
  const handleMapClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const overlay = document.createElement("div");
    overlay.className = "cine-page-fade";
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("active"));
    setTimeout(() => {
      window.open(
        "https://www.google.com/maps/dir/?api=1&destination=123+Street+Street+Dessert+Lane+City+Center+India",
        "_blank"
      );
      overlay.classList.remove("active");
      setTimeout(() => overlay.remove(), 400);
    }, 350);
  }, []);

  const handleWhatsAppClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.add("cine-ripple");
    setTimeout(() => {
      window.open("https://wa.me/919999999999", "_blank");
      target.classList.remove("cine-ripple");
    }, 300);
  }, []);

  const handleInstaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.style.letterSpacing = "0.3em";
    target.style.opacity = "1";
    setTimeout(() => {
      window.open("https://instagram.com/dezzove", "_blank");
      target.style.letterSpacing = "";
      target.style.opacity = "";
    }, 400);
  }, []);

  return (
    <div className="cine-contact-page" ref={containerRef}>
      <Navbar />

      {/* ==============================
          SCENE 1 — THE EMOTIONAL HOOK
          ============================== */}
      <section className="cine-section cine-scene-1" id="scene-memory">
        <div className="cine-bg-layer" ref={heroScaleRef}>
          <img src="/contact-hero-night.png" alt="" className="cine-bg-img" />
          <div className="cine-bg-overlay cine-overlay-dark" />
        </div>
        <div className="cine-grain" />

        <div className="cine-center-content">
          <h1 className="cine-headline cine-reveal">
            Still thinking about that first bite?
          </h1>
          <p className="cine-subtext cine-reveal cine-reveal-delay-1">
            Maybe it's time to come back.
          </p>
        </div>
      </section>

      {/* ==============================
          SCENE 2 — THE VISIT EXPERIENCE
          + Ambient Map Overlay
          ============================== */}
      <section className="cine-section cine-scene-2" id="scene-invitation">
        <div className="cine-bg-layer">
          <img src="/contact-interior-warm.png" alt="" className="cine-bg-img" />
          <div className="cine-bg-overlay cine-overlay-warm" />
        </div>

        {/* Ambient map — fades behind text like a memory */}
        <div className="cine-map-overlay" ref={mapOverlayRef}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dezzove Location"
            tabIndex={-1}
          />
        </div>

        <div className="cine-grain" />

        <div className="cine-left-content">
          <p className="cine-visit-line cine-reveal">
            Our doors stay open long after the city slows down.
          </p>

          <div className="cine-visit-address cine-reveal cine-reveal-delay-1">
            <span className="cine-address-line">123 Street Street, Dessert Lane</span>
            <span className="cine-address-line">City Center, India</span>
          </div>

          <div className="cine-visit-hours cine-reveal cine-reveal-delay-2">
            <span>Mon–Fri · 11 AM – 11 PM</span>
            <span>Sat–Sun · 10 AM – 12 AM</span>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=123+Street+Street+Dessert+Lane+City+Center+India"
            onClick={handleMapClick}
            className="cine-cta-link cine-reveal cine-reveal-delay-3"
          >
            <span className="cine-cta-arrow">→</span>
            <span className="cine-cta-text">Find your way here</span>
          </a>
        </div>
      </section>

      {/* ==============================
          SCENE 3 — REACH OUT (EDITORIAL FORM)
          + WhatsApp Whisper Link
          ============================== */}
      <section className="cine-section cine-scene-3" id="scene-intimacy">
        <div className="cine-bg-layer">
          <img
            src="/milkshake-closeup.jpg"
            alt=""
            className="cine-bg-img"
            style={{ filter: "blur(6px)" }}
          />
          <div className="cine-bg-overlay cine-overlay-deep" />
        </div>
        <div className="cine-grain" />

        <div className="cine-split-content">
          {/* Left: Editorial copy + WhatsApp whisper */}
          <div className="cine-editorial-left cine-reveal">
            <h2 className="cine-editorial-headline">
              Let's create something beautiful.
            </h2>
            <div className="cine-editorial-body">
              <p>Planning a celebration?</p>
              <p>A midnight craving?</p>
              <p>Or just want to say hi?</p>
              <br />
              <p className="cine-editorial-emphasis">We're always listening.</p>
              <a
                href="https://wa.me/919999999999"
                onClick={handleWhatsAppClick}
                className="cine-whisper-link"
              >
                Or talk to us instantly →
              </a>
            </div>
          </div>

          {/* Right: Floating form */}
          <div className="cine-form-right cine-reveal cine-reveal-delay-1">
            <form onSubmit={handleSubmit} className="cine-form">
              <div className="cine-field">
                <label
                  className={`cine-label ${focusedField === "name" || formData.name ? "cine-label-float" : ""
                    }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="cine-input"
                />
                <div className={`cine-input-line ${focusedField === "name" ? "cine-line-active" : ""}`} />
              </div>

              <div className="cine-field">
                <label
                  className={`cine-label ${focusedField === "email" || formData.email ? "cine-label-float" : ""
                    }`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="cine-input"
                />
                <div className={`cine-input-line ${focusedField === "email" ? "cine-line-active" : ""}`} />
              </div>

              <div className="cine-field">
                <label
                  className={`cine-label ${focusedField === "phone" || formData.phone ? "cine-label-float" : ""
                    }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="cine-input"
                />
                <div className={`cine-input-line ${focusedField === "phone" ? "cine-line-active" : ""}`} />
              </div>

              <div className="cine-field">
                <label
                  className={`cine-label cine-label-textarea ${focusedField === "message" || formData.message ? "cine-label-float" : ""
                    }`}
                >
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className="cine-input cine-textarea"
                />
                <div className={`cine-input-line ${focusedField === "message" ? "cine-line-active" : ""}`} />
              </div>

              <button type="submit" className="cine-submit-btn">
                <span>Let's make it memorable</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==============================
          SCENE 4 — THE AFTERTASTE
          + Enhanced Instagram Integration
          ============================== */}
      <section
        className={`cine-section cine-scene-4 ${instaHovered ? "cine-insta-glow" : ""}`}
        id="scene-aftertaste"
        ref={scene4Ref}
      >
        <div className="cine-bg-layer cine-gradient-bg" />
        <div className="cine-grain" />

        <div className="cine-center-content cine-aftertaste-content">
          <a
            href="https://instagram.com/dezzove"
            onClick={handleInstaClick}
            onMouseEnter={() => setInstaHovered(true)}
            onMouseLeave={() => setInstaHovered(false)}
            className="cine-insta-handle cine-reveal"
          >
            @dezzove
          </a>

          <div className="cine-mini-divider cine-reveal cine-reveal-delay-1" />

          <p className="cine-closing-line cine-reveal cine-reveal-delay-2">
            See you at midnight.
          </p>
        </div>
      </section>

      {/* ==============================
          FLOATING WHATSAPP — Ambient
          ============================== */}
      <a
        href="https://wa.me/919999999999"
        onClick={handleWhatsAppClick}
        className={`cine-wa-float ${showWhatsAppFloat ? "cine-wa-visible" : ""}`}
      >
        Talk to us
      </a>
    </div>
  );
}
