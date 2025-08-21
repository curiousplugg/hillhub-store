'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Truck, Shield, Clock, Check, X, Zap, Monitor, Music, Palette } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import AddToCartIndicator from '@/components/AddToCartIndicator';

export default function SmartLedBacklightPage() {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('24inch');
  const [showAddToCartIndicator, setShowAddToCartIndicator] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const { addItem } = useCart();

  const images = [
    { src: '/monitorSmartLights/main.jpg', label: 'Main Product Shot' },
    { src: '/monitorSmartLights/features.jpg', label: 'Features Display' },
    { src: '/monitorSmartLights/app.jpg', label: 'App Control' },
    { src: '/monitorSmartLights/usb.jpg', label: 'USB Connection' },
    { src: '/monitorSmartLights/collage.jpg', label: 'Product Collage' },
    { src: '/monitorSmartLights/24inches.jpg', label: '24 Inch Size' },
    { src: '/monitorSmartLights/27inches.jpg', label: '27 Inch Size' },
    { src: '/monitorSmartLights/32inches.jpg', label: '32 Inch Size' },
    { src: '/monitorSmartLights/34inches.jpg', label: '34 Inch Size' }
  ];

  const allMedia = [...images];

  // Size options with dimensions
  const sizeOptions = [
    { value: '24inch', label: '24 Inch', dimensions: '45 x 25 cm' },
    { value: '27inch', label: '27 Inch', dimensions: '50 x 30 cm' },
    { value: '32inch', label: '32 Inch', dimensions: '60 x 35 cm' },
    { value: '34inch', label: '34 Inch', dimensions: '70 x 30 cm' }
  ];

  // Product data
  const product: Product = {
    id: 'prod_SmartLedBacklight',
    name: 'Smart LED Strip Backlight - Gaming Atmosphere Ambient Light',
    description: 'Transform your gaming setup with this intelligent LED strip backlight! Simply plug into your computer USB port and watch as it automatically matches your screen colors in real-time. Features multiple modes including screen sync, music rhythm, and custom colors. Perfect for creating an immersive gaming atmosphere and enhancing your viewing experience.',
    price: 19.99,
    originalPrice: 29.99,
    images: images.map(img => img.src),
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
    stripePriceId: 'price_smart_led_backlight' // This will need to be updated with actual Stripe price ID
  };

  const handleAddToCart = () => {
    const productWithSize = {
      ...product,
      name: `${product.name} - ${sizeOptions.find(s => s.value === selectedSize)?.label}`,
      selectedSize
    };
    addItem(productWithSize, quantity);
    setShowAddToCartIndicator(true);
    setTimeout(() => setShowAddToCartIndicator(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Products
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Smart LED Backlight</span>
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
              <img
                src={allMedia[selectedMediaIndex].src}
                alt={allMedia[selectedMediaIndex].label}
                className="w-full h-full object-cover"
              />
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
                  <img
                    src={media.src}
                    alt={media.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Smart LED Strip Backlight
              </h1>
              <p className="text-xl text-gray-600 mt-4">
                Gaming Atmosphere Ambient Light with Music Sync
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
                <Monitor className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Screen Sync</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Music className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">Music Rhythm</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Palette className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Custom Colors</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-900">USB Plug & Play</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-900">
                Select Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedSize === size.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{size.label}</div>
                    <div className="text-sm text-gray-600">{size.dimensions}</div>
                  </button>
                ))}
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
                  onClick={async () => {
                    if (isBuyNowLoading) return;
                    
                    setIsBuyNowLoading(true);
                    try {
                      const response = await fetch('/api/checkout/buy-now', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          productId: product.id,
                          quantity: quantity,
                          selectedSize: selectedSize,
                          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                          cancelUrl: `${window.location.origin}/products/smart-led-backlight`,
                        }),
                      });

                      const { url, error } = await response.json();
                      
                      if (error) {
                        console.error('Checkout error:', error);
                        alert('Failed to create checkout session. Please try again.');
                        return;
                      }

                      if (url) {
                        window.location.href = url;
                      }
                    } catch (error) {
                      console.error('Checkout error:', error);
                      alert('Failed to create checkout session. Please try again.');
                    } finally {
                      setIsBuyNowLoading(false);
                    }
                  }}
                  disabled={isBuyNowLoading}
                  className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBuyNowLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                      Buy Now
                    </>
                  )}
                </button>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
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