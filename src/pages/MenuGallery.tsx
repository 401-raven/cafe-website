import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Star, Instagram, Heart, MessageCircle, Bookmark } from "lucide-react";
import Navbar from "@/components/DezzoveNavbar";
import Footer from "@/components/Footer";

type MenuItem = {
  id: number;
  name: string;
  desc: string;
  price: string;
  category: string;
  emoji: string;
  badge?: string;
  rating: number;
  gradient: string;
};

const categories = [
  { id: "all", label: "All Items", emoji: "✨" },
  { id: "shakes", label: "Thick Shakes", emoji: "🥤" },
  { id: "waffles", label: "Waffles", emoji: "🧇" },
  { id: "cakes", label: "Cakes & Slices", emoji: "🍰" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "specials", label: "Specials", emoji: "⭐" },
];

const menuItems: MenuItem[] = [
  { id: 1, name: "Nutella Dream Shake", desc: "Thick creamy Nutella shake with whipped cream and hazelnut crumble", price: "₹199", category: "shakes", emoji: "🥤", badge: "bestseller", rating: 4.9, gradient: "linear-gradient(135deg, #c8a87a, #826a45)" },
  { id: 2, name: "Strawberry Cloud Shake", desc: "Fresh strawberry purée blended with vanilla ice cream and cream clouds", price: "₹179", category: "shakes", emoji: "🍓", badge: "new", rating: 4.8, gradient: "linear-gradient(135deg, #e8a0a0, #f2c4c4)" },
  { id: 3, name: "Belgian Waffle Stack", desc: "Crispy golden waffles with maple syrup, berries, and whipped cream", price: "₹229", category: "waffles", emoji: "🧇", badge: "hot", rating: 4.9, gradient: "linear-gradient(135deg, #d4956a, #f9e4c8)" },
  { id: 4, name: "Choco Lava Waffle", desc: "Warm waffle infused with dark chocolate and vanilla gelato", price: "₹249", category: "waffles", emoji: "🍫", rating: 4.7, gradient: "linear-gradient(135deg, #3d2b1f, #826a45)" },
  { id: 5, name: "Dezzove Signature Cake", desc: "6-layer mocha-caramel cake with gold drip and edible flowers", price: "₹149/slice", category: "cakes", emoji: "🎂", badge: "bestseller", rating: 5.0, gradient: "linear-gradient(135deg, #826a45, #c8a87a)" },
  { id: 6, name: "Red Velvet Slice", desc: "Classic red velvet with cream cheese frosting and velvet crumbs", price: "₹129/slice", category: "cakes", emoji: "🍰", rating: 4.8, gradient: "linear-gradient(135deg, #c05a5a, #e8a0a0)" },
  { id: 7, name: "Caramel Dalgona Latte", desc: "Signature dalgona coffee with house-made caramel sauce over iced milk", price: "₹159", category: "coffee", emoji: "☕", badge: "new", rating: 4.9, gradient: "linear-gradient(135deg, #5c4a30, #d4956a)" },
  { id: 8, name: "Hot Chocolate Supreme", desc: "Rich Belgian dark chocolate with marshmallows and cocoa dusting", price: "₹149", category: "coffee", emoji: "🍵", rating: 4.7, gradient: "linear-gradient(135deg, #3d2b1f, #c8a87a)" },
  { id: 9, name: "Cheesecake Overload", desc: "New York baked cheesecake with mixed berry compote and lotus crumble", price: "₹199", category: "specials", emoji: "🫐", badge: "hot", rating: 5.0, gradient: "linear-gradient(135deg, #826a45, #f2c4c4)" },
  { id: 10, name: "Mango Tango Shake", desc: "Thick Alphonso mango shake with mango coulis and dried mango chips", price: "₹189", category: "shakes", emoji: "🥭", rating: 4.8, gradient: "linear-gradient(135deg, #d4956a, #f9e4c8)" },
  { id: 11, name: "Truffle Waffle Delight", desc: "Waffle with mushroom truffle glaze, smoked cheese, and microgreens", price: "₹269", category: "waffles", emoji: "🌿", rating: 4.7, gradient: "linear-gradient(135deg, #5c4a30, #826a45)" },
  { id: 12, name: "Dezzove Special Platter", desc: "A curated dessert board with 5 chef's picks — perfect for sharing", price: "₹449", category: "specials", emoji: "🎭", badge: "bestseller", rating: 5.0, gradient: "linear-gradient(135deg, #826a45, #d4956a)" },
];

const galleryItems = [
  { id: 1, emoji: "🍰", label: "Signature Cake", likes: "2.4K", comments: "143", bg: "linear-gradient(135deg, #826a45, #c8a87a)", span: "col-span-1 row-span-2" },
  { id: 2, emoji: "🥤", label: "Mango Shake", likes: "1.8K", comments: "89", bg: "linear-gradient(135deg, #d4956a, #f9e4c8)", span: "col-span-1 row-span-1" },
  { id: 3, emoji: "🧇", label: "Belgian Waffle", likes: "3.1K", comments: "201", bg: "linear-gradient(135deg, #5c4a30, #d4956a)", span: "col-span-1 row-span-1" },
  { id: 4, emoji: "🍫", label: "Choco Lava", likes: "2.9K", comments: "178", bg: "linear-gradient(135deg, #3d2b1f, #826a45)", span: "col-span-2 row-span-1" },
  { id: 5, emoji: "🦄", label: "Unicorn Shake", likes: "5.2K", comments: "312", bg: "linear-gradient(135deg, #c05a5a, #f2c4c4)", span: "col-span-1 row-span-1" },
  { id: 6, emoji: "☕", label: "Dalgona Latte", likes: "1.6K", comments: "97", bg: "linear-gradient(135deg, #5c4a30, #a8885a)", span: "col-span-1 row-span-1" },
  { id: 7, emoji: "🍓", label: "Strawberry Cake", likes: "2.2K", comments: "134", bg: "linear-gradient(135deg, #e8a0a0, #fdf8f0)", span: "col-span-1 row-span-2" },
  { id: 8, emoji: "🎂", label: "Birthday Cake", likes: "4.1K", comments: "256", bg: "linear-gradient(135deg, #826a45, #f2c4c4)", span: "col-span-1 row-span-1" },
];

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div
      className="card-hover rounded-2xl overflow-hidden bg-card"
      style={{ border: "1px solid hsla(195,70%,38%,0.1)", boxShadow: "0 4px 20px hsla(195,70%,38%,0.06)" }}
    >
      <div className="relative h-44 flex items-center justify-center" style={{ background: item.gradient }}>
        <span className="text-6xl">{item.emoji}</span>
        {item.badge && (
          <div className={`badge-${item.badge} absolute top-3 right-3`}>
            {item.badge === "new" ? "New" : item.badge === "hot" ? "🔥 Hot" : "⭐ Bestseller"}
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 glass px-2.5 py-1 rounded-full">
          <Star size={10} fill="#d4956a" stroke="none" />
          <span className="text-xs font-bold text-primary">{item.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-base mb-1 text-foreground">{item.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg gradient-text">{item.price}</span>
          <button className="btn-primary py-2 px-4 text-xs" onClick={() => alert(`${item.name} added to your order!`)}>
            <ShoppingCart size={12} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GalleryItem({ item }: { item: typeof galleryItems[0] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className={`insta-item ${item.span}`} style={{ minHeight: "180px" }}>
      <div className="w-full h-full flex items-center justify-center rounded-2xl" style={{ background: item.bg, minHeight: "inherit" }}>
        <span className="text-5xl pointer-events-none">{item.emoji}</span>
      </div>
      <div className="insta-overlay">
        <div className="flex flex-col items-center gap-3 p-4 w-full">
          <p className="font-display font-bold text-sm text-center text-primary-foreground">{item.label}</p>
          <div className="flex items-center gap-4 text-xs text-primary-foreground">
            <span className="flex items-center gap-1.5">
              <Heart size={14} fill="white" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle size={14} fill="white" stroke="none" />
              {item.comments}
            </span>
          </div>
          <div className="flex gap-3 mt-1">
            <button
              onClick={() => setLiked(!liked)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: liked ? "#c05a5a" : "rgba(255,255,255,0.25)" }}
            >
              <Heart size={14} fill={liked ? "white" : "none"} stroke="white" />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: saved ? "#826a45" : "rgba(255,255,255,0.25)" }}
            >
              <Bookmark size={14} fill={saved ? "white" : "none"} stroke="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "all" ? menuItems : menuItems.filter((m) => m.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        sectionRef.current?.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      }, 50);
    }
  }, [activeCategory, visible]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Menu Section */}
      <section className="section-pad bg-dessert-gradient pt-28" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="section-tag mb-4 inline-flex">🍽️ Our Menu</span>
            <h2 className="font-display font-bold mb-4 text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
              Taste the <span className="gradient-text italic">Magic</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              From thick shakes that hit different to waffles that break the internet — explore our full menu of handcrafted delights.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center mb-10 reveal">
            {categories.map((cat) => (
              <button key={cat.id} className={`menu-filter-btn ${activeCategory === cat.id ? "active" : ""}`} onClick={() => setActiveCategory(cat.id)}>
                <span className="mr-1">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div key={activeCategory} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-pad bg-cream-gradient" ref={galleryRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div className="reveal">
              <span className="section-tag mb-4 inline-flex">
                <Instagram size={12} />
                Gallery
              </span>
              <h2 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                Sweet <span className="gradient-text italic">Moments</span> Worth Sharing
              </h2>
            </div>
            <div className="reveal-right">
              <a href="https://instagram.com/dezzove" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex text-xs">
                <Instagram size={14} />
                <span>Follow @dezzove</span>
              </a>
            </div>
          </div>

          <div className="grid gap-3 reveal" style={{ gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "180px" }}>
            {galleryItems.map((item) => (
              <GalleryItem key={item.id} item={item} />
            ))}
          </div>

          {/* Social proof strip with Instagram button */}
          <div className="mt-10 reveal">
            <div className="social-card flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary-gradient">
                  <Instagram size={22} color="white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Share your Dezzove moment</h4>
                  <p className="text-sm text-muted-foreground">
                    Tag <strong className="text-primary">@dezzove</strong> or use <strong className="text-primary">#DezzoveMoments</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <div className="font-display font-bold text-xl gradient-text">24K+</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-xl gradient-text">5K+</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <a href="https://instagram.com/dezzove" target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2.5 px-5">
                  <span>Follow Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
