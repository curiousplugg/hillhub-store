'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Discover Amazing
                <span className="block text-gray-600">Products at</span>
                <span className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  HillHub
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Your one-stop destination for premium dropshipping products. 
                Quality, reliability, and exceptional service - all in one place.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center space-x-8"
            >
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-700 font-medium">Handpicked Products</span>
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-2xl font-bold text-gray-900">Best</span> Sellers
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-2xl font-bold text-gray-900">Trending</span> Items
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link 
                href="/products" 
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group cursor-pointer relative z-20"
                style={{ position: 'relative', zIndex: 20 }}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/products" 
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer relative z-20"
                style={{ position: 'relative', zIndex: 20 }}
              >
                Browse Products
              </Link>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-10">
              {/* Product Grid Mockup */}
              <div className="grid grid-cols-2 gap-6">
                {/* Tile 1: Minecraft Compass */}
                <motion.a
                  href="/products/MinecraftCompass"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="group bg-gray-100 rounded-lg p-0 h-40 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <img
                    src="/minecraft_compass/compass_in_hand.jpg"
                    alt="Minecraft Compass"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </motion.a>

                {/* Tile 2-4: Coming Soon */}
                {[2, 3, 4].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + (idx + 1) * 0.1 }}
                    className="bg-gray-100 rounded-lg p-4 h-40 flex items-center justify-center"
                  >
                    <div className="text-gray-400 text-sm">More coming soon</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gray-900 text-white p-3 rounded-full"
              >
                <Star className="h-4 w-4" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-gray-100 p-3 rounded-full"
              >
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M10 10h40v40H10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
} 