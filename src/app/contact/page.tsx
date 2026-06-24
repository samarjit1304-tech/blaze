"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Truck, HelpCircle, Send, RefreshCw, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const FAQS = [
  {
    q: 'HOW LONG DOES GLOBAL SHIPPING TAKE?',
    a: 'We ship from hubs in New York, Munich, and Tokyo. Express shipping takes 2-4 business days. Standard shipping takes 5-7 business days.'
  },
  {
    q: 'WHAT IS YOUR SNEAKER RETURN POLICY?',
    a: 'We offer a 30-day trial return window. You can wear the shoes and run in them. If you are not satisfied, return them for a full refund in the original box.'
  },
  {
    q: 'HOW DO I CUSTOMIZE A DESIGN IN THE SNEAKER LAB?',
    a: 'Visit the BLAZE Sneaker Lab, select colors for components (upper, sole, laces), and add the design directly to the bag. Custom shoes ship within 10-14 days.'
  },
  {
    q: 'ARE BLAZE PRODUCTS SUSTAINABLE?',
    a: 'Yes, our AeroKnit fabrics are made using 100% recycled ocean waste plastics. Our shoe packages are biodegradable, and circular recycling programs exist.'
  }
];

const STORES = [
  { city: 'NEW YORK', loc: '540 Madison Ave, Manhattan', hours: '10:00 AM - 08:00 PM' },
  { city: 'TOKYO', loc: 'Shibuya Crossing Tower, Level 2', hours: '11:00 AM - 09:00 PM' },
  { city: 'MUNICH', loc: 'Maximilianstraße 12', hours: '10:00 AM - 07:00 PM' },
  { city: 'DUBAI', loc: 'The Dubai Mall, Fashion Avenue', hours: '10:00 AM - 11:00 PM' }
];

export default function Contact() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'form' | 'chat' | 'tracking' | 'locator'>('form');
  
  // Tracking simulator state
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState('');

  // AI assistant simulator state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([
    { sender: 'ai', text: 'HELLO, I AM THE BLAZE HELIX ASSISTANT. HOW CAN I IGNITE YOUR POTENTIAL TODAY?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', orderId: '', msg: '' });
  const [formSuccess, setFormSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.msg) {
      setFormSuccess(true);
      addToast('Your contact request has been sent successfully.', 'success', 'MESSAGE SENT');
      setContactForm({ name: '', email: '', orderId: '', msg: '' });
    }
  };

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError('');
    setTrackingResult(null);

    const input = trackingId.trim().toUpperCase();
    if (input === 'BLZ-98741') {
      setTrackingResult({
        id: 'BLZ-98741',
        status: 'DELIVERED',
        date: '2026-05-12',
        carrier: 'DHL EXPRESS',
        address: '12 Luxury Drive, Beverly Hills, CA',
        items: 'BLAZE Pro Running Shoe X-1 Carbon'
      });
      addToast('Order found successfully!', 'success', 'TRACKING ACTIVE');
    } else if (input.startsWith('BLZ-')) {
      setTrackingResult({
        id: input,
        status: 'PROCESSING',
        date: 'ESTIMATED IN 3 DAYS',
        carrier: 'FEDEX PRIORITY',
        address: 'Registered Address',
        items: 'BLAZE Sportswear Roster Pack'
      });
      addToast('Order found successfully!', 'success', 'TRACKING ACTIVE');
    } else {
      setTrackingError('ORDER ID NOT FOUND. (Try using "BLZ-98741" to test)');
      addToast('Order ID not found. Verify your ID and try again.', 'error', 'TRACKING FAILED');
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() === '') return;

    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { sender: 'user' as const, text: userText }];
    setChatMessages(newMessages);
    setChatInput('');

    // Simulate AI responses based on keywords
    setTimeout(() => {
      let reply = 'I DID NOT QUITE UNDERSTAND THAT. YOU CAN ENQUIRE ABOUT: "SHIPPING", "RETURNS", OR "SNEAKER LAB".';
      const q = userText.toLowerCase();

      if (q.includes('ship') || q.includes('delivery')) {
        reply = 'WE SHIP GLOBALLY FROM GERMANY, USA, AND JAPAN. EXPEDITED COURIER DELIVERIES ARRIVE IN 2-4 DAYS.';
      } else if (q.includes('return') || q.includes('refund')) {
        reply = 'BLAZE OFFERS A 30-DAY TRIAL WINDOW. ENJOY COMPLIMENTARY RETRACT RETURN LABELS FOR ALL SNEAKERS.';
      } else if (q.includes('lab') || q.includes('custom')) {
        reply = 'LAUNCH THE BLAZE SNEAKER LAB IN THE NAVIGATION OPTIONS TO BUILD AND ORDER BESPOKE 3D SHOES.';
      } else if (q.includes('foam') || q.includes('cushion')) {
        reply = 'OUR BLAZEFOAM™ Midsole COMPOUND OFFERS AN INDUSTRY-LEADING 88% PROPULSION VELOCITY RETURN ENERGY RATE.';
      }

      setChatMessages(prev => [...prev, { sender: 'ai' as const, text: reply }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-16 max-w-[1440px] mx-auto px-6 md:px-12 space-y-20">
      
      {/* 1. Page Header */}
      <section className="text-center space-y-6 pt-10">
        <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase">BLAZE RELATIONS & SUPPORT</p>
        <h1 className="text-4xl md:text-7xl font-black font-display tracking-tight uppercase leading-none">
          SUPPORT <span className="text-gradient-orange-red text-glow-orange">CENTER</span>
        </h1>
        <p className="text-xs md:text-base text-brand-white/60 max-w-2xl mx-auto leading-relaxed mt-6">
          Access our simulated order tracker, consult our Helix AI assistant, locate global flagship physical storefronts, or write directly to our client services desk.
        </p>
      </section>

      {/* 2. Interactive Navigation Tabs */}
      <section className="flex flex-wrap justify-center border-b border-white/10 pb-4 gap-4">
        {[
          { id: 'form', name: 'CONTACT DESK', icon: Mail },
          { id: 'chat', name: 'HELIX AI ASSISTANT', icon: MessageSquare },
          { id: 'tracking', name: 'ORDER TRACKER', icon: Truck },
          { id: 'locator', name: 'FLAGSHIP LOCATOR', icon: MapPin }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 border text-xs font-bold uppercase transition-all rounded-xl tracking-wider ${
                activeTab === tab.id 
                  ? 'bg-gradient-orange-red text-brand-white border-transparent shadow-lg' 
                  : 'bg-transparent border-white/10 hover:border-white/20 text-brand-white/70'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </section>

      {/* 3. Tab Contents Layout */}
      <section className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* A: Contact Form */}
          {activeTab === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-8 md:p-12 rounded-[32px] border border-white/5 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold font-display uppercase">CLIENT INQUIRY DESK</h3>
                <p className="text-xs text-brand-white/40 mt-1">Expected reply: less than 12 business hours.</p>
              </div>

              {formSuccess ? (
                <div className="p-8 bg-blaze-orange/10 border border-blaze-orange/20 rounded-2xl text-center space-y-3">
                  <Flame className="w-8 h-8 text-blaze-orange mx-auto animate-pulse" />
                  <h4 className="font-bold text-sm text-brand-white uppercase">INQUIRY LOGGED SUCCESSFULLY</h4>
                  <p className="text-xs text-brand-white/50">A client manager has been assigned. Your tracking reference is BLZ-CS-{(Math.random()*10000).toFixed(0)}.</p>
                  <button 
                    onClick={() => setFormSuccess(false)}
                    className="px-6 py-2 border border-white/15 hover:border-blaze-orange hover:text-blaze-orange text-brand-white text-xs font-bold uppercase mt-4 transition-colors"
                  >
                    SUBMIT ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-brand-white/40 uppercase tracking-wider">YOUR NAME</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-xs" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-brand-white/40 uppercase tracking-wider">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-xs" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-white/40 uppercase tracking-wider">ORDER ID (OPTIONAL)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. BLZ-98741"
                      value={contactForm.orderId}
                      onChange={(e) => setContactForm({ ...contactForm, orderId: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-xs" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-white/40 uppercase tracking-wider">YOUR ENQUIRY MESSAGE</label>
                    <textarea 
                      rows={5} 
                      required
                      value={contactForm.msg}
                      onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-brand-white focus:outline-none focus:border-blaze-orange uppercase tracking-wider text-xs" 
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.01] transition-transform rounded-xl"
                  >
                    SEND SECURE MESSAGE
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {/* B: AI Chat Simulator */}
          {activeTab === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel rounded-[32px] border border-white/5 flex flex-col h-[500px]"
            >
              {/* Chat header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-display uppercase tracking-wider text-brand-white">HELIX CONVERSATIONAL AI</h3>
                  <p className="text-[9px] text-blaze-orange font-bold uppercase tracking-widest mt-0.5 animate-pulse">● HELIX INSTANT ONLINE</p>
                </div>
              </div>

              {/* Chat history logs */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs md:max-w-md p-4 rounded-2xl text-[10px] md:text-xs font-semibold tracking-wider uppercase ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-orange-red text-brand-white rounded-tr-none' 
                        : 'bg-white/5 border border-white/5 text-brand-white/80 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat inputs */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/5 flex space-x-2 bg-black/60 rounded-b-[32px]">
                <input 
                  type="text" 
                  placeholder="ASK HELIX: 'WHAT IS YOUR RETURN POLICY?' OR 'HOW FAST IS SHIPPING?'"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blaze-orange text-brand-white font-semibold uppercase tracking-wider"
                />
                <button 
                  type="submit"
                  className="p-3 bg-gradient-orange-red text-brand-white hover:scale-105 transition-transform rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}

          {/* C: Order Tracker */}
          {activeTab === 'tracking' && (
            <motion.div 
              key="tracking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-8 md:p-12 rounded-[32px] border border-white/5 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold font-display uppercase">ORDER LOGISTICS TRACKER</h3>
                <p className="text-xs text-brand-white/40 mt-1">Enter your BLAZE purchase reference identifier.</p>
              </div>

              <form onSubmit={handleTrackingSubmit} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="ENTER ORDER ID (e.g. BLZ-98741)"
                  value={trackingId}
                  required
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blaze-orange text-brand-white font-semibold uppercase tracking-wider"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-105 transition-transform rounded-xl"
                >
                  TRACK
                </button>
              </form>

              {trackingError && (
                <p className="text-xs text-electric-red font-bold uppercase tracking-wider">{trackingError}</p>
              )}

              {trackingResult && (
                <div className="p-6 bg-white/3 border border-white/5 rounded-2xl text-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-brand-white/50 font-bold uppercase tracking-widest">ORDER: {trackingResult.id}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded tracking-widest ${
                      trackingResult.status === 'DELIVERED' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-blaze-orange/20 text-blaze-orange'
                    }`}>
                      {trackingResult.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] text-brand-white/40 font-bold uppercase tracking-wider">CARRIER</p>
                      <p className="font-bold text-brand-white mt-0.5">{trackingResult.carrier}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-brand-white/40 font-bold uppercase tracking-wider">DATE / ESTIMATED</p>
                      <p className="font-bold text-brand-white mt-0.5">{trackingResult.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-brand-white/40 font-bold uppercase tracking-wider">SHIPPING LOCATION DESTINATION</p>
                    <p className="font-bold text-brand-white mt-0.5">{trackingResult.address}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-brand-white/40 font-bold uppercase tracking-wider">ITEMS LOGGED</p>
                    <p className="font-bold text-blaze-orange mt-0.5 uppercase tracking-wide">{trackingResult.items}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* D: Store Locator */}
          {activeTab === 'locator' && (
            <motion.div 
              key="locator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {STORES.map(store => (
                <div 
                  key={store.city}
                  className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 hover:border-white/15 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black tracking-widest text-blaze-orange uppercase">{store.city} FLAGSHIP</span>
                    <MapPin className="w-5 h-5 text-blaze-orange" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-brand-white/80">{store.loc}</p>
                    <p className="text-[10px] text-brand-white/40 font-bold uppercase mt-1">OPEN DAILY: {store.hours}</p>
                  </div>
                  <button 
                    onClick={() => addToast(`Navigating map details for BLAZE ${store.city}...`, 'info', 'NAVIGATOR')}
                    className="text-[9px] font-black text-blaze-orange hover:text-brand-white tracking-widest uppercase transition-colors"
                  >
                    VIEW MAP DIRECTION →
                  </button>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      {/* 4. Support FAQs list */}
      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-black font-display uppercase tracking-wide text-center flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-blaze-orange mr-2" /> REPEATED FAQS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
              <h4 className="font-bold text-xs text-brand-white uppercase tracking-wider">{faq.q}</h4>
              <p className="text-xs text-brand-white/60 leading-relaxed font-semibold">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
