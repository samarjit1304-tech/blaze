export interface ColorOption {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women' | 'sneakers' | 'accessories';
  subCategory: string;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  stockCount: number;
  specs: string[];
  sustainable: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
}

// Helper lists to generate 100+ premium products
const COLORS: ColorOption[] = [
  { name: 'Core Black', value: '#000000' },
  { name: 'Blaze Orange', value: '#FF5A1F' },
  { name: 'Electric Red', value: '#FF2E2E' },
  { name: 'Stealth Gray', value: '#333333' },
  { name: 'Pure White', value: '#FFFFFF' },
  { name: 'Volt Green', value: '#39FF14' },
  { name: 'Deep Navy', value: '#0A192F' }
];

const MEN_SUB_CATEGORIES = ['T-Shirts', 'Hoodies', 'Jackets', 'Shorts', 'Joggers', 'Compression Wear'];
const WOMEN_SUB_CATEGORIES = ['Sports Bras', 'Leggings', 'Tops', 'Hoodies', 'Jackets'];
const SNEAKERS_SUB_CATEGORIES = ['Running Shoes', 'Basketball Shoes', 'Lifestyle Sneakers', 'Limited Editions'];
const ACCESSORIES_SUB_CATEGORIES = ['Bags', 'Caps', 'Socks', 'Bottles', 'Gloves'];

// Curated high-resolution Unsplash image assets mapped to specific gear categories
const IMAGES_BY_SUB_CATEGORY: Record<string, string[]> = {
  'T-Shirts': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800'
  ],
  'Hoodies': [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1571244856353-fb0e3868a8aa?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800'
  ],
  'Jackets': [
    'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800'
  ],
  'Shorts': [
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517438476312-12d7a0cf741e?auto=format&fit=crop&q=80&w=800'
  ],
  'Joggers': [
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800'
  ],
  'Compression Wear': [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1502904582529-0a15b4891a2f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800'
  ],
  'Sports Bras': [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800'
  ],
  'Leggings': [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800'
  ],
  'Tops': [
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800'
  ],
  'Running Shoes': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800'
  ],
  'Basketball Shoes': [
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800'
  ],
  'Lifestyle Sneakers': [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
  ],
  'Limited Editions': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'
  ],
  'Bags': [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800'
  ],
  'Caps': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1594911774802-8822a707cff3?auto=format&fit=crop&q=80&w=800'
  ],
  'Socks': [
    'https://images.unsplash.com/photo-1607345366928-199e5760f05e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800'
  ],
  'Bottles': [
    'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800'
  ],
  'Gloves': [
    'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800'
  ]
};

// Fallback images in case a category isn't found
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1571244856353-fb0e3868a8aa?auto=format&fit=crop&q=80&w=800'
];

const getImagesForSubCategory = (sub: string, index: number, count: number = 3): string[] => {
  const urls = IMAGES_BY_SUB_CATEGORY[sub] || FALLBACK_IMAGES;
  const list: string[] = [];
  for (let offset = 0; offset < count; offset++) {
    list.push(urls[(index + offset) % urls.length]);
  }
  return list;
};

const generateProducts = (): Product[] => {
  const list: Product[] = [];

  // Generate Men's apparel (28 items)
  for (let i = 1; i <= 28; i++) {
    const sub = MEN_SUB_CATEGORIES[i % MEN_SUB_CATEGORIES.length];
    const isSustainable = i % 3 === 0;
    const isBestSeller = i % 5 === 0;
    const isNew = i % 4 === 0;
    const isFeatured = i === 1 || i === 7;
    const price = Math.round(55 + (i * 4.5));
    
    list.push({
      id: `men-${i}`,
      name: `BLAZE Pro ${sub} ${100 + i}`,
      price,
      description: `Engineered for professional athletes and daily training. Features high-grade moisture-wicking technology and premium stretch fabric that expands with your movements. Created with optimal cooling ventilation maps where you sweat most.`,
      category: 'men',
      subCategory: sub,
      images: getImagesForSubCategory(sub, i, 3),
      colors: [COLORS[i % COLORS.length], COLORS[(i + 1) % COLORS.length], COLORS[(i + 2) % COLORS.length]],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      rating: parseFloat((4.2 + (i % 8) * 0.1).toFixed(1)),
      reviewsCount: 12 + i * 9,
      badge: isBestSeller ? 'Best Seller' : isNew ? 'New Season' : undefined,
      stockStatus: i % 8 === 0 ? 'low-stock' : 'in-stock',
      stockCount: i % 8 === 0 ? 3 : 42,
      specs: [
        'Aero-Dry cooling fabric',
        'Reflective details for night safety',
        'Ergonomic flatlock seams',
        isSustainable ? '100% Recycled polyester mesh' : '88% Polyester, 12% Spandex blend'
      ],
      sustainable: isSustainable,
      featured: isFeatured,
      bestSeller: isBestSeller,
      newArrival: isNew
    });
  }

  // Generate Women's apparel (28 items)
  for (let i = 1; i <= 28; i++) {
    const sub = WOMEN_SUB_CATEGORIES[i % WOMEN_SUB_CATEGORIES.length];
    const isSustainable = i % 4 === 0;
    const isBestSeller = i % 6 === 0;
    const isNew = i % 5 === 0;
    const isFeatured = i === 3 || i === 9;
    const price = Math.round(50 + (i * 5));

    list.push({
      id: `women-${i}`,
      name: `BLAZE Ignite ${sub} ${200 + i}`,
      price,
      description: `Elevate your training session. This premium garment features second-skin compressed fit technology, ultra-soft breathable fabrics, and contouring stitch details. Styled beautifully to cross over from intense workouts to elite streetwear.`,
      category: 'women',
      subCategory: sub,
      images: getImagesForSubCategory(sub, i, 3),
      colors: [COLORS[(i + 2) % COLORS.length], COLORS[(i + 4) % COLORS.length]],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: parseFloat((4.4 + (i % 6) * 0.1).toFixed(1)),
      reviewsCount: 22 + i * 11,
      badge: isBestSeller ? 'Best Seller' : isNew ? 'Hot Drop' : undefined,
      stockStatus: i % 10 === 0 ? 'low-stock' : 'in-stock',
      stockCount: i % 10 === 0 ? 5 : 56,
      specs: [
        'Ignite-Stretch moisture absorption technology',
        'Contouring compression waist',
        'Hidden pocket design',
        isSustainable ? 'Made with 80% recycled fibers' : 'Premium Nylon-Lycra construction'
      ],
      sustainable: isSustainable,
      featured: isFeatured,
      bestSeller: isBestSeller,
      newArrival: isNew
    });
  }

  // Generate Sneakers (28 items)
  for (let i = 1; i <= 28; i++) {
    const sub = SNEAKERS_SUB_CATEGORIES[i % SNEAKERS_SUB_CATEGORIES.length];
    const isSustainable = i % 3 === 0;
    const isBestSeller = i === 1 || i === 4 || i === 8;
    const isNew = i % 3 === 0;
    const isFeatured = i === 1 || i === 2 || i === 12;
    const price = Math.round(130 + (i * 6.5));

    list.push({
      id: `sneakers-${i}`,
      name: `BLAZE ${sub.replace(' Shoes', '').replace(' Sneakers', '')} ${i === 1 ? 'X-1 Carbon' : `Phantom ${300 + i}`}`,
      price,
      description: `Push boundaries with BLAZE’s leading footwear innovation. Features our responsive BlazeFoam™ midsole for explosive energy return, a custom woven upper for targeted support, and a carbon fiber propulsion plate. Ideal for setting PRs or elite styling.`,
      category: 'sneakers',
      subCategory: sub,
      images: getImagesForSubCategory(sub, i, 3),
      colors: [COLORS[i % COLORS.length], COLORS[(i + 3) % COLORS.length], COLORS[4]],
      sizes: ['7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
      rating: parseFloat((4.5 + (i % 5) * 0.1).toFixed(1)),
      reviewsCount: 88 + i * 20,
      badge: i === 1 ? 'LAUNCHING SOON' : isBestSeller ? 'Best Seller' : isNew ? 'Limited Drop' : undefined,
      stockStatus: i === 1 ? 'out-of-stock' : i % 7 === 0 ? 'low-stock' : 'in-stock',
      stockCount: i === 1 ? 0 : i % 7 === 0 ? 2 : 120,
      specs: [
        'BlazeFoam dynamic cushioning sole',
        'Carbon-fiber speed plate inserts',
        'Ultra-breathable woven mesh upper',
        'Anatomical heel lock design'
      ],
      sustainable: isSustainable,
      featured: isFeatured,
      bestSeller: isBestSeller,
      newArrival: isNew
    });
  }

  // Generate Accessories (20 items)
  for (let i = 1; i <= 20; i++) {
    const sub = ACCESSORIES_SUB_CATEGORIES[i % ACCESSORIES_SUB_CATEGORIES.length];
    const isSustainable = i % 5 === 0;
    const isBestSeller = i % 7 === 0;
    const isNew = i % 6 === 0;
    const price = Math.round(20 + (i * 3));

    list.push({
      id: `accessories-${i}`,
      name: `BLAZE Tech ${sub} ${400 + i}`,
      price,
      description: `Complete your loadout. Built with weather-resistant materials, smart organization features, and minimal aesthetics to blend utility with the signature luxury athletic styling of BLAZE.`,
      category: 'accessories',
      subCategory: sub,
      images: getImagesForSubCategory(sub, i, 2),
      colors: [COLORS[0], COLORS[3], COLORS[1]],
      sizes: sub === 'Socks' || sub === 'Gloves' ? ['S/M', 'L/XL'] : ['One Size'],
      rating: parseFloat((4.1 + (i % 7) * 0.1).toFixed(1)),
      reviewsCount: 15 + i * 4,
      badge: isBestSeller ? 'Best Seller' : isNew ? 'New Arrival' : undefined,
      stockStatus: i % 9 === 0 ? 'low-stock' : 'in-stock',
      stockCount: i % 9 === 0 ? 1 : 250,
      specs: [
        'Water-repellent technical coating',
        'Heavy-duty tactical construction',
        'Signature BLAZE reflective branding',
        isSustainable ? 'Eco-conscious fabric options' : 'High durability synthetic yarn'
      ],
      sustainable: isSustainable,
      featured: false,
      bestSeller: isBestSeller,
      newArrival: isNew
    });
  }

  return list;
};

export const products: Product[] = generateProducts();
