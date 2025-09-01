'use client';

import { motion } from 'framer-motion';
import { Play, CheckCircle, Star, Truck, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CardSkinsAboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">About CardSkins</h1>
            <p className="text-xl text-orange-100 mb-6">
              Transform your cards with our premium vinyl skins. Simple pricing, amazing designs.
            </p>
            <Link
              href="/cardskins"
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              Browse All Designs
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simple Pricing Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg border border-orange-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Simple Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">$5</div>
                <p className="text-gray-600">Per Card Skin</p>
                <p className="text-sm text-gray-500 mt-2">Every design, same great price</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">$4.99</div>
                <p className="text-gray-600">Shipping</p>
                <p className="text-sm text-gray-500 mt-2">One shipping fee, no matter how many you order</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700">
                <strong>Example:</strong> Order 5 card skins = $25 + $4.99 shipping = $29.99 total
              </p>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Card Skins?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">High-quality vinyl that's durable and long-lasting</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Apply</h3>
              <p className="text-gray-600">Peel and stick application - no tools required</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Universal Fit</h3>
              <p className="text-gray-600">Fits most credit and debit cards perfectly</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick delivery to your doorstep</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure checkout process</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Huge Selection</h3>
              <p className="text-gray-600">Dozens of designs to choose from</p>
            </div>
          </div>
        </motion.section>

        {/* Installation Guide */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How to Apply Your Card Skin</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Guide</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Clean Your Card</h4>
                      <p className="text-gray-600 text-sm">Wipe your card with a clean, dry cloth to remove any dirt or oils</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Peel the Backing</h4>
                      <p className="text-gray-600 text-sm">Carefully peel the backing paper from the card skin</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Align and Apply</h4>
                      <p className="text-gray-600 text-sm">Align the skin with your card and press down firmly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Smooth Out Bubbles</h4>
                      <p className="text-gray-600 text-sm">Use your finger to smooth out any air bubbles</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Tutorial</h3>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-gray-600">Video tutorial coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">We'll show you exactly how to apply your card skin perfectly</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Care Instructions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Care Instructions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Do's</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Keep your card clean and dry</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Store in a cool, dry place</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Handle with clean hands</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Remove carefully if needed</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Don'ts</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs font-bold">×</div>
                    <span className="text-gray-700">Expose to extreme heat or cold</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs font-bold">×</div>
                    <span className="text-gray-700">Use harsh chemicals or cleaners</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs font-bold">×</div>
                    <span className="text-gray-700">Bend or fold the skin</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs font-bold">×</div>
                    <span className="text-gray-700">Apply to wet or dirty cards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Will the card skin damage my card?</h3>
                <p className="text-gray-600">No, our card skins are made with high-quality vinyl that won't damage your card. They can be safely removed without leaving residue.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do card skins work with all cards?</h3>
                <p className="text-gray-600">Yes, our card skins are designed to fit most standard credit and debit cards. They're flexible and can adapt to slight size variations.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long do card skins last?</h3>
                <p className="text-gray-600">With proper care, our card skins can last for months or even years. They're designed to withstand normal daily use.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I remove and reapply the skin?</h3>
                <p className="text-gray-600">While you can remove the skin, we recommend applying it once and leaving it in place for best results. Reapplication may reduce adhesion.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I'm not satisfied with my purchase?</h3>
                <p className="text-gray-600">We want you to be happy with your purchase. If you're not satisfied, please contact us and we'll work to make it right.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Cards?</h2>
            <p className="text-xl text-orange-100 mb-6">
              Browse our collection of amazing card skin designs
            </p>
            <Link
              href="/cardskins"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg font-medium hover:bg-orange-50 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 