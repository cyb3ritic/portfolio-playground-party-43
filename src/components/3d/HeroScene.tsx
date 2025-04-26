
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, useProgress } from '@react-three/drei';
import HeroModel from './HeroModel';

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-lg font-bold text-purple">{progress.toFixed(0)}%</div>
    </div>
  );
}

export default function HeroScene({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 10]} 
            intensity={1.5} 
            color={isDarkMode ? '#ffffff' : '#ffffff'} 
          />
          <HeroModel isDarkMode={isDarkMode} />
          <Stars 
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
