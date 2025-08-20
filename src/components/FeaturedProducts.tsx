'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link';;
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from Stripe API
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
          setFeaturedProducts(data.products);
        } else {
          // Fallback to hardcoded data if API fails
          const minecraftCompassProduct: Product = {
            id: 'prod_StSX7agKmGxakP',
            name: 'Minecraft Compass',
            description: 'Navigate your world with this authentic Minecraft compass replica. Experience the magic of Minecraft in the real world with this authentic compass replica! Perfect for fans of all ages, this high-quality compass features the iconic red needle that always points to your spawn point. Made with premium materials and attention to detail, it\'s the perfect gift for any Minecraft enthusiast.',
            price: 11.99,
            originalPrice: 19.99,
            images: ['https://files.stripe.com/links/MDB8YWNjdF8xUnhlS2lCSmphWk82QkJnfGZsX2xpdmVfUUF2RHREZXMwcWpYbFozRjUxT0ZDbkJl00vDrkBY57'], // Use Stripe-hosted image
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
            stripePriceId: 'price_1RxfcgBJjaZO6BBgjCSaysiZ'
          };
          setFeaturedProducts([minecraftCompassProduct]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use fallback data
        const minecraftCompassProduct: Product = {
          id: 'prod_StSX7agKmGxakP',
          name: 'Minecraft Compass',
          description: 'Navigate your world with this authentic Minecraft compass replica. Experience the magic of Minecraft in the real world with this authentic compass replica! Perfect for fans of all ages, this high-quality compass features the iconic red needle that always points to your spawn point. Made with premium materials and attention to detail, it\'s the perfect gift for any Minecraft enthusiast.',
          price: 11.99,
          originalPrice: 19.99,
          images: ['https://files.stripe.com/links/MDB8YWNjdF8xUnhlS2lCSmphWk82QkJnfGZsX2xpdmVfUUF2RHREZXMwcWpYbFozRjUxT0ZDbkJl00vDrkBY57'], // Use Stripe-hosted image
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
          stripePriceId: 'price_1RxfcgBJjaZO6BBgjCSaysiZ'
        };
        setFeaturedProducts([minecraftCompassProduct]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">No products available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of cool tech products that our customers love
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
                                  <Link href={product.id === 'prod_StSX7agKmGxakP' ? '/products/MinecraftCompass' : `/products/${product.id}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                  

                  
                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Brand */}
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  
                  {/* Product Name */}
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Stock Status */}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group/btn">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer">
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 