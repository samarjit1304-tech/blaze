"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, formatPrice } from '@/context/AppContext';
import { products, Product } from '@/data/products';
import { Search, Grid, List, SlidersHorizontal, Heart, Star, Sparkles, ShoppingBag, Eye, HelpCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart, currency } = useApp();

  // Search & view states
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchVal, setSearchVal] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Active filters states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(350);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Trigger search params loading
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const sub = searchParams.get('subCategory');
    if (sub) setSelectedSubCategory(sub);

    const search = searchParams.get('search');
    if (search) setSearchVal(search);

    const wl = searchParams.get('wishlist');
    if (wl === 'true') {
      setSelectedStock('wishlist');
    }
  }, [searchParams]);

  // Extract all subcategories, colors, and sizes for filters
  const allSubCategories = Array.from(new Set(products.map(p => p.subCategory)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes))).sort();
  const allColors = [
    { name: 'Core Black', value: '#000000' },
    { name: 'Blaze Orange', value: '#FF5A1F' },
    { name: 'Electric Red', value: '#FF2E2E' },
    { name: 'Stealth Gray', value: '#333333' },
    { name: 'Pure White', value: '#FFFFFF' },
    { name: 'Volt Green', value: '#39FF14' },
    { name: 'Deep Navy', value: '#0A192F' }
  ];

  // Filtering + Searching logic
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    
    // 2. Subcategory Filter
    if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) return false;

    // 3. Price Filter
    if (product.price > priceRange) return false;

    // 4. Color Filter
    if (selectedColor !== 'all' && !product.colors.some(c => c.value === selectedColor)) return false;

    // 5. Size Filter
    if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) return false;

    // 6. Stock/Availability Filter
    if (selectedStock === 'in-stock' && product.stockStatus === 'out-of-stock') return false;
    if (selectedStock === 'low-stock' && product.stockStatus !== 'low-stock') return false;
    if (selectedStock === 'wishlist') {
      const isWL = wishlist.some(item => item.id === product.id);
      if (!isWL) return false;
    }

    // 7. Search Input (Simulated AI search terms)
    if (searchVal.trim() !== '') {
      const term = searchVal.toLowerCase();
      const matchName = product.name.toLowerCase().includes(term);
      const matchDesc = product.description.toLowerCase().includes(term);
      const matchCat = product.category.toLowerCase().includes(term);
      const matchSub = product.subCategory.toLowerCase().includes(term);
      return matchName || matchDesc || matchCat || matchSub;
    }

    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'best-seller') {
      const aVal = a.bestSeller ? 1 : 0;
      const bVal = b.bestSeller ? 1 : 0;
      return bVal - aVal;
    }
    return 0; // Default Featured
  });

  // Pagination bounds
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setPriceRange(350);
    setSelectedColor('all');
    setSelectedSize('all');
    setSelectedStock('all');
    setSortBy('featured');
    setSearchVal('');
    router.replace('/shop');
  };

  const isWishlisted = (id: string) => wishlist.some(item => item.id === id);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white py-10 max-w-[1440px] mx-auto px-6 md:px-12">
      
      {/* Editorial Title */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-bold tracking-[0.25em] text-blaze-orange uppercase">BLAZE GEAR DIRECTORY</span>
        <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight uppercase mt-2">
          {selectedStock === 'wishlist' ? 'YOUR WISHLIST' : 'SHOP ALL PRODUCTS'}
        </h1>
        <p className="text-xs md:text-sm text-brand-white/40 mt-2 tracking-widest uppercase">
          FOUND {sortedProducts.length} PREMIUM PIECES
        </p>
      </div>

      {/* AI Search & Filter Toggles */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white/3 p-4 rounded-2xl border border-white/5 mb-8">
        
        {/* Search bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-white/35" />
          <input 
            type="text"
            placeholder="AI SEARCH: SEARCH GEAR BY STYLE, SPORT, OR ACCENT..."
            value={searchVal}
            onChange={(e) => { setSearchVal(e.target.value); setCurrentPage(1); }}
            className="w-full bg-black/60 border border-white/5 rounded-xl pl-12 pr-16 py-3.5 text-xs font-semibold tracking-wider placeholder-white/20 focus:outline-none focus:border-blaze-orange uppercase"
          />
          {searchVal.trim() !== '' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-1.5 text-[10px] text-blaze-orange font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">98% AI MATCH</span>
            </div>
          )}
        </div>

        {/* Toggle options */}
        <div className="flex w-full md:w-auto items-center justify-between gap-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-xl border text-xs font-bold uppercase transition-all tracking-wider ${
              showFilters ? 'bg-blaze-orange text-brand-white border-transparent' : 'bg-black/60 border-white/5 hover:border-white/20'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{showFilters ? 'HIDE FILTERS' : 'FILTERS'}</span>
          </button>

          {/* Grid/List switchers */}
          <div className="flex border border-white/5 rounded-xl overflow-hidden bg-black/60 divide-x divide-white/5">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3.5 transition-colors ${viewMode === 'grid' ? 'text-blaze-orange bg-white/5' : 'text-brand-white/40 hover:text-brand-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-3.5 transition-colors ${viewMode === 'list' ? 'text-blaze-orange bg-white/5' : 'text-brand-white/40 hover:text-brand-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER DRAWER / ACCORDION */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/2 p-6 rounded-2xl border border-white/5 text-xs">
              
              {/* Category */}
              <div className="space-y-3">
                <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase">DIVISION</span>
                <div className="flex flex-col space-y-1">
                  {['all', 'men', 'women', 'sneakers', 'accessories'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setSelectedSubCategory('all'); setCurrentPage(1); }}
                      className={`text-left py-1 hover:text-blaze-orange transition-colors uppercase font-semibold ${
                        selectedCategory === cat ? 'text-blaze-orange font-bold' : 'text-brand-white/60'
                      }`}
                    >
                      {cat === 'all' ? 'All Divisions' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              <div className="space-y-3">
                <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase">SUB DIVISION</span>
                <select 
                  value={selectedSubCategory}
                  onChange={(e) => { setSelectedSubCategory(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-brand-white font-semibold focus:outline-none focus:border-blaze-orange uppercase text-xs"
                >
                  <option value="all">All Subdivisions</option>
                  {allSubCategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Size & Colors */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase block mb-2">SIZE</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => setSelectedSize('all')}
                      className={`px-2.5 py-1.5 border rounded text-[9px] font-bold transition-all ${
                        selectedSize === 'all' ? 'bg-blaze-orange text-brand-white border-transparent' : 'border-white/10 text-brand-white/70'
                      }`}
                    >
                      ALL
                    </button>
                    {allSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setCurrentPage(1); }}
                        className={`px-2.5 py-1.5 border rounded text-[9px] font-bold transition-all ${
                          selectedSize === size ? 'bg-blaze-orange text-brand-white border-transparent' : 'border-white/10 text-brand-white/70'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase block mb-2">ACCENT COLOR</span>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setSelectedColor('all')}
                      className={`w-6 h-6 rounded-full border text-[8px] font-bold flex items-center justify-center ${
                        selectedColor === 'all' ? 'border-blaze-orange text-blaze-orange' : 'border-white/20 text-white/50'
                      }`}
                    >
                      ALL
                    </button>
                    {allColors.map(c => (
                      <button
                        key={c.value}
                        onClick={() => { setSelectedColor(c.value); setCurrentPage(1); }}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          selectedColor === c.value ? 'border-blaze-orange scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Sort */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] text-brand-white/40 font-black tracking-widest mb-2 uppercase">
                    <span>MAX PRICE</span>
                    <span className="text-brand-white">{formatPrice(priceRange, currency)}</span>
                  </div>
                  <input 
                    type="range"
                    min="20"
                    max="350"
                    step="5"
                    value={priceRange}
                    onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                    className="w-full accent-blaze-orange"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase block mb-1">SORT BY</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg p-2 text-brand-white font-semibold focus:outline-none focus:border-blaze-orange uppercase text-[10px]"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low-High</option>
                      <option value="price-high">Price: High-Low</option>
                      <option value="rating">Rating</option>
                      <option value="best-seller">Best Sellers</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-[10px] text-brand-white/40 tracking-widest font-black uppercase block mb-1">AVAILABILITY</span>
                    <select
                      value={selectedStock}
                      onChange={(e) => setSelectedStock(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg p-2 text-brand-white font-semibold focus:outline-none focus:border-blaze-orange uppercase text-[10px]"
                    >
                      <option value="all">All Products</option>
                      <option value="in-stock">In Stock Only</option>
                      <option value="low-stock">Limited Stock</option>
                      <option value="wishlist">Wishlist Only</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={resetFilters}
                  className="w-full py-2 bg-white/5 hover:bg-blaze-orange text-brand-white rounded font-bold uppercase tracking-wider text-[10px] transition-colors"
                >
                  RESET ALL FILTERS
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCTS DISPLAY LIST/GRID */}
      {paginatedProducts.length === 0 ? (
        <div className="py-24 text-center space-y-6">
          <HelpCircle className="w-16 h-16 text-brand-white/10 mx-auto" />
          <div>
            <h3 className="font-display font-black text-xl uppercase tracking-widest">No matching gear found</h3>
            <p className="text-xs text-brand-white/40 max-w-[280px] mx-auto mt-2 leading-relaxed">Modify your search query or reset filters to unlock high-performance sportswear.</p>
          </div>
          <button 
            onClick={resetFilters}
            className="px-6 py-3 bg-gradient-orange-red text-brand-white text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map(product => {
            const wish = isWishlisted(product.id);
            return (
              <div 
                key={product.id}
                className="group relative flex flex-col bg-white/2 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 hover:bg-white/5 transition-all duration-300"
              >
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="px-3 py-1 bg-gradient-orange-red text-brand-white text-[9px] font-black uppercase tracking-wider rounded">
                      {product.badge}
                    </span>
                  )}
                  {product.sustainable && (
                    <span className="px-3 py-1 bg-emerald-600/90 text-brand-white text-[9px] font-black uppercase tracking-wider rounded">
                      SUSTAINABLE
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full border border-white/10 transition-colors ${
                    wish ? 'bg-gradient-orange-red text-brand-white' : 'bg-black/60 text-white/70 hover:text-blaze-orange'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                </button>

                <div className="relative aspect-square w-full bg-zinc-900/40 overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {product.images[1] && (
                    <img src={product.images[1]} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/shop/product/${product.id}`} className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-blaze-orange hover:text-brand-white transition-colors">
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button 
                      onClick={() => addToCart(product, 1, product.colors[0]?.value || '#000', product.sizes[0] || 'M')}
                      className="p-3 bg-brand-white text-brand-black rounded-full hover:bg-blaze-orange hover:text-brand-white transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-3.5 h-3.5 fill-blaze-orange text-blaze-orange" />
                      <span className="text-xs font-bold text-brand-white">{product.rating}</span>
                    </div>
                    <Link href={`/shop/product/${product.id}`} className="hover:text-blaze-orange transition-colors">
                      <h3 className="font-semibold text-sm tracking-wide text-brand-white line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-[10px] text-brand-white/40 tracking-wider uppercase mt-1">{product.subCategory}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-bold text-brand-white">{formatPrice(product.price, currency)}</span>
                    <span className="text-[9px] text-brand-white/40 font-bold uppercase tracking-widest">
                      {product.stockStatus === 'out-of-stock' ? 'LAUNCHING SOON' : product.stockCount <= 3 ? `ONLY ${product.stockCount} LEFT!` : 'IN STOCK'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-6">
          {paginatedProducts.map(product => {
            const wish = isWishlisted(product.id);
            return (
              <div 
                key={product.id}
                className="group flex flex-col md:flex-row bg-white/2 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 hover:bg-white/5 transition-all p-4 space-y-4 md:space-y-0 md:space-x-6"
              >
                <div className="relative w-full md:w-48 aspect-square rounded-xl overflow-hidden bg-zinc-900/40 flex-shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-blaze-orange text-brand-white text-[8px] font-black uppercase tracking-wider rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] text-blaze-orange font-bold tracking-widest uppercase">{product.subCategory}</span>
                        <Link href={`/shop/product/${product.id}`} className="hover:text-blaze-orange transition-colors block mt-0.5">
                          <h3 className="font-bold text-lg text-brand-white">{product.name}</h3>
                        </Link>
                      </div>
                      <span className="text-lg font-black text-brand-white">{formatPrice(product.price, currency)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5">
                      <Star className="w-3.5 h-3.5 fill-blaze-orange text-blaze-orange" />
                      <span className="text-xs font-bold text-brand-white">{product.rating}</span>
                      <span className="text-[10px] text-brand-white/40">({product.reviewsCount} reviews)</span>
                    </div>

                    <p className="text-xs text-brand-white/60 line-clamp-2 max-w-2xl">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-6 border-t border-white/5 pt-4">
                    <div className="flex space-x-3">
                      <Link 
                        href={`/shop/product/${product.id}`}
                        className="px-4 py-2 border border-white/10 hover:border-blaze-orange text-brand-white text-[10px] font-bold tracking-widest uppercase transition-colors"
                      >
                        VIEW DETAIL
                      </Link>
                      <button 
                        onClick={() => addToCart(product, 1, product.colors[0]?.value || '#000', product.sizes[0] || 'M')}
                        className="px-4 py-2 bg-gradient-orange-red text-brand-white text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform"
                      >
                        ADD TO BAG
                      </button>
                    </div>

                    <button 
                      onClick={() => toggleWishlist(product)}
                      className={`p-2 rounded-full border border-white/10 transition-colors ${
                        wish ? 'bg-gradient-orange-red text-brand-white' : 'text-white/60 hover:text-blaze-orange'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION ENGINE */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-16">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/5 rounded border border-white/5 text-xs font-bold uppercase tracking-wider hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            PREV
          </button>
          
          <span className="text-xs font-bold text-brand-white/60 tracking-wider">
            PAGE {currentPage} OF {totalPages}
          </span>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/5 rounded border border-white/5 text-xs font-bold uppercase tracking-wider hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            NEXT
          </button>
        </div>
      )}

    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-blaze-orange animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
