"use client";

import React, { useState } from 'react';
import { Play, ShieldAlert, Award, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ATHLETES = [
  {
    id: 'marcus',
    name: 'MARCUS VANE',
    role: 'SPRINT CHAMPION / GOLD MEDALIST',
    quote: "“THE ONLY LIMIT IS THE FLAME YOU FAIL TO IGNITE.”",
    stat: '9.74s',
    statLabel: 'PERSONAL BEST 100M',
    gear: 'BLAZE X-1 Carbon Runner',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-running-in-the-neon-city-40034-large.mp4',
    story: 'Marcus breaks boundaries on track and field, refining speed through custom carbon propulsion. Balancing high intensity athletics with creative direction, he models the future of sprint sportswear.'
  },
  {
    id: 'elena',
    name: 'ELENA ROSTOVA',
    role: 'ALPINIST / ULTRA TRAIL RUNNER',
    quote: "“STRENGTH ISN'T GIVEN. IT IS FORGED IN THE COLD.”",
    stat: '162km',
    statLabel: 'ULTRA RUN RANGE',
    gear: 'BLAZE Ignite Leggings 204',
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-on-track-in-foggy-morning-39726-large.mp4',
    story: 'Conquering heights, Elena tests BLAZE weather-proofing in temperatures below sub-zero. Her dedication to active sustainable manufacturing guides our eco-friendly design lab.'
  },
  {
    id: 'kai',
    name: 'KAI CHEN',
    role: 'STREETBALL LEGEND / CREATIVE',
    quote: "“STYLE IS AS HEAVY AS THE GAME ITSELF.”",
    stat: '85%',
    statLabel: 'PROPULSION RATING',
    gear: 'BLAZE Phantom Basketball Shoe',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-playing-basketball-alone-at-court-40618-large.mp4',
    story: 'Kai connects high-street luxury fashion with core court athleticism. Playing on community courts worldwide, he channels original street culture directly into BLAZE footwear designs.'
  }
];

export const AthleteSpotlight = () => {
  const [activeAthleteIndex, setActiveAthleteIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const active = ATHLETES[activeAthleteIndex];

  return (
    <section className="py-24 bg-zinc-950 text-brand-white relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full bg-blaze-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-96 h-96 rounded-full bg-electric-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase mb-3">BLAZE TEAM</p>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase">ATHLETE SPOTLIGHT</h2>
        </div>

        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Image & Video Trigger (5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  src={active.image} 
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Play Video Trigger Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="p-5 bg-gradient-orange-red rounded-full shadow-2xl text-brand-white hover:scale-110 active:scale-95 transition-transform duration-300 relative"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  <span className="absolute -inset-2 rounded-full border border-blaze-orange/40 animate-ping" />
                </button>
              </div>

              {/* Float specs details */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-[9px] text-blaze-orange font-black tracking-widest uppercase">FEATURED GEAR</p>
                  <p className="text-xs font-bold text-brand-white mt-0.5">{active.gear}</p>
                </div>
                <Award className="w-5 h-5 text-blaze-orange" />
              </div>
            </div>
          </div>

          {/* Column 2: Story Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Athlete selector row */}
            <div className="flex space-x-6 border-b border-white/10 pb-4">
              {ATHLETES.map((ath, idx) => (
                <button
                  key={ath.id}
                  onClick={() => setActiveAthleteIndex(idx)}
                  className={`text-xs md:text-sm font-bold tracking-widest uppercase pb-2 transition-all relative ${
                    activeAthleteIndex === idx ? 'text-blaze-orange' : 'text-brand-white/40 hover:text-brand-white'
                  }`}
                >
                  {ath.name.split(' ')[0]}
                  {activeAthleteIndex === idx && (
                    <motion.span 
                      layoutId="athleteUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blaze-orange" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Big quote */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <span className="text-[10px] font-black tracking-[0.25em] text-blaze-orange uppercase">{active.role}</span>
                <blockquote className="text-2xl md:text-4xl font-black font-display tracking-tight uppercase leading-snug">
                  {active.quote}
                </blockquote>
                <p className="text-xs md:text-sm text-brand-white/60 leading-relaxed tracking-wide">
                  {active.story}
                </p>

                {/* Big Stat Panel */}
                <div className="flex items-center space-x-8 pt-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl md:text-5xl font-black font-display text-glow-orange text-blaze-orange">{active.stat}</span>
                    <span className="text-[10px] text-brand-white/40 font-bold uppercase tracking-widest">{active.statLabel}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex items-center space-x-2 text-xs font-semibold text-brand-white/70">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>PERFORMANCE PEAK ACHIEVED</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* VIDEO CAMPAIGN MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Player Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-6 md:inset-x-20 md:inset-y-12 lg:inset-x-48 lg:inset-y-24 z-50 bg-black border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl"
            >
              <video 
                autoPlay 
                controls 
                className="w-full h-full object-cover"
              >
                <source src={active.videoUrl} type="video/mp4" />
              </video>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 p-3 bg-black/80 rounded-full hover:text-blaze-orange transition-colors text-brand-white border border-white/10 font-bold text-xs"
              >
                CLOSE VIDEO
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
