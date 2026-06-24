// BLAZE E-Commerce Engine & Layout Shell Manager

// Global State Object
const state = {
  cart: [],
  wishlist: [],
  currentUser: null,
  currency: 'USD',
  language: 'EN',
  couponCode: '',
  discountAmount: 0
};

// Currency Symbols and Rates
const CURRENCY_DATA = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 155.5 },
  AED: { symbol: 'AED ', rate: 3.67 }
};

// Load state from LocalStorage on load
function loadState() {
  try {
    const savedCart = localStorage.getItem('blaze_cart');
    if (savedCart) state.cart = JSON.parse(savedCart);

    const savedWishlist = localStorage.getItem('blaze_wishlist');
    if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);

    const savedUser = localStorage.getItem('blaze_user');
    if (savedUser) state.currentUser = JSON.parse(savedUser);

    const savedCurrency = localStorage.getItem('blaze_currency');
    if (savedCurrency) state.currency = savedCurrency;

    const savedLanguage = localStorage.getItem('blaze_language');
    if (savedLanguage) state.language = savedLanguage;
  } catch (e) {
    console.error("LocalStorage load failed", e);
  }
}

// Save state modifications
function saveCart() { localStorage.setItem('blaze_cart', JSON.stringify(state.cart)); }
function saveWishlist() { localStorage.setItem('blaze_wishlist', JSON.stringify(state.wishlist)); }
function saveUser() {
  if (state.currentUser) {
    localStorage.setItem('blaze_user', JSON.stringify(state.currentUser));
  } else {
    localStorage.removeItem('blaze_user');
  }
}

// Format Price conversion utility
function formatPrice(usdPrice) {
  const curr = CURRENCY_DATA[state.currency] || CURRENCY_DATA.USD;
  const converted = usdPrice * curr.rate;
  if (state.currency === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toFixed(2)}`;
}

// State Action Methods
function addToCart(productId, quantity, color, size) {
  const product = window.products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(
    item => item.product.id === productId && 
            item.selectedColor === color && 
            item.selectedSize === size
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({ product, quantity, selectedColor: color, selectedSize: size });
  }

  saveCart();
  updateUI();
}

function removeFromCart(productId, color, size) {
  state.cart = state.cart.filter(
    item => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
  );
  saveCart();
  updateUI();
}

function updateCartQuantity(productId, color, size, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId, color, size);
    return;
  }
  const index = state.cart.findIndex(
    item => item.product.id === productId && item.selectedColor === color && item.selectedSize === size
  );
  if (index > -1) {
    state.cart[index].quantity = quantity;
  }
  saveCart();
  updateUI();
}

function toggleWishlist(productId) {
  const product = window.products.find(p => p.id === productId);
  if (!product) return;

  const exists = state.wishlist.some(item => item.id === productId);
  if (exists) {
    state.wishlist = state.wishlist.filter(item => item.id !== productId);
  } else {
    state.wishlist.push(product);
  }

  saveWishlist();
  updateUI();
}

function loginUser(email) {
  state.currentUser = {
    id: 'usr_1',
    name: email.split('@')[0].toUpperCase(),
    email: email,
    rewardPoints: 250,
    orders: [
      {
        id: 'BLZ-98741',
        date: '2026-05-12',
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
  saveUser();
  updateUI();
  return true;
}

function registerUser(name, email) {
  state.currentUser = {
    id: `usr_${Date.now()}`,
    name: name,
    email: email,
    rewardPoints: 100,
    orders: []
  };
  saveUser();
  updateUI();
  return true;
}

function logoutUser() {
  state.currentUser = null;
  saveUser();
  updateUI();
}

function applyCoupon(code) {
  const codeUpper = code.toUpperCase();
  if (codeUpper === 'BLAZE20' || codeUpper === 'IGNITE') {
    state.couponCode = codeUpper;
    state.discountAmount = 20; // 20% discount
    updateUI();
    return true;
  }
  return false;
}

function addOrder(address) {
  if (state.cart.length === 0) return null;

  const subtotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const discount = Math.round((subtotal * state.discountAmount) / 100);
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + shipping + tax;

  const newOrder = {
    id: `BLZ-${Math.floor(10000 + Math.random() * 90000)}`,
    items: [...state.cart],
    subtotal,
    shipping,
    discount,
    tax,
    total,
    status: 'Processing',
    date: new Date().toISOString().split('T')[0],
    address
  };

  if (state.currentUser) {
    state.currentUser.rewardPoints += Math.round(total * 0.1);
    state.currentUser.orders.unshift(newOrder);
    saveUser();
  }

  state.cart = [];
  state.couponCode = '';
  state.discountAmount = 0;
  saveCart();
  updateUI();
  return newOrder;
}

// Injects the Layout Shell (Navbar, Cart Drawer, Search overlay, Footer)
function injectShell() {
  const navContainer = document.getElementById('navbar-container');
  const footContainer = document.getElementById('footer-container');

  // Inject Navbar HTML
  if (navContainer) {
    navContainer.innerHTML = `
      <header class="header" id="main-header">
        <div class="nav-container">
          <a href="index.html" class="logo">
            <i data-lucide="flame" style="color: var(--blaze-orange)"></i> BLAZE<span>.</span>
          </a>
          <ul class="nav-links">
            <li><a href="shop.html" id="link-shop">SHOP</a></li>
            <li><a href="sneaker-lab.html" id="link-sneaker-lab">SNEAKER LAB</a></li>
            <li><a href="community.html" id="link-community">COMMUNITY</a></li>
            <li><a href="journal.html" id="link-journal">JOURNAL</a></li>
            <li><a href="about.html" id="link-about">ABOUT BLAZE</a></li>
          </ul>
          <div class="nav-actions">
            <button id="btn-search-trigger"><i data-lucide="search"></i></button>
            <a href="account.html"><i data-lucide="user"></i></a>
            <a href="shop.html?wishlist=true" class="hidden-xs" style="position: relative;">
              <i data-lucide="heart"></i>
              <span class="badge" id="wishlist-badge" style="display:none">0</span>
            </a>
            <button id="btn-cart-trigger" style="position: relative;">
              <i data-lucide="shopping-bag"></i>
              <span class="badge" id="cart-badge" style="display:none">0</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Cart Drawer -->
      <div class="drawer" id="cart-drawer">
        <div class="drawer-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <i data-lucide="shopping-bag" style="color: var(--blaze-orange)"></i>
            <h4 style="font-size:14px; letter-spacing:0.1em">YOUR BAG (<span id="cart-drawer-count">0</span>)</h4>
          </div>
          <button class="drawer-close" id="btn-cart-close"><i data-lucide="x"></i></button>
        </div>
        <div class="drawer-content" id="cart-drawer-items">
          <!-- Cart items loaded dynamically -->
        </div>
        <div class="drawer-footer" id="cart-drawer-summary" style="display:none">
          <!-- Calc board details and actions -->
        </div>
      </div>

      <!-- Search Fullscreen Overlay -->
      <div class="search-overlay" id="search-overlay">
        <div class="search-box-container">
          <div class="search-input-row">
            <i data-lucide="search" style="margin-right:15px; color:rgba(255,255,255,0.4)"></i>
            <input type="text" id="search-overlay-input" placeholder="SEARCH FOR SNEAKERS, PERFORMANCE GEAR...">
            <button class="drawer-close" id="btn-search-close"><i data-lucide="x" style="width:28px; height:28px"></i></button>
          </div>
          <div id="search-results-box" style="margin-top:24px;"></div>
        </div>
      </div>

      <div class="overlay-backdrop" id="overlay-backdrop"></div>
    `;
  }

  // Inject Footer HTML
  if (footContainer) {
    footContainer.innerHTML = `
      <footer class="footer">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="index.html" class="logo">
              <i data-lucide="flame" style="color: var(--blaze-orange)"></i> BLAZE<span>.</span>
            </a>
            <p>Empower athletes, creators, and performers to unlock their highest potential through premium sportswear and performance apparel.</p>
          </div>
          <div class="footer-col">
            <h4>SHOP CATEGORIES</h4>
            <ul>
              <li><a href="shop.html?category=sneakers">SNEAKERS</a></li>
              <li><a href="shop.html?category=men">MEN'S APPAREL</a></li>
              <li><a href="shop.html?category=women">WOMEN'S APPAREL</a></li>
              <li><a href="shop.html?category=accessories">ACCESSORIES</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>BLAZE STORY</h4>
            <ul>
              <li><a href="about.html">ABOUT BLAZE</a></li>
              <li><a href="journal.html">BLAZE JOURNAL</a></li>
              <li><a href="sneaker-lab.html">SNEAKER LAB</a></li>
              <li><a href="community.html">COMMUNITY HUB</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="contact.html">CONTACT US</a></li>
              <li><a href="contact.html?tab=tracking">ORDER TRACKING</a></li>
              <li><a href="contact.html?tab=locator">STORE LOCATOR</a></li>
              <li><a href="contact.html">LIVE FAQ</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} BLAZE INC. ALL RIGHTS RESERVED.</span>
          <div style="display:flex; gap:16px;">
            <span>USD ($) | EN</span>
            <a href="#" style="color:rgba(255,255,255,0.4)">PRIVACY</a>
            <a href="#" style="color:rgba(255,255,255,0.4)">TERMS</a>
          </div>
        </div>
      </footer>
    `;
  }

  // Set Nav Underline
  const page = window.location.pathname.split('/').pop();
  if (page === 'shop.html' || page === 'product.html') document.getElementById('link-shop')?.classList.add('active');
  if (page === 'sneaker-lab.html') document.getElementById('link-sneaker-lab')?.classList.add('active');
  if (page === 'community.html') document.getElementById('link-community')?.classList.add('active');
  if (page === 'journal.html') document.getElementById('link-journal')?.classList.add('active');
  if (page === 'about.html') document.getElementById('link-about')?.classList.add('active');

  // Hook layout UI event listeners
  setupListeners();
}

// Bind UI triggers and actions
function setupListeners() {
  const header = document.getElementById('main-header');
  const cartDrawer = document.getElementById('cart-drawer');
  const searchOverlay = document.getElementById('search-overlay');
  const backdrop = document.getElementById('overlay-backdrop');

  // Header scroll listen
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Open/Close Cart
  document.getElementById('btn-cart-trigger')?.addEventListener('click', () => {
    cartDrawer?.classList.add('open');
    backdrop?.classList.add('open');
  });

  const closeCartFn = () => {
    cartDrawer?.classList.remove('open');
    backdrop?.classList.remove('open');
  };
  document.getElementById('btn-cart-close')?.addEventListener('click', closeCartFn);
  backdrop?.addEventListener('click', closeCartFn);

  // Open/Close Search
  document.getElementById('btn-search-trigger')?.addEventListener('click', () => {
    searchOverlay?.classList.add('open');
  });
  document.getElementById('btn-search-close')?.addEventListener('click', () => {
    searchOverlay?.classList.remove('open');
    document.getElementById('search-overlay-input').value = '';
    document.getElementById('search-results-box').innerHTML = '';
  });

  // Search input events
  const searchInput = document.getElementById('search-overlay-input');
  searchInput?.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    const box = document.getElementById('search-results-box');
    if (!box) return;

    if (val === '') {
      box.innerHTML = '';
      return;
    }

    const matches = window.products.filter(p => 
      p.name.toLowerCase().includes(val) ||
      p.category.toLowerCase().includes(val) ||
      p.subCategory.toLowerCase().includes(val)
    ).slice(0, 5);

    if (matches.length === 0) {
      box.innerHTML = `<p style="font-size:12px; color:rgba(255,255,255,0.4); text-transform:uppercase">NO MATCHES FOUND</p>`;
      return;
    }

    box.innerHTML = `
      <p style="font-size:10px; color:rgba(255,255,255,0.4); font-weight:900; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:16px;">AI MATCHES FOUND (${matches.length})</p>
      <div style="display:flex; flex-direction:column; gap:16px;">
        ${matches.map(p => `
          <a href="product.html?id=${p.id}" style="display:flex; align-items:center; justify-content:between; justify-content:space-between; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:12px; border-radius:12px;">
            <div style="display:flex; align-items:center; gap:16px;">
              <img src="${p.images[0]}" style="width:50px; height:50px; object-fit:cover; border-radius:8px;" />
              <div>
                <p style="font-size:12px; font-weight:700; color:var(--brand-white); text-transform:uppercase;">${p.name}</p>
                <p style="font-size:9px; color:rgba(255,255,255,0.4); margin-top:2px;">${p.category.toUpperCase()} / ${p.subCategory.toUpperCase()}</p>
              </div>
            </div>
            <span style="font-size:12px; font-weight:900; color:var(--blaze-orange);">${formatPrice(p.price)}</span>
          </a>
        `).join('')}
      </div>
    `;
  });
}

// Re-renders cart drawer list and badges
function updateUI() {
  const cartBadge = document.getElementById('cart-badge');
  const wishlistBadge = document.getElementById('wishlist-badge');

  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  
  // Set badges
  if (cartBadge) {
    if (cartCount > 0) {
      cartBadge.style.display = 'flex';
      cartBadge.innerText = cartCount;
    } else {
      cartBadge.style.display = 'none';
    }
  }

  if (wishlistBadge) {
    if (state.wishlist.length > 0) {
      wishlistBadge.style.display = 'flex';
      wishlistBadge.innerText = state.wishlist.length;
    } else {
      wishlistBadge.style.display = 'none';
    }
  }

  // Update Drawer items
  const drawerItems = document.getElementById('cart-drawer-items');
  const drawerSummary = document.getElementById('cart-drawer-summary');
  const drawerCount = document.getElementById('cart-drawer-count');

  if (drawerCount) drawerCount.innerText = cartCount;

  if (drawerItems) {
    if (state.cart.length === 0) {
      drawerItems.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:24px; padding:40px 0;">
          <i data-lucide="shopping-bag" style="width:48px; height:48px; color:rgba(255,255,255,0.08)"></i>
          <div>
            <h4 style="font-size:13px; letter-spacing:0.1em; color:var(--brand-white);">Your bag is empty</h4>
            <p style="font-size:11px; color:rgba(255,255,255,0.4); max-w:200px; margin:8px auto 0;">Equip yourself with premium gear to unlock your speed.</p>
          </div>
          <a href="shop.html" class="btn-primary" style="font-size:9px; padding:10px 20px;">SHOP ALL PRODUCTS</a>
        </div>
      `;
      if (drawerSummary) drawerSummary.style.display = 'none';
    } else {
      drawerItems.innerHTML = state.cart.map((item, index) => `
        <div style="display:flex; gap:16px; padding:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); border-radius:16px; margin-bottom:16px;">
          <img src="${item.product.images[0]}" style="width:70px; height:70px; object-fit:cover; border-radius:12px; border:1px solid rgba(255,255,255,0.08);" />
          <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h4 style="font-size:12px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-w:200px;">${item.product.name}</h4>
                <button onclick="removeFromCart('${item.product.id}', '${item.selectedColor}', '${item.selectedSize}')" style="background:none; border:none; color:rgba(255,255,255,0.4); cursor:pointer;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>
              </div>
              <p style="font-size:9px; color:rgba(255,255,255,0.4); text-transform:uppercase; margin-top:2px;">SIZE: ${item.selectedSize} | ACCENT: <span style="display:inline-block; width:8px; height:8px; border-radius:10px; background-color:${item.selectedColor}; border:1px solid #000; vertical-align:middle; margin-left:2px;"></span></p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
              <div style="display:flex; align-items:center; border:1px solid rgba(255,255,255,0.1); border-radius:6px; background:#000;">
                <button onclick="updateCartQuantity('${item.product.id}', '${item.selectedColor}', '${item.selectedSize}', ${item.quantity - 1})" style="background:none; border:none; padding:4px 8px; color:rgba(255,255,255,0.5); cursor:pointer;">-</button>
                <span style="font-size:11px; font-weight:700; color:var(--brand-white); padding:0 4px;">${item.quantity}</span>
                <button onclick="updateCartQuantity('${item.product.id}', '${item.selectedColor}', '${item.selectedSize}', ${item.quantity + 1})" style="background:none; border:none; padding:4px 8px; color:rgba(255,255,255,0.5); cursor:pointer;">+</button>
              </div>
              <span style="font-size:12px; font-weight:900; color:var(--brand-white);">${formatPrice(item.product.price * item.quantity)}</span>
            </div>
          </div>
        </div>
      `).join('');

      // Calculations board
      const subtotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      const discount = Math.round((subtotal * state.discountAmount) / 100);
      const ship = subtotal > 150 ? 0 : 15;
      const total = subtotal - discount + ship;

      if (drawerSummary) {
        drawerSummary.style.display = 'block';
        drawerSummary.innerHTML = `
          <!-- Coupon code inline -->
          <div style="display:flex; gap:8px; margin-bottom:16px;">
            <input type="text" id="cart-drawer-coupon" placeholder="PROMO CODE (e.g. BLAZE20)" value="${state.couponCode}" style="flex:1; bg:none; background:black; border:1px solid rgba(255,255,255,0.1); color:white; padding:8px 12px; font-size:10px; font-weight:700; text-transform:uppercase; outline:none;" />
            <button onclick="const input = document.getElementById('cart-drawer-coupon').value; if(applyCoupon(input)) alert('PROMO APPLIED!'); else alert('INVALID PROMO CODE.');" style="background:rgba(255,255,255,0.1); border:none; color:white; padding:8px 16px; font-size:10px; font-weight:900; letter-spacing:0.1em; cursor:pointer;">APPLY</button>
          </div>
          ${state.couponCode ? `<p style="font-size:9px; color:var(--blaze-orange); font-weight:700; margin-bottom:12px; text-transform:uppercase">PROMO ACTIVE: ${state.couponCode} (-20%)</p>` : ''}

          <div style="display:flex; flex-direction:column; gap:8px; font-size:11px; font-weight:600; color:rgba(255,255,255,0.5); margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between;"><span>Subtotal</span><span style="color:white">${formatPrice(subtotal)}</span></div>
            ${discount > 0 ? `<div style="display:flex; justify-content:space-between; color:var(--blaze-orange);"><span>Discount</span><span>-${formatPrice(discount)}</span></div>` : ''}
            <div style="display:flex; justify-content:space-between;"><span>DHL Shipping</span><span style="color:white">${ship === 0 ? 'FREE' : formatPrice(ship)}</span></div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:900; color:white; border-top:1px solid rgba(255,255,255,0.08); padding-top:12px;"><span>Estimated Total</span><span style="color:var(--blaze-orange)">${formatPrice(total)}</span></div>
          </div>

          <a href="checkout.html" class="btn-primary w-full" style="padding:16px 0; text-align:center; font-size:10px; font-weight:900; border-radius:12px;">PROCEED TO CHECKOUT</a>
        `;
      }
    }
  }

  // Refresh Lucide Icons after insertion
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Fire page specific UI callbacks if exist
  if (typeof renderPageUI === 'function') {
    renderPageUI();
  }
}

// Self Init
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  injectShell();
  updateUI();
});
