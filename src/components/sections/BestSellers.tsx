"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Eye, Heart, Star, X, Check, Flame } from 'lucide-react';
import { useApp, formatPrice } from '@/context/AppContext';
import { products, Product } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export const BestSellers = () => {
  const { cart, addToCart, wishlist, toggleWishlist, currency } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Select color & size state for Quick View
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeSize, setActiveSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Take top 8 best sellers
  const bestSellerList = products.filter(p => p.bestSeller).slice(0, 8);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setActiveColor(product.colors[0]?.value || '');
    setActiveSize(product.sizes[0] || '');
    setQuantity(1);
    setAddedAnimation(false);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const defaultColor = product.colors[0]?.value || '#000000';
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, 1, defaultColor, defaultSize);
    
    // Tiny alert/action visual
    alert(`Added ${product.name} (${defaultSize}) to your bag.`);
  };

  const handleModalAddToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, quantity, activeColor, activeSize);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedProduct(null);
    }, 1500);
  };

  const isWishlisted = (id: string) => wishlist.some(item => item.id === id);

  return (
    <section className="py-24 bg-gradient-to-b from-brand-black to-zinc-950 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-4 md:space-y-0">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase mb-3">HIGH DEMAND</p>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase">BEST SELLERS</h2>
        </div>
        <Link 
          href="/shop" 
          className="text-xs font-bold tracking-widest uppercase text-blaze-orange hover:text-brand-white border-b border-blaze-orange/30 hover:border-brand-white transition-all pb-1"
        >
          VIEW THE ENTIRE COLLECTION →
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestSellerList.map((product) => {
          const wish = isWishlisted(product.id);
          return (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col bg-white/2 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-white/5"
            >
              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3 py-1 bg-gradient-orange-red text-brand-white text-[9px] font-black uppercase tracking-wider rounded">
                    {product.badge}
                  </span>
                )}
                {product.sustainable && (
                  <span className="px-3 py-1 bg-emerald-600/90 text-brand-white text-[9px] font-black uppercase tracking-wider rounded">
                    ECO-FRIENDLY
                  </span>
                )}
              </div>

              {/* Wishlist Toggle Button */}
              <button 
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors ${
                  wish ? 'bg-gradient-orange-red text-brand-white' : 'bg-black/60 text-white/70 hover:text-blaze-orange'
                }`}
              >
                <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
              </button>

              {/* Image Showcase */}
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-900/40">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Secondary Hover Image if available */}
                {product.images[1] && (
                  <img 
                    src={product.images[1]} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}

                {/* Dark Hover overlay for Actions */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => openQuickView(product)}
                    className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-blaze-orange hover:text-brand-white transition-colors duration-300"
                    title="Quick View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-blaze-orange hover:text-brand-white transition-colors duration-300"
                    title="Quick Add to Bag"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-3.5 h-3.5 fill-blaze-orange text-blaze-orange" />
                    <span className="text-xs font-bold text-brand-white">{product.rating}</span>
                    <span className="text-[10px] text-brand-white/40">({product.reviewsCount})</span>
                  </div>
                  
                  <Link href={`/shop/product/${product.id}`} className="hover:text-blaze-orange transition-colors">
                    <h3 className="font-semibold text-sm tracking-wide text-brand-white line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-[10px] text-brand-white/40 tracking-wider uppercase mt-1">{product.subCategory}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-bold text-brand-white">{formatPrice(product.price, currency)}</span>
                  
                  {/* Stock level indicators */}
                  {product.stockCount <= 3 ? (
                    <span className="text-[9px] text-electric-red font-black uppercase tracking-widest animate-pulse">ONLY {product.stockCount} LEFT!</span>
                  ) : (
                    <span className="text-[9px] text-brand-white/40 font-bold uppercase tracking-widest">IN STOCK</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-6 md:inset-x-24 md:inset-y-16 lg:inset-x-48 z-50 bg-brand-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Image side */}
              <div className="lg:w-1/2 relative bg-zinc-950 flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedProduct.images[0]} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {/* Visual glow indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 p-2 bg-black/60 rounded-full text-brand-white hover:text-blaze-orange transition-colors lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Spec details side */}
              <div className="lg:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blaze-orange uppercase">{selectedProduct.subCategory}</span>
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="hidden lg:block text-brand-white/50 hover:text-blaze-orange transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black font-display tracking-wide uppercase text-brand-white mt-2">{selectedProduct.name}</h3>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-blaze-orange text-blaze-orange" />
                      ))}
                    </div>
                    <span className="text-xs text-brand-white/60">({selectedProduct.reviewsCount} reviews)</span>
                  </div>

                  <p className="text-xl font-bold text-brand-white mt-4">{formatPrice(selectedProduct.price, currency)}</p>

                  <p className="text-xs text-brand-white/70 leading-relaxed mt-4">{selectedProduct.description}</p>

                  {/* Color picker */}
                  <div className="mt-6">
                    <span className="text-[10px] text-brand-white/40 tracking-widest font-bold uppercase block mb-3">SELECT COLOR</span>
                    <div className="flex space-x-3">
                      {selectedProduct.colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setActiveColor(c.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                            activeColor === c.value ? 'border-blaze-orange scale-110' : 'border-transparent hover:border-white/20'
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                          {activeColor === c.value && (
                            <span className={`w-2 h-2 rounded-full ${c.value === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size picker */}
                  <div className="mt-6">
                    <span className="text-[10px] text-brand-white/40 tracking-widest font-bold uppercase block mb-3">SELECT SIZE</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setActiveSize(s)}
                          className={`px-4 py-2 border text-xs font-semibold tracking-wider transition-colors ${
                            activeSize === s 
                              ? 'bg-gradient-orange-red text-brand-white border-transparent' 
                              : 'bg-transparent border-white/10 hover:border-white/30 text-brand-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Key Specs */}
                  <div className="mt-6 space-y-2">
                    {selectedProduct.specs.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-brand-white/60">
                        <span className="w-1.5 h-1.5 bg-blaze-orange rounded-full" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div className="pt-6 border-t border-white/10 flex items-center space-x-4">
                  <div className="flex items-center border border-white/10 rounded overflow-hidden">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-2 bg-transparent text-brand-white hover:text-blaze-orange transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs text-brand-white font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-2 bg-transparent text-brand-white hover:text-blaze-orange transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleModalAddToCart}
                    disabled={addedAnimation}
                    className="flex-1 py-3 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform flex items-center justify-center"
                  >
                    {addedAnimation ? (
                      <span className="flex items-center">
                        <Check className="w-4 h-4 mr-2" /> ADDED TO BAG
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
