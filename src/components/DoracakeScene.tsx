import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function ChocolateDrip({ position, delay, speed }: { position: [number, number, number]; delay: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [startTime] = useState(() => Date.now() + delay * 1000);

  useFrame(() => {
    if (!meshRef.current) return;
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed < 0) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;
    const y = position[1] - elapsed * speed * 0.5;
    const scale = Math.max(0.02, 0.08 - elapsed * 0.015);
    meshRef.current.position.y = y;
    meshRef.current.scale.set(scale, Math.min(scale * 3, scale + elapsed * 0.1), scale);
    if (y < -1.5) {
      meshRef.current.visible = false;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color="#3d1c02" roughness={0.2} metalness={0.1} />
    </mesh>
  );
}

function ChocolatePour({ active }: { active: boolean }) {
  const drips = useMemo(() => {
    if (!active) return [];
    const result = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 0.25 + Math.random() * 0.15;
      result.push({
        position: [
          Math.cos(angle) * radius,
          0.45,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        delay: Math.random() * 1.5,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return result;
  }, [active]);

  if (!active) return null;

  return (
    <group>
      {/* Chocolate pool on top */}
      <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 32]} />
        <meshStandardMaterial color="#2c1000" roughness={0.15} metalness={0.2} />
      </mesh>
      {drips.map((drip, i) => (
        <ChocolateDrip key={i} {...drip} />
      ))}
    </group>
  );
}

function Doracake({ onClick, chocolateActive }: { onClick: () => void; chocolateActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (chocolateActive ? 1.5 : 0.4);
    }
  });

  // Doracake = two fluffy pancake discs with cream filling
  const pancakeColor = "#c4813a";
  const creamColor = "#fff5e6";
  const topGlaze = "#d4956a";

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Bottom pancake */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.42, 0.45, 0.22, 32, 1]} />
        <meshStandardMaterial color={pancakeColor} roughness={0.7} />
      </mesh>
      {/* Bottom pancake rounded edge */}
      <mesh position={[0, -0.21, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.44, 32, 16, 0, Math.PI * 2, 0, Math.PI / 6]} />
        <meshStandardMaterial color={pancakeColor} roughness={0.7} />
      </mesh>

      {/* Cream filling */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 32]} />
        <meshStandardMaterial color={creamColor} roughness={0.4} />
      </mesh>
      {/* Cream oozing out slightly */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.39, 0.035, 12, 32]} />
        <meshStandardMaterial color={creamColor} roughness={0.3} />
      </mesh>

      {/* Top pancake */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.45, 0.42, 0.22, 32, 1]} />
        <meshStandardMaterial color={pancakeColor} roughness={0.7} />
      </mesh>
      {/* Top pancake dome */}
      <mesh position={[0, 0.33, 0]}>
        <sphereGeometry args={[0.44, 32, 16, 0, Math.PI * 2, 0, Math.PI / 4]} />
        <meshStandardMaterial color={topGlaze} roughness={0.5} />
      </mesh>

      {/* Little stamp/brand mark on top */}
      <mesh position={[0, 0.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color="#a0622a" roughness={0.8} />
      </mesh>

      {/* Chocolate pour effect */}
      <ChocolatePour active={chocolateActive} />
    </group>
  );
}

export default function DoracakeScene() {
  const [chocolateActive, setChocolateActive] = useState(false);

  const handleClick = () => {
    setChocolateActive(true);
    setTimeout(() => setChocolateActive(false), 4000);
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[550px]" style={{ touchAction: "none" }}>
      <Canvas
        camera={{ position: [0, 0.5, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />
        <directionalLight position={[-2, 3, -1]} intensity={0.4} color="#ffd4a0" />
        <pointLight position={[0, -1, 2]} intensity={0.3} color="#fff0d0" />

        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.8}>
          <Doracake onClick={handleClick} chocolateActive={chocolateActive} />
        </Float>

        <Environment preset="studio" />
      </Canvas>

      <p className="text-center text-sm text-muted-foreground mt-2 animate-bounce-gentle">
        ✨ Click the doracake for a chocolate surprise! ✨
      </p>
    </div>
  );
}
