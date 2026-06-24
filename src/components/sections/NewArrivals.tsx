"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { useApp, formatPrice } from '@/context/AppContext';
import { products } from '@/data/products';
import { motion } from 'framer-motion';

export const NewArrivals = () => {
  const { wishlist, toggleWishlist, currency } = useApp();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter for new arrivals (apparel & sneakers)
  const newArrivalList = products.filter(p => p.newArrival).slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  const isWishlisted = (id: string) => wishlist.some(item => item.id === id);

  return (
    <section className="py-24 bg-brand-black text-brand-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase mb-3">NEW DROPS</p>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase">NEW ARRIVALS</h2>
          </div>
          
          {/* Controls */}
          <div className="flex space-x-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 border border-white/10 hover:border-blaze-orange rounded-full hover:text-blaze-orange bg-black/40 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 border border-white/10 hover:border-blaze-orange rounded-full hover:text-blaze-orange bg-black/40 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div 
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {newArrivalList.map((product) => {
            const wish = isWishlisted(product.id);
            return (
              <div 
                key={product.id}
                className="w-[280px] md:w-[350px] flex-shrink-0 snap-start relative group"
              >
                {/* Wishlist toggle */}
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full border border-white/10 transition-colors ${
                    wish ? 'bg-gradient-orange-red text-brand-white' : 'text-white/70 hover:text-blaze-orange'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                </button>

                {/* Product image container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 mb-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-blaze-orange text-brand-white text-[9px] font-black uppercase tracking-wider rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1 px-1">
                  <span className="text-[10px] font-bold tracking-wider text-brand-white/40 uppercase">{product.subCategory}</span>
                  <Link href={`/shop/product/${product.id}`} className="hover:text-blaze-orange transition-colors block">
                    <h3 className="font-semibold text-base text-brand-white truncate">{product.name}</h3>
                  </Link>
                  <p className="text-sm font-bold text-blaze-orange mt-1">{formatPrice(product.price, currency)}</p>
                </div>
              </div>
            );
          })}

          {/* Final slide calling to browse shop */}
          <div className="w-[280px] md:w-[350px] flex-shrink-0 snap-start flex flex-col items-center justify-center p-8 border border-dashed border-white/15 rounded-2xl bg-white/1 hover:bg-white/2 hover:border-blaze-orange/30 transition-all text-center">
            <h3 className="font-display font-black text-xl text-brand-white uppercase mb-2">EXPLORE MORE GEAR</h3>
            <p className="text-xs text-brand-white/40 mb-6 max-w-[200px]">Unlock a deeper collection of high-performance footwear and apparel.</p>
            <Link 
              href="/shop"
              className="px-6 py-3 bg-gradient-orange-red text-brand-white text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform"
            >
              SHOP ENTIRE CATALOG
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
