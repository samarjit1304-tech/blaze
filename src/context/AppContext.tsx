"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  date: string;
  address: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
  title?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
  orders: Order[];
}

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  currentUser: User | null;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED';
  language: 'EN' | 'FR' | 'DE' | 'ZH' | 'AR';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  couponCode: string;
  discountAmount: number;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error', title?: string) => void;
  removeToast: (id: string) => void;
  addToCart: (product: Product, quantity: number, color: string, size: string) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateCartQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  loginUser: (email: string) => boolean;
  registerUser: (name: string, email: string) => boolean;
  logoutUser: () => void;
  addOrder: (address: string) => Order | null;
  applyCoupon: (code: string) => boolean;
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED') => void;
  setLanguage: (language: 'EN' | 'FR' | 'DE' | 'ZH' | 'AR') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AED: 'AED '
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currency, setCurrencyState] = useState<'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED'>('USD');
  const [language, setLanguageState] = useState<'EN' | 'FR' | 'DE' | 'ZH' | 'AR'>('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast Handlers
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Load from local storage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('blaze_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('blaze_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedUser = localStorage.getItem('blaze_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedCurrency = localStorage.getItem('blaze_currency');
      if (savedCurrency) setCurrencyState(savedCurrency as any);

      const savedLanguage = localStorage.getItem('blaze_language');
      if (savedLanguage) setLanguageState(savedLanguage as any);
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem('blaze_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('blaze_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('blaze_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('blaze_user');
    }
  }, [currentUser]);

  const addToCart = (product: Product, quantity: number, color: string, size: string) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && 
                item.selectedColor === color && 
                item.selectedSize === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    addToast(`${quantity}x ${product.name} (${size}) added to your bag.`, 'success', 'ITEM ADDED');
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
    ));
    addToast('Item removed from your bag.', 'info', 'BAG UPDATED');
  };

  const updateCartQuantity = (productId: string, color: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart(prevCart => prevCart.map(item => {
      if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountAmount(0);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(item => item.id === product.id);
      if (exists) {
        addToast(`${product.name} removed from your wishlist.`, 'info', 'WISHLIST UPDATED');
        return prevWishlist.filter(item => item.id !== product.id);
      }
      addToast(`${product.name} added to your wishlist.`, 'success', 'WISHLIST UPDATED');
      return [...prevWishlist, product];
    });
  };

  const loginUser = (email: string): boolean => {
    // Simulated authentication
    const mockUser: User = {
      id: 'usr_1',
      name: email.split('@')[0].toUpperCase(),
      email,
      rewardPoints: 250,
      orders: [
        {
          id: 'BLZ-98741',
          date: '2026-05-12',
          items: [],
          subtotal: 195,
          shipping: 0,
          discount: 20,
          tax: 15,
          total: 190,
          status: 'Delivered',
          address: '12 Luxury Drive, Beverly Hills, CA'
        }
      ]
    };
    setCurrentUser(mockUser);
    return true;
  };

  const registerUser = (name: string, email: string): boolean => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      rewardPoints: 100, // Sign up bonus
      orders: []
    };
    setCurrentUser(newUser);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const applyCoupon = (code: string): boolean => {
    const uppercaseCode = code.toUpperCase();
    if (uppercaseCode === 'BLAZE20' || uppercaseCode === 'IGNITE') {
      setCouponCode(uppercaseCode);
      setDiscountAmount(20); // 20% discount
      return true;
    }
    return false;
  };

  const setCurrency = (curr: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED') => {
    setCurrencyState(curr);
    localStorage.setItem('blaze_currency', curr);
  };

  const setLanguage = (lang: 'EN' | 'FR' | 'DE' | 'ZH' | 'AR') => {
    setLanguageState(lang);
    localStorage.setItem('blaze_language', lang);
  };

  const addOrder = (address: string): Order | null => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 15;
    const discount = Math.round((subtotal * discountAmount) / 100);
    const tax = Math.round((subtotal - discount) * 0.08);
    const total = subtotal - discount + shipping + tax;

    const newOrder: Order = {
      id: `BLZ-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      subtotal,
      shipping,
      discount,
      tax,
      total,
      status: 'Processing',
      date: new Date().toISOString().split('T')[0],
      address
    };

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        rewardPoints: currentUser.rewardPoints + Math.round(total * 0.1), // 10% cash back in points
        orders: [newOrder, ...currentUser.orders]
      };
      setCurrentUser(updatedUser);
    }

    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider value={{
      cart,
      wishlist,
      currentUser,
      currency,
      language,
      searchQuery,
      setSearchQuery,
      couponCode,
      discountAmount,
      toasts,
      addToast,
      removeToast,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      loginUser,
      registerUser,
      logoutUser,
      addOrder,
      applyCoupon,
      setCurrency,
      setLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const formatPrice = (price: number, currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED'): string => {
  const conversionRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 155.5,
    AED: 3.67
  };

  const converted = price * conversionRates[currency];
  
  if (currency === 'JPY') {
    return `${CURRENCY_SYMBOLS[currency]}${Math.round(converted).toLocaleString()}`;
  }
  return `${CURRENCY_SYMBOLS[currency]}${converted.toFixed(2)}`;
};
