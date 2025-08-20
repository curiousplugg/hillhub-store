require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function setupProductionWebhook() {
  try {
    console.log('Setting up production webhook for hill-hub.com...');
    
    // Create webhook endpoint
    const webhook = await stripe.webhookEndpoints.create({
      url: 'https://hill-hub.com/api/webhooks/stripe',
      enabled_events: [
        'checkout.session.completed',
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
        'invoice.payment_succeeded',
        'invoice.payment_failed',
      ],
      description: 'HillHub Production Webhook',
    });

    console.log('✅ Webhook created successfully!');
    console.log('Webhook ID:', webhook.id);
    console.log('Webhook URL:', webhook.url);
    console.log('Webhook Secret:', webhook.secret);
    
    console.log('\n📋 Next steps:');
    console.log('1. Copy the webhook secret above');
    console.log('2. Add it to your .env.local file as STRIPE_WEBHOOK_SECRET');
    console.log('3. Update your production environment variables');
    console.log('4. Deploy your application');
    
  } catch (error) {
    console.error('❌ Error setting up webhook:', error.message);
    
    if (error.code === 'resource_missing') {
      console.log('\n💡 Make sure you have the correct Stripe secret key in your .env.local file');
    }
  }
}

setupProductionWebhook(); 