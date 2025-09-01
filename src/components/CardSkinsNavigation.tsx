'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCardSkinsCart } from '@/contexts/CardSkinsCartContext';

export default function CardSkinsNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCardSkinsCart();

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/cardskins" className="text-white font-bold text-xl">
            hillhub
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/cardskins" className="text-white hover:text-orange-200 transition-colors">
              Shop
            </Link>
            <Link href="/cardskins/about" className="text-white hover:text-orange-200 transition-colors">
              About
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cardskins/cart" className="p-2 text-white hover:text-orange-200 transition-colors relative cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {state.itemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:text-orange-200 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-orange-400 bg-gradient-to-b from-red-600 to-orange-500"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/cardskins"
                className="block px-3 py-2 text-white hover:text-orange-200 hover:bg-orange-600 rounded-md"
              >
                Shop
              </Link>
              <Link
                href="/cardskins/about"
                className="block px-3 py-2 text-white hover:text-orange-200 hover:bg-orange-600 rounded-md"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
} 