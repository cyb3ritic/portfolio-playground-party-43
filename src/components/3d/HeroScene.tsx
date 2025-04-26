
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, useProgress, Html } from '@react-three/drei';
import HeroModel from './HeroModel';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-lg font-bold text-gradient-primary">
        <div className="animate-pulse-glow">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}

export default function HeroScene({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        shadows
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 10]} 
            intensity={1.5} 
            color={isDarkMode ? '#ffffff' : '#ffffff'} 
            castShadow
          />
          <HeroModel isDarkMode={isDarkMode} />
          <Stars 
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
