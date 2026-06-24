"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-24 right-6 z-[9999] flex flex-col space-y-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`pointer-events-auto w-full glass-panel p-4 rounded-xl flex items-start space-x-3.5 shadow-2xl border ${
                isSuccess 
                  ? 'border-emerald-500/20 shadow-emerald-500/5' 
                  : isError 
                    ? 'border-red-500/20 shadow-red-500/5' 
                    : 'border-blaze-orange/20 shadow-blaze-orange/5'
              }`}
            >
              {/* Type Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {isSuccess ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : isError ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <Info className="w-5 h-5 text-blaze-orange" />
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="text-[10px] font-black tracking-widest text-brand-white uppercase mb-1">
                    {toast.title}
                  </p>
                )}
                <p className="text-xs text-brand-white/85 leading-relaxed font-medium">
                  {toast.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-brand-white/40 hover:text-brand-white p-0.5 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
