
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Group } from 'three';
import gsap from 'gsap';

export default function HeroModel({ isDarkMode }: { isDarkMode: boolean }) {
  const mesh = useRef<Group>(null);
  
  // Create a floating sphere with particles around it
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  useEffect(() => {
    if (!mesh.current) return;
    
    // Animate on initial load
    gsap.fromTo(
      mesh.current.position,
      { y: -10 },
      { y: 0, duration: 2, ease: 'power3.out' }
    );
    
    // Animate on dark/light mode change
    gsap.to(mesh.current.rotation, {
      z: mesh.current.rotation.z + Math.PI / 4,
      duration: 1,
      ease: 'power2.inOut'
    });
  }, [isDarkMode]);

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={mesh}>
        {/* Center sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#8B5CF6" : "#9b87f5"}
            roughness={0.3}
            metalness={0.8}
            emissive={isDarkMode ? "#7E69AB" : "#6E59A5"}
            emissiveIntensity={0.4}
          />
        </mesh>
        
        {/* Outer wireframe sphere */}
        <mesh scale={1.2}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#33C3F0" : "#1EAEDB"}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        
        {/* Rings */}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[2.2, 0.1, 16, 100]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#D946EF" : "#F97316"}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh rotation-x={Math.PI / 3}>
          <torusGeometry args={[2.4, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={isDarkMode ? "#F97316" : "#D946EF"}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}
