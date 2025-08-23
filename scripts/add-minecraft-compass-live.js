const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function addMinecraftCompassLive() {
  try {
    console.log('🔄 Creating Minecraft Compass product in LIVE Stripe account...');
    
    // Create the product
    const product = await stripe.products.create({
      name: 'Minecraft Compass',
      description: 'Navigate your world with this authentic Minecraft compass replica. Experience the magic of Minecraft in the real world with this authentic compass replica! Perfect for fans of all ages, this high-quality compass features the iconic red needle that always points to your spawn point. Made with premium materials and attention to detail, it\'s the perfect gift for any Minecraft enthusiast.',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center'
      ],
      metadata: {
        category: 'Gaming',
        brand: 'Minecraft',
        rating: '4.9',
        reviews: '2847',
        inStock: 'true',
        originalPrice: '19.99',
        features: JSON.stringify(['Authentic Design', 'High-quality Materials', 'Perfect Gift', 'Working Compass', 'Premium Packaging']),
        specifications: JSON.stringify({ 'Material': 'High-quality metal and glass', 'Dimensions': '3.5 x 3.5 x 1.2 inches', 'Weight': '4.2 oz (120g)', 'Color': 'Classic Minecraft brown with red needle', 'Function': 'Working compass with magnetic needle', 'Packaging': 'Premium gift box included' })
      }
    });
    
    console.log('✅ Product created:', product.id);
    
    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
              unit_amount: 1199, // $11.99 in cents
      currency: 'usd',
    });
    
    console.log('✅ Price created:', price.id);
    
    // Set the default price
    await stripe.products.update(product.id, { default_price: price.id });
    console.log('✅ Default price set for product');
    
    console.log('\n🎉 SUCCESS: Minecraft Compass product added to LIVE Stripe account!');
    console.log(`📦 Product ID: ${product.id}`);
    console.log(`💰 Price ID: ${price.id}`);
            console.log(`💵 Price: $11.99 USD`);
    console.log('\n⚠️  IMPORTANT: This is now LIVE - real payments will be processed!');
    console.log('\n📝 Next steps:');
    console.log('1. Set up webhook endpoint in Stripe Dashboard');
    console.log('2. Update webhook secret in .env.local');
    console.log('3. Test checkout flow with live payments');
    
  } catch (error) {
    console.error('❌ Error adding product to LIVE Stripe:', error);
  }
}

addMinecraftCompassLive(); 