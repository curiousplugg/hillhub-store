require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function updateHologramCubePricing() {
  try {
    console.log('🔄 Updating Hologram Cube pricing in Stripe...');
    
    // Get the current product
    const product = await stripe.products.retrieve('prod_SuAzOcPEF7ZVoV');
    console.log('✅ Found product:', product.name);
    
    // Get the current price
    const prices = await stripe.prices.list({
      product: 'prod_SuAzOcPEF7ZVoV',
      active: true,
    });
    
    if (prices.data.length === 0) {
      console.log('❌ No active prices found for this product');
      return;
    }
    
    const currentPrice = prices.data[0];
    console.log('💰 Current price:', `$${(currentPrice.unit_amount / 100).toFixed(2)}`);
    
    // Create new price with $29.99
    console.log('🔄 Creating new price: $29.99...');
    const newPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 2999, // $29.99 in cents
      currency: 'usd',
    });
    
    console.log('✅ New price created successfully!');
    console.log('💰 New Price ID:', newPrice.id);
    console.log('💵 New Price: $29.99 USD');
    
    // Update the product to use the new price as default
    console.log('🔄 Updating product default price...');
    await stripe.products.update(product.id, {
      default_price: newPrice.id,
      metadata: {
        category: 'Gadgets',
        brand: 'GeekMagic',
        rating: '4.7',
        reviews: '892',
        inStock: 'true',
        originalPrice: '49.99',
        salePrice: '29.99',
        discount: '40%',
        features: JSON.stringify([
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
        ]),
        specifications: JSON.stringify({
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
        })
      },
    });
    
    console.log('✅ Product default price updated');
    
    // Now we can deactivate the old price
    console.log('🔄 Deactivating old price...');
    await stripe.prices.update(currentPrice.id, {
      active: false,
    });
    console.log('✅ Old price deactivated');
    
    console.log('\n🎯 Price update completed successfully!');
    console.log('\n📝 Summary:');
    console.log('- Old Price: $49.99');
    console.log('- New Price: $29.99');
    console.log('- Original Price: $49.99');
    console.log('- Discount: 40% OFF');
    console.log('- New Category: Gadgets');
    console.log('\n⚠️  IMPORTANT: This is LIVE - customers will now see the new pricing!');
    
  } catch (error) {
    console.error('❌ Error updating price:', error.message);
    
    if (error.code === 'resource_missing') {
      console.log('\n💡 Make sure you have the correct Stripe secret key in your .env.local file');
    }
  }
}

updateHologramCubePricing(); 