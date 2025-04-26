
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, PresentationControls, Float } from '@react-three/drei';
import { Mesh } from 'three';
import { Certification } from '@/types/certification';

const CertificateModel = ({ 
  certification, 
  index, 
  active, 
  setActive 
}: { 
  certification: Certification;
  index: number;
  active: number;
  setActive: (index: number) => void;
}) => {
  const mesh = useRef<Mesh>(null);
  const isActive = active === index;
  
  const { position, rotation, scale } = useSpring({
    position: isActive 
      ? [0, 0, 2] as [number, number, number]
      : [(index - 1) * 3, 0, 0] as [number, number, number],
    rotation: isActive 
      ? [0, 0, 0] as [number, number, number]
      : [0, -0.3, 0] as [number, number, number],
    scale: isActive ? 1.2 : 1,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (!mesh.current) return;
    // Add subtle floating movement when not active
    if (!isActive) {
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={() => setActive(index)}
    >
      <planeGeometry args={[2.5, 1.5, 1]} />
      <meshStandardMaterial 
        color={"#8B5CF6"}
        metalness={0.5}
        roughness={0.4}
      />
      <Text
        position={[0, 0.4, 0.1]}
        fontSize={0.15}
        color={"#ffffff"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        lineHeight={1.2}
      >
        {certification.title}
      </Text>
      <Text
        position={[0, 0.1, 0.1]}
        fontSize={0.1}
        color={"#ffffff"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {certification.issuer}
      </Text>
      <Text
        position={[0, -0.1, 0.1]}
        fontSize={0.08}
        color={"#ffffff"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {certification.date}
      </Text>
      <Text
        position={[0, -0.4, 0.1]}
        fontSize={0.07}
        color={"#ffffff"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {isActive ? certification.description : "Click to view details"}
      </Text>
    </animated.mesh>
  );
};

export default function CertificationScene({ certifications }: { certifications: Certification[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PresentationControls
          global
          snap
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float rotationIntensity={0.2} floatIntensity={0.5}>
            <group>
              {certifications.map((cert, index) => (
                <CertificateModel 
                  key={index}
                  certification={cert}
                  index={index}
                  active={active}
                  setActive={setActive}
                />
              ))}
            </group>
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
