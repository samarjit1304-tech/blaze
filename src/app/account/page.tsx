"use client";

import React, { useState } from 'react';
import { useApp, formatPrice } from '@/context/AppContext';
import { User, LogOut, Gift, Award, Clipboard, ShieldCheck, Flame, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Account() {
  const { 
    currentUser, 
    loginUser, 
    registerUser, 
    logoutUser, 
    currency 
  } = useApp();

  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  // Referral states
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() !== '') {
      loginUser(emailInput);
      setEmailInput('');
      setPasswordInput('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() !== '' && nameInput.trim() !== '') {
      registerUser(nameInput, emailInput);
      setEmailInput('');
      setNameInput('');
      setPasswordInput('');
    }
  };

  const copyReferralLink = () => {
    const link = `https://blaze.com/ref?code=${currentUser?.name || 'BLAZE'}-${Math.floor(1000 + Math.random()*9000)}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // If NOT logged in, show auth screens
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] bg-brand-black text-brand-white flex items-center justify-center px-6">
        <div className="max-w-md w-full glass-panel p-8 md:p-10 rounded-[32px] border border-white/10 space-y-8 shadow-2xl">
          
          {/* Tab toggles */}
          <div className="flex border-b border-white/10 pb-4 justify-center space-x-8">
            <button
              onClick={() => setAuthTab('signin')}
              className={`text-xs md:text-sm font-bold tracking-widest uppercase pb-2 transition-all relative ${
                authTab === 'signin' ? 'text-blaze-orange' : 'text-brand-white/40 hover:text-brand-white'
              }`}
            >
              SIGN IN
              {authTab === 'signin' && (
                <motion.span 
                  layoutId="authUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blaze-orange" 
                />
              )}
            </button>
            <button
              onClick={() => setAuthTab('signup')}
              className={`text-xs md:text-sm font-bold tracking-widest uppercase pb-2 transition-all relative ${
                authTab === 'signup' ? 'text-blaze-orange' : 'text-brand-white/40 hover:text-brand-white'
              }`}
            >
              CREATE ROSTER ACCOUNT
              {authTab === 'signup' && (
                <motion.span 
                  layoutId="authUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blaze-orange" 
                />
              )}
            </button>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {authTab === 'signin' ? (
              <motion.form 
                key="signin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleLogin}
                className="space-y-4 text-xs font-semibold"
              >
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-white/40 tracking-wider">EMAIL ADDRESS</label>
                  <input 
                    type="email" required placeholder="ATHLETE@EMAIL.COM"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-xs" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-white/40 tracking-wider">PASSWORD</label>
                  <input 
                    type="password" required placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange text-xs" 
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform rounded-xl shadow-xl mt-4"
                >
                  ENTER BLAZE PORTAL
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleRegister}
                className="space-y-4 text-xs font-semibold"
              >
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-white/40 tracking-wider">YOUR NAME</label>
                  <input 
                    type="text" required placeholder="ENTER FIRST/LAST NAME"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-xs" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-white/40 tracking-wider">EMAIL ADDRESS</label>
                  <input 
                    type="email" required placeholder="ATHLETE@EMAIL.COM"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-xs" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-white/40 tracking-wider">CREATE PASSWORD</label>
                  <input 
                    type="password" required placeholder="MINIMUM 8 CHARACTERS"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange text-xs" 
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform rounded-xl shadow-xl mt-4"
                >
                  CREATE ROSTER ACCOUNT
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Secures tag */}
          <div className="flex items-center space-x-2 text-[9px] text-brand-white/30 justify-center font-bold tracking-wider pt-2 border-t border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>BLAZE MEMBER GATEWAY DATA PROTECTION SECURED</span>
          </div>

        </div>
      </div>
    );
  }

  // If logged in, show Loyalty Dashboard & profile
  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-12 max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
      
      {/* Welcome Board */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blaze-orange">
            <Flame className="w-4 h-4" />
            <span className="text-[10px] text-blaze-orange font-black tracking-widest uppercase">BLAZE ELITE MEMBER</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase mt-1">
            WELCOME, {currentUser.name}
          </h1>
        </div>
        
        <button 
          onClick={logoutUser}
          className="flex items-center space-x-2 px-5 py-2.5 border border-white/10 hover:border-electric-red hover:text-electric-red text-brand-white text-xs font-bold uppercase rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>SIGN OUT PORTAL</span>
        </button>
      </div>

      {/* Grid Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Profile, Points, Referral (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          
          {/* Roster Loyalty Points */}
          <div className="glass-panel p-6 md:p-8 rounded-[24px] border border-white/5 space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-blaze-orange flex items-center">
                <Award className="w-4 h-4 mr-2" /> BLAZE MEMBERSHIP REWARDS
              </h3>

              <div className="space-y-1">
                <p className="text-[10px] text-brand-white/40 tracking-wider">TOTAL POINTS ACCUMULATED</p>
                <p className="text-4xl md:text-5xl font-black font-display text-brand-white">{currentUser.rewardPoints} PTS</p>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mt-1">Value: {formatPrice(currentUser.rewardPoints * 0.1, currency)} Cash Credit</p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-3">
              <span className="text-[9px] text-brand-white/40 tracking-widest font-black uppercase block">YOUR ACTIVE PERKS:</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold tracking-wider text-brand-white uppercase rounded">FREE EXPRESS SHIPPING</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold tracking-wider text-brand-white uppercase rounded">30-DAY SNEAKER TRIAL</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold tracking-wider text-brand-white uppercase rounded">EXCLUSIVE ACCESS DROPS</span>
              </div>
            </div>
          </div>

          {/* Referral links */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-brand-white flex items-center">
              <Gift className="w-4 h-4 mr-2 text-blaze-orange" /> REFER AN ATHLETE FRIEND
            </h4>
            <p className="text-xs text-brand-white/60 leading-relaxed">
              Refer friends to BLAZE. When they make their first purchase of $100+, they get $20 off, and you claim 100 reward points ($10 value).
            </p>
            
            <button 
              onClick={copyReferralLink}
              className={`w-full py-3 border text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2 rounded-xl ${
                copiedLink ? 'bg-emerald-600 text-brand-white border-transparent' : 'bg-black/60 border-white/10 hover:border-blaze-orange hover:text-blaze-orange text-brand-white'
              }`}
            >
              <Clipboard className="w-4 h-4" />
              <span>{copiedLink ? '✓ LINK COPIED' : 'COPY REFERRAL LINK'}</span>
            </button>
          </div>

        </div>

        {/* Right column: Orders log (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-[24px] space-y-6">
          <div>
            <h3 className="text-base font-bold font-display uppercase tracking-wider flex items-center">
              <ShoppingBag className="w-5 h-5 text-blaze-orange mr-2" /> RECENT ORDERS HISTORY
            </h3>
            <p className="text-xs text-brand-white/40 mt-1">Manage and track your premium gear order receipts.</p>
          </div>

          <div className="space-y-4 divide-y divide-white/5 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
            {currentUser.orders.length === 0 ? (
              <div className="py-20 text-center text-xs space-y-4">
                <ShoppingBag className="w-12 h-12 text-brand-white/10 mx-auto" />
                <p className="text-brand-white/40">You haven't placed any orders yet. Equipment log is empty.</p>
              </div>
            ) : (
              currentUser.orders.map((order, index) => (
                <div key={order.id} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-brand-white uppercase">ID: {order.id}</p>
                      <p className="text-[10px] text-brand-white/40 mt-0.5">DATE PLACED: {order.date}</p>
                    </div>
                    
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded tracking-widest ${
                      order.status === 'Delivered' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-blaze-orange/20 text-blaze-orange animate-pulse'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2">
                    <span className="text-brand-white/50 truncate max-w-[200px]">DELIVERY: {order.address}</span>
                    <span className="font-bold text-brand-white">{formatPrice(order.total, currency)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
