'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Filter, Grid, List } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import AddToCartIndicator from '@/components/AddToCartIndicator';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [brands, setBrands] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showAddToCartIndicator, setShowAddToCartIndicator] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<string>('');
  const { addItem } = useCart();

  useEffect(() => {
    // Use hardcoded data instead of API call
    const minecraftCompassProduct: Product = {
      id: 'prod_StSX7agKmGxakP',
      name: 'Minecraft Compass',
      description: 'Navigate your world with this authentic Minecraft compass replica. Experience the magic of Minecraft in the real world with this authentic compass replica! Perfect for fans of all ages, this high-quality compass features the iconic red needle that always points to your spawn point. Made with premium materials and attention to detail, it\'s the perfect gift for any Minecraft enthusiast.',
      price: 11.99,
      originalPrice: 19.99,
      images: ['/minecraft_compass/compass_in_hand.jpg'],
      category: 'Gaming',
      brand: 'Minecraft Official',
      rating: 4.9,
      reviews: 2847,
      inStock: true,
      features: ['Authentic Design', 'High-quality Materials', 'Perfect Gift', 'Working Compass', 'Premium Packaging'],
      specifications: {
        'Material': 'High-quality metal and glass',
        'Dimensions': '3.5 x 3.5 x 1.2 inches',
        'Weight': '4.2 oz (120g)',
        'Color': 'Classic Minecraft brown with red needle',
        'Function': 'Working compass with magnetic needle',
        'Packaging': 'Premium gift box included'
      },
      stripePriceId: 'price_1RyIdqBJjaZO6BBgFHzb7Be4'
    };

    const hologramCubeProduct: Product = {
      id: 'prod_SuAzOcPEF7ZVoV',
      name: 'GeekMagic Hologram Cube - 3D Smart Weather Station & Digital Clock',
      description: 'Transform your space with this stunning 3D holographic display! The GeekMagic Hologram Cube combines cutting-edge holographic technology with smart functionality. Features a transparent crystal design that showcases your photos, GIFs, and animations in breathtaking 3D. Includes real-time weather updates, digital clock, cryptocurrency tracking, and WiFi connectivity. Perfect as a unique gift or modern desktop decoration.',
      price: 29.99,
      originalPrice: 49.99,
      images: ['/hologramQube/61uz2dP6RdL._SX522_.jpg'],
      category: 'Gadgets',
      brand: 'GeekMagic',
      rating: 4.7,
      reviews: 892,
      inStock: true,
      features: [
        '3D Holographic Display Technology',
        'Real-time Weather Station',
        'Digital Clock with Date Display',
        'Customizable Photo Album',
        'GIF Animation Support',
        'WiFi Connectivity',
        'Cryptocurrency Price Tracking',
        'Transparent Crystal Design',
        'Compact & Portable',
        'USB-C Charging Cable Included'
      ],
      specifications: {
        'Dimensions': '4.33 x 2.76 x 1.97 inches (10 x 6 x 4.5 cm)',
        'Weight': '3.84 ounces (109g)',
        'Material': 'High-quality plastic with transparent crystal shell',
        'Color': 'Black with transparent display',
        'Connectivity': 'WiFi enabled',
        'Power': 'USB-C charging cable included',
        'Display': '3D holographic LED display',
        'Sensors': 'Three-axis gyroscope sensor',
        'Compatibility': 'Windows platform support for PC monitoring',
        'Package Contents': '1x Hologram Cube Display, 1x USB-C Cable, Instructions'
      },
      stripePriceId: 'price_1RyMhfBJjaZO6BBgQfl1z4HZ'
    };

    const smartLedBacklightProduct: Product = {
      id: 'prod_SmartLedBacklight',
      name: 'Smart LED Strip Backlight - Gaming Atmosphere Ambient Light',
      description: 'Transform your gaming setup with this intelligent LED strip backlight! Simply plug into your computer USB port and watch as it automatically matches your screen colors in real-time. Features multiple modes including screen sync, music rhythm, and custom colors.',
      price: 19.99,
      originalPrice: 29.99,
      images: ['/monitorSmartLights/main.jpg'],
      category: 'Gaming',
      brand: 'Skydimo',
      rating: 4.8,
      reviews: 1247,
      inStock: true,
      features: [
        'Real-time Screen Color Matching',
        'USB Plug & Play Installation',
        'Music Rhythm Sync Mode',
        'Custom Color Selection',
        'Adjustable Brightness & Speed',
        'Multiple Dynamic Effects',
        '3-Sided LED Strip Design',
        'Automatic Display Recognition',
        'Gaming Atmosphere Enhancement',
        'Easy App Control'
      ],
      specifications: {
        'Type': 'USB LED Light Strip',
        'Connection': 'USB plug-and-play',
        'Design': '3-sided LED strip',
        'Modes': 'Screen sync, Music, Custom, Illusion, Marquee',
        'Colors': 'Full RGB spectrum',
        'Control': 'Automatic & manual modes',
        'Compatibility': 'All computer screens',
        'Installation': 'No setup required',
        'Package Contents': '1x LED Strip Set',
        'Note': 'Color tone may vary slightly from images'
      },
      stripePriceId: 'price_smart_led_backlight'
    };

    setAllProducts([minecraftCompassProduct, hologramCubeProduct, smartLedBacklightProduct]);
    setCategories(['All', 'Gaming', 'Electronics', 'Gadgets']);
    setBrands(['All', 'Minecraft Official', 'GeekMagic', 'Skydimo']);
    setLoading(false);
  }, []);

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AddToCartIndicator 
        isVisible={showAddToCartIndicator} 
        onClose={() => setShowAddToCartIndicator(false)} 
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Discover our complete collection of premium products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-500 cursor-pointer"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-500 cursor-pointer"
                      />
                      <span className="ml-2 text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  Showing {sortedProducts.length} of {allProducts.length} products
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                                        <a href={
                    product.id === 'prod_StSX7agKmGxakP' ? '/products/MinecraftCompass' : 
                    product.id === 'prod_SuAzOcPEF7ZVoV' ? '/products/hologram-cube' : 
                    product.id === 'prod_SmartLedBacklight' ? '/products/smart-led-backlight' : 
                    `/products/${product.id}`
                  } className="block w-full">
                    {/* Product Image */}
                    <div className={`relative bg-gray-100 overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                    }`}>
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={
                            product.id === 'prod_StSX7agKmGxakP' ? '/minecraft_compass/compass_in_hand.jpg' : 
                            product.id === 'prod_SuAzOcPEF7ZVoV' ? '/hologramQube/61uz2dP6RdL._SX522_.jpg' : 
                            product.images[0]
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}
                      
                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Brand */}
                      <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                      
                      {/* Product Name */}
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Description for list view */}
                      {viewMode === 'list' && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          ({product.reviews.toLocaleString()})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        {/* Stock Status */}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem(product, 1);
                          setLastAddedProduct(product.name);
                          setShowAddToCartIndicator(true);
                          setTimeout(() => setShowAddToCartIndicator(false), 3000);
                        }}
                        className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group/btn cursor-pointer"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Add to Cart
                      </button>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                  }}
                  className="mt-4 text-gray-900 hover:text-gray-700 underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 