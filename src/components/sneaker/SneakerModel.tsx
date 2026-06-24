"use client";

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface SneakerModelProps {
  customColors: {
    upper: string;
    sole: string;
    laces: string;
    details: string;
    brand: string;
  };
  rotationSpeed?: number;
}

export const SneakerModel: React.FC<SneakerModelProps> = ({ customColors, rotationSpeed = 0.3 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);

  // Slow rotation if user isn't dragging
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* 1. SOLE (Bottom cushioning) */}
      <mesh position={[0.1, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.25, 0.8]} />
        <meshStandardMaterial 
          color={customColors.sole} 
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* SOLE FRONT (Curved toe protection) */}
      <mesh position={[1.3, -0.32, 0]} rotation={[0, 0, Math.PI / 8]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.18, 0.8]} />
        <meshStandardMaterial 
          color={customColors.sole} 
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* 2. BODY/UPPER (Main mesh fabric) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.6, 0.76]} />
        <meshStandardMaterial 
          color={customColors.upper} 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* BODY UPPER COLLAR (Ankle lock support) */}
      <mesh position={[-0.4, 0.4, 0]} rotation={[0, 0, -Math.PI / 10]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.5, 16]} />
        <meshStandardMaterial 
          color={customColors.upper} 
          roughness={0.9}
        />
      </mesh>

      {/* 3. LACES (Dynamic stripes on top) */}
      <group position={[0.4, 0.35, 0]}>
        {[-0.3, -0.1, 0.1, 0.3].map((pos, idx) => (
          <mesh key={idx} position={[pos, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.72, 8]} />
            <meshStandardMaterial 
              color={customColors.laces} 
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* 4. DETAIL ACCENTS (Heel counter & guards) */}
      {/* Heel guard */}
      <mesh position={[-1.02, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.55, 0.78]} />
        <meshStandardMaterial 
          color={customColors.details} 
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
      
      {/* Toe guard cap */}
      <mesh position={[1.02, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.25, 0.78]} />
        <meshStandardMaterial 
          color={customColors.details} 
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* 5. BRANDING (Signature BLAZE lightning stripe) */}
      <mesh position={[0.1, 0.05, 0.39]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[1.1, 0.12, 0.03]} />
        <meshStandardMaterial 
          color={customColors.brand} 
          emissive={customColors.brand}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      
      {/* Mirror stripe on inner side */}
      <mesh position={[0.1, 0.05, -0.39]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[1.1, 0.12, 0.03]} />
        <meshStandardMaterial 
          color={customColors.brand} 
          emissive={customColors.brand}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* INTERACTIVE HOTSPOTS */}
      
      {/* Hotspot 1: Blaze Foam Sole */}
      <mesh position={[0.2, -0.4, 0.45]} scale={0.08}>
        <sphereGeometry />
        <meshBasicMaterial color="#FF5A1F" />
        <Html distanceFactor={4}>
          <div className="relative">
            <button 
              onMouseEnter={() => setHoveredHotspot(1)}
              onMouseLeave={() => setHoveredHotspot(null)}
              className="w-5 h-5 bg-blaze-orange rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-ping absolute -top-2.5 -left-2.5"
            />
            <button className="w-5 h-5 bg-blaze-orange rounded-full flex items-center justify-center border-2 border-white shadow-lg absolute -top-2.5 -left-2.5 z-10" />
            
            {hoveredHotspot === 1 && (
              <div className="absolute left-4 top-[-40px] w-48 glass-panel p-3 border border-white/20 rounded-xl shadow-xl z-20 text-[10px] space-y-1">
                <p className="font-bold text-blaze-orange uppercase tracking-wider">BlazeFoam™ Midsole</p>
                <p className="text-white/80 leading-normal">Responsive energy return system providing ultra cushion comfort and speed propulsion.</p>
              </div>
            )}
          </div>
        </Html>
      </mesh>

      {/* Hotspot 2: Carbon Fiber Speed Plate */}
      <mesh position={[0, -0.28, 0.45]} scale={0.08}>
        <sphereGeometry />
        <meshBasicMaterial color="#FF2E2E" />
        <Html distanceFactor={4}>
          <div className="relative">
            <button 
              onMouseEnter={() => setHoveredHotspot(2)}
              onMouseLeave={() => setHoveredHotspot(null)}
              className="w-5 h-5 bg-electric-red rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-ping absolute -top-2.5 -left-2.5"
            />
            <button className="w-5 h-5 bg-electric-red rounded-full flex items-center justify-center border-2 border-white shadow-lg absolute -top-2.5 -left-2.5 z-10" />
            
            {hoveredHotspot === 2 && (
              <div className="absolute left-4 top-[-40px] w-48 glass-panel p-3 border border-white/20 rounded-xl shadow-xl z-20 text-[10px] space-y-1">
                <p className="font-bold text-electric-red uppercase tracking-wider">Propulsion Carbon Plate</p>
                <p className="text-white/80 leading-normal">Full-length stiff carbon composite sheet designed to snap forward for rapid speed stride.</p>
              </div>
            )}
          </div>
        </Html>
      </mesh>

      {/* Hotspot 3: Aeroknit Weaving */}
      <mesh position={[0.5, 0.2, 0.42]} scale={0.08}>
        <sphereGeometry />
        <meshBasicMaterial color="#FFFFFF" />
        <Html distanceFactor={4}>
          <div className="relative">
            <button 
              onMouseEnter={() => setHoveredHotspot(3)}
              onMouseLeave={() => setHoveredHotspot(null)}
              className="w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-lg animate-ping absolute -top-2.5 -left-2.5"
            />
            <button className="w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-lg absolute -top-2.5 -left-2.5 z-10" />
            
            {hoveredHotspot === 3 && (
              <div className="absolute left-4 top-[-40px] w-48 glass-panel p-3 border border-white/20 rounded-xl shadow-xl z-20 text-[10px] space-y-1">
                <p className="font-bold text-white uppercase tracking-wider">AeroKnit™ Fabric</p>
                <p className="text-white/80 leading-normal">Breathable thread structure engineered with 100% recycled oceanside plastics.</p>
              </div>
            )}
          </div>
        </Html>
      </mesh>

    </group>
  );
};
