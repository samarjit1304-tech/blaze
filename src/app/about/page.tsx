"use client";

import React from 'react';
import { Flame, ShieldCheck, HelpCircle, Leaf, Globe2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-16 max-w-[1440px] mx-auto px-6 md:px-12 space-y-24">
      
      {/* 1. Large Hero Headline */}
      <section className="text-center space-y-6 pt-10">
        <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase">THE BLAZE INCEPTION</p>
        <h1 className="text-4xl md:text-7xl font-black font-display tracking-tight uppercase max-w-4xl mx-auto leading-none">
          WE EXIST TO <span className="text-gradient-orange-red text-glow-orange">IGNITE</span> POTENTIAL.
        </h1>
        <p className="text-xs md:text-base text-brand-white/60 max-w-2xl mx-auto leading-relaxed mt-6">
          Founded in 2026, BLAZE sits at the intersection of extreme speed engineering and high-end luxury lifestyle fashion. We construct gear that refuses to compromise on quality, performance, or aesthetic elegance.
        </p>
      </section>

      {/* 2. Stats Block */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-y border-white/5 bg-zinc-950/20">
        <div className="text-center space-y-1">
          <p className="text-3xl md:text-5xl font-black font-display text-blaze-orange">100%</p>
          <p className="text-[10px] text-brand-white/40 font-bold uppercase tracking-widest">PROPULSION TESTED</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl md:text-5xl font-black font-display text-blaze-orange">80%</p>
          <p className="text-[10px] text-brand-white/40 font-bold uppercase tracking-widest">RECYCLED MATERIALS</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl md:text-5xl font-black font-display text-blaze-orange">50+</p>
          <p className="text-[10px] text-brand-white/40 font-bold uppercase tracking-widest">GLOBAL ELITE AMBASSADORS</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl md:text-5xl font-black font-display text-blaze-orange">12M+</p>
          <p className="text-[10px] text-brand-white/40 font-bold uppercase tracking-widest">COMMUNITY MILES LOGGED</p>
        </div>
      </section>

      {/* 3. Core Pillars Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 space-y-4">
          <Activity className="w-8 h-8 text-blaze-orange" />
          <h3 className="text-xl font-bold font-display uppercase text-brand-white">OUR MISSION</h3>
          <p className="text-xs text-brand-white/60 leading-relaxed">
            Empower runners, basketball creators, gym members, and daily performers to shatter personal milestones. Through anatomical sizing mapping and responsive foam sole compounds, we craft confidence.
          </p>
        </div>

        {/* Innovation */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 space-y-4">
          <Flame className="w-8 h-8 text-blaze-orange" />
          <h3 className="text-xl font-bold font-display uppercase text-brand-white">PERFORMANCE LABS</h3>
          <p className="text-xs text-brand-white/60 leading-relaxed">
            We operate in real-time virtual material simulations. Introducing carbon propulsion speedplates and seamless knitted fabrics, we align footwear directly with elite sports kinematics.
          </p>
        </div>

        {/* Sustainability */}
        <div id="sustainability" className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 space-y-4">
          <Leaf className="w-8 h-8 text-blaze-orange" />
          <h3 className="text-xl font-bold font-display uppercase text-brand-white">SUSTAINABLE FOOTPRINT</h3>
          <p className="text-xs text-brand-white/60 leading-relaxed">
            Protect the tracks we run on. By leveraging ocean waste plastics, eco-conscious organic cottons, and clean, low-waste circular manufacturing, we assure our future matches our velocity.
          </p>
        </div>
      </section>

      {/* 4. Split Campaign Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 aspect-video lg:aspect-square relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800" 
            alt="Blaze design sprint campaign"
            className="w-full h-full object-cover filter contrast-[1.05]"
          />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <p className="text-[10px] text-blaze-orange font-black tracking-widest uppercase">EXCELLENCE IN CONSTRUCT</p>
          <h2 className="text-2xl md:text-4xl font-black font-display tracking-wide uppercase">MANUFACTURING COMPLIANCE</h2>
          <p className="text-xs md:text-sm text-brand-white/70 leading-relaxed">
            Every thread, eyelet, and compression panel goes through rigorous wind tunnel, load factor, and moisture displacement testing in our Munich racing center.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-xs text-brand-white/80 font-bold">
              <ShieldCheck className="w-4 h-4 text-blaze-orange" />
              <span>ISO 9001 STRUCTURAL INTEGRITY CERTIFIED</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-brand-white/80 font-bold">
              <Globe2 className="w-4 h-4 text-blaze-orange" />
              <span>CIRCULAR LOOP MANUFACTURING PROTOCOLS</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
