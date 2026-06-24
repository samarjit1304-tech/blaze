"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Cpu, RotateCw, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export const SneakerLabSection = () => {
  const [activePreset, setActivePreset] = useState<'blaze' | 'stealth' | 'electric'>('blaze');

  const getShoeImage = () => {
    switch (activePreset) {
      case 'stealth':
        return 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800';
      case 'electric':
        return 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800';
      case 'blaze':
      default:
        return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 to-brand-black px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="glass-panel p-8 md:p-16 rounded-[32px] border border-white/10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Abstract absolute glows */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blaze-orange/20 blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-electric-red/10 blur-[100px] pointer-events-none" />

        {/* Text Specs Details (5 cols) */}
        <div className="lg:col-span-6 space-y-6 relative z-10">
          <div className="flex items-center space-x-2 text-blaze-orange">
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase">BLAZE LABS INCEPTION</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase leading-[0.9]">
            BLAZE <br/>
            <span className="text-gradient-orange-red text-glow-orange">SNEAKER LAB</span>
          </h2>

          <p className="text-xs md:text-sm text-brand-white/70 leading-relaxed">
            Step into our real-time interactive design space. Customize material properties, stitching accents, sole foam densities, and lock systems on our flagship carbon running shoe.
          </p>

          {/* Interactive swatch test */}
          <div className="py-4 border-y border-white/5 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-brand-white/40 tracking-wider">
              <Palette className="w-4 h-4 text-blaze-orange" />
              <span>TEST DESIGN ACCENTS:</span>
            </div>
            
            <div className="flex space-x-4">
              {[
                { id: 'blaze', name: 'IGNITE ORANGE', color: '#FF5A1F' },
                { id: 'stealth', name: 'STEALTH SHADOW', color: '#111111' },
                { id: 'electric', name: 'VOLT GREEN', color: '#39FF14' }
              ].map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset.id as any)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider transition-all ${
                    activePreset === preset.id 
                      ? 'bg-white/10 border-blaze-orange text-brand-white' 
                      : 'bg-transparent border-white/5 hover:border-white/20 text-brand-white/60'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: preset.color }} />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enter Lab Button */}
          <Link 
            href="/sneaker-lab"
            className="group inline-flex items-center px-8 py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-105 transition-transform"
          >
            LAUNCH SNEAKER LAB <RotateCw className="w-4 h-4 ml-3 group-hover:rotate-180 transition-transform duration-700" />
          </Link>
        </div>

        {/* Dynamic Image Canvas container (6 cols) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[400px] flex items-center justify-center">
            {/* Spinning ambient grid background */}
            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_40s_linear_infinite] opacity-50 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Hologram details */}
            <div className="absolute top-0 right-0 glass-panel px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-bold tracking-wider text-brand-white/60">
              AXIS-Y ROTATION ACTIVE
            </div>
            <div className="absolute bottom-4 left-0 glass-panel px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-bold tracking-wider text-blaze-orange">
              THREE.JS READY
            </div>

            {/* Display active customizable shoe */}
            <motion.img 
              key={activePreset}
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -5, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              src={getShoeImage()}
              alt="Blaze shoe customize preset"
              className="w-full h-auto object-contain relative z-10 filter drop-shadow-[0_20px_40px_rgba(255,90,31,0.2)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
