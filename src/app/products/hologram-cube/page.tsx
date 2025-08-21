'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, Shield, Clock, Heart, Share2, Check, X, Wifi, Zap, Gift, Monitor } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import AddToCartIndicator from '@/components/AddToCartIndicator';
import ProductVideo from '@/components/ProductVideo';

export default function HologramCubePage() {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartIndicator, setShowAddToCartIndicator] = useState(false);
  const { addItem } = useCart();

  const images = [
    { src: '/hologramQube/Hologram_Cube_-_3D_LED_Display_4.webp', label: '3D Display View' },
    { src: '/hologramQube/Hologram-Cube-3D-LED-Display-7.webp', label: 'Holographic View' },
    { src: '/hologramQube/51EkNFd+p9L._AC_SL1001_.jpg', label: 'Package View' },
    { src: '/hologramQube/Screenshot 2025-08-20 at 20.47.19.png', label: 'Product Demo' },
    { src: '/hologramQube/Screenshot 2025-08-20 at 20.47.34.png', label: 'Display Demo' },
    { src: '/hologramQube/Screenshot 2025-08-20 at 20.48.00.png', label: 'Interface Demo' },
    { src: '/hologramQube/image.png', label: 'Stock Market Display' }
  ];

  const videos = [
    { src: '/hologramQube/ssstik.io_@crystal.cube_1755735985137.mp4', label: 'Hologram Demo' },
    { src: '/hologramQube/SnapInsta.to_AQOJ8ldR0pFduTLCNvOm0e3W5q4AWxPD09ZVtcrsyeJjRiKOTBjU6hii1E1ml-hq5cmE7XkLxHK0tulD4iSXCt_cM-hZomQ95zSAoak.mp4', label: 'Product Showcase' }
  ];

  const allMedia = [...images, ...videos];

  // Product data
  const product: Product = {
    id: 'prod_SuAzOcPEF7ZVoV',
    name: 'GeekMagic Hologram Cube - 3D Smart Weather Station & Digital Clock',
    description: 'Transform your space with this stunning 3D holographic display! The GeekMagic Hologram Cube combines cutting-edge holographic technology with smart functionality. Features a transparent crystal design that showcases your photos, GIFs, and animations in breathtaking 3D. Includes real-time weather updates, digital clock, cryptocurrency tracking, and WiFi connectivity. Perfect as a unique gift or modern desktop decoration.',
    price: 29.99,
    originalPrice: 49.99,
    images: images.map(img => img.src),
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

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowAddToCartIndicator(true);
    setTimeout(() => setShowAddToCartIndicator(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Hologram Cube</h1>
              <p className="text-lg text-gray-600 mt-1">
                3D Smart Weather Station & Digital Clock
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <a href="/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Products
                </a>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Hologram Cube</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Media */}
          <div className="space-y-6">
            {/* Main Media Display */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              {selectedMediaIndex < images.length ? (
                <img
                  src={allMedia[selectedMediaIndex].src}
                  alt={allMedia[selectedMediaIndex].label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ProductVideo
                  src={allMedia[selectedMediaIndex].src}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Media Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {allMedia.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMediaIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMediaIndex === index
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {index < images.length ? (
                    <img
                      src={media.src}
                      alt={media.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600">Video</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                GeekMagic Hologram Cube
              </h1>
              <p className="text-xl text-gray-600 mt-4">
                3D Smart Weather Station & Digital Clock with WiFi Connectivity
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
              </span>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">WiFi Connected</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">3D Holographic</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Gift className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Perfect Gift</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                <Monitor className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-900">Smart Display</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="w-16 text-center font-bold text-gray-900 text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                  >
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-600">
                  ${(product.price * quantity).toFixed(2)} total
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center group"
                >
                  <ShoppingCart className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                  Buy Now
                </button>

                <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Features */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-b border-gray-100 pb-3">
                  <dt className="text-sm font-medium text-gray-600">{key}</dt>
                  <dd className="text-sm text-gray-900 mt-1">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart Indicator */}
        <AddToCartIndicator 
          isVisible={showAddToCartIndicator} 
          onClose={() => setShowAddToCartIndicator(false)} 
        />
      </div>
    </div>
  );
} 