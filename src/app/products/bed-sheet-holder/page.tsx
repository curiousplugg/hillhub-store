'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function BedSheetHolderPage() {
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
    '/bed-sheet-holder/bed-sheet-holder-1.jpg',
    '/bed-sheet-holder/bed-sheet-holder-2.jpg',
    '/bed-sheet-holder/bed-sheet-holder-3.jpg',
    '/bed-sheet-holder/bed-sheet-holder-4.jpg',
    '/bed-sheet-holder/bed-sheet-holder-5.jpg',
    '/bed-sheet-holder/bed-sheet-holder-6.jpg',
    '/bed-sheet-holder/bed-sheet-holder-7.jpg'
  ];

  const videos = [
    '/bed-sheet-holder/bed-sheet-holder-demo.mp4'
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
      id: 'prod_SzTH6yZQpYqQYl',
      name: 'Invisible Bed Sheet Holder Clips - No Slip Needle-Free Grippers',
      description: 'Keep your fitted sheets in place with our bed sheet holder straps. Designed with heavy-duty fasteners for strong compatibility, these straps are not easy to deform. The simple and elegant design allows for multifunctional use. Perfect for families with children or pets, ensuring your bed stays clean and tidy.',
      price: 14.99,
      originalPrice: 29.99,
      images: ['/bed-sheet-holder/bed-sheet-holder-1.jpg'],
      category: 'Home & Bedding',
      brand: 'HillHub',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      features: [
        'Strong Fixation',
        'Versatile Fit for Any Bed',
        'Tough Design',
        'Create Cozy Sleep Space',
        'Vast Application'
      ],
      specifications: {
        'Net Weight': '450g',
        'Material': 'PVC',
        'Product Size': '20.5x12.9x11.6cm (8.07x5.08x4.57 inches)',
        'Package Includes': '4 x Bed Sheet Holders Straps Fitted',
        'Color Options': 'White, Gray',
        'Compatibility': 'Universal fit for all bed sizes'
      },
      stripePriceId: 'price_1S3UXlBJjaZO6BBgWn7b1khB'
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
          productId: 'prod_SzTH6yZQpYqQYl',
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
                <span className="text-gray-900 font-medium">Bed Sheet Holder</span>
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
                      preload="metadata"
                      controls={false}
                    >
                      <source src={videos[currentVideo]} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <button
                        onClick={handleVideoPlay}
                        className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="h-8 w-8 text-gray-900 ml-1" />
                        ) : (
                          <Play className="h-8 w-8 text-gray-900 ml-1" />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={handleVideoMute}
                      className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>
                ) : (
                  <img
                    src={images[currentImage]}
                    alt="Bed Sheet Holder"
                    className="w-full h-full object-contain bg-gray-50"
                  />
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImage(index);
                      setCurrentVideo(images.length);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === index && currentVideo >= videos.length
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Bed Sheet Holder ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {videos.map((video, index) => (
                  <button
                    key={`video-${index}`}
                    onClick={() => {
                      setCurrentVideo(index);
                      setCurrentImage(images.length);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
                      currentVideo === index && currentImage >= images.length
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <video
                      className="w-full h-full object-cover"
                      poster={images[0]}
                      preload="metadata"
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
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
              className="space-y-6 sm:space-y-8"
            >
              {/* Brand & Category */}
              <div>
                <span className="inline-block bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium mb-3">
                  HOME & BEDDING
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Invisible Bed Sheet Holder Clips
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
                  4.7 (156 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  $14.99
                </span>
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                    $29.99
                </span>
                <span className="bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium">
                  50% OFF
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700 font-medium">In Stock</span>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Keep your fitted sheets in place with our bed sheet holder straps. Designed with heavy-duty fasteners for strong compatibility, these straps are not easy to deform. The simple and elegant design allows for multifunctional use. Perfect for families with children or pets, ensuring your bed stays clean and tidy.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Strong fixation with heavy-duty fasteners
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Versatile fit for any bed size
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Tough PVC material design
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Perfect for families with children or pets
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Includes 4 bed sheet holder straps
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
                    ${(15.00 * quantity).toFixed(2)} total
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
                      Add to Cart - ${(15.00 * quantity).toFixed(2)}
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
                      Buy Now - ${(15.00 * quantity).toFixed(2)}
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
              Why Choose Our Bed Sheet Holder?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Revolutionary bed sheet management technology for the perfect night's sleep
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Strong Fixation",
                description: "Heavy-duty fasteners ensure sheets stay flat and firm, making every rest secure",
                icon: "🔒"
              },
              {
                title: "Versatile Fit",
                description: "Customized for beds of different sizes and shapes, ensuring a perfect fit",
                icon: "🛏️"
              },
              {
                title: "Tough Design",
                description: "Wear-resistant and sturdy PVC material ensures tear-resistant, long-lasting straps",
                icon: "💪"
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

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Details</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Net Weight:</span>
                      <span className="font-medium">450g</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium">PVC</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Product Size:</span>
                      <span className="font-medium">20.5x12.9x11.6cm</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Color Options:</span>
                      <span className="font-medium">White, Gray</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Package Contents</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                      <span className="text-gray-600">4 x Bed Sheet Holders Straps Fitted</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                      <span className="text-gray-600">Universal fit for all bed sizes</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                      <span className="text-gray-600">Easy installation guide</span>
                    </li>
                  </ul>
                </div>
              </div>
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
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Transform Your Bedroom Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have revolutionized their sleep experience with our bed sheet holders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                Buy Now - $14.99
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
