import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── Chocolate chip (small rough sphere) ── */
function Chip({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position} castShadow>
      <dodecahedronGeometry args={[0.045, 0]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
    </mesh>
  );
}

/* ── Scatter chips on a disc surface ── */
function ChipScatter({ y, radius, count, seed }: { y: number; radius: number; count: number; seed: number }) {
  const chips = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string }[] = [];
    const rng = (i: number) => Math.abs(Math.sin(seed * 100 + i * 9301 + 49297) % 1);
    for (let i = 0; i < count; i++) {
      const angle = rng(i) * Math.PI * 2;
      const r = rng(i + 100) * radius * 0.85;
      const yOff = rng(i + 200) * 0.03;
      const isVanilla = rng(i + 300) > 0.5;
      arr.push({
        pos: [Math.cos(angle) * r, y + yOff, Math.sin(angle) * r],
        color: isVanilla ? "#f5e6c8" : "#2a1506",
      });
    }
    return arr;
  }, [y, radius, count, seed]);

  return (
    <>
      {chips.map((c, i) => (
        <Chip key={i} position={c.pos} color={c.color} />
      ))}
    </>
  );
}

/* ── Single drip of thick chocolate ── */
function GravyDrip({ startPos, delay, speed }: { startPos: [number, number, number]; delay: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const startTime = useRef(performance.now() + delay * 1000);

  useFrame(() => {
    if (!ref.current) return;
    const t = (performance.now() - startTime.current) / 1000;
    if (t < 0) { ref.current.visible = false; return; }
    ref.current.visible = true;

    // fall with slight acceleration
    const fall = t * speed + t * t * 0.3;
    const y = startPos[1] - fall;
    // stretch vertically as it falls
    const sx = 0.06 - t * 0.008;
    const sy = 0.06 + t * 0.12;
    if (sx < 0.01 || y < -1.8) { ref.current.visible = false; return; }
    ref.current.position.set(startPos[0], y, startPos[2]);
    ref.current.scale.set(sx, sy, sx);
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial color="#1a0a02" roughness={0.15} metalness={0.2} />
    </mesh>
  );
}

/* ── Thick chocolate gravy pour effect ── */
function ChocolatePour({ active }: { active: boolean }) {
  const drips = useMemo(() => {
    if (!active) return [];
    const result: { startPos: [number, number, number]; delay: number; speed: number }[] = [];
    // central thick stream
    for (let i = 0; i < 15; i++) {
      result.push({
        startPos: [
          (Math.random() - 0.5) * 0.08,
          1.6 + Math.random() * 0.3,
          (Math.random() - 0.5) * 0.08,
        ],
        delay: i * 0.07,
        speed: 0.6 + Math.random() * 0.25,
      });
    }
    // side drips that run down the cake
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.3;
      const r = 0.28 + Math.random() * 0.12;
      result.push({
        startPos: [
          Math.cos(angle) * r,
          0.55 + Math.random() * 0.1,
          Math.sin(angle) * r,
        ],
        delay: 0.6 + Math.random() * 1.2,
        speed: 0.3 + Math.random() * 0.2,
      });
    }
    return result;
  }, [active]);

  if (!active) return null;

  return (
    <group>
      {/* Chocolate pool spreading on top */}
      <mesh position={[0, 0.56, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.36, 32]} />
        <meshStandardMaterial color="#1a0a02" roughness={0.1} metalness={0.25} transparent opacity={0.92} />
      </mesh>
      {/* Stream column */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 1.0, 12]} />
        <meshStandardMaterial color="#1a0a02" roughness={0.1} metalness={0.3} transparent opacity={0.85} />
      </mesh>
      {drips.map((d, i) => (
        <GravyDrip key={i} {...d} />
      ))}
    </group>
  );
}

/* ── Fluffy stacked dessert (dorayaki-inspired) ── */
function Dessert({ onClick, chocolateActive }: { onClick: () => void; chocolateActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (chocolateActive ? 1.8 : 0.35);
    }
  });

  const cakeColor = "#c98a4b";
  const cakeTop = "#d49a5a";
  const creamColor = "#fff8ee";

  return (
    <group ref={groupRef} onClick={onClick} scale={1.3}>
      {/* ─ Bottom fluffy layer ─ */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.5, 0.18, 32]} />
        <meshStandardMaterial color={cakeColor} roughness={0.75} />
      </mesh>
      {/* bottom rounded edge */}
      <mesh position={[0, -0.27, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.49, 32, 16, 0, Math.PI * 2, 0, Math.PI / 8]} />
        <meshStandardMaterial color={cakeColor} roughness={0.75} />
      </mesh>
      <ChipScatter y={-0.08} radius={0.42} count={10} seed={1} />

      {/* ─ Cream filling ─ */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.06, 32]} />
        <meshStandardMaterial color={creamColor} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <torusGeometry args={[0.43, 0.04, 10, 32]} />
        <meshStandardMaterial color={creamColor} roughness={0.25} />
      </mesh>

      {/* ─ Middle fluffy layer ─ */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.48, 0.16, 32]} />
        <meshStandardMaterial color={cakeColor} roughness={0.72} />
      </mesh>
      <ChipScatter y={0.21} radius={0.4} count={8} seed={2} />

      {/* ─ Second cream filling ─ */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 32]} />
        <meshStandardMaterial color={creamColor} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <torusGeometry args={[0.39, 0.035, 10, 32]} />
        <meshStandardMaterial color={creamColor} roughness={0.25} />
      </mesh>

      {/* ─ Top fluffy dome layer ─ */}
      <mesh position={[0, 0.37, 0]} castShadow>
        <cylinderGeometry args={[0.44, 0.46, 0.14, 32]} />
        <meshStandardMaterial color={cakeTop} roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <sphereGeometry args={[0.43, 32, 16, 0, Math.PI * 2, 0, Math.PI / 5]} />
        <meshStandardMaterial color={cakeTop} roughness={0.6} />
      </mesh>
      <ChipScatter y={0.48} radius={0.36} count={12} seed={3} />

      {/* ─ Decorative chips on sides ─ */}
      <ChipScatter y={0.0} radius={0.5} count={6} seed={4} />
      <ChipScatter y={0.25} radius={0.48} count={6} seed={5} />

      {/* Chocolate pour */}
      <ChocolatePour active={chocolateActive} />
    </group>
  );
}

export default function DoracakeScene() {
  const [chocolateActive, setChocolateActive] = useState(false);

  const handleClick = useCallback(() => {
    if (chocolateActive) return;
    setChocolateActive(true);
    setTimeout(() => setChocolateActive(false), 4500);
  }, [chocolateActive]);

  return (
    <div className="w-full h-[420px] md:h-[520px] lg:h-[580px]" style={{ touchAction: "none" }}>
      <Canvas
        camera={{ position: [0, 0.6, 2.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} intensity={1.4} castShadow />
        <directionalLight position={[-3, 4, -2]} intensity={0.35} color="#b0d0ff" />
        <pointLight position={[0, -2, 3]} intensity={0.25} color="#ffe8c0" />

        <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.7}>
          <Dessert onClick={handleClick} chocolateActive={chocolateActive} />
        </Float>

        <Environment preset="studio" />
      </Canvas>

      <p className="text-center text-sm text-muted-foreground mt-2 animate-bounce-gentle">
        ✨ Click the dessert for a chocolate gravy pour! ✨
      </p>
    </div>
  );
}
