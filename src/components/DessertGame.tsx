import { useEffect, useRef, useState, useCallback } from "react";

const DESSERTS = ['🍩', '🧁', '🍰', '🎂', '🍪', '🍫', '🍮', '🍭'];
const OCEAN = 'hsl(195,70%,38%)';
const TEAL = 'hsl(185,60%,42%)';
const CORAL = 'hsl(5,65%,60%)';

interface Item {
  x: number; y: number; size: number; speed: number;
  emoji: string; wobble: number; wobbleSpeed: number;
}
interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; r: number; color: string;
}

export default function DessertGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    score: 0, lives: 3, level: 1, combo: 0, frame: 0,
    items: [] as Item[], particles: [] as Particle[],
    plate: { x: 0, w: 80, y: 0, h: 22 },
    keys: {} as Record<string, boolean>,
    mouseX: null as number | null,
    spawnTimer: 0, spawnInterval: 90, fallSpeed: 2.2,
    running: false, canvasW: 420, canvasH: 520,
  });
  const [screen, setScreen] = useState<"start" | "playing" | "over">("start");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [finalScore, setFinalScore] = useState(0);
  const animRef = useRef<number>(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const maxW = Math.min(wrap.clientWidth, 520);
    const ratio = 520 / 420;
    const w = maxW;
    const h = w * ratio;
    canvas.width = w;
    canvas.height = h;
    const s = stateRef.current;
    s.canvasW = w;
    s.canvasH = h;
    s.plate.y = h - 40;
    s.plate.w = w * 0.19;
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => { stateRef.current.keys[e.key] = true; };
    const ku = (e: KeyboardEvent) => { stateRef.current.keys[e.key] = false; };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    stateRef.current.mouseX = clientX - r.left;
  }, []);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.score = 0; s.lives = 3; s.level = 1; s.combo = 0; s.frame = 0;
    s.items = []; s.particles = [];
    s.plate.x = s.canvasW / 2 - s.plate.w / 2;
    s.spawnInterval = 90; s.fallSpeed = 2.2; s.spawnTimer = 0;
    s.running = true;
    setScore(0); setLives(3); setLevel(1);
    setScreen("playing");
    cancelAnimationFrame(animRef.current);
    const loop = () => {
      if (!stateRef.current.running) return;
      update();
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const burst = (x: number, y: number, caught: boolean) => {
    const clr = caught ? TEAL : CORAL;
    const s = stateRef.current;
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      s.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1, alpha: 1, r: 3 + Math.random() * 3, color: clr });
    }
  };

  const update = () => {
    const s = stateRef.current;
    const { canvasW, canvasH } = s;
    const speed = 5.5 * (canvasW / 420);
    if (s.keys['ArrowLeft'] || s.keys['a'] || s.keys['A']) s.plate.x -= speed;
    if (s.keys['ArrowRight'] || s.keys['d'] || s.keys['D']) s.plate.x += speed;
    if (s.mouseX !== null) {
      const target = s.mouseX - s.plate.w / 2;
      s.plate.x += (target - s.plate.x) * 0.18;
    }
    s.plate.x = Math.max(0, Math.min(canvasW - s.plate.w, s.plate.x));

    s.spawnTimer++;
    if (s.spawnTimer >= s.spawnInterval) {
      const emoji = DESSERTS[Math.floor(Math.random() * DESSERTS.length)];
      s.items.push({ x: 20 + Math.random() * (canvasW - 40), y: -30, size: 28 + Math.random() * 10, speed: s.fallSpeed + Math.random() * 1.2, emoji, wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.04 + Math.random() * 0.03 });
      s.spawnTimer = 0;
      if (s.level >= 3 && Math.random() < 0.4) {
        const e2 = DESSERTS[Math.floor(Math.random() * DESSERTS.length)];
        s.items.push({ x: 20 + Math.random() * (canvasW - 40), y: -30, size: 28 + Math.random() * 10, speed: s.fallSpeed + Math.random() * 1.2, emoji: e2, wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.04 + Math.random() * 0.03 });
      }
    }

    for (let i = s.items.length - 1; i >= 0; i--) {
      const it = s.items[i];
      it.y += it.speed; it.wobble += it.wobbleSpeed; it.x += Math.sin(it.wobble) * 0.6;
      if (it.y + it.size / 2 >= s.plate.y && it.y - it.size / 2 <= s.plate.y + s.plate.h && it.x >= s.plate.x - it.size / 2 && it.x <= s.plate.x + s.plate.w + it.size / 2) {
        s.combo++;
        const pts = 10 + (s.combo > 2 ? (s.combo - 2) * 5 : 0);
        s.score += pts;
        burst(it.x, it.y, true);
        s.items.splice(i, 1);
        setScore(s.score);
        const newLevel = Math.floor(s.score / 100) + 1;
        if (newLevel > s.level) { s.level = newLevel; s.fallSpeed = 2.2 + (s.level - 1) * 0.4; s.spawnInterval = Math.max(35, 90 - (s.level - 1) * 12); setLevel(s.level); }
        continue;
      }
      if (it.y > canvasH + 20) {
        s.combo = 0; s.lives--;
        burst(it.x, canvasH - 10, false);
        s.items.splice(i, 1);
        setLives(s.lives);
        if (s.lives <= 0) { s.running = false; setFinalScore(s.score); setScreen("over"); }
      }
    }

    for (let i = s.particles.length - 1; i >= 0; i--) {
      const p = s.particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.alpha -= 0.035;
      if (p.alpha <= 0) s.particles.splice(i, 1);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;
    const { canvasW: W, canvasH: H } = s;

    ctx.clearRect(0, 0, W, H);
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'hsl(195,40%,98%)'); grad.addColorStop(0.5, 'hsl(195,38%,96%)'); grad.addColorStop(1, 'hsl(195,40%,97%)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'hsla(195,70%,38%,0.06)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }

    s.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore(); });

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    s.items.forEach(it => { ctx.font = `${it.size}px serif`; ctx.fillText(it.emoji, it.x, it.y); });

    // Plate
    const { plate } = s;
    const px = plate.x, py = plate.y, pw = plate.w, ph = plate.h, r = ph / 2;
    ctx.save();
    ctx.shadowColor = 'hsla(195,70%,38%,0.3)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 4;
    const g = ctx.createLinearGradient(px, py, px, py + ph);
    g.addColorStop(0, 'hsl(195,70%,44%)'); g.addColorStop(1, 'hsl(185,60%,36%)');
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(px + r, py); ctx.arcTo(px + pw, py, px + pw, py + ph, r); ctx.arcTo(px + pw, py + ph, px, py + ph, r); ctx.arcTo(px, py + ph, px, py, r); ctx.arcTo(px, py, px + pw, py, r);
    ctx.closePath(); ctx.fill();
    const shine = ctx.createLinearGradient(px, py, px, py + ph * 0.5);
    shine.addColorStop(0, 'hsla(0,0%,100%,0.35)'); shine.addColorStop(1, 'hsla(0,0%,100%,0)');
    ctx.fillStyle = shine; ctx.fill(); ctx.restore();
    ctx.font = '14px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🍽️', px + pw / 2, py + ph / 2);

    if (s.combo > 2) {
      ctx.save(); ctx.font = 'bold 13px Lato, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = TEAL; ctx.globalAlpha = 0.85;
      ctx.fillText(`🔥 x${s.combo} Combo!`, W / 2, s.plate.y - 16); ctx.restore();
    }

    ctx.font = '16px serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    for (let i = 0; i < 3; i++) { ctx.globalAlpha = i < s.lives ? 1 : 0.2; ctx.fillText('❤️', 8 + i * 22, 8); }
    ctx.globalAlpha = 1;
  };

  return (
    <div ref={wrapRef} className="w-full max-w-[520px] mx-auto flex flex-col items-center gap-4">
      {/* HUD */}
      <div className="flex gap-3 items-center flex-wrap justify-center">
        <div className="glass rounded-full px-3 py-1.5 text-sm font-bold text-foreground flex items-center gap-1.5">
          🏆 <span className="text-primary">{score}</span> pts
        </div>
        <div className="glass rounded-full px-3 py-1.5 text-sm font-bold text-foreground flex items-center gap-1.5">
          ❤️ <span className="text-primary">{lives}</span> lives
        </div>
        <div className="glass rounded-full px-3 py-1.5 text-sm font-bold text-foreground flex items-center gap-1.5">
          ⚡ Level <span className="text-primary">{level}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
        <canvas
          ref={canvasRef}
          className="block w-full touch-none"
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onTouchMove={(e) => { e.preventDefault(); handlePointerMove(e.touches[0].clientX); }}
        />

        {/* Start Overlay */}
        {screen === "start" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 glass rounded-2xl">
            <div className="text-5xl animate-float">🍩</div>
            <h3 className="font-display text-2xl font-black text-foreground">Sweet Catch</h3>
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase text-center leading-relaxed">
              Move your plate to catch<br />as many desserts as you can!
            </p>
            <button onClick={startGame} className="btn-primary text-sm">▶ Start Game</button>
          </div>
        )}

        {/* Game Over Overlay */}
        {screen === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 glass rounded-2xl">
            <div className="text-5xl animate-float">😢</div>
            <h3 className="font-display text-2xl font-black text-foreground">Too Sweet to Catch!</h3>
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">Final Score</p>
            <div className="font-display text-4xl font-black gradient-text">{finalScore} pts</div>
            <button onClick={startGame} className="btn-primary text-sm">↩ Play Again</button>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="flex gap-3 items-center text-muted-foreground text-xs font-semibold tracking-wide flex-wrap justify-center">
        <span className="bg-secondary border border-border rounded px-2 py-0.5 text-xs font-extrabold text-primary">← →</span> Keys
        <span className="mx-1">·</span>
        🖱️ Mouse / Touch
      </div>
    </div>
  );
}
