import { useEffect, useRef, useState, useCallback } from "react";

const DESSERTS = ['🍩', '🧁', '🍰', '🎂', '🍪', '🍫', '🍮', '🍭', '🧇', '🍦'];
const OCEAN = 'hsl(195,70%,38%)';
const TEAL = 'hsl(185,60%,42%)';
const CORAL = 'hsl(5,65%,60%)';
const GOLD = 'hsl(45,90%,55%)';

const SPEED_MULT = 1.25;

interface Item {
  x: number; y: number; size: number; speed: number;
  emoji: string; wobble: number; wobbleSpeed: number;
  rotation: number; rotSpeed: number;
}
interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; r: number; color: string; type: 'circle' | 'star';
}

export default function DessertGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    score: 0, lives: 3, level: 1, combo: 0, frame: 0, bestCombo: 0,
    items: [] as Item[], particles: [] as Particle[],
    plate: { x: 0, w: 80, y: 0, h: 22 },
    keys: {} as Record<string, boolean>,
    mouseX: null as number | null,
    spawnTimer: 0, spawnInterval: 72, fallSpeed: 2.75,
    running: false, canvasW: 420, canvasH: 520,
    shakeX: 0, shakeY: 0, shakeTime: 0,
    catchFlash: 0,
  });
  const [screen, setScreen] = useState<"start" | "playing" | "over">("start");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
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
    s.score = 0; s.lives = 3; s.level = 1; s.combo = 0; s.bestCombo = 0; s.frame = 0;
    s.items = []; s.particles = [];
    s.plate.x = s.canvasW / 2 - s.plate.w / 2;
    s.spawnInterval = 72; s.fallSpeed = 2.75; s.spawnTimer = 0;
    s.running = true; s.shakeTime = 0; s.catchFlash = 0;
    setScore(0); setLives(3); setLevel(1); setCombo(0);
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
    const s = stateRef.current;
    const count = caught ? 14 : 8;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 2 + Math.random() * 3.5;
      const colors = caught ? [TEAL, GOLD, 'hsl(165,60%,50%)'] : [CORAL, 'hsl(15,70%,50%)'];
      const clr = colors[Math.floor(Math.random() * colors.length)];
      s.particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.5,
        alpha: 1, r: 2.5 + Math.random() * 4, color: clr,
        type: caught && Math.random() > 0.5 ? 'star' : 'circle'
      });
    }
    if (caught) {
      s.catchFlash = 8;
    } else {
      s.shakeTime = 10;
    }
  };

  const update = () => {
    const s = stateRef.current;
    const { canvasW, canvasH } = s;
    s.frame++;

    // Shake decay
    if (s.shakeTime > 0) {
      s.shakeX = (Math.random() - 0.5) * s.shakeTime * 0.8;
      s.shakeY = (Math.random() - 0.5) * s.shakeTime * 0.8;
      s.shakeTime--;
    } else {
      s.shakeX = 0; s.shakeY = 0;
    }
    if (s.catchFlash > 0) s.catchFlash--;

    const speed = 6.5 * SPEED_MULT * (canvasW / 420);
    if (s.keys['ArrowLeft'] || s.keys['a'] || s.keys['A']) s.plate.x -= speed;
    if (s.keys['ArrowRight'] || s.keys['d'] || s.keys['D']) s.plate.x += speed;
    if (s.mouseX !== null) {
      const target = s.mouseX - s.plate.w / 2;
      s.plate.x += (target - s.plate.x) * 0.22;
    }
    s.plate.x = Math.max(0, Math.min(canvasW - s.plate.w, s.plate.x));

    s.spawnTimer++;
    if (s.spawnTimer >= s.spawnInterval) {
      const emoji = DESSERTS[Math.floor(Math.random() * DESSERTS.length)];
      s.items.push({
        x: 20 + Math.random() * (canvasW - 40), y: -30,
        size: 28 + Math.random() * 10,
        speed: (s.fallSpeed + Math.random() * 1.5) * SPEED_MULT,
        emoji, wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: (0.04 + Math.random() * 0.03) * SPEED_MULT,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
      });
      s.spawnTimer = 0;
      if (s.level >= 3 && Math.random() < 0.45) {
        const e2 = DESSERTS[Math.floor(Math.random() * DESSERTS.length)];
        s.items.push({
          x: 20 + Math.random() * (canvasW - 40), y: -30,
          size: 28 + Math.random() * 10,
          speed: (s.fallSpeed + Math.random() * 1.5) * SPEED_MULT,
          emoji: e2, wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: (0.04 + Math.random() * 0.03) * SPEED_MULT,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.06,
        });
      }
    }

    for (let i = s.items.length - 1; i >= 0; i--) {
      const it = s.items[i];
      it.y += it.speed; it.wobble += it.wobbleSpeed; it.x += Math.sin(it.wobble) * 0.8;
      it.rotation += it.rotSpeed;
      if (it.y + it.size / 2 >= s.plate.y && it.y - it.size / 2 <= s.plate.y + s.plate.h && it.x >= s.plate.x - it.size / 2 && it.x <= s.plate.x + s.plate.w + it.size / 2) {
        s.combo++;
        if (s.combo > s.bestCombo) s.bestCombo = s.combo;
        const pts = 10 + (s.combo > 2 ? (s.combo - 2) * 5 : 0);
        s.score += pts;
        burst(it.x, it.y, true);
        s.items.splice(i, 1);
        setScore(s.score); setCombo(s.combo);
        const newLevel = Math.floor(s.score / 80) + 1;
        if (newLevel > s.level) {
          s.level = newLevel;
          s.fallSpeed = 2.75 + (s.level - 1) * 0.5;
          s.spawnInterval = Math.max(28, 72 - (s.level - 1) * 10);
          setLevel(s.level);
        }
        continue;
      }
      if (it.y > canvasH + 20) {
        s.combo = 0; s.lives--;
        burst(it.x, canvasH - 10, false);
        s.items.splice(i, 1);
        setLives(s.lives); setCombo(0);
        if (s.lives <= 0) { s.running = false; setFinalScore(s.score); setScreen("over"); }
      }
    }

    for (let i = s.particles.length - 1; i >= 0; i--) {
      const p = s.particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.alpha -= 0.03;
      if (p.alpha <= 0) s.particles.splice(i, 1);
    }
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const inner = (Math.PI * 2 * (i + 0.5)) / 5 - Math.PI / 2;
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.lineTo(cx + Math.cos(inner) * r * 0.4, cy + Math.sin(inner) * r * 0.4);
    }
    ctx.closePath(); ctx.fill();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;
    const { canvasW: W, canvasH: H } = s;

    ctx.save();
    ctx.translate(s.shakeX, s.shakeY);

    ctx.clearRect(-10, -10, W + 20, H + 20);

    // Background — soft aquatic gradient matching website theme
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'hsl(195,40%,97%)');
    grad.addColorStop(0.35, 'hsl(195,38%,94%)');
    grad.addColorStop(0.7, 'hsl(195,35%,92%)');
    grad.addColorStop(1, 'hsl(195,40%,97%)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

    // Subtle dotted grid
    ctx.fillStyle = 'hsla(195,70%,38%,0.07)';
    const gridOffset = (s.frame * 0.2) % 40;
    for (let x = gridOffset; x < W; x += 40) {
      for (let y = gridOffset; y < H; y += 40) {
        ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Soft teal glow at bottom near plate
    const ambientGrad = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, W * 0.5);
    ambientGrad.addColorStop(0, 'hsla(195,70%,38%,0.08)');
    ambientGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGrad; ctx.fillRect(0, 0, W, H);

    // Catch flash (subtle teal)
    if (s.catchFlash > 0) {
      ctx.save();
      ctx.globalAlpha = s.catchFlash * 0.02;
      ctx.fillStyle = 'hsl(185,60%,42%)';
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // Particles
    s.particles.forEach(p => {
      ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
      if (p.type === 'star') {
        drawStar(ctx, p.x, p.y, p.r);
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    });

    // Items with rotation and shadow
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    s.items.forEach(it => {
      ctx.save();
      ctx.translate(it.x, it.y);
      ctx.rotate(it.rotation);
      // Soft shadow
      ctx.shadowColor = 'hsla(195,70%,38%,0.2)'; ctx.shadowBlur = 8;
      ctx.font = `${it.size}px serif`;
      ctx.fillText(it.emoji, 0, 0);
      ctx.restore();
    });

    // Plate with glow trail
    const { plate } = s;
    const px = plate.x, py = plate.y, pw = plate.w, ph = plate.h, r = ph / 2;

    // Plate glow
    ctx.save();
    const plateGlow = ctx.createRadialGradient(px + pw / 2, py + ph / 2, 0, px + pw / 2, py + ph / 2, pw * 0.7);
    plateGlow.addColorStop(0, 'hsla(195,70%,38%,0.12)');
    plateGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = plateGlow;
    ctx.fillRect(px - pw * 0.3, py - ph * 2, pw * 1.6, ph * 5);
    ctx.restore();

    ctx.save();
    ctx.shadowColor = 'hsla(185,80%,55%,0.5)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 2;
    const g = ctx.createLinearGradient(px, py, px, py + ph);
    g.addColorStop(0, 'hsl(185,75%,55%)'); g.addColorStop(1, 'hsl(195,70%,40%)');
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(px + r, py); ctx.arcTo(px + pw, py, px + pw, py + ph, r); ctx.arcTo(px + pw, py + ph, px, py + ph, r); ctx.arcTo(px, py + ph, px, py, r); ctx.arcTo(px, py, px + pw, py, r);
    ctx.closePath(); ctx.fill();
    const shine = ctx.createLinearGradient(px, py, px, py + ph * 0.5);
    shine.addColorStop(0, 'hsla(0,0%,100%,0.4)'); shine.addColorStop(1, 'hsla(0,0%,100%,0)');
    ctx.fillStyle = shine; ctx.fill(); ctx.restore();
    ctx.font = '14px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🍽️', px + pw / 2, py + ph / 2);

    // Combo display
    if (s.combo > 2) {
      ctx.save();
      ctx.font = 'bold 15px Lato, sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = GOLD; ctx.globalAlpha = 0.9;
      const pulse = 1 + Math.sin(s.frame * 0.15) * 0.05;
      ctx.translate(W / 2, s.plate.y - 20);
      ctx.scale(pulse, pulse);
      ctx.fillText(`🔥 x${s.combo} COMBO!`, 0, 0);
      ctx.restore();
    }

    // Lives on canvas
    ctx.font = '16px serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = i < s.lives ? 1 : 0.2;
      ctx.fillText('❤️', 8 + i * 22, 8);
    }
    ctx.globalAlpha = 1;

    ctx.restore(); // shake
  };

  return (
    <div ref={wrapRef} className="w-full max-w-[520px] mx-auto flex flex-col items-center gap-4">
      {/* HUD */}
      <div className="flex gap-3 items-center flex-wrap justify-center">
        <div className="glass rounded-full px-4 py-2 text-sm font-bold text-foreground flex items-center gap-1.5 border border-primary/20">
          🏆 <span className="text-primary font-extrabold">{score}</span> pts
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm font-bold text-foreground flex items-center gap-1.5 border border-primary/20">
          ❤️ <span className="text-primary font-extrabold">{lives}</span>
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm font-bold text-foreground flex items-center gap-1.5 border border-primary/20">
          ⚡ Lv.<span className="text-primary font-extrabold">{level}</span>
        </div>
        {combo > 2 && (
          <div className="glass rounded-full px-4 py-2 text-sm font-bold text-foreground flex items-center gap-1.5 border border-accent/30 animate-pulse">
            🔥 <span className="text-accent font-extrabold">x{combo}</span>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-card">
        <canvas
          ref={canvasRef}
          className="block w-full touch-none"
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onTouchMove={(e) => { e.preventDefault(); handlePointerMove(e.touches[0].clientX); }}
        />

        {/* Start Overlay */}
        {screen === "start" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 backdrop-blur-md bg-background/70 rounded-2xl">
            <div className="text-6xl animate-float">🍩</div>
            <h3 className="font-display text-3xl font-black gradient-text">Sweet Catch</h3>
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase text-center leading-relaxed px-6">
              Move your plate to catch<br />falling desserts · Build combos!
            </p>
            <button onClick={startGame} className="btn-primary text-sm gap-2 px-6 py-3 text-base">
              <span>▶</span> Start Game
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {screen === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur-md bg-background/70 rounded-2xl">
            <div className="text-6xl animate-float">😢</div>
            <h3 className="font-display text-2xl font-black text-foreground">Game Over!</h3>
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">Final Score</p>
            <div className="font-display text-5xl font-black gradient-text">{finalScore}</div>
            <p className="text-muted-foreground text-xs">Best combo: 🔥 x{stateRef.current.bestCombo}</p>
            <button onClick={startGame} className="btn-primary text-sm gap-2 px-6 py-3">
              <span>↩</span> Play Again
            </button>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="flex gap-3 items-center text-muted-foreground text-xs font-semibold tracking-wide flex-wrap justify-center">
        <span className="bg-secondary border border-border rounded px-2 py-0.5 text-xs font-extrabold text-primary">← →</span> Keys
        <span className="mx-1 opacity-40">·</span>
        🖱️ Mouse / 👆 Touch
      </div>
    </div>
  );
}
