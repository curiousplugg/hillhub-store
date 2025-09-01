require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function fixMinecraftCompassPrice() {
  try {
    console.log('🔧 Fixing Minecraft Compass price in Stripe...');
    
    // First, let's get the current product
    const product = await stripe.products.retrieve('prod_StSX7agKmGxakP');
    console.log('✅ Found product:', product.name);
    
    // Get all prices for this product
    const prices = await stripe.prices.list({
      product: 'prod_StSX7agKmGxakP',
    });
    
    console.log(`📊 Found ${prices.data.length} prices for this product:`);
    prices.data.forEach(price => {
      console.log(`- Price ID: ${price.id}, Amount: $${(price.unit_amount / 100).toFixed(2)}, Active: ${price.active}`);
    });
    
    // Create new active price with $5.99
    console.log('🔄 Creating new active price: $5.99...');
    const newPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 599, // $5.99 in cents
      currency: 'usd',
      active: true,
    });
    
    console.log('✅ New price created successfully!');
    console.log('💰 New Price ID:', newPrice.id);
    console.log('💵 New Price: $5.99 USD');
    console.log('✅ Active: true');
    
    // Update the product to use the new price as default
    console.log('🔄 Updating product default price...');
    await stripe.products.update(product.id, {
      default_price: newPrice.id,
      metadata: {
        originalPrice: '19.99',
        salePrice: '5.99',
        discount: '70%',
      },
    });
    
    console.log('✅ Product default price updated');
    
    // Deactivate all old prices
    console.log('🔄 Deactivating old prices...');
    for (const price of prices.data) {
      if (price.active) {
        await stripe.prices.update(price.id, {
          active: false,
        });
        console.log(`✅ Deactivated price: ${price.id}`);
      }
    }
    
    console.log('\n🎯 Price fix completed successfully!');
    console.log('\n📝 Summary:');
    console.log('- Old prices: Deactivated');
    console.log('- New Price ID:', newPrice.id);
    console.log('- New Price: $5.99 USD');
    console.log('- Status: Active');
    console.log('\n⚠️  IMPORTANT: Update your code to use the new price ID!');
    console.log('\n📝 Files to update:');
    console.log('- src/app/api/checkout/buy-now/route.ts');
    console.log('- src/app/products/MinecraftCompass/page.tsx');
    console.log('- Any other files using the old price ID');
    
  } catch (error) {
    console.error('❌ Error fixing price:', error.message);
    
    if (error.code === 'resource_missing') {
      console.log('\n💡 Make sure you have the correct Stripe secret key in your .env.local file');
    }
  }
}

fixMinecraftCompassPrice(); 