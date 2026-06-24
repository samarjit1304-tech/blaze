"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp, formatPrice } from '@/context/AppContext';
import { products, Product } from '@/data/products';
import { Star, Heart, ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RefreshCcw, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: PageProps) {
  const router = useRouter();
  const { cart, addToCart, wishlist, toggleWishlist, currency } = useApp();
  
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  
  const [addedToBag, setAddedToBag] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationFrame, setRotationFrame] = useState(0);

  // Unwrap params promise
  useEffect(() => {
    params.then(res => {
      setUnwrappedParams(res);
      const match = products.find(p => p.id === res.id);
      if (match) {
        setProduct(match);
        setSelectedColor(match.colors[0]?.value || '');
        setSelectedSize(match.sizes[0] || '');
      }
    });
  }, [params]);

  if (!unwrappedParams || !product) {
    return (
      <div className="min-h-[70vh] bg-brand-black text-brand-white flex flex-col items-center justify-center space-y-6">
        <p className="text-xs font-bold tracking-widest text-blaze-orange uppercase">BLAZE ERROR SYSTEM</p>
        <h2 className="text-2xl font-black font-display uppercase tracking-widest">PRODUCT NOT FOUND</h2>
        <Link href="/shop" className="px-6 py-3 bg-gradient-orange-red text-brand-white text-xs font-bold tracking-widest uppercase">
          RETURN TO DIRECTORY
        </Link>
      </div>
    );
  }

  const wish = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
  };

  // Get similar products
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // 360° Drag rotation simulation
  const handle360Drag = (e: React.MouseEvent) => {
    if (!is360Mode) return;
    const delta = e.movementX;
    if (delta !== 0) {
      setRotationFrame(prev => (prev + (delta > 0 ? 1 : -1) + 6) % 6);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-12 max-w-[1440px] mx-auto px-6 md:px-12">
      
      {/* Back breadcrumb */}
      <Link href="/shop" className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-brand-white/40 hover:text-blaze-orange transition-colors mb-10">
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO CATALOG</span>
      </Link>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Media Showcase (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div 
            onMouseMove={handle360Drag}
            className="relative aspect-square w-full rounded-3xl border border-white/5 bg-zinc-950/40 overflow-hidden flex items-center justify-center"
          >
            {is360Mode ? (
              // 360 viewer frame simulation
              <img 
                src={product.images[rotationFrame % product.images.length]} 
                alt={`${product.name} 360 View Frame`}
                className="w-full h-full object-cover select-none cursor-ew-resize"
              />
            ) : (
              // Normal image view
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* Custom overlays */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.badge && (
                <span className="px-3 py-1 bg-gradient-orange-red text-brand-white text-[9px] font-black uppercase tracking-wider rounded">
                  {product.badge}
                </span>
              )}
              {product.sustainable && (
                <span className="px-3 py-1 bg-emerald-600/90 text-brand-white text-[9px] font-black uppercase tracking-wider rounded">
                  SUSTAINABLE MATERIALS
                </span>
              )}
            </div>

            {/* 360 Mode switch */}
            <button 
              onClick={() => setIs360Mode(!is360Mode)}
              className={`absolute bottom-6 right-6 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md transition-colors ${
                is360Mode 
                  ? 'bg-blaze-orange text-brand-white border-transparent' 
                  : 'bg-black/60 border-white/10 text-brand-white/80 hover:text-blaze-orange'
              }`}
            >
              {is360Mode ? 'EXIT 360°' : '360° VIEWER'}
            </button>
          </div>

          {/* Thumbnails row */}
          {!is360Mode && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden border bg-zinc-900/30 transition-all ${
                    activeImageIndex === idx ? 'border-blaze-orange scale-95' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <img src={img} alt={`${product.name} Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Spec Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-8 bg-zinc-950 border border-white/5 p-6 md:p-10 rounded-[32px]">
          
          {/* Header Info */}
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black tracking-widest text-blaze-orange uppercase">{product.subCategory}</span>
              
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full border border-white/10 transition-colors ${
                  wish ? 'bg-gradient-orange-red text-brand-white' : 'bg-black/60 text-white/70 hover:text-blaze-orange'
                }`}
              >
                <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-display tracking-wider uppercase text-brand-white mt-3">
              {product.name}
            </h1>

            {/* Ratings row */}
            <div className="flex items-center space-x-2 mt-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-blaze-orange text-blaze-orange" />
                ))}
              </div>
              <span className="text-xs font-bold text-brand-white/80">{product.rating}</span>
              <span className="text-[10px] text-brand-white/40">({product.reviewsCount} customer reviews)</span>
            </div>

            <p className="text-2xl font-black text-brand-white mt-5">{formatPrice(product.price, currency)}</p>
          </div>

          <p className="text-xs md:text-sm text-brand-white/70 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-3">
            <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase block">ACCENT HIGH-GLOW COLOR</span>
            <div className="flex space-x-3">
              {product.colors.map(color => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === color.value ? 'border-blaze-orange scale-110' : 'border-transparent hover:border-white/10'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor === color.value && (
                    <span className={`w-2.5 h-2.5 rounded-full ${color.value === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
                  )}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-brand-white/40">
              Selected Accent: <span className="text-brand-white font-bold uppercase">{product.colors.find(c => c.value === selectedColor)?.name}</span>
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-brand-white/40 uppercase">
              <span>SELECT SIZE</span>
              <button 
                onClick={() => setSizeGuideOpen(true)}
                className="text-blaze-orange hover:text-brand-white transition-colors"
              >
                SIZE GUIDE
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border text-xs font-semibold tracking-wider transition-all rounded ${
                    selectedSize === size 
                      ? 'bg-gradient-orange-red text-brand-white border-transparent shadow-lg scale-95' 
                      : 'bg-black/60 border-white/10 hover:border-white/20 text-brand-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center space-x-4 border-t border-white/5 pt-6">
            <div className="flex items-center border border-white/10 rounded overflow-hidden bg-black/60">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 hover:text-blaze-orange text-white/50"
              >
                -
              </button>
              <span className="px-4 text-xs font-bold text-brand-white">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 hover:text-blaze-orange text-white/50"
              >
                +
              </button>
            </div>

            {/* In stock info */}
            <div>
              <p className="text-[10px] text-brand-white/40 tracking-wider font-bold">AVAILABILITY</p>
              {product.stockCount <= 3 ? (
                <p className="text-xs text-electric-red font-black uppercase mt-0.5 animate-pulse">ONLY {product.stockCount} LEFT!</p>
              ) : (
                <p className="text-xs text-volt-green font-black uppercase mt-0.5">IN STOCK READY</p>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleAddToCart}
              disabled={addedToBag}
              className="py-4 bg-white/5 border border-white/15 text-brand-white hover:border-blaze-orange hover:text-blaze-orange text-xs font-black tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center rounded-xl"
            >
              {addedToBag ? (
                <span className="flex items-center"><Check className="w-4 h-4 mr-2" /> ADDED TO BAG</span>
              ) : (
                <span className="flex items-center"><ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG</span>
              )}
            </button>
            
            <button
              onClick={handleBuyNow}
              className="py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform flex items-center justify-center rounded-xl shadow-xl font-display"
            >
              BUY IT NOW
            </button>
          </div>

          {/* Premium trust vectors */}
          <div className="border-t border-white/5 pt-6 space-y-3 text-[10px] text-brand-white/50 font-semibold tracking-wider">
            <div className="flex items-center space-x-3">
              <Truck className="w-4 h-4 text-blaze-orange" />
              <span>FREE EXPRESS GLOBAL COURIER SHIPPING ON ORDERS OVER $150</span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCcw className="w-4 h-4 text-blaze-orange" />
              <span>30-DAY COMPLIMENTARY TRIAL RETURNS & REPLACEMENT</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-blaze-orange" />
              <span>GENUINE BLAZE CERTIFICATE OF AUTHENTICITY ASSURED</span>
            </div>
          </div>

        </div>

      </div>

      {/* COMPLETE THE LOOK / RECOMMENDED */}
      <section className="mt-24 border-t border-white/5 pt-16">
        <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase mb-3">COMPLETE THE LOOK</p>
        <h2 className="text-2xl md:text-3xl font-black font-display uppercase text-brand-white mb-10">RECOMMENDED GEAR</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {similarProducts.map((p) => (
            <div 
              key={p.id}
              className="group relative flex flex-col bg-white/2 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 hover:bg-white/5 transition-all"
            >
              <div className="relative aspect-square bg-zinc-900/40">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <Link href={`/shop/product/${p.id}`} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-brand-white text-brand-black text-[10px] font-bold tracking-widest uppercase">VIEW DETAILS</span>
                </Link>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-xs tracking-wide text-brand-white truncate">{p.name}</h3>
                  <p className="text-[9px] text-brand-white/40 mt-1 uppercase">{p.subCategory}</p>
                </div>
                <span className="text-xs font-bold text-brand-white mt-3 block">{formatPrice(p.price, currency)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIZE GUIDE POPUP */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => setSizeGuideOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-12 md:inset-x-48 md:inset-y-24 lg:inset-x-96 lg:inset-y-36 z-50 bg-brand-black border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl text-xs"
            >
              <div className="space-y-4">
                <h3 className="font-display font-black text-xl text-brand-white uppercase text-center">BLAZE SIZE REFERENCE CHART</h3>
                <p className="text-[10px] text-brand-white/50 text-center uppercase tracking-wider">STANDARD UNISEX COMPRESSION & FOOTWEAR SIZE RATIOS</p>
                
                <div className="border border-white/10 rounded-xl overflow-hidden mt-6 font-semibold">
                  <table className="w-full text-left text-[10px]">
                    <thead>
                      <tr className="bg-white/5 text-brand-white/50 border-b border-white/10 uppercase tracking-wider">
                        <th className="p-3">US SIZE</th>
                        <th className="p-3">UK SIZE</th>
                        <th className="p-3">EU SIZE</th>
                        <th className="p-3">FOOT LENGTH (CM)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-brand-white/80">
                      <tr><td className="p-3">7</td><td className="p-3">6.5</td><td className="p-3">40</td><td className="p-3">25.0cm</td></tr>
                      <tr><td className="p-3">8</td><td className="p-3">7.5</td><td className="p-3">41</td><td className="p-3">25.8cm</td></tr>
                      <tr><td className="p-3">9</td><td className="p-3">8.5</td><td className="p-3">42.5</td><td className="p-3">26.7cm</td></tr>
                      <tr><td className="p-3">10</td><td className="p-3">9.5</td><td className="p-3">44</td><td className="p-3">27.5cm</td></tr>
                      <tr><td className="p-3">11</td><td className="p-3">10.5</td><td className="p-3">45</td><td className="p-3">28.3cm</td></tr>
                      <tr><td className="p-3">12</td><td className="p-3">11.5</td><td className="p-3">46.5</td><td className="p-3">29.1cm</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                onClick={() => setSizeGuideOpen(false)}
                className="mt-6 w-full py-3 bg-white/5 hover:bg-blaze-orange text-brand-white font-bold uppercase tracking-wider text-[10px] border border-white/10 transition-colors rounded-xl"
              >
                CLOSE REFERENCE
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
