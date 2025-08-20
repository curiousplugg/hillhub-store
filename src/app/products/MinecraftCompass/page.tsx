'use client';

import { useState } from 'react'
import Link from 'next/link';;
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, Play } from 'lucide-react';
import { Product } from '@/types';
import CheckoutButton from '@/components/CheckoutButton';
import { useCart } from '@/contexts/CartContext';
import ProductVideo from '@/components/ProductVideo';
import AddToCartIndicator from '@/components/AddToCartIndicator';

export default function MinecraftCompassPage() {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0); // Start with first item
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartIndicator, setShowAddToCartIndicator] = useState(false);
  const [autoPlayMainVideo, setAutoPlayMainVideo] = useState(false);
  const { addItem } = useCart();

  // Simplified arrays for all media
  const videos = [
    { src: '/minecraft_compass/SnapInsta.to_AQPqm1bsoSKsrLj_kYZlIzWQWgiELBZwnJ6j4bbx5121-SxTafzh8x78cPGJsKnls-WJSUvPinwMVOaEF4GvQpYhqZpiBZLisjwL7Wc.mp4', poster: '/minecraft_compass/compass.jpg', label: 'Video 1' },
    { src: '/minecraft_compass/ssstik.io_@notenoughtoys_1755562642851.mp4', poster: '/minecraft_compass/pixel_compass1.jpg', label: 'Video 2' },
    { src: '/minecraft_compass/ssstik.io_@sketchsnack_1755562860576.mp4', poster: '/minecraft_compass/compass_in_hand.jpg', label: 'Video 3' },
    { src: '/minecraft_compass/ssstik.io_@uafotoofficial_1755562822625.mp4', poster: '/minecraft_compass/compass.jpg', label: 'Video 4' },
    { src: '/minecraft_compass/ssstik.io_@your.tiktok.plugg_1755562756854.mp4', poster: '/minecraft_compass/compass_in_hand.jpg', label: 'Video 5' }
  ];

  const images = [
    { src: '/minecraft_compass/compass_in_hand.jpg', label: 'Compass in Hand' },
    { src: '/minecraft_compass/compass.jpg', label: 'Compass Detail' },
    { src: '/minecraft_compass/pixel_compass1.jpg', label: 'Pixel Compass' }
  ];



  // Hardcoded product data - no API calls
  const product: Product = {
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
    stripePriceId: 'price_live_1234567890'
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowAddToCartIndicator(true);
    setTimeout(() => setShowAddToCartIndicator(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AddToCartIndicator 
        isVisible={showAddToCartIndicator} 
        onClose={() => setShowAddToCartIndicator(false)} 
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {/* Main Image/Video */}
              <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {selectedMediaIndex < videos.length ? (
                  // Video
                  <ProductVideo
                    src={videos[selectedMediaIndex].src}
                    poster={videos[selectedMediaIndex].poster}
                    className="w-full h-full"
                    autoPlay={autoPlayMainVideo}
                    onPlay={() => setAutoPlayMainVideo(false)}
                  />
                ) : (
                  // Image
                  <img
                    src={images[selectedMediaIndex - videos.length].src}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Images</h4>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMediaIndex(videos.length + index)} // Images start after videos
                      className={`aspect-square rounded-lg border-2 overflow-hidden relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedMediaIndex === videos.length + index ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={`${product.name} ${item.label}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Videos</h4>
                <div className="grid grid-cols-3 gap-4">
                  {videos.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedMediaIndex(index);
                        setAutoPlayMainVideo(true);
                      }}
                      className={`group aspect-square rounded-lg border-2 overflow-hidden relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedMediaIndex === index ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={item.poster}
                        alt={`${product.name} ${item.label}`}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                        style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
            {/* Product Name */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
              )}
              <span className="text-sm text-green-600 font-medium">Save ${product.originalPrice ? (product.originalPrice - product.price).toFixed(2) : '0'}</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-600">-</span>
                </button>
                <span className="w-16 text-center text-lg font-medium text-gray-900">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-600">+</span>
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Ships in 1-3 weeks depending on location</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                                    <CheckoutButton
                        items={[{
                          id: product.id,
                          name: product.name,
                          description: product.description,
                          price: product.price,
                          images: product.images,
                          quantity: quantity
                        }]}
                        className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer"
                      >
                        Buy Now - ${(product.price * quantity).toFixed(2)}
                      </CheckoutButton>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ShoppingCart className="h-6 w-6 mr-3" />
                Add to Cart
              </button>
            </div>



            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-700">{key}</dt>
                      <dd className="text-sm text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 