import { Product } from '@/types';

// Cache for card skins data
let cardSkinsCache: Product[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Sample data structure for card skins (fallback)
const sampleCardSkins: Product[] = [
  {
    id: 'cardskin_vegeta_blue_saiyan_1',
    name: 'Vegeta Super Saiyan Blue Card Skin',
    description: 'A bold credit card skin featuring Vegeta in his Super Saiyan Blue form with an intense glare and glowing aura. Perfect for Dragon Ball fans who want a powerful, sleek look.',
    price: 5.00,
    images: ['/cardskins/vegeta-blue-saiyan-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.9,
    reviews: 287,
    inStock: true,
    features: ['Super Saiyan Blue', 'Vegeta design', 'Powerful aura', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Vegeta',
      'Style': 'Super Saiyan Blue'
    },
    stripePriceId: 'price_cardskin_vegeta_blue_saiyan_1'
  },
  {
    id: 'cardskin_vegeta_lightning_aura_1',
    name: 'Vegeta Lightning Aura Card Skin',
    description: 'Showcasing Vegeta mid-battle with crackling blue lightning energy, this skin adds an electrifying effect to your card.',
    price: 5.00,
    images: ['/cardskins/vegeta-lightning-aura-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    features: ['Lightning aura', 'Battle scene', 'Electrifying effect', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Vegeta',
      'Style': 'Lightning energy'
    },
    stripePriceId: 'price_cardskin_vegeta_lightning_aura_1'
  },
  {
    id: 'cardskin_goku_vegeta_duo_1',
    name: 'Vegeta & Goku Duo Card Skin',
    description: 'A dynamic skin featuring Vegeta and Goku side by side in their golden Super Saiyan forms, ready for battle.',
    price: 5.00,
    images: ['/cardskins/goku-vegeta-duo-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    features: ['Goku & Vegeta duo', 'Super Saiyan forms', 'Battle ready', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Duo',
      'Style': 'Golden Super Saiyan'
    },
    stripePriceId: 'price_cardskin_goku_vegeta_duo_1'
  },
  {
    id: 'cardskin_vegeta_blackwhite_1',
    name: 'Vegeta Black & White Silhouette Skin',
    description: 'Minimalist black-and-white design of Vegeta in a serious pose. A clean, stylish choice for fans of the prince of all Saiyans.',
    price: 5.00,
    images: ['/cardskins/vegeta-blackwhite-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.7,
    reviews: 98,
    inStock: true,
    features: ['Black & white design', 'Minimalist style', 'Serious pose', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Vegeta',
      'Style': 'Monochrome silhouette'
    },
    stripePriceId: 'price_cardskin_vegeta_blackwhite_1'
  },
  {
    id: 'cardskin_goku_black_rose_1',
    name: 'Goku Black (Rose Form) Card Skin',
    description: 'Featuring Goku Black with his signature pink Rose transformation aura, this skin is dark yet vibrant.',
    price: 5.00,
    images: ['/cardskins/goku-black-rose-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.8,
    reviews: 167,
    inStock: true,
    features: ['Goku Black design', 'Rose form', 'Pink aura', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Goku Black',
      'Style': 'Rose transformation'
    },
    stripePriceId: 'price_cardskin_goku_black_rose_1'
  },
  {
    id: 'cardskin_goku_blue_kamehameha_1',
    name: 'Goku Super Saiyan Blue Kamehameha Skin',
    description: 'Goku unleashing a Kamehameha wave in his Super Saiyan Blue form, glowing with power.',
    price: 5.00,
    images: ['/cardskins/goku-blue-kamehameha-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.9,
    reviews: 312,
    inStock: true,
    features: ['Super Saiyan Blue', 'Kamehameha wave', 'Blue energy', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Goku',
      'Style': 'Blue Kamehameha'
    },
    stripePriceId: 'price_cardskin_goku_blue_kamehameha_1'
  },
  {
    id: 'cardskin_goku_blackwhite_1',
    name: 'Goku Black & White Silhouette Skin',
    description: 'A striking monochrome sketch of Goku powering up, highlighting the simplicity and raw energy of Dragon Ball.',
    price: 5.00,
    images: ['/cardskins/goku-blackwhite-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.6,
    reviews: 87,
    inStock: true,
    features: ['Black & white design', 'Monochrome sketch', 'Raw energy', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Goku',
      'Style': 'Monochrome sketch'
    },
    stripePriceId: 'price_cardskin_goku_blackwhite_1'
  },
  {
    id: 'cardskin_goku_super_saiyan_1',
    name: 'Goku Super Saiyan Charge Skin',
    description: 'Bright and fiery, this skin shows Goku powering up in his Super Saiyan form with golden energy blasting outward.',
    price: 5.00,
    images: ['/cardskins/goku-super-saiyan-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.8,
    reviews: 198,
    inStock: true,
    features: ['Super Saiyan form', 'Golden energy', 'Powering up', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Goku',
      'Style': 'Golden Super Saiyan'
    },
    stripePriceId: 'price_cardskin_goku_super_saiyan_1'
  },
  {
    id: 'cardskin_dragon_ball_super_logo_1',
    name: 'Dragon Ball Super Logo Card Skin',
    description: 'Featuring Goku with the Dragon Ball Super logo, surrounded by fiery red aura. A bold, branded choice for fans of the series.',
    price: 5.00,
    images: ['/cardskins/dragon-ball-super-logo-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.7,
    reviews: 145,
    inStock: true,
    features: ['Dragon Ball Super logo', 'Branded design', 'Red aura', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Super',
      'Style': 'Branded logo design'
    },
    stripePriceId: 'price_cardskin_dragon_ball_super_logo_1'
  },
  {
    id: 'cardskin_goku_kanji_symbol_1',
    name: 'Goku Kanji Symbol Card Skin',
    description: 'A minimalist orange skin with Goku\'s iconic kanji "悟" (Go), representing wisdom and his martial journey.',
    price: 5.00,
    images: ['/cardskins/goku-kanji-symbol-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.5,
    reviews: 76,
    inStock: true,
    features: ['Kanji symbol', 'Minimalist design', 'Orange theme', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Goku',
      'Style': 'Minimalist kanji'
    },
    stripePriceId: 'price_cardskin_goku_kanji_symbol_1'
  },
  {
    id: 'cardskin_goku_black_rose2_1',
    name: 'Goku Black Rose Power Card Skin',
    description: 'Another variant of Goku Black in his Rose form, surrounded by swirling pink and purple aura.',
    price: 5.00,
    images: ['/cardskins/goku-black-rose2-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.8,
    reviews: 134,
    inStock: true,
    features: ['Goku Black Rose', 'Pink & purple aura', 'Swirling energy', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Goku Black',
      'Style': 'Rose power variant'
    },
    stripePriceId: 'price_cardskin_goku_black_rose2_1'
  },
  {
    id: 'cardskin_goku_classic_super_saiyan_1',
    name: 'Goku Classic Super Saiyan Skin',
    description: 'A classic take on Goku in Super Saiyan form with his golden hair, bright yellow aura, and determined expression.',
    price: 5.00,
    images: ['/cardskins/goku-classic-super-saiyan-skin.png'],
    category: 'Dragon Ball Z',
    brand: 'CardSkins',
    rating: 4.9,
    reviews: 267,
    inStock: true,
    features: ['Classic Super Saiyan', 'Golden hair', 'Yellow aura', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Dragon Ball Z - Goku',
      'Style': 'Classic Super Saiyan'
    },
    stripePriceId: 'price_cardskin_goku_classic_super_saiyan_1'
  },
  {
    id: 'cardskin_solo_leveling_hollow_mask_1',
    name: 'Solo Leveling Inspired Hollow Mask Credit Card Skin – Sinister Blue Edition',
    description: 'A bold credit/debit card skin inspired by the dark aesthetic of Solo Leveling. Featuring a sinister mask with glowing red eyes, jagged teeth, and icy blue tones, this design captures the chilling presence of powerful antagonists and shadowy figures from the series. Durable yet slim, it personalizes your card without interfering with chip, swipe, or tap-to-pay functionality. Perfect for fans of Solo Leveling and dark anime art styles.',
    price: 5.00,
    images: ['/cardskins/solo-leveling-hollow-mask-skin.png'],
    category: 'Solo Leveling',
    brand: 'CardSkins',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    features: ['Solo Leveling design', 'Dark fantasy theme', 'Sinister mask', 'Glowing red eyes', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Solo Leveling - Hollow Mask',
      'Style': 'Sinister blue and black'
    },
    stripePriceId: 'price_cardskin_solo_leveling_hollow_mask_1'
  },
  {
    id: 'cardskin_one_piece_straw_hat_jolly_roger_1',
    name: 'One Piece Straw Hat Pirates Jolly Roger Credit Card Skin – Crew Edition',
    description: 'This credit/debit card skin features the iconic Straw Hat Pirates Jolly Roger from One Piece. In the center is the classic skull with Luffy\'s straw hat, surrounded by unique mini Jolly Roger emblems representing other crew members such as Zoro, Sanji, Brook, and more. The black background makes the holographic-like colors of the designs stand out, giving your card a stylish, anime-inspired upgrade. Slim and durable, this skin protects your card surface while keeping it fully functional for chip, swipe, and tap payments.',
    price: 5.00,
    images: ['/cardskins/one-piece-straw-hat-jolly-roger-skin.png'],
    category: 'One Piece',
    brand: 'CardSkins',
    rating: 4.9,
    reviews: 267,
    inStock: true,
    features: ['One Piece design', 'Straw Hat Pirates', 'Jolly Roger emblem', 'Crew members', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'One Piece - Straw Hat Pirates',
      'Style': 'Black background with holographic accents'
    },
    stripePriceId: 'price_cardskin_one_piece_straw_hat_jolly_roger_1'
  },
  {
    id: 'cardskin_hello_kitty_melody_1',
    name: 'Hello Kitty & My Melody Credit Card Skin – Pink Hearts Edition',
    description: 'This decorative credit/debit card skin features two beloved Sanrio characters: Hello Kitty in her signature red bow and My Melody in her pink bunny hood, holding a gift. The design is set against a soft pink background with hearts and polka dots, creating a cute and playful aesthetic. Crafted to fit standard credit/debit cards, this skin provides a stylish layer of protection while personalizing your card. It is thin enough not to interfere with swiping, tap-to-pay, or chip use, while giving your card a fun, kawaii-themed look.',
    price: 5.00,
    images: ['/cardskins/hello-kitty-melody-1.webp'],
    category: 'Kawaii',
    brand: 'CardSkins',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    features: ['Sanrio characters', 'Kawaii design', 'Pink hearts theme', 'Easy to apply', 'Universal fit'],
    specifications: {
      'Material': 'Premium vinyl',
      'Size': 'Universal fit',
      'Installation': 'Peel and stick',
      'Durability': 'Long-lasting',
      'Theme': 'Hello Kitty & My Melody',
      'Style': 'Pink hearts and polka dots'
    },
    stripePriceId: 'price_cardskin_hello_kitty_melody_1'
  }
];

// Fetch card skins from Stripe API
async function fetchCardSkinsFromStripe(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products?type=card_skin');
    if (!response.ok) {
      throw new Error('Failed to fetch card skins from API');
    }
    
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching card skins from Stripe:', error);
    return [];
  }
}

// Get card skins with caching
export async function getCardSkins(): Promise<Product[]> {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (cardSkinsCache.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
    return cardSkinsCache;
  }
  
  // Try to fetch from Stripe
  const stripeProducts = await fetchCardSkinsFromStripe();
  
  if (stripeProducts.length > 0) {
    // Update cache with Stripe data
    cardSkinsCache = stripeProducts;
    lastFetchTime = now;
    return stripeProducts;
  }
  
  // Fallback to sample data if Stripe fetch fails
  console.warn('Using sample card skins data (Stripe fetch failed)');
  cardSkinsCache = sampleCardSkins;
  lastFetchTime = now;
  return sampleCardSkins;
}

// Get card skins by category
export async function getCardSkinsByCategory(category: string): Promise<Product[]> {
  const allSkins = await getCardSkins();
  
  if (category === 'All') {
    return allSkins;
  }
  
  return allSkins.filter(skin => skin.category === category);
}

// Search card skins
export async function searchCardSkins(searchTerm: string): Promise<Product[]> {
  const allSkins = await getCardSkins();
  
  if (!searchTerm.trim()) {
    return allSkins;
  }
  
  const term = searchTerm.toLowerCase();
  
  return allSkins.filter(skin => 
    skin.name.toLowerCase().includes(term) ||
    skin.description.toLowerCase().includes(term) ||
    skin.category.toLowerCase().includes(term) ||
    skin.brand.toLowerCase().includes(term)
  );
}

// Get all available categories
export async function getCardSkinCategories(): Promise<string[]> {
  const allSkins = await getCardSkins();
  const categories = [...new Set(allSkins.map(skin => skin.category))];
  return ['All', ...categories.sort()];
}

// Get a specific card skin by ID
export async function getCardSkinById(id: string): Promise<Product | null> {
  const allSkins = await getCardSkins();
  return allSkins.find(skin => skin.id === id) || null;
}

// Clear cache (useful for testing or manual refresh)
export function clearCardSkinsCache(): void {
  cardSkinsCache = [];
  lastFetchTime = 0;
}

// Force refresh cache
export async function refreshCardSkinsCache(): Promise<Product[]> {
  clearCardSkinsCache();
  return await getCardSkins();
} 