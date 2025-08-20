require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function getProductPriceId() {
  try {
    console.log('Fetching price ID for Minecraft Compass...');
    
    // Get all prices for the product
    const prices = await stripe.prices.list({
      product: 'prod_StSX7agKmGxakP',
      active: true,
    });
    
    if (prices.data.length > 0) {
      const price = prices.data[0]; // Get the first active price
      console.log('✅ Price found!');
      console.log('Price ID:', price.id);
      console.log('Amount:', price.unit_amount / 100, price.currency.toUpperCase());
      console.log('');
      console.log('🔧 Use this price ID in checkout for automatic product data:');
      console.log(`price: '${price.id}'`);
      
      return price.id;
    } else {
      console.log('⚠️  No active prices found for this product');
      console.log('You may need to create a price for this product in Stripe Dashboard');
    }
    
  } catch (error) {
    console.error('❌ Error fetching prices:', error.message);
  }
}

getProductPriceId(); 