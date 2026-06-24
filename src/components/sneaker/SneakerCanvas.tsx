"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { SneakerModel } from './SneakerModel';

interface SneakerCanvasProps {
  customColors: {
    upper: string;
    sole: string;
    laces: string;
    details: string;
    brand: string;
  };
}

export const SneakerCanvas: React.FC<SneakerCanvasProps> = ({ customColors }) => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] cursor-grab active:cursor-grabbing relative">
      <Canvas 
        shadows 
        camera={{ position: [2.5, 0.8, 3], fov: 40 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        {/* Ambient environment lighting */}
        <ambientLight intensity={0.4} />
        
        {/* Soft fill spotlights */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 3, -5]} intensity={0.5} />
        
        {/* Mounting procedural model */}
        <Suspense fallback={null}>
          <SneakerModel customColors={customColors} rotationSpeed={0.05} />
        </Suspense>

        {/* Orbit control setups */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minDistance={1.8} 
          maxDistance={4.2} 
          makeDefault
        />
      </Canvas>
      
      {/* Background hint */}
      <div className="absolute inset-x-0 bottom-4 pointer-events-none text-center">
        <p className="text-[10px] text-brand-white/30 tracking-[0.2em] uppercase">DRAG TO ROTATE / SCROLL TO ZOOM</p>
      </div>
    </div>
  );
};
export default SneakerCanvas;
