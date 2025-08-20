const fs = require('fs');

// Fix cancel page
let cancelContent = fs.readFileSync('src/app/cancel/page.tsx', 'utf8');
cancelContent = cancelContent.replace(/<a\s+href="\/products"\s+className="[^"]*"\s*>\s*Try Again\s*<\/Link>/g, 
  '<Link href="/products" className="block w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer">\n                Try Again\n              </Link>');
cancelContent = cancelContent.replace(/<a\s+href="\/"\s+className="[^"]*"\s*>\s*Back to Home\s*<\/Link>/g,
  '<Link href="/" className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer">\n                Back to Home\n              </Link>');
fs.writeFileSync('src/app/cancel/page.tsx', cancelContent);

// Fix cart page
let cartContent = fs.readFileSync('src/app/cart/page.tsx', 'utf8');
cartContent = cartContent.replace(/<a\s+href="\/products"\s+className="[^"]*"\s*>\s*Continue Shopping\s*<\/Link>/g,
  '<Link href="/products" className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">\n                Continue Shopping\n              </Link>');
fs.writeFileSync('src/app/cart/page.tsx', cartContent);

// Fix FeaturedProducts
let featuredContent = fs.readFileSync('src/components/FeaturedProducts.tsx', 'utf8');
featuredContent = featuredContent.replace(/<a\s+href="\/products"\s+className="[^"]*"\s*>\s*View All Products\s*<\/Link>/g,
  '<Link href="/products" className="text-gray-900 hover:text-gray-700 transition-colors">\n                View All Products\n              </Link>');
fs.writeFileSync('src/components/FeaturedProducts.tsx', featuredContent);

// Fix Hero
let heroContent = fs.readFileSync('src/components/Hero.tsx', 'utf8');
heroContent = heroContent.replace(/<a\s+href="\/products"\s+className="[^"]*"\s*>\s*Shop Now\s*<ArrowRight[^>]*\/>\s*<\/Link>/g,
  '<Link href="/products" className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer relative z-20">\n                    Shop Now\n                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />\n                  </Link>');
heroContent = heroContent.replace(/<a\s+href="\/products"\s+className="[^"]*"\s*>\s*Learn More\s*<\/Link>/g,
  '<Link href="/products" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer relative z-20">\n                    Learn More\n                  </Link>');
fs.writeFileSync('src/components/Hero.tsx', heroContent);

console.log('✅ Fixed broken files'); 