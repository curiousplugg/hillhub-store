'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCardSkinsCart } from '@/contexts/CardSkinsCartContext';
import AddToCartIndicator from '@/components/AddToCartIndicator';
import { getCardSkins, getCardSkinCategories } from '@/lib/cardSkinsData';

export default function CardSkinsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAddToCartIndicator, setShowAddToCartIndicator] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<string>('');
  const { addItem } = useCardSkinsCart();

  // Load card skins data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cardSkins, cardCategories] = await Promise.all([
          getCardSkins(),
          getCardSkinCategories()
        ]);
        setProducts(cardSkins);
        setCategories(cardCategories);
      } catch (error) {
        console.error('Error loading card skins:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter products based on search and category
  const filteredAndSearchedProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle product modal
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  // Handle image navigation
  const nextImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  // Handle add to cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addItem(product, quantity);
    setLastAddedProduct(product.name);
    setShowAddToCartIndicator(true);
    setTimeout(() => setShowAddToCartIndicator(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading card skins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <AddToCartIndicator 
        isVisible={showAddToCartIndicator} 
        onClose={() => setShowAddToCartIndicator(false)} 
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-2 text-white">CardSkins</h1>
          <p className="text-white mb-6 text-lg opacity-90">
            Transform your cards with our premium vinyl skins. All designs just $5 each!
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/cardskins/about"
              className="text-white hover:text-orange-200 underline font-medium"
            >
              About Card Skins & Installation Guide
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search card skins..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent shadow-lg bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Thinner */}
          <div className="lg:w-48">
            <div className="bg-white rounded-lg shadow-lg border border-orange-200 p-4 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-red-600" />
                Categories
              </h3>
              
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors font-medium ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md'
                        : 'text-gray-800 hover:bg-orange-50 hover:text-red-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-orange-200">
                <p className="text-sm text-gray-700 font-medium">
                  {filteredAndSearchedProducts.length} of {products.length} designs
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {filteredAndSearchedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg border border-orange-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Product Image - Larger */}
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden cursor-pointer">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 bg-gray-50"
                        onClick={() => openProductModal(product)}
                      />
                      
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-orange-500 text-white p-1.5 rounded-full hover:from-red-700 hover:to-orange-600 transition-all opacity-0 hover:opacity-100 shadow-lg"
                      >
                        <ShoppingCart className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Product Info - Smaller */}
                    <div className="p-3">
                      <p className="text-xs text-red-600 font-semibold mb-1 uppercase tracking-wide">{product.category}</p>
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 cursor-pointer hover:text-red-600 transition-colors text-sm"
                          onClick={() => openProductModal(product)}>
                        {product.name}
                      </h3>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-red-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-semibold">
                          In Stock
                        </span>
                      </div>
                      
                      {/* Add to Cart Button - Smaller */}
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-1.5 px-3 rounded text-sm font-medium hover:from-red-700 hover:to-orange-600 transition-all flex items-center justify-center shadow-md"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* No Results */}
            {filteredAndSearchedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-700 text-lg font-medium">No card skins found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-red-600 hover:text-red-700 underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeProductModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-orange-200 bg-gradient-to-r from-red-50 to-orange-50">
                <h2 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h2>
                <button
                  onClick={closeProductModal}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Image Gallery */}
                  <div className="relative flex-shrink-0">
                    <div className="w-80 h-80 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={selectedProduct.images[currentImageIndex]}
                        alt={selectedProduct.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Image Navigation */}
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 p-1.5 rounded-full hover:bg-opacity-100 transition-all shadow-lg"
                        >
                          <ChevronLeft className="h-4 w-4 text-red-600" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 p-1.5 rounded-full hover:bg-opacity-100 transition-all shadow-lg"
                        >
                          <ChevronRight className="h-4 w-4 text-red-600" />
                        </button>
                        
                        {/* Image Indicators */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {selectedProduct.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-red-600' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-red-600">
                        ${selectedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">{selectedProduct.description}</p>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="font-medium">{feature}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        closeProductModal();
                      }}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all flex items-center justify-center shadow-lg text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart - ${selectedProduct.price.toFixed(2)}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 