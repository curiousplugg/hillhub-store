require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function testCheckout() {
  try {
    console.log('🧪 Testing checkout with Minecraft Compass...');
    
    // Simulate the checkout request
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
                            {
                      price: 'price_1S2MpdBJjaZO6BBgoOyAu4Yj', // Your Minecraft Compass price ID
                      quantity: 1,
                    },
        // Add shipping
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Shipping',
              description: 'Standard shipping (1-3 weeks)',
            },
                                    unit_amount: 499, // $4.99 in cents
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: 'https://hill-hub.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://hill-hub.com/cancel',
      metadata: {
        order_id: `test_order_${Date.now()}`,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      custom_text: {
        submit: {
          message: 'Thank you for shopping with HillHub! 🏔️',
        },
        shipping_address: {
          message: 'Please provide your shipping address for delivery.',
        },
      },
    });

    console.log('✅ Checkout session created successfully!');
    console.log('Session ID:', session.id);
    console.log('Checkout URL:', session.url);
    console.log('');
    console.log('🎯 This checkout will display:');
    console.log('- Your uploaded Minecraft Compass image');
    console.log('- Product name and description from Stripe');
                    console.log('- Price: $5.99');
                console.log('- Shipping: $4.99');
                    console.log('- Total: $16.98');
    console.log('');
    console.log('🔗 Test the checkout by visiting the URL above');
    
  } catch (error) {
    console.error('❌ Error creating checkout:', error.message);
  }
}

testCheckout(); 