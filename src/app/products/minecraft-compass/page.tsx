'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowRight } from 'lucide-react';

export default function MinecraftCompassPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <div className="grid grid-cols-6 gap-3">
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
                  MINECRAFT OFFICIAL
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Minecraft Compass
                </h1>
                <p className="text-xl text-gray-600 mt-4">
                  Navigate your world with this authentic Minecraft compass replica. Experience the magic of Minecraft in the real world with this authentic compass replica! Perfect for fans of all ages, this high-quality compass features the iconic red needle that always points to your spawn point. Made with premium materials and attention to detail, it's the perfect gift for any Minecraft enthusiast.
                </p>
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
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">
                  $11.99
                </span>
                <span className="text-xl text-gray-500 line-through">
                    $19.99
                </span>
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                  54% OFF
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
                  Experience the magic of Minecraft in the real world with this authentic compass replica! 
                  Perfect for fans of all ages, this high-quality compass features the iconic red needle 
                  that always points to your spawn point. Made with premium materials and attention to detail, 
                  it&apos;s the perfect gift for any Minecraft enthusiast.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Authentic Minecraft design
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    High-quality materials
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Perfect for collectors
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                    Great gift idea
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <span className="w-16 text-center text-xl font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    ${(11.99 * quantity).toFixed(2)} total
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center group">
                  <ShoppingCart className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                  Add to Cart - ${(11.99 * quantity).toFixed(2)}
                </button>

              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
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
              Authentic design meets quality craftsmanship for the ultimate Minecraft fan experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Design",
                description: "Faithfully recreated from the original Minecraft game with attention to every detail",
                icon: "🎯"
              },
              {
                title: "Premium Quality",
                description: "Made with high-quality materials that ensure durability and longevity",
                icon: "⭐"
              },
              {
                title: "Perfect Gift",
                description: "Ideal for Minecraft fans of all ages - from kids to adult collectors",
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
                { label: "Material", value: "High-quality metal and glass" },
                { label: "Dimensions", value: "3.5 x 3.5 x 1.2 inches" },
                { label: "Weight", value: "4.2 oz (120g)" },
                { label: "Color", value: "Classic Minecraft brown with red needle" },
                { label: "Function", value: "Working compass with magnetic needle" },
                { label: "Packaging", value: "Premium gift box included" }
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
                Buy Now - $11.99
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