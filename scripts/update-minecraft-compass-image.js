const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function updateMinecraftCompassImage() {
  try {
    const product = await stripe.products.update('prod_StRJBdwWkZp1d2', {
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center'
      ],
    });
    console.log('✅ Minecraft Compass product image updated!');
    console.log(`Product ID: ${product.id}`);
    console.log('Images updated with compass_in_hand.jpg style image');
    console.log('Note: Frontend will still use local images from /minecraft_compass/ folder');
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

updateMinecraftCompassImage(); 