"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, X, Plus, Minus, Trash2, Globe, Flame } from 'lucide-react';
import { useApp, formatPrice } from '@/context/AppContext';
import { products } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const {
    cart,
    wishlist,
    currentUser,
    currency,
    setCurrency,
    language,
    setLanguage,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    couponCode,
    discountAmount
  } = useApp();

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponSuccess, setCouponSuccess] = useState<boolean | null>(null);

  // Monitor scroll for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawers on path change
  useEffect(() => {
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountVal = Math.round((cartSubtotal * discountAmount) / 100);
  const cartTotal = cartSubtotal - discountVal;

  const filteredSearchProducts = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    setCouponSuccess(success);
    if (success) {
      setCouponInput('');
    }
  };

  const navLinks = [
    { name: 'SHOP', href: '/shop' },
    { name: 'SNEAKER LAB', href: '/sneaker-lab' },
    { name: 'COMMUNITY', href: '/community' },
    { name: 'JOURNAL', href: '/journal' },
    { name: 'ABOUT BLAZE', href: '/about' }
  ];

  return (
    <>
      {/* Header Container */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-black/85 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Flame className="w-8 h-8 text-blaze-orange transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-2xl font-black tracking-wider text-brand-white font-display">
              BLAZE<span className="text-blaze-orange">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-semibold tracking-widest relative py-2 transition-colors duration-300 ${
                  pathname === link.href ? 'text-blaze-orange' : 'text-brand-white hover:text-blaze-orange'
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span 
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-orange-red" 
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            
            {/* Language & Currency Selector */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-brand-white/80 hover:text-blaze-orange flex items-center space-x-1 text-xs font-semibold tracking-wider transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language} | {currency}</span>
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 glass-panel p-4 rounded-xl border border-white/10 space-y-4"
                  >
                    <div>
                      <p className="text-[10px] text-brand-white/40 tracking-widest uppercase font-bold mb-2">CURRENCY</p>
                      <div className="grid grid-cols-3 gap-1">
                        {(['USD', 'EUR', 'GBP', 'JPY', 'AED'] as const).map(c => (
                          <button
                            key={c}
                            onClick={() => { setCurrency(c); setIsLangOpen(false); }}
                            className={`text-xs py-1 rounded transition-colors ${
                              currency === c ? 'bg-blaze-orange text-brand-white font-bold' : 'text-brand-white/70 hover:bg-white/5'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-white/40 tracking-widest uppercase font-bold mb-2">LANGUAGE</p>
                      <div className="grid grid-cols-2 gap-1">
                        {(['EN', 'FR', 'DE', 'ZH', 'AR'] as const).map(l => (
                          <button
                            key={l}
                            onClick={() => { setLanguage(l); setIsLangOpen(false); }}
                            className={`text-xs py-1 rounded transition-colors ${
                              language === l ? 'bg-blaze-orange text-brand-white font-bold' : 'text-brand-white/70 hover:bg-white/5'
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-brand-white hover:text-blaze-orange transition-colors duration-300 relative p-1"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Account Icon */}
            <Link 
              href="/account" 
              className="text-brand-white hover:text-blaze-orange transition-colors duration-300 relative p-1"
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
              {currentUser && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blaze-orange rounded-full border border-brand-black" />
              )}
            </Link>

            {/* Wishlist Link */}
            <Link 
              href="/shop?wishlist=true" 
              className="text-brand-white hover:text-blaze-orange transition-colors duration-300 relative p-1 hidden sm:block"
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-orange-red text-brand-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Toggle */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-brand-white hover:text-blaze-orange transition-colors duration-300 relative p-1"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-orange-red text-brand-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-lg flex flex-col justify-start pt-24 px-6 md:px-24"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-10">
                <Search className="w-6 h-6 text-brand-white/50 mr-4" />
                <input 
                  type="text"
                  placeholder="SEARCH FOR PREMIUM GEAR, SNEAKERS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl md:text-3xl text-brand-white font-display uppercase tracking-widest focus:outline-none placeholder-white/20"
                  autoFocus
                />
                <button 
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="text-brand-white/70 hover:text-blaze-orange transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Suggestions */}
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs text-brand-white/40 tracking-widest uppercase font-bold mb-4">RECOMMENDED SEARCHES</p>
                  <div className="flex flex-wrap gap-3">
                    {['SNEAKERS', 'RUNNING', 'COMPRESSION Wear', 'STREETWEAR', 'CARBON', 'ECO-FRIENDLY'].map(term => (
                      <button 
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-white/5 hover:bg-blaze-orange text-brand-white text-xs font-semibold tracking-wider rounded-full border border-white/10 transition-colors uppercase"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-xs text-brand-white/40 tracking-widest uppercase font-bold">MATCHING PRODUCTS ({filteredSearchProducts.length})</p>
                  <div className="space-y-4">
                    {filteredSearchProducts.map(p => (
                      <Link 
                        key={p.id}
                        href={`/shop/product/${p.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                          <div>
                            <p className="font-semibold text-brand-white group-hover:text-blaze-orange transition-colors text-sm">{p.name}</p>
                            <p className="text-xs text-brand-white/50 tracking-wider uppercase mt-1">{p.category} / {p.subCategory}</p>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-brand-white">{formatPrice(p.price, currency)}</span>
                      </Link>
                    ))}
                  </div>
                  {filteredSearchProducts.length > 0 && (
                    <Link 
                      href={`/shop?search=${searchQuery}`} 
                      onClick={() => setIsSearchOpen(false)}
                      className="inline-block text-blaze-orange hover:text-brand-white text-xs font-bold tracking-widest uppercase mt-4 transition-colors"
                    >
                      VIEW ALL RESULTS →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-brand-black border-l border-white/10 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-blaze-orange" />
                  <span className="font-display font-bold tracking-widest text-brand-white uppercase text-lg">YOUR BAG ({cartCount})</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-brand-white/80 hover:text-blaze-orange transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <ShoppingBag className="w-16 h-16 text-brand-white/10" />
                    <div>
                      <h3 className="font-display font-bold text-brand-white uppercase tracking-widest mb-2 text-md">Your bag is empty</h3>
                      <p className="text-xs text-brand-white/50 max-w-[240px] mx-auto">Equip yourself with BLAZE high-performance gear to unlock your speed.</p>
                    </div>
                    <Link 
                      href="/shop" 
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 bg-gradient-orange-red text-brand-white text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform"
                    >
                      SHOP NEW RELEASES
                    </Link>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                      className="flex space-x-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                    >
                      <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg border border-white/10 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm text-brand-white truncate pr-2">{item.product.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                            className="text-white/40 hover:text-electric-red transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex space-x-3 text-[11px] text-brand-white/50 uppercase tracking-widest mt-1">
                          <span>Size: {item.selectedSize}</span>
                          <span className="flex items-center">
                            Color: <span className="inline-block w-2.5 h-2.5 rounded-full border border-black ml-1" style={{ backgroundColor: item.selectedColor }} />
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-white/10 rounded-md bg-black">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                              className="p-1 hover:text-blaze-orange transition-colors text-white/55"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-brand-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                              className="p-1 hover:text-blaze-orange transition-colors text-white/55"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-bold text-sm text-brand-white">{formatPrice(item.product.price * item.quantity, currency)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#070707] space-y-4">
                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <input 
                      type="text"
                      placeholder="PROMO CODE (e.g. BLAZE20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-black border border-white/10 text-xs px-3 py-2 text-brand-white uppercase font-semibold tracking-wider focus:outline-none focus:border-blaze-orange"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-white/10 hover:bg-blaze-orange text-brand-white text-xs font-bold tracking-widest uppercase transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                  {couponSuccess === true && (
                    <p className="text-[10px] text-volt-green uppercase font-bold tracking-wider">✓ Coupon code applied: 20% discount</p>
                  )}
                  {couponSuccess === false && (
                    <p className="text-[10px] text-electric-red uppercase font-bold tracking-wider">✗ Invalid coupon code</p>
                  )}
                  {couponCode && couponSuccess !== false && (
                    <p className="text-[10px] text-blaze-orange uppercase font-bold tracking-wider">Active Promo: {couponCode} (-20%)</p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-brand-white/60">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartSubtotal, currency)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-blaze-orange font-bold">
                        <span>Discount ({discountAmount}%)</span>
                        <span>-{formatPrice(discountVal, currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-brand-white/60">
                      <span>Shipping</span>
                      <span>{cartSubtotal > 150 ? 'FREE' : formatPrice(15, currency)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-brand-white border-t border-white/10 pt-2">
                      <span>Estimated Total</span>
                      <span>{formatPrice(cartTotal + (cartSubtotal > 150 ? 0 : 15), currency)}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2 pt-2">
                    <Link 
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 bg-gradient-orange-red text-brand-white text-xs font-bold tracking-widest uppercase text-center block hover:scale-[1.02] transition-transform font-display"
                    >
                      PROCEED TO SECURE CHECKOUT
                    </Link>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-2 bg-transparent text-brand-white/60 hover:text-brand-white text-xs font-semibold tracking-widest uppercase transition-colors"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
