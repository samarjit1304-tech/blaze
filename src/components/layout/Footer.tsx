"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Mail, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Footer = () => {
  const { currency, setCurrency, language, setLanguage } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-black border-t border-white/5 pt-16 pb-8 text-brand-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-16 pb-12 border-b border-white/5">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Flame className="w-8 h-8 text-blaze-orange" />
              <span className="text-2xl font-black tracking-wider font-display">
                BLAZE<span className="text-blaze-orange">.</span>
              </span>
            </Link>
            <p className="text-xs text-brand-white/50 tracking-wider max-w-sm">
              Empower athletes, creators, and performers to unlock their highest potential through premium sportswear, innovative footwear, and performance-driven lifestyle apparel.
            </p>
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-blaze-orange">IGNITE YOUR INBOX</h4>
              {subscribed ? (
                <p className="text-xs text-brand-white/80 font-bold uppercase tracking-wider">✓ YOU HAVE BEEN ADDED TO THE BLAZE ROSTER.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm border-b border-white/20 focus-within:border-blaze-orange transition-colors py-1">
                  <input 
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent text-xs py-2 tracking-wider placeholder-white/20 focus:outline-none uppercase"
                  />
                  <button type="submit" className="p-2 hover:text-blaze-orange transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-brand-white/40 mb-5">SHOP CATEGORIES</h4>
            <ul className="space-y-3 text-xs font-semibold text-brand-white/60 tracking-wider">
              <li><Link href="/shop?category=sneakers" className="hover:text-blaze-orange transition-colors">SNEAKERS</Link></li>
              <li><Link href="/shop?category=men" className="hover:text-blaze-orange transition-colors">MEN'S APPAREL</Link></li>
              <li><Link href="/shop?category=women" className="hover:text-blaze-orange transition-colors">WOMEN'S APPAREL</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-blaze-orange transition-colors">ACCESSORIES</Link></li>
              <li><Link href="/shop?badge=Limited+Drop" className="hover:text-blaze-orange transition-colors">LIMITED RELEASES</Link></li>
            </ul>
          </div>

          {/* Company & Story */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-brand-white/40 mb-5">BLAZE STORY</h4>
            <ul className="space-y-3 text-xs font-semibold text-brand-white/60 tracking-wider">
              <li><Link href="/about" className="hover:text-blaze-orange transition-colors">ABOUT BLAZE</Link></li>
              <li><Link href="/journal" className="hover:text-blaze-orange transition-colors">BLAZE JOURNAL</Link></li>
              <li><Link href="/sneaker-lab" className="hover:text-blaze-orange transition-colors">SNEAKER LAB</Link></li>
              <li><Link href="/community" className="hover:text-blaze-orange transition-colors">COMMUNITY CHALLENGES</Link></li>
              <li><Link href="/about#sustainability" className="hover:text-blaze-orange transition-colors">SUSTAINABILITY</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-brand-white/40 mb-5">SUPPORT</h4>
            <ul className="space-y-3 text-xs font-semibold text-brand-white/60 tracking-wider">
              <li><Link href="/contact" className="hover:text-blaze-orange transition-colors">CONTACT US</Link></li>
              <li><Link href="/contact?tab=faqs" className="hover:text-blaze-orange transition-colors">FAQS & HELP</Link></li>
              <li><Link href="/contact?tab=tracking" className="hover:text-blaze-orange transition-colors">ORDER TRACKING</Link></li>
              <li><Link href="/contact?tab=locator" className="hover:text-blaze-orange transition-colors">STORE LOCATOR</Link></li>
              <li><Link href="/contact" className="hover:text-blaze-orange transition-colors">LIVE SUPPORT</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] text-brand-white/40 font-semibold tracking-widest">
            <span>© {new Date().getFullYear()} BLAZE INC. ALL RIGHTS RESERVED.</span>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-brand-white transition-colors">PRIVACY POLICY</Link>
              <Link href="/terms" className="hover:text-brand-white transition-colors">TERMS & CONDITIONS</Link>
            </div>
          </div>

          {/* Socials & Selectors */}
          <div className="flex items-center space-x-6">
            {/* Social icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-brand-white/60 hover:text-blaze-orange transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-brand-white/60 hover:text-blaze-orange transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-brand-white/60 hover:text-blaze-orange transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>

            {/* Selector buttons */}
            <div className="flex border border-white/10 divide-x divide-white/10 rounded overflow-hidden text-[10px] font-bold tracking-widest bg-black">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent px-2 py-1 text-brand-white focus:outline-none cursor-pointer"
              >
                <option value="EN">EN</option>
                <option value="FR">FR</option>
                <option value="DE">DE</option>
                <option value="ZH">ZH</option>
                <option value="AR">AR</option>
              </select>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent px-2 py-1 text-brand-white focus:outline-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="AED">AED (AED)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
