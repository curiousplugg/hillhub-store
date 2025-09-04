require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function addBedSheetHolder() {
  try {
    console.log('🛏️ Creating Bed Sheet Holder product in Stripe...');
    
    // Create the product
    const product = await stripe.products.create({
      name: 'Invisible Bed Sheet Holder Clips - No Slip Needle-Free Grippers',
      description: 'Keep your fitted sheets in place with our bed sheet holder straps. Designed with heavy-duty fasteners for strong compatibility, these straps are not easy to deform. The simple and elegant design allows for multifunctional use. Perfect for families with children or pets, ensuring your bed stays clean and tidy.',
      images: [
        'https://hill-hub.com/bed-sheet-holder/bed-sheet-holder-1.jpg',
        'https://hill-hub.com/bed-sheet-holder/bed-sheet-holder-2.jpg',
        'https://hill-hub.com/bed-sheet-holder/bed-sheet-holder-3.jpg',
        'https://hill-hub.com/bed-sheet-holder/bed-sheet-holder-4.jpg',
        'https://hill-hub.com/bed-sheet-holder/bed-sheet-holder-5.jpg',
        'https://hill-hub.com/bed-sheet-holder/bed-sheet-holder-6.jpg',
        'https://hill-hub.com/bed-sheet-holder/bed-sheet-holder-7.jpg'
      ],
      metadata: {
        category: 'Home & Bedding',
        features: 'Strong Fixation, Versatile Fit, Tough Design, Cozy Sleep Space, Vast Application',
        specifications: 'Net weight: 450g, Material: PVC, Size: 20.5x12.9x11.6cm',
        package_includes: '4 x Bed Sheet Holders Straps Fitted'
      }
    });

    console.log('✅ Product created successfully!');
    console.log(`📦 Product ID: ${product.id}`);

    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 1500, // $15.00 in cents
      currency: 'usd',
    });

    console.log('✅ Price created successfully!');
    console.log(`💰 Price ID: ${price.id}`);
    console.log(`💵 Price: $15.00 USD`);

    console.log('\n🎉 SUCCESS: Bed Sheet Holder product added to Stripe!');
    console.log('\n📝 Next steps:');
    console.log('1. Update your frontend code with the new Product ID and Price ID');
    console.log('2. Add the product to your website listings');
    console.log('3. Test the checkout functionality');
    
    console.log('\n�� Product Details:');
    console.log(`- Product ID: ${product.id}`);
    console.log(`- Price ID: ${price.id}`);
    console.log('- Name: Invisible Bed Sheet Holder Clips - No Slip Needle-Free Grippers');
    console.log('- Price: $15.00');
    console.log('- Category: Home & Bedding');
    console.log('- Shipping: $4.99');

  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    
    if (error.code === 'resource_missing') {
      console.log('\n💡 Make sure you have the correct Stripe secret key in your .env.local file');
    }
  }
}

addBedSheetHolder();
