require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function addHologramCube() {
  try {
    console.log('🚀 Adding GeekMagic Hologram Cube to Stripe...');
    
    const hologramCube = {
      name: 'GeekMagic Hologram Cube - 3D Smart Weather Station & Digital Clock',
      description: 'Transform your space with this stunning 3D holographic display! The GeekMagic Hologram Cube combines cutting-edge holographic technology with smart functionality. Features a transparent crystal design that showcases your photos, GIFs, and animations in breathtaking 3D. Includes real-time weather updates, digital clock, cryptocurrency tracking, and WiFi connectivity. Perfect as a unique gift or modern desktop decoration.',
      price: 29.99,
      originalPrice: 49.99,
      images: [
        '/hologramQube/61uz2dP6RdL._SX522_.jpg',
        '/hologramQube/Hologram_Cube_-_3D_LED_Display_4.webp',
        '/hologramQube/Hologram-Cube-3D-LED-Display-7.webp',
        '/hologramQube/51EkNFd+p9L._AC_SL1001_.jpg'
      ],
      category: 'Gadgets',
      brand: 'GeekMagic',
      rating: 4.7,
      reviews: 892,
      inStock: true,
      features: [
        '3D Holographic Display Technology',
        'Real-time Weather Station',
        'Digital Clock with Date Display',
        'Customizable Photo Album',
        'GIF Animation Support',
        'WiFi Connectivity',
        'Cryptocurrency Price Tracking',
        'Transparent Crystal Design',
        'Compact & Portable',
        'USB-C Charging Cable Included'
      ],
      specifications: {
        'Dimensions': '4.33 x 2.76 x 1.97 inches (10 x 6 x 4.5 cm)',
        'Weight': '3.84 ounces (109g)',
        'Material': 'High-quality plastic with transparent crystal shell',
        'Color': 'Black with transparent display',
        'Connectivity': 'WiFi enabled',
        'Power': 'USB-C charging cable included',
        'Display': '3D holographic LED display',
        'Sensors': 'Three-axis gyroscope sensor',
        'Compatibility': 'Windows platform support for PC monitoring',
        'Package Contents': '1x Hologram Cube Display, 1x USB-C Cable, Instructions'
      }
    };

    // Create the product
    const product = await stripe.products.create({
      name: hologramCube.name,
      description: hologramCube.description,
      images: hologramCube.images,
      metadata: {
        category: hologramCube.category,
        brand: hologramCube.brand,
        rating: hologramCube.rating.toString(),
        reviews: hologramCube.reviews.toString(),
        inStock: hologramCube.inStock.toString(),
        originalPrice: hologramCube.originalPrice.toString(),
        features: JSON.stringify(hologramCube.features),
        specifications: JSON.stringify(hologramCube.specifications)
      }
    });

    console.log('✅ Product created:', product.id);

    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(hologramCube.price * 100), // Convert to cents
      currency: 'usd',
    });

    console.log('✅ Price created:', price.id);

    // Set the default price for the product
    await stripe.products.update(product.id, {
      default_price: price.id,
    });

    console.log('✅ Default price set for product');

    console.log('\n🎉 Hologram Cube added to Stripe successfully!');
    console.log('📦 Product ID:', product.id);
    console.log('💰 Price ID:', price.id);
    console.log('💵 Price: $' + hologramCube.price);
    console.log('🏷️  Original Price: $' + hologramCube.originalPrice);
    console.log('📊 Discount: ' + Math.round(((hologramCube.originalPrice - hologramCube.price) / hologramCube.originalPrice) * 100) + '% OFF');
    
    console.log('\n📝 Next steps:');
    console.log('1. Update the price ID in src/app/api/checkout/route.ts');
    console.log('2. Add product to frontend components');
    console.log('3. Test the checkout flow');
    console.log('4. Deploy to production');

    return { productId: product.id, priceId: price.id };

  } catch (error) {
    console.error('❌ Error adding Hologram Cube to Stripe:', error);
    throw error;
  }
}

// Run the function
addHologramCube(); 