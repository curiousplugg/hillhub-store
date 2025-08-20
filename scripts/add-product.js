const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

async function addProduct(productData) {
  try {
    // Create the product
    const product = await stripe.products.create({
      name: productData.name,
      description: productData.description,
      images: productData.images,
      metadata: {
        category: productData.category,
        brand: productData.brand,
        rating: productData.rating.toString(),
        reviews: productData.reviews.toString(),
        inStock: productData.inStock.toString(),
        originalPrice: productData.originalPrice?.toString() || '',
        features: JSON.stringify(productData.features || []),
        specifications: JSON.stringify(productData.specifications || {})
      }
    });

    console.log('Product created:', product.id);

    // Create the price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(productData.price * 100), // Convert to cents
      currency: 'usd',
    });

    console.log('Price created:', price.id);

    // Set the default price for the product
    await stripe.products.update(product.id, {
      default_price: price.id,
    });

    console.log('Default price set for product');

    console.log('\n✅ Product added to Stripe!');
    console.log(`Product ID: ${product.id}`);
    console.log(`Price ID: ${price.id}`);
    console.log(`Product Name: ${productData.name}`);
    console.log(`Price: $${productData.price}`);

    return { productId: product.id, priceId: price.id };

  } catch (error) {
    console.error('Error adding product to Stripe:', error);
    throw error;
  }
}

// Example usage - you can modify this or call the function directly
if (require.main === module) {
  const exampleProduct = {
    name: 'Example Product',
    description: 'This is an example product description.',
    price: 29.99,
    originalPrice: 39.99,
    images: ['https://your-domain.com/product-image.jpg'],
    category: 'Electronics',
    brand: 'Example Brand',
    rating: 4.5,
    reviews: 100,
    inStock: true,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    specifications: {
      'Material': 'High-quality material',
      'Dimensions': '10 x 5 x 2 inches',
      'Weight': '1.5 lbs'
    }
  };

  addProduct(exampleProduct);
}

module.exports = { addProduct }; 