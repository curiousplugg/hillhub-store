'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import CheckoutButton from '@/components/CheckoutButton';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link href="/products" className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Continue Shopping
              </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-lg text-gray-600 mt-1">
                {state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in your cart
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Cart Header */}
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-gray-600" />
                    Cart Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-100">
                {state.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0].startsWith('http') ? item.images[0] : `/minecraft_compass/${item.images[0].split('/').pop()}`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-lg text-gray-600 font-medium">${item.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-16 text-center font-bold text-gray-900 text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-lg cursor-pointer transition-all duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-gray-600" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Subtotal ({state.itemCount} items)</span>
                  <span className="text-gray-900 font-semibold">${state.total.toFixed(2)}</span>
                </div>
                                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 font-medium">Shipping</span>
                          <span className="text-gray-900 font-semibold">$9.99</span>
                        </div>
                <div className="border-t-2 border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-gray-900">${(state.total + 9.99).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-4">
                <CheckoutButton 
                  items={state.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    description: '',
                    price: item.price,
                    images: item.images,
                    quantity: item.quantity
                  }))}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                                                     Checkout - ${(state.total + 9.99).toFixed(2)}
                </CheckoutButton>
                
                {/* Continue Shopping */}
                <Link 
                  href="/products" 
                  className="w-full bg-white text-gray-700 border-2 border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 