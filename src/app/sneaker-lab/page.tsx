"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useApp } from '@/context/AppContext';
import { Flame, Sparkles, ShoppingBag, Eye, RotateCcw, Monitor, RefreshCw, Cpu, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import Canvas with SSR disabled to prevent WebGL compilation errors during build
const SneakerCanvas = dynamic(
  () => import('@/components/sneaker/SneakerCanvas'),
  { ssr: false, loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 min-h-[400px]">
      <RefreshCw className="w-8 h-8 text-blaze-orange animate-spin" />
      <p className="text-xs font-bold tracking-widest text-brand-white/40 uppercase">BOOTING VIRTUAL 3D ENVIRONMENT...</p>
    </div>
  )}
);

// Part selectors
type ActiveTab = 'upper' | 'sole' | 'laces' | 'details' | 'brand';

const PALETTE = [
  { name: 'Core Black', value: '#000000' },
  { name: 'Blaze Orange', value: '#FF5A1F' },
  { name: 'Electric Red', value: '#FF2E2E' },
  { name: 'Stealth Gray', value: '#333333' },
  { name: 'Pure White', value: '#FFFFFF' },
  { name: 'Volt Green', value: '#39FF14' },
  { name: 'Neon Blue', value: '#00F0FF' },
  { name: 'Deep Purple', value: '#8A2BE2' }
];

const PRESETS = [
  {
    name: 'BLAZE CLASSIC',
    colors: { upper: '#000000', sole: '#FF5A1F', laces: '#FFFFFF', details: '#FF2E2E', brand: '#FF5A1F' }
  },
  {
    name: 'CYBER STEALTH',
    colors: { upper: '#111111', sole: '#000000', laces: '#333333', details: '#333333', brand: '#00F0FF' }
  },
  {
    name: 'VOLT PROPULSION',
    colors: { upper: '#FFFFFF', sole: '#39FF14', laces: '#000000', details: '#000000', brand: '#39FF14' }
  },
  {
    name: 'LAVA STORM',
    colors: { upper: '#FF2E2E', sole: '#000000', laces: '#FF5A1F', details: '#111111', brand: '#FF5A1F' }
  }
];

export default function SneakerLab() {
  const { addToCart } = useApp();
  const [customColors, setCustomColors] = useState({
    upper: '#000000',
    sole: '#FF5A1F',
    laces: '#FFFFFF',
    details: '#FF2E2E',
    brand: '#FF5A1F'
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('upper');
  const [arOpen, setArOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 12, seconds: 45 });
  const [alertText, setAlertText] = useState('');

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleColorSelect = (colorValue: string) => {
    setCustomColors(prev => ({
      ...prev,
      [activeTab]: colorValue
    }));
  };

  const loadPreset = (presetColors: typeof customColors) => {
    setCustomColors(presetColors);
  };

  const handleReset = () => {
    setCustomColors({
      upper: '#000000',
      sole: '#FF5A1F',
      laces: '#FFFFFF',
      details: '#FF2E2E',
      brand: '#FF5A1F'
    });
  };

  const handleAddCustomToCart = () => {
    // Generate custom mock product
    const customProduct = {
      id: 'custom-sneaker',
      name: 'BLAZE Lab Bespoke Carbon Custom',
      price: 220,
      description: 'Your custom-designed performance sneaker. Tailored using premium carbon propulsion soles, moisture-resistant AeroKnit uppers, and personalized aesthetic highlights.',
      category: 'sneakers' as const,
      subCategory: 'Limited Editions',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'],
      colors: [{ name: 'Customized', value: customColors.brand }],
      sizes: ['9.5'],
      rating: 5.0,
      reviewsCount: 1,
      sustainable: true,
      stockStatus: 'in-stock' as const,
      stockCount: 1,
      specs: [
        'Customized upper shell mesh',
        'Optimized custom foam cushioning',
        'Stitch-reinforced dynamic styling'
      ]
    };

    const colorDesc = `Sole:${customColors.sole}, Upper:${customColors.upper}, Brand:${customColors.brand}`;
    addToCart(customProduct, 1, customColors.sole, '9.5');
    
    setAlertText('Custom shoe configuration added to your bag!');
    setTimeout(() => setAlertText(''), 2500);
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white pt-6 pb-20 max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
      
      {/* 3D Rendering Side (7 cols) */}
      <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
        
        {/* Header Titles */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-blaze-orange">
              <Flame className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase">BLAZE LABS EXPERIMENTAL</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-display tracking-wider uppercase mt-1">SNEAKER LAB</h1>
          </div>
          
          {/* Action options */}
          <div className="flex space-x-3">
            <button 
              onClick={handleReset}
              className="p-2.5 border border-white/10 hover:border-blaze-orange hover:text-blaze-orange transition-colors rounded-lg flex items-center space-x-1.5 text-xs font-bold uppercase"
              title="Reset configuration"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>
            <button 
              onClick={() => setArOpen(true)}
              className="p-2.5 bg-blaze-orange/15 hover:bg-blaze-orange text-blaze-orange hover:text-brand-white transition-all rounded-lg flex items-center space-x-1.5 text-xs font-bold uppercase border border-blaze-orange/30"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>AR TRY-ON</span>
            </button>
          </div>
        </div>

        {/* 3D viewport canvas element */}
        <div className="flex-1 bg-gradient-to-b from-zinc-950 to-brand-black rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[450px]">
          <SneakerCanvas customColors={customColors} />
          
          {/* Alerts panel */}
          <AnimatePresence>
            {alertText && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-6 px-6 py-2.5 bg-emerald-600 text-brand-white text-xs font-bold tracking-widest uppercase rounded shadow-2xl z-20"
              >
                {alertText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sneaker specs card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
            <p className="text-[9px] text-blaze-orange font-bold tracking-wider uppercase">CARBON SPEEDPLATE</p>
            <p className="text-xs font-bold text-brand-white">STIFF SNAPPY STRIDE</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
            <p className="text-[9px] text-blaze-orange font-bold tracking-wider uppercase">BLAZEFOAM™ CUSHION</p>
            <p className="text-xs font-bold text-brand-white">EXCELLED ENERGY RETURN</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
            <p className="text-[9px] text-blaze-orange font-bold tracking-wider uppercase">BESPOKE ANATOMICAL FIT</p>
            <p className="text-xs font-bold text-brand-white">MESH UPPER VENTILATION</p>
          </div>
        </div>

      </div>

      {/* Control panel Side (4 cols) */}
      <div className="lg:col-span-4 flex flex-col justify-between bg-zinc-950 border border-white/10 p-6 md:p-8 rounded-[32px] space-y-8">
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold tracking-widest uppercase text-brand-white">LAB CONTROL</h3>
            <p className="text-xs text-brand-white/40 mt-1">Calibrate color zones of the carbon propulsion model.</p>
          </div>

          {/* Quick preset configurations */}
          <div className="space-y-3">
            <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase">DESIGN PRESETS</span>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => loadPreset(preset.colors)}
                  className="px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-brand-white/80 hover:text-brand-white transition-colors border border-white/5 uppercase tracking-wider"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color tabs panel selectors */}
          <div className="space-y-4">
            <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase">SELECT PATTERN AREA</span>
            <div className="flex flex-wrap gap-2">
              {(['upper', 'sole', 'laces', 'details', 'brand'] as ActiveTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all ${
                    activeTab === tab 
                      ? 'bg-gradient-orange-red text-brand-white border-transparent shadow-lg' 
                      : 'bg-transparent border-white/10 hover:border-white/20 text-brand-white/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Swatches selector */}
          <div className="space-y-4">
            <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase">SELECT COLOR VALUE</span>
            <div className="grid grid-cols-4 gap-3">
              {PALETTE.map((color) => {
                const isActive = (customColors as any)[activeTab] === color.value;
                return (
                  <button
                    key={color.value}
                    onClick={() => handleColorSelect(color.value)}
                    className={`aspect-square rounded-xl border-2 transition-all flex items-center justify-center relative ${
                      isActive ? 'border-blaze-orange scale-110' : 'border-transparent hover:border-white/20'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {isActive && (
                      <span className={`w-2.5 h-2.5 rounded-full ${color.value === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-brand-white/40 tracking-wider">
              Selected: <span className="text-brand-white font-bold uppercase">{PALETTE.find(c => c.value === (customColors as any)[activeTab])?.name || 'Custom'}</span>
            </div>
          </div>
        </div>

        {/* Footer Checkout action card */}
        <div className="pt-6 border-t border-white/10 space-y-6">
          
          {/* Limited Drop Timer */}
          <div className="bg-blaze-orange/5 border border-blaze-orange/20 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-blaze-orange font-black tracking-widest uppercase">LIMITED RELEASE DROP</p>
              <p className="text-xs text-brand-white/80 font-bold mt-0.5">NEXT COLORWAY drops in:</p>
            </div>
            <div className="flex space-x-2 font-display font-black text-sm text-blaze-orange">
              <span>{countdown.hours.toString().padStart(2, '0')}h</span>
              <span>:</span>
              <span>{countdown.minutes.toString().padStart(2, '0')}m</span>
              <span>:</span>
              <span>{countdown.seconds.toString().padStart(2, '0')}s</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-brand-white/40 tracking-widest font-bold uppercase">ESTIMATED PRICE</p>
              <p className="text-xl font-black text-brand-white">$220.00</p>
            </div>
            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">FREE STAGE SHIPPING</p>
          </div>

          <button
            onClick={handleAddCustomToCart}
            className="w-full py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center rounded-xl shadow-xl font-display"
          >
            <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG
          </button>
        </div>

      </div>

      {/* AR SCANNER MODAL */}
      <AnimatePresence>
        {arOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => setArOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-12 md:inset-x-32 md:inset-y-24 lg:inset-x-96 lg:inset-y-36 z-50 bg-brand-black border border-white/10 rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-2xl"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-blaze-orange/15 rounded-full border border-blaze-orange/30 animate-pulse">
                  <Flame className="w-8 h-8 text-blaze-orange" />
                </div>
                <h3 className="font-display font-black text-xl text-brand-white uppercase">BLAZE AR TRY-ON READY</h3>
                <p className="text-xs text-brand-white/50 max-w-[280px]">Scan the holographic code below with your mobile camera to view this bespoke sneaker on your feet in real-time augmented reality.</p>
              </div>

              {/* QR Hologram graphic code */}
              <div className="relative p-3 border-2 border-blaze-orange rounded-2xl w-40 h-40 flex items-center justify-center bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=300"
                  alt="Hologram QR Scanner Code" 
                  className="w-full h-full object-cover filter contrast-125 saturate-150"
                />
                {/* scanning laser overlay */}
                <div className="absolute left-0 right-0 h-0.5 bg-electric-red animate-[bounce_3s_infinite]" />
              </div>

              <button
                onClick={() => setArOpen(false)}
                className="px-6 py-2.5 border border-white/15 hover:border-blaze-orange hover:text-blaze-orange text-brand-white text-xs font-bold tracking-widest uppercase transition-colors"
              >
                CLOSE SCANNER
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
