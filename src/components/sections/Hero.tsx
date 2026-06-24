"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, ArrowRight, Activity } from 'lucide-react';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background Video */}
      <motion.div 
        style={{ y: videoY, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-[1.05]"
        >
          {/* High-quality cinematic running video */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-running-in-the-neon-city-40034-large.mp4" type="video/mp4" />
        </video>
        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-brand-black/50" />
        {/* Accent Glow Spotlights */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blaze-orange/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-electric-red/10 blur-[150px] pointer-events-none" />
      </motion.div>

      {/* Floating Speed Stat Card (Glassmorphic) */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute left-6 md:left-12 bottom-20 z-20 hidden lg:flex items-center space-x-4 glass-panel p-4 rounded-2xl border border-white/10 glow-orange"
      >
        <div className="p-3 bg-gradient-orange-red rounded-xl">
          <Activity className="w-6 h-6 text-brand-white animate-pulse" />
        </div>
        <div>
          <p className="text-[10px] text-brand-white/40 tracking-widest font-bold uppercase">PROPULSION STATUS</p>
          <p className="text-sm font-bold text-brand-white">BLAZE FOAM ACTIVE</p>
          <p className="text-xs text-blaze-orange font-bold mt-0.5">88.4m/s ENERGY RETURN</p>
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center"
      >
        {/* Spark Pre-Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-full border border-blaze-orange/30 bg-blaze-orange/10 backdrop-blur-sm mb-6"
        >
          <Flame className="w-3.5 h-3.5 text-blaze-orange animate-bounce" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase">
            BLAZE RACING LAB / LIMITED DROP
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black font-display tracking-tighter uppercase leading-[0.9] max-w-5xl text-brand-white text-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="block"
          >
            FUEL THE FIRE
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="block text-gradient-orange-red text-glow-orange mt-2"
          >
            WITHIN
          </motion.span>
        </h1>

        {/* Short Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-sm md:text-lg text-brand-white/70 max-w-xl mt-6 tracking-wide font-medium"
        >
          Engineered for elite performers. Explore the new summer drops fusing record-breaking footwear tech with luxury fashion details.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
        >
          <Link 
            href="/shop?category=sneakers"
            className="group relative px-8 py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-[0.2em] uppercase rounded shadow-xl hover:scale-105 transition-transform overflow-hidden w-full sm:w-56 text-center"
          >
            <span className="relative z-10 flex items-center justify-center">
              SHOP SNEAKERS <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-brand-black opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <Link 
              href="/shop?category=men"
              className="flex-1 px-6 py-4 glass-panel border-white/10 hover:border-blaze-orange text-brand-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all text-center rounded whitespace-nowrap"
            >
              SHOP MEN
            </Link>
            <Link 
              href="/shop?category=women"
              className="flex-1 px-6 py-4 glass-panel border-white/10 hover:border-blaze-orange text-brand-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all text-center rounded whitespace-nowrap"
            >
              SHOP WOMEN
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Slide Indicator Lines */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-3 z-20">
        {[0, 1, 2].map((num) => (
          <div 
            key={num} 
            className={`h-8 w-1 rounded-full transition-all duration-300 ${
              num === 0 ? 'bg-blaze-orange h-12' : 'bg-white/20 hover:bg-white/40'
            }`} 
          />
        ))}
      </div>
    </section>
  );
};
