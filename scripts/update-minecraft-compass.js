const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function updateMinecraftCompass() {
  try {
    // Update the existing product with placeholder URLs for Stripe
    // We'll handle the actual local images in the frontend
    const product = await stripe.products.update('prod_StRJBdwWkZp1d2', {
      images: [
        'https://via.placeholder.com/600x600/4F46E5/FFFFFF?text=Minecraft+Compass',
        'https://via.placeholder.com/600x600/4F46E5/FFFFFF?text=Compass+Detail',
        'https://via.placeholder.com/600x600/4F46E5/FFFFFF?text=Pixel+Compass'
      ],
    });

    console.log('✅ Minecraft Compass product updated!');
    console.log(`Product ID: ${product.id}`);
    console.log('Images updated with placeholder URLs');
    console.log('Note: Frontend will use local images from /minecraft_compass/ folder');

  } catch (error) {
    console.error('Error updating product:', error);
  }
}

updateMinecraftCompass(); 