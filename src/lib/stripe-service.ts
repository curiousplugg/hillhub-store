import { stripe } from './stripe';

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  specifications: Record<string, string>;
  stripePriceId: string;
  metadata?: Record<string, string>;
}

// Fetch all products from Stripe
export async function getStripeProducts(): Promise<StripeProduct[]> {
  if (!stripe) {
    console.error('Stripe not configured');
    return [];
  }

  try {
    // Get all products from Stripe
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    // Get all prices to match with products
    const prices = await stripe.prices.list({
      active: true,
    });

    return products.data.map((product) => {
      const defaultPrice = product.default_price as { id: string; unit_amount: number } | null;
      const price = prices.data.find(p => p.id === defaultPrice?.id);
      
      // Extract metadata for additional product info
      const metadata = product.metadata;
      
      return {
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: price ? price.unit_amount! / 100 : 0, // Convert from cents
        originalPrice: metadata.originalPrice ? parseFloat(metadata.originalPrice) : undefined,
        images: product.images?.map(img => {
          // If it's a full URL, use it as is
          if (img.startsWith('http')) {
            return img;
          }
          // If it's a local path, construct the full URL
          if (img.includes('minecraft_compass')) {
            return img; // Keep as is for local images
          }
          return img;
        }) || [],
        category: metadata.category || 'Uncategorized',
        brand: metadata.brand || 'Unknown',
        rating: metadata.rating ? parseFloat(metadata.rating) : 4.5,
        reviews: metadata.reviews ? parseInt(metadata.reviews) : 0,
        inStock: metadata.inStock !== 'false',
        features: metadata.features ? JSON.parse(metadata.features) : [],
        specifications: metadata.specifications ? JSON.parse(metadata.specifications) : {},
        stripePriceId: price?.id || '',
        metadata: metadata,
      };
    });
  } catch (error) {
    console.error('Error fetching products from Stripe:', error);
    return [];
  }
}

// Fetch a single product by ID
export async function getStripeProductById(id: string): Promise<StripeProduct | null> {
  if (!stripe) {
    console.error('Stripe not configured');
    return null;
  }

  try {
    const product = await stripe.products.retrieve(id, {
      expand: ['default_price'],
    });

    if (!product) return null;

    const defaultPrice = product.default_price as { id: string; unit_amount: number } | null;
    const metadata = product.metadata;
    
    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: defaultPrice ? defaultPrice.unit_amount / 100 : 0,
      originalPrice: metadata.originalPrice ? parseFloat(metadata.originalPrice) : undefined,
              images: product.images?.map(img => {
          // If it's a full URL, use it as is
          if (img.startsWith('http')) {
            return img;
          }
          // If it's a local path, construct the full URL
          if (img.includes('minecraft_compass')) {
            return img; // Keep as is for local images
          }
          return img;
        }) || [],
      category: metadata.category || 'Uncategorized',
      brand: metadata.brand || 'Unknown',
      rating: metadata.rating ? parseFloat(metadata.rating) : 4.5,
      reviews: metadata.reviews ? parseInt(metadata.reviews) : 0,
      inStock: metadata.inStock !== 'false',
      features: metadata.features ? JSON.parse(metadata.features) : [],
      specifications: metadata.specifications ? JSON.parse(metadata.specifications) : {},
      stripePriceId: defaultPrice?.id || '',
    };
  } catch (error) {
    console.error('Error fetching product from Stripe:', error);
    return null;
  }
}

// Get featured products (first 4 products)
export async function getFeaturedProducts(): Promise<StripeProduct[]> {
  const products = await getStripeProducts();
  return products.slice(0, 4);
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<StripeProduct[]> {
  const products = await getStripeProducts();
  return products.filter(product => product.category === category);
}

// Get unique categories
export async function getCategories(): Promise<string[]> {
  const products = await getStripeProducts();
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
}

// Get unique brands
export async function getBrands(): Promise<string[]> {
  const products = await getStripeProducts();
  const brands = products.map(product => product.brand);
  return [...new Set(brands)];
} 