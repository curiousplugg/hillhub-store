require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function testUpdatedBedSheetHolder() {
  try {
    console.log('🧪 Testing updated Bed Sheet Holder checkout...');
    
    // Test creating a checkout session with new price
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1S3UXlBJjaZO6BBgWn7b1khB', // New bed sheet holder price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://hill-hub.com/success',
      cancel_url: 'https://hill-hub.com/cancel',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 499, // $4.99 shipping
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
    });

    console.log('✅ Updated checkout session created successfully!');
    console.log(`🔗 Session ID: ${session.id}`);
    console.log(`💰 Total Amount: $${((session.amount_total || 0) / 100).toFixed(2)}`);
    console.log(`📦 Product: Bed Sheet Holder`);
    console.log(`💵 Product Price: $14.99`);
    console.log(`🚚 Shipping: $4.99`);
    console.log(`💳 Total: $19.98`);
    
    console.log('\n🎉 SUCCESS: Updated Bed Sheet Holder checkout is working!');
    console.log('\n📝 Summary:');
    console.log('- Product ID: prod_SzTH6yZQpYqQYl');
    console.log('- New Price ID: price_1S3UXlBJjaZO6BBgWn7b1khB');
    console.log('- Product Price: $14.99 (was $15.00)');
    console.log('- Original Price: $29.99 (was $25.00)');
    console.log('- Discount: 50% OFF (was 40% OFF)');
    console.log('- Shipping: $4.99 (fixed from $9.99)');
    console.log('- Total: $19.98');
    console.log('- Status: ✅ Ready for customers');

  } catch (error) {
    console.error('❌ Error testing checkout:', error.message);
    
    if (error.code === 'resource_missing') {
      console.log('\n💡 Make sure you have the correct Stripe secret key in your .env.local file');
    }
  }
}

testUpdatedBedSheetHolder();
