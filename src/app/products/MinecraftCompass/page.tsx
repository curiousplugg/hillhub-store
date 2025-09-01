'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function MinecraftCompassPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addItem } = useCart();

  const images = [
    '/minecraft_compass/compass.jpg',
    '/minecraft_compass/compass_in_hand.jpg',
    '/minecraft_compass/pixel_compass1.jpg'
  ];

  const videos = [
    '/minecraft_compass/ssstik.io_@your.tiktok.plugg_1755562756854.mp4',
    '/minecraft_compass/ssstik.io_@uafotoofficial_1755562822625.mp4',
    '/minecraft_compass/ssstik.io_@sketchsnack_1755562860576.mp4',
    '/minecraft_compass/ssstik.io_@notenoughtoys_1755562642851.mp4',
    '/minecraft_compass/SnapInsta.to_AQPqm1bsoSKsrLj_kYZlIzWQWgiELBZwnJ6j4bbx5121-SxTafzh8x78cPGJsKnls-WJSUvPinwMVOaEF4GvQpYhqZpiBZLisjwL7Wc.mp4',
    '/minecraft_compass/nailsHoldingCompass.mp4'
  ];

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    const product = {
      id: 'prod_StSX7agKmGxakP',
      name: 'Minecraft Compass',
      description: 'Navigate your world with this authentic Minecraft compass replica. Experience the magic of Minecraft in the real world with this authentic compass replica! Perfect for fans of all ages, this high-quality compass features the iconic red needle that always points to your spawn point. Made with premium materials and attention to detail, it\'s the perfect gift for any Minecraft enthusiast.',
      price: 5.99,
      originalPrice: 19.99,
      images: ['/minecraft_compass/compass_in_hand.jpg'],
      category: 'Gaming',
      brand: 'Minecraft',
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
      stripePriceId: 'price_1S2MpdBJjaZO6BBgoOyAu4Yj'
    };

    addItem(product, quantity);
    
    // Show success feedback
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleBuyNow = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/checkout/buy-now', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: 'prod_StSX7agKmGxakP',
          quantity: quantity,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mx-1 sm:mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <a href="/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Products
                </a>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mx-1 sm:mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Minecraft Compass</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Product Visuals */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Image/Video */}
              <div className="relative aspect-square bg-white rounded-2xl shadow-2xl overflow-hidden">
                {currentVideo < videos.length ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={images[0]}
                      loop
                      muted={isMuted}
                    >
                      <source src={videos[currentVideo]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <button
                        onClick={handleVideoPlay}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </button>
                      <button
                        onClick={handleVideoMute}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={images[currentImage]}
                    alt="Minecraft Compass"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Thumbnail Navigation */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                {/* Image Thumbnails */}
                {images.map((image, index) => (
                  <button
                    key={`img-${index}`}
                    onClick={() => {
                      setCurrentImage(index);
                      setCurrentVideo(images.length + index);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      currentVideo >= images.length && currentImage === index
                        ? 'border-gray-900 scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Minecraft Compass ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                
                {/* Video Thumbnails */}
                {videos.map((video, index) => (
                  <button
                    key={`vid-${index}`}
                    onClick={() => {
                      setCurrentVideo(index);
                      setCurrentImage(0);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
                      currentVideo === index
                        ? 'border-gray-900 scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <video
                      className="w-full h-full object-cover"
                      muted
                      loop
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Brand & Category */}
              <div>
                <span className="inline-block bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium mb-3">
                  MINECRAFT
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Minecraft Compass
                </h1>

              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  4.9 (2,847 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  $5.99
                </span>
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                    $19.99
                </span>
                <span className="bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium">
                  70% OFF
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700 font-medium">In Stock - Ships Today!</span>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience the magic of Minecraft in the real world with this authentic electronic compass replica! 
                  This rechargeable compass features an oscillating pointer that always points north, just like in the game. 
                  Perfect for fans of all ages, this battery-powered compass makes an ideal backpack charm, desktop decoration, 
                  or collectible item. With USB-C charging and on/off functionality, it&apos;s both practical and collectible.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Rechargeable electronic compass
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Oscillating pointer points north
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    USB-C charging with on/off switch
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Perfect backpack charm & desktop decor
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Perfect collectible for any age
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <span className="w-16 text-center text-xl font-bold text-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">
                    ${(5.99 * quantity).toFixed(2)} total
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Added!
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                      Add to Cart - ${(5.99 * quantity).toFixed(2)}
                    </>
                  )}
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={isCheckingOut}
                  className="flex-1 bg-red-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <span className="mr-3">⚡</span>
                      Buy Now - ${(5.99 * quantity).toFixed(2)}
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <Truck className="h-8 w-8 text-gray-600" />
                  <div>
                    <p className="font-bold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over $25</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-gray-600" />
                  <div>
                    <p className="font-bold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-8 w-8 text-gray-600" />
                  <div>
                    <p className="font-bold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day guarantee</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Minecraft Compass?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Electronic compass technology meets authentic Minecraft design for the ultimate fan experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Electronic Compass",
                description: "Rechargeable electronic compass with oscillating pointer that points north",
                icon: "🧭"
              },
              {
                title: "USB-C Charging",
                description: "Modern USB-C charging with on/off functionality for convenience",
                icon: "⚡"
              },
              {
                title: "Versatile Use",
                description: "Perfect as backpack charm, desktop decoration, or collectible item",
                icon: "🎁"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg bg-gray-50"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Product Specifications
            </h2>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Type", value: "Rechargeable Electronic Compass" },
                { label: "Power Source", value: "Battery-powered with USB-C charging" },
                { label: "Function", value: "Oscillating pointer points north" },
                { label: "Controls", value: "On/off switch" },
                { label: "Use Cases", value: "Backpack charm, desktop decoration, collectible item" },
                { label: "Design", value: "Authentic Minecraft pixel art style" }
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex justify-between py-4 border-b border-gray-200 last:border-b-0"
                >
                  <span className="font-bold text-gray-900">{spec.label}</span>
                  <span className="text-gray-600">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Navigate Your World?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of Minecraft fans who already own this authentic compass replica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                                  Buy Now - $5.99
              </button>
              <button className="border-2 border-white text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 