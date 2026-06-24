"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Clock, User, Bookmark, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ARTICLES = [
  {
    id: 'art-1',
    category: 'SNEAKER CULTURE',
    title: 'THE SCIENCE OF BREAKING RUNNING SPEEDBARRIERS',
    excerpt: 'How carbon fiber plate inserts and dynamic Pebax foam geometries work together to return up to 90% of landing force back into forward propulsion.',
    author: 'DR. ARIS VANCE',
    date: 'JUNE 22, 2026',
    readTime: '6 MIN READ',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 'art-2',
    category: 'TRAINING',
    title: 'THE HYPERTROPHY STRATEGIES OF CHAMPIONS',
    excerpt: 'Uncover the exact periodization strategies and nutrition cycles sprint athletes leverage in off-season camps to build explosive power.',
    author: 'MARCUS VANE',
    date: 'MAY 15, 2026',
    readTime: '8 MIN READ',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: 'art-3',
    category: 'NUTRITION',
    title: 'GLYCOGEN FUELING MECHANISMS IN ULTRA TRAIL RUNNING',
    excerpt: 'Detailed analysis of carbohydrate loading thresholds and digestive timing cycles to prevent energy depleting crashes in high elevation climbs.',
    author: 'ELENA ROSTOVA',
    date: 'APRIL 10, 2026',
    readTime: '5 MIN READ',
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: 'art-4',
    category: 'FASHION TRENDS',
    title: 'THE NEW CROSSOVER: SPORTSWEAR IN MODERN STREETWEAR',
    excerpt: 'Exploring how aesthetic high-glow color details and compression fibers are migrating directly from active race tracks into global fashion runaways.',
    author: 'KAI CHEN',
    date: 'MARCH 28, 2026',
    readTime: '4 MIN READ',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    featured: false
  }
];

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = ['ALL', 'SNEAKER CULTURE', 'TRAINING', 'NUTRITION', 'FASHION TRENDS'];

  const filteredArticles = activeCategory === 'ALL'
    ? ARTICLES
    : ARTICLES.filter(art => art.category === activeCategory);

  const featuredArt = ARTICLES.find(art => art.featured);
  const gridArticles = filteredArticles.filter(art => !art.featured || activeCategory !== 'ALL');

  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-16 max-w-[1440px] mx-auto px-6 md:px-12 space-y-20">
      
      {/* 1. Section Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-10 space-y-4 md:space-y-0">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase mb-3">BLAZE INTELLECT</p>
          <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight">BLAZE JOURNAL</h1>
        </div>
        
        {/* Category switcher */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors ${
                activeCategory === cat 
                  ? 'bg-blaze-orange text-brand-white border-transparent' 
                  : 'bg-transparent border-white/10 hover:border-white/20 text-brand-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Featured Article Banner */}
      {featuredArt && activeCategory === 'ALL' && (
        <section className="group relative glass-panel rounded-[32px] overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[450px]">
          {/* Image side (7 cols) */}
          <div className="lg:col-span-7 relative bg-zinc-900 overflow-hidden min-h-[300px]">
            <img 
              src={featuredArt.image} 
              alt={featuredArt.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.8] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-transparent to-transparent hidden lg:block" />
          </div>

          {/* Details side (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-bold text-blaze-orange tracking-widest uppercase">
                <span className="flex items-center"><Flame className="w-3.5 h-3.5 mr-1" /> {featuredArt.category}</span>
                
                <button 
                  onClick={(e) => toggleSave(featuredArt.id, e)}
                  className="text-brand-white/40 hover:text-blaze-orange transition-colors"
                >
                  <Bookmark className={`w-4 h-4 ${savedArticles.includes(featuredArt.id) ? 'fill-current text-blaze-orange' : ''}`} />
                </button>
              </div>

              <h2 className="text-2xl md:text-3xl font-black font-display uppercase tracking-wide leading-tight text-brand-white group-hover:text-blaze-orange transition-colors">
                {featuredArt.title}
              </h2>

              <p className="text-xs md:text-sm text-brand-white/60 leading-relaxed">
                {featuredArt.excerpt}
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] text-brand-white/40 font-bold tracking-widest border-t border-white/5 pt-6">
              <div className="flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-blaze-orange" />
                <span>BY {featuredArt.author}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>{featuredArt.date}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-blaze-orange" /> {featuredArt.readTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Grid Articles List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gridArticles.map(art => (
          <div 
            key={art.id}
            className="group flex flex-col bg-white/2 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:bg-white/5 transition-all"
          >
            {/* Image banner */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
              <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 z-10 flex items-center justify-between w-[calc(100%-2rem)] text-[9px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-white/5">
                <span className="text-blaze-orange">{art.category}</span>
                
                <button 
                  onClick={(e) => toggleSave(art.id, e)}
                  className="text-brand-white/55 hover:text-blaze-orange transition-colors"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${savedArticles.includes(art.id) ? 'fill-current text-blaze-orange' : ''}`} />
                </button>
              </div>
            </div>

            {/* Info details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-bold text-base leading-snug text-brand-white group-hover:text-blaze-orange transition-colors line-clamp-2">{art.title}</h3>
                <p className="text-xs text-brand-white/60 line-clamp-3 leading-relaxed">{art.excerpt}</p>
              </div>

              <div className="flex justify-between items-center text-[9px] text-brand-white/40 font-bold tracking-widest border-t border-white/5 pt-4">
                <span>BY {art.author.split(' ')[0]}</span>
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {art.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
