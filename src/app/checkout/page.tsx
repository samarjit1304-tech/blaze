"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp, formatPrice } from '@/context/AppContext';
import { CreditCard, ShoppingBag, Truck, Gift, ShieldCheck, CheckCircle, ArrowRight, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
  const router = useRouter();
  const { 
    cart, 
    currency, 
    addOrder, 
    couponCode, 
    discountAmount, 
    applyCoupon 
  } = useApp();

  const [address, setAddress] = useState({ name: '', street: '', city: '', zip: '', cardNum: '', cardExpiry: '', cardCvc: '' });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  
  // Coupon forms
  const [couponInput, setCouponInput] = useState('');
  const [couponAlert, setCouponAlert] = useState('');

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountVal = Math.round((cartSubtotal * discountAmount) / 100);
  const shippingVal = cartSubtotal > 150 ? 0 : 15;
  const taxVal = Math.round((cartSubtotal - discountVal) * 0.08);
  const totalVal = cartSubtotal - discountVal + shippingVal + taxVal;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const fullAddr = `${address.street}, ${address.city}, ZIP: ${address.zip}`;
    const orderObj = addOrder(fullAddr);
    
    if (orderObj) {
      setCreatedOrder(orderObj);
      setCheckoutStep('success');
    }
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponAlert('✓ PROMO CODE APPLIED!');
    } else {
      setCouponAlert('✗ INVALID PROMO CODE.');
    }
    setCouponInput('');
  };

  if (checkoutStep === 'success' && createdOrder) {
    return (
      <div className="min-h-[80vh] bg-brand-black text-brand-white flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full glass-panel p-8 md:p-12 rounded-[32px] border border-white/10 text-center space-y-6 shadow-2xl"
        >
          <CheckCircle className="w-16 h-16 text-volt-green mx-auto animate-bounce" />
          
          <div>
            <p className="text-[10px] text-blaze-orange font-black tracking-widest uppercase">ORDER PROCESSED SECURELY</p>
            <h2 className="text-2xl md:text-3xl font-black font-display uppercase mt-2">THANK YOU FOR YOUR ORDER</h2>
            <p className="text-xs text-brand-white/40 mt-1">Invoice ID: {createdOrder.id}</p>
          </div>

          <div className="text-left bg-black/60 p-5 rounded-2xl border border-white/5 space-y-3 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-brand-white/50">Recipient Name</span>
              <span className="font-bold">{address.name.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-brand-white/50">Shipping Destination</span>
              <span className="font-bold truncate max-w-[200px]">{createdOrder.address}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-brand-white/50">Carrier Service</span>
              <span className="font-bold text-blaze-orange">DHL EXPRESS COURIER</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span>Total Paid</span>
              <span className="text-gradient-orange-red">{formatPrice(createdOrder.total, currency)}</span>
            </div>
          </div>

          <p className="text-xs text-brand-white/50 leading-relaxed max-w-sm mx-auto">
            A confirmation receipt and courier tracking link have been dispatched to your email address. Welcome to the BLAZE roster.
          </p>

          <div className="flex gap-4 pt-2">
            <Link 
              href="/shop" 
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-brand-white text-xs font-bold uppercase tracking-wider rounded"
            >
              CONTINUE SHOPPING
            </Link>
            <Link 
              href="/account" 
              className="flex-1 py-3 bg-gradient-orange-red text-brand-white text-xs font-bold uppercase tracking-wider rounded"
            >
              VIEW DASHBOARD
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-12 max-w-[1440px] mx-auto px-6 md:px-12">
      
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase">BLAZE TRANSACTION GATEWAY</p>
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase mt-1">SECURE CHECKOUT</h1>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center space-y-6 max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 text-brand-white/10 mx-auto" />
          <h3 className="font-display font-black text-xl uppercase tracking-widest">Your bag is empty</h3>
          <p className="text-xs text-brand-white/40">You must have gear in your bag to proceed to checkout.</p>
          <Link href="/shop" className="px-6 py-3 bg-gradient-orange-red text-brand-white text-xs font-bold tracking-widest uppercase inline-block">
            SHOP NEW ARRIVALS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form inputs side (7 cols) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Shipping Details */}
            <div className="glass-panel p-6 md:p-8 rounded-[24px] border border-white/5 space-y-6">
              <h3 className="text-base font-bold font-display uppercase tracking-wider flex items-center border-b border-white/5 pb-3">
                <Truck className="w-5 h-5 text-blaze-orange mr-2" /> 1. SHIPPING ADDRESS
              </h3>
              
              <div className="space-y-4 text-xs font-semibold">
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-white/40 tracking-wider">FULL NAME</label>
                  <input 
                    type="text" required
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blaze-orange text-brand-white uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-white/40 tracking-wider">STREET ADDRESS</label>
                  <input 
                    type="text" required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blaze-orange text-brand-white uppercase"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-white/40 tracking-wider">CITY</label>
                    <input 
                      type="text" required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blaze-orange text-brand-white uppercase"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-white/40 tracking-wider">ZIP / POSTAL CODE</label>
                    <input 
                      type="text" required
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blaze-orange text-brand-white uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="glass-panel p-6 md:p-8 rounded-[24px] border border-white/5 space-y-6">
              <h3 className="text-base font-bold font-display uppercase tracking-wider flex items-center border-b border-white/5 pb-3">
                <CreditCard className="w-5 h-5 text-blaze-orange mr-2" /> 2. SECURE PAYMENT
              </h3>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', name: 'CREDIT CARD' },
                  { id: 'paypal', name: 'PAYPAL' },
                  { id: 'apple', name: 'APPLE / GOOGLE PAY' }
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`py-3 border text-[10px] font-bold tracking-wider transition-all rounded-lg uppercase ${
                      paymentMethod === method.id 
                        ? 'bg-white/10 border-blaze-orange text-brand-white' 
                        : 'bg-transparent border-white/5 hover:border-white/10 text-brand-white/60'
                    }`}
                  >
                    {method.name}
                  </button>
                ))}
              </div>

              {/* Form fields depending on method */}
              <AnimatePresence mode="wait">
                {paymentMethod === 'card' ? (
                  <motion.div 
                    key="card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 text-xs font-semibold pt-2"
                  >
                    <div className="space-y-1">
                      <label className="text-[10px] text-brand-white/40 tracking-wider">CARD NUMBER</label>
                      <input 
                        type="text" required placeholder="XXXX XXXX XXXX XXXX"
                        value={address.cardNum}
                        onChange={(e) => setAddress({ ...address, cardNum: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blaze-orange text-brand-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-brand-white/40 tracking-wider">EXPIRY DATE</label>
                        <input 
                          type="text" required placeholder="MM/YY"
                          value={address.cardExpiry}
                          onChange={(e) => setAddress({ ...address, cardExpiry: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blaze-orange text-brand-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-brand-white/40 tracking-wider">CVC / CVV</label>
                        <input 
                          type="text" required placeholder="XXX"
                          value={address.cardCvc}
                          onChange={(e) => setAddress({ ...address, cardCvc: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blaze-orange text-brand-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="alt"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-white/3 border border-white/5 rounded-xl text-center text-xs font-semibold pt-4"
                  >
                    <p className="text-brand-white/60">Simulating external payment gateway integration. Click place order to proceed.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-orange-red text-brand-white text-xs font-black tracking-widest uppercase hover:scale-[1.01] transition-transform rounded-xl shadow-xl flex items-center justify-center"
            >
              PLACE ORDER & PAY {formatPrice(totalVal, currency)} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          {/* Cart summary side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Promo coupon card */}
            <div className="glass-panel p-6 rounded-[24px] border border-white/5 space-y-4">
              <h4 className="text-xs font-bold tracking-widest uppercase text-blaze-orange flex items-center">
                <Gift className="w-4 h-4 mr-2" /> DEDUCT PROMO CODE
              </h4>
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input 
                  type="text" placeholder="PROMO CODE (e.g. BLAZE20)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-xl text-xs px-4 py-2.5 text-brand-white uppercase font-bold tracking-wider focus:outline-none focus:border-blaze-orange"
                />
                <button type="submit" className="px-4 py-2.5 bg-white/10 hover:bg-blaze-orange text-brand-white text-xs font-bold uppercase transition-colors rounded-xl">
                  APPLY
                </button>
              </form>
              {couponAlert && (
                <p className="text-[10px] text-blaze-orange font-bold uppercase tracking-wider">{couponAlert}</p>
              )}
            </div>

            {/* Invoiced items list */}
            <div className="glass-panel p-6 rounded-[24px] border border-white/5 space-y-6">
              <h4 className="text-xs font-bold tracking-widest uppercase text-brand-white border-b border-white/5 pb-3">ORDER INVENTORY SUMMARY</h4>

              <div className="space-y-4 divide-y divide-white/5 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item, index) => (
                  <div key={index} className={`flex justify-between items-center ${index > 0 ? 'pt-4' : ''}`}>
                    <div className="flex items-center space-x-3 text-xs">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg border border-white/10 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-brand-white line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-brand-white/40 mt-0.5">SIZE: {item.selectedSize} | QTY: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-white">{formatPrice(item.product.price * item.quantity, currency)}</span>
                  </div>
                ))}
              </div>

              {/* Calculations board */}
              <div className="space-y-3 text-xs font-semibold pt-4 border-t border-white/5">
                <div className="flex justify-between text-brand-white/60">
                  <span>Cart Subtotal</span>
                  <span>{formatPrice(cartSubtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-blaze-orange">
                    <span>Discount Coupon ({discountAmount}%)</span>
                    <span>-{formatPrice(discountVal, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-white/60">
                  <span>DHL Express Shipping</span>
                  <span>{shippingVal === 0 ? 'FREE' : formatPrice(shippingVal, currency)}</span>
                </div>
                <div className="flex justify-between text-brand-white/60">
                  <span>Sales Tax (8%)</span>
                  <span>{formatPrice(taxVal, currency)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-brand-white border-t border-white/10 pt-3">
                  <span>Estimated Total Due</span>
                  <span className="text-gradient-orange-red text-glow-orange">{formatPrice(totalVal, currency)}</span>
                </div>
              </div>
            </div>

            {/* Secures statement */}
            <div className="flex items-center space-x-2 text-[10px] text-brand-white/40 justify-center font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>SSL 256-BIT CRYPTO TRANSACTION SECURITY SHIELDED</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
