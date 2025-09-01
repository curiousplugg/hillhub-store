require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function updateMinecraftCompassPrice() {
  try {
    console.log('🔄 Updating Minecraft Compass price in Stripe...');
    
    // First, let's get the current product
    const product = await stripe.products.retrieve('prod_StSX7agKmGxakP');
    console.log('✅ Found product:', product.name);
    
    // Get the current price
    const prices = await stripe.prices.list({
      product: 'prod_StSX7agKmGxakP',
      active: true,
    });
    
    if (prices.data.length === 0) {
      console.log('❌ No active prices found for this product');
      return;
    }
    
    const currentPrice = prices.data[0];
    console.log('💰 Current price:', `$${(currentPrice.unit_amount / 100).toFixed(2)}`);
    
    // Create new price with $5.99
    console.log('🔄 Creating new price: $5.99...');
    const newPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 599, // $5.99 in cents
      currency: 'usd',
    });
    
    console.log('✅ New price created successfully!');
    console.log('💰 New Price ID:', newPrice.id);
    console.log('💵 New Price: $5.99 USD');
    
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
    
    // Now we can deactivate the old price
    console.log('🔄 Deactivating old price...');
    await stripe.prices.update(currentPrice.id, {
      active: false,
    });
    console.log('✅ Old price deactivated');
    
    console.log('\n🎯 Price update completed successfully!');
    console.log('\n📝 Summary:');
    console.log('- Old Price: $11.99');
    console.log('- New Price: $5.99');
    console.log('- Original Price: $19.99');
    console.log('- Discount: 70% OFF');
    console.log('\n⚠️  IMPORTANT: This is LIVE - customers will now see the new pricing!');
    
  } catch (error) {
    console.error('❌ Error updating price:', error.message);
    
    if (error.code === 'resource_missing') {
      console.log('\n💡 Make sure you have the correct Stripe secret key in your .env.local file');
    }
  }
}

updateMinecraftCompassPrice(); 