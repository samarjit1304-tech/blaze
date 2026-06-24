"use client";

import React, { useState } from 'react';
import { Flame, Users, Trophy, Target, Instagram, Heart, Play, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const CHALLENGES = [
  {
    id: 'ch-1',
    title: 'THE NITRO SPRINT CHALLENGE',
    task: 'LOG A 5K RUN IN UNDER 22 MINUTES',
    participants: 1240,
    reward: '200 Reward Points + "Nitro" Digital Badge',
    status: 'ACTIVE'
  },
  {
    id: 'ch-2',
    title: 'VERTICAL FORCE VERTICAL JUMP',
    task: 'MAX LOG A 30+ INCH VERTICAL SHOT RECORDING',
    participants: 840,
    reward: 'Limited BLAZE Cap Drop Access',
    status: 'ACTIVE'
  },
  {
    id: 'ch-3',
    title: 'THE MONSOON ULTRA MARATHON',
    task: 'LOG A 50K TOTAL DISTANCE IN 7 DAYS',
    participants: 412,
    reward: 'Exclusive 35% Store Coupon Code',
    status: 'ACTIVE'
  }
];

const LEADERBOARD = [
  { rank: 1, name: 'Marcus V.', miles: 142.5, points: 2850 },
  { rank: 2, name: 'Elena R.', miles: 120.4, points: 2400 },
  { rank: 3, name: 'Alex K.', miles: 98.2, points: 1960 },
  { rank: 4, name: 'Sarah M.', miles: 85.1, points: 1700 },
  { rank: 5, name: 'Chen W.', miles: 74.3, points: 1480 }
];

const COMMUNITY_POSTS = [
  { id: 1, user: '@apex_runner', likes: 254, img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400' },
  { id: 2, user: '@clara_lift', likes: 189, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400' },
  { id: 3, user: '@elena_run', likes: 450, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400' },
  { id: 4, user: '@blaze_collector', likes: 312, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' }
];

export default function Community() {
  const { addToast } = useApp();
  const [joinedChallenge, setJoinedChallenge] = useState<string | null>(null);
  const [ambassadorEmail, setAmbassadorEmail] = useState('');
  const [ambassadorSuccess, setAmbassadorSuccess] = useState(false);

  const handleJoin = (id: string, title: string) => {
    setJoinedChallenge(id);
    addToast(`Successfully registered for: ${title}. Start logging your activity to qualify for the prize!`, 'success', 'CHALLENGE JOINED');
  };

  const handleAmbassadorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ambassadorEmail.trim() !== '') {
      setAmbassadorSuccess(true);
      addToast(`Thank you! Your ambassador request for ${ambassadorEmail} has been logged.`, 'success', 'APPLICATION SUBMITTED');
      setAmbassadorEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-16 max-w-[1440px] mx-auto px-6 md:px-12 space-y-24">
      
      {/* 1. Page Header */}
      <section className="text-center space-y-6 pt-10">
        <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase">BLAZE HUMAN NETWORK</p>
        <h1 className="text-4xl md:text-7xl font-black font-display tracking-tight uppercase leading-none">
          THE BLAZE <span className="text-gradient-orange-red text-glow-orange">SQUAD</span>
        </h1>
        <p className="text-xs md:text-base text-brand-white/60 max-w-2xl mx-auto leading-relaxed mt-6">
          Connect, trace, and level up with elite runners, court kings, sneaker collectors, and athletes globally. Log milestones to unlock rare badges, early launches, and product drops.
        </p>
      </section>

      {/* 2. Fitness Challenges & Leaderboard */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Active Challenges (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-2xl font-black font-display uppercase tracking-wide flex items-center">
              <Target className="w-5 h-5 text-blaze-orange mr-2" /> ACTIVE CHALLENGES
            </h2>
            <p className="text-xs text-brand-white/40 mt-1">Shatter limits, log activity, and claim reward drops.</p>
          </div>

          <div className="space-y-4">
            {CHALLENGES.map(ch => (
              <div 
                key={ch.id}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-white/15"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded tracking-widest ${
                      ch.status === 'ACTIVE' ? 'bg-blaze-orange/20 text-blaze-orange' : 'bg-white/10 text-white/50'
                    }`}>
                      {ch.status}
                    </span>
                    <span className="text-[10px] text-brand-white/40 font-bold uppercase">{ch.participants} RUNNING NOW</span>
                  </div>
                  <h3 className="font-bold text-sm tracking-wide text-brand-white">{ch.title}</h3>
                  <p className="text-xs text-brand-white/60">{ch.task}</p>
                  <p className="text-[10px] text-blaze-orange font-bold uppercase tracking-wider">Reward: {ch.reward}</p>
                </div>

                {ch.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleJoin(ch.id, ch.title)}
                    disabled={joinedChallenge === ch.id}
                    className={`px-5 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                      joinedChallenge === ch.id 
                        ? 'bg-emerald-600 text-brand-white' 
                        : 'bg-gradient-orange-red text-brand-white hover:scale-105'
                    }`}
                  >
                    {joinedChallenge === ch.id ? '✓ REGISTERED' : 'JOIN ACTION'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Rankings (5 cols) */}
        <div className="lg:col-span-5 space-y-8 bg-zinc-950 p-6 md:p-8 rounded-[32px] border border-white/5">
          <div>
            <h2 className="text-2xl font-black font-display uppercase tracking-wide flex items-center">
              <Trophy className="w-5 h-5 text-blaze-orange mr-2 animate-bounce" /> LEADERBOARD
            </h2>
            <p className="text-xs text-brand-white/40 mt-1">This month's community run mileage leaders.</p>
          </div>

          <div className="divide-y divide-white/5 text-xs font-semibold">
            {LEADERBOARD.map(user => (
              <div key={user.rank} className="flex justify-between items-center py-3.5">
                <div className="flex items-center space-x-4">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    user.rank === 1 ? 'bg-blaze-orange text-brand-black' : 'bg-white/5 text-brand-white/60'
                  }`}>
                    {user.rank}
                  </span>
                  <span className="text-brand-white">{user.name}</span>
                </div>
                <div className="flex items-center space-x-6 text-brand-white/60">
                  <span>{user.miles} MILES</span>
                  <span className="text-blaze-orange font-bold font-display">{user.points} PTS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 3. Ambassador Application */}
      <section className="glass-panel p-8 md:p-16 rounded-[32px] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-2 text-blaze-orange">
            <Users className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest uppercase">BLAZE SPONSORSHIP</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black font-display uppercase tracking-wide">AMBASSADOR NETWORK</h2>
          <p className="text-xs md:text-sm text-brand-white/60 leading-relaxed max-w-xl">
            Are you a collegiate track runner, street basketball talent, fitness expert, or fashion influencer? Apply to the BLAZE Ambassador roster to receive free gear drops, custom coupon rewards, and campaign features.
          </p>
        </div>
        
        <div className="lg:col-span-5">
          {ambassadorSuccess ? (
            <div className="p-6 bg-blaze-orange/10 border border-blaze-orange/20 rounded-2xl text-center space-y-2">
              <Flame className="w-8 h-8 text-blaze-orange mx-auto animate-pulse" />
              <h4 className="font-bold text-sm text-brand-white uppercase">APPLICATION RECEIVED</h4>
              <p className="text-xs text-brand-white/50">Our athlete management team will review your social stats and follow up via email.</p>
            </div>
          ) : (
            <form onSubmit={handleAmbassadorSubmit} className="space-y-4 bg-black p-6 rounded-2xl border border-white/5">
              <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase block">APPLY TO THE ROSTER</span>
              <input 
                type="email" 
                placeholder="YOUR ATHLETE EMAIL"
                value={ambassadorEmail}
                onChange={(e) => setAmbassadorEmail(e.target.value)}
                required
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-brand-white font-semibold"
              />
              <button 
                type="submit" 
                className="w-full py-3.5 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform rounded-xl"
              >
                SUBMIT ROSTER INTEREST
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. Social Tag Feed */}
      <section className="space-y-8">
        <div className="text-center md:text-left">
          <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase flex items-center justify-center md:justify-start">
            <Instagram className="w-4 h-4 mr-2" /> TAG #BLAZE
          </p>
          <h2 className="text-2xl md:text-3xl font-black font-display uppercase tracking-wide mt-2">WEAR THE FUTURE</h2>
          <p className="text-xs text-brand-white/40 mt-1">Explore real performance reviews and styling combinations from our community.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SOCIAL_GALLERY.map(post => (
            <div 
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group"
            >
              <img src={post.img} alt={`Social Tag post ${post.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {/* hover user overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="font-bold text-xs text-brand-white">{post.user}</p>
                <div className="flex items-center space-x-1.5 text-[10px] text-blaze-orange font-bold mt-1">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{post.likes} LIKES</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
