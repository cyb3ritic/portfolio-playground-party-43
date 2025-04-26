
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
  
  // Use direct state instead of springs to avoid compatibility issues
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Target positions and rotations
    const targetX = isActive ? 0 : (index - 1) * 3;
    const targetY = isActive ? 0 : Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1;
    const targetZ = isActive ? 2 : 0;
    const targetRotY = isActive ? 0 : -0.3;
    const targetScale = isActive ? 1.2 : 1;
    
    // Smooth interpolation
    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.1;
    mesh.current.position.y += (targetY - mesh.current.position.y) * 0.1;
    mesh.current.position.z += (targetZ - mesh.current.position.z) * 0.1;
    mesh.current.rotation.y += (targetRotY - mesh.current.rotation.y) * 0.1;
    mesh.current.scale.x += (targetScale - mesh.current.scale.x) * 0.1;
    mesh.current.scale.y += (targetScale - mesh.current.scale.y) * 0.1;
    mesh.current.scale.z += (targetScale - mesh.current.scale.z) * 0.1;
  });

  return (
    <mesh
      ref={mesh}
      position={[index * 3, 0, 0]}
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
    </mesh>
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
