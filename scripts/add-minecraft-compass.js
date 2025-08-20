const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function addMinecraftCompass() {
  try {
    // Create the product
    const product = await stripe.products.create({
      name: 'Minecraft Compass',
      description: 'Navigate your world with this authentic Minecraft compass replica. Experience the magic of Minecraft in the real world with this authentic compass replica! Perfect for fans of all ages, this high-quality compass features the iconic red needle that always points to your spawn point. Made with premium materials and attention to detail, it\'s the perfect gift for any Minecraft enthusiast.',
      images: ['https://your-domain.com/minecraft_compass/compass_in_hand.jpg'],
      metadata: {
        category: 'Gaming',
        brand: 'Minecraft Official',
        rating: '4.9',
        reviews: '2847',
        inStock: 'true',
        originalPrice: '12.99',
        features: JSON.stringify([
          'Authentic Design',
          'High-quality Materials', 
          'Perfect Gift',
          'Working Compass',
          'Premium Packaging'
        ]),
        specifications: JSON.stringify({
          'Material': 'High-quality metal and glass',
          'Dimensions': '3.5 x 3.5 x 1.2 inches',
          'Weight': '4.2 oz (120g)',
          'Color': 'Classic Minecraft brown with red needle',
          'Function': 'Working compass with magnetic needle',
          'Packaging': 'Premium gift box included'
        })
      }
    });

    console.log('Product created:', product.id);

    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 599, // $5.99 in cents
      currency: 'usd',
    });

    console.log('Price created:', price.id);

    // Set the default price for the product
    await stripe.products.update(product.id, {
      default_price: price.id,
    });

    console.log('Default price set for product');

    console.log('\n✅ Minecraft Compass product added to Stripe!');
    console.log(`Product ID: ${product.id}`);
    console.log(`Price ID: ${price.id}`);
    console.log('\nYou can now use these IDs in your website.');

  } catch (error) {
    console.error('Error adding product to Stripe:', error);
  }
}

addMinecraftCompass(); 