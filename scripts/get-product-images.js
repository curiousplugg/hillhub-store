require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function getProductImages() {
  try {
    console.log('Fetching Minecraft Compass product data...');
    
    // Get the specific product
    const product = await stripe.products.retrieve('prod_StSX7agKmGxakP');
    
    console.log('✅ Product found!');
    console.log('Product Name:', product.name);
    console.log('Product Description:', product.description);
    console.log('Product Images:', product.images);
    console.log('');
    
    if (product.images && product.images.length > 0) {
      console.log('📸 Available Images:');
      product.images.forEach((image, index) => {
        console.log(`${index + 1}. ${image}`);
      });
      
      console.log('');
      console.log('🔧 To use these images in checkout, update the checkout route with:');
      console.log(`images: ${JSON.stringify(product.images)}`);
    } else {
      console.log('⚠️  No images found on this product');
      console.log('Please ensure you have uploaded an image to the Stripe product');
    }
    
  } catch (error) {
    console.error('❌ Error fetching product:', error.message);
  }
}

getProductImages(); 