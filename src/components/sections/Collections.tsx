"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    name: 'RUNNING',
    tagline: 'PROPEL BEYOND LIMITS',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
    link: '/shop?subCategory=Running+Shoes'
  },
  {
    name: 'TRAINING',
    tagline: 'BUILD YOUR FOUNDATION',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    link: '/shop?subCategory=Compression+Wear'
  },
  {
    name: 'BASKETBALL',
    tagline: 'COMMAND THE COURT',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    link: '/shop?subCategory=Basketball+Shoes'
  },
  {
    name: 'FOOTBALL',
    tagline: 'DOMINATE THE FIELD',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    link: '/shop?subCategory=Running+Shoes'
  },
  {
    name: 'LIFESTYLE',
    tagline: 'PREMIUM DAILY UTILITY',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    link: '/shop?subCategory=Lifestyle+Sneakers'
  },
  {
    name: 'STREETWEAR',
    tagline: 'HIGH-FASHION ATHLETICISM',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    link: '/shop?category=men'
  }
];

export const Collections = () => {
  return (
    <section className="py-24 bg-brand-black text-brand-white px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-4 md:space-y-0">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase mb-3">ELITE DIVISIONS</p>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase">
            DESIGNED FOR <br/>MOVEMENT.
          </h2>
        </div>
        <p className="text-xs md:text-sm text-brand-white/50 max-w-sm tracking-wider leading-relaxed">
          From carbon-plated road racing to architectural lifestyle streetwear, explore gear calibrated specifically to ignite your highest performance level.
        </p>
      </div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, index) => (
          <Link key={cat.name} href={cat.link} className="group block">
            <div className="relative h-[480px] w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 transition-all duration-500 hover:border-blaze-orange/30">
              
              {/* Image with hover zoom */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.75] contrast-[1.05]"
                  loading="lazy"
                />
                {/* Gradient shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
                <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-blaze-orange/10 transition-colors duration-500" />
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t border-l border-blaze-orange opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b border-r border-blaze-orange opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-500" />

              {/* Title Content */}
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] font-bold tracking-[0.25em] text-blaze-orange block mb-2 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  {cat.tagline}
                </span>
                <h3 className="text-xl md:text-2xl font-black font-display tracking-wider text-brand-white uppercase flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">EXPLORE →</span>
                </h3>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
