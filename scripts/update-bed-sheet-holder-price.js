require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function updateBedSheetHolderPrice() {
  try {
    console.log('🛏️ Updating Bed Sheet Holder price in Stripe...');
    
    // Get the existing product
    const product = await stripe.products.retrieve('prod_SzTH6yZQpYqQYl');
    console.log('✅ Found product:', product.name);
    
    // List existing prices
    const prices = await stripe.prices.list({ product: 'prod_SzTH6yZQpYqQYl' });
    console.log(`📊 Found ${prices.data.length} prices for this product:`);
    prices.data.forEach(price => {
      console.log(`- Price ID: ${price.id}, Amount: $${(price.unit_amount / 100).toFixed(2)}, Active: ${price.active}`);
    });
    
    // Create new price: $14.99
    console.log('🔄 Creating new price: $14.99...');
    const newPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 1499, // $14.99 in cents
      currency: 'usd',
      active: true,
    });
    
    console.log('✅ New price created successfully!');
    console.log('💰 New Price ID:', newPrice.id);
    console.log('💵 New Price: $14.99 USD');
    
    // Update product default price and metadata
    console.log('🔄 Updating product default price and metadata...');
    await stripe.products.update(product.id, {
      default_price: newPrice.id,
      metadata: {
        category: 'Home & Bedding',
        features: 'Strong Fixation, Versatile Fit, Tough Design, Cozy Sleep Space, Vast Application',
        specifications: 'Net weight: 450g, Material: PVC, Size: 20.5x12.9x11.6cm',
        package_includes: '4 x Bed Sheet Holders Straps Fitted',
        originalPrice: '29.99',
        salePrice: '14.99',
        discount: '50%'
      }
    });
    
    console.log('✅ Product updated successfully!');
    
    // Deactivate old prices
    console.log('🔄 Deactivating old prices...');
    for (const price of prices.data) {
      if (price.active) {
        await stripe.prices.update(price.id, { active: false });
        console.log(`✅ Deactivated price: ${price.id}`);
      }
    }
    
    console.log('\n🎯 Price update completed successfully!');
    console.log('\n📝 Summary:');
    console.log('- Old Price: $15.00');
    console.log('- New Price: $14.99');
    console.log('- Original Price: $29.99');
    console.log('- Discount: 50% OFF');
    console.log('- New Price ID:', newPrice.id);
    console.log('- Status: Active');
    
    console.log('\n⚠️  IMPORTANT: Update your code to use the new price ID!');
    console.log('\n📝 Files to update:');
    console.log('- src/app/products/page.tsx');
    console.log('- src/components/FeaturedProducts.tsx');
    console.log('- src/app/products/bed-sheet-holder/page.tsx');
    console.log('- src/app/api/checkout/buy-now/route.ts');
    console.log('- src/app/api/checkout/route.ts');
    
  } catch (error) {
    console.error('❌ Error updating price:', error.message);
    if (error.code === 'resource_missing') {
      console.log('\n💡 Make sure you have the correct Stripe secret key in your .env.local file');
    }
  }
}

updateBedSheetHolderPrice();
