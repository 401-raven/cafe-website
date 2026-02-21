import { Link } from "react-router-dom";
import { Instagram, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mocha-gradient py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display font-bold text-xl text-primary-foreground mb-3">Dezzove</h3>
            <p className="text-sm" style={{ color: "rgba(245,234,214,0.7)" }}>
              Where sweet dreams come true. Artisan desserts crafted with love.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-foreground mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Menu & Gallery", to: "/menu-gallery" },
                { label: "Our Specials", to: "/our-specials" },
                { label: "Contact Us", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-primary-foreground"
                    style={{ color: "rgba(245,234,214,0.6)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary-foreground mb-3 text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/dezzove"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <Instagram size={18} color="white" />
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Banner */}
        <div
          className="rounded-2xl p-6 text-center mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <h3 className="font-display font-bold text-2xl md:text-3xl text-primary-foreground mb-2">
            🎉 Join us at only ₹9,999 - ₹16,999 only! 🎉
          </h3>
          <p className="text-sm" style={{ color: "rgba(245,234,214,0.7)" }}>
            Special packages available for parties and celebrations
          </p>
        </div>

        <div className="border-t pt-6 text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className="text-xs flex items-center justify-center gap-1" style={{ color: "rgba(245,234,214,0.5)" }}>
            Made with <Heart size={12} fill="currentColor" /> by Dezzove © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
