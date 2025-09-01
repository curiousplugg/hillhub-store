import { NextResponse } from 'next/server';
import { getStripeProducts, getCategories, getBrands } from '@/lib/stripe-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const [products, categories, brands] = await Promise.all([
      getStripeProducts(),
      getCategories(),
      getBrands()
    ]);

    // Filter products by type if specified
    let filteredProducts = products;
    if (type === 'card_skin') {
      filteredProducts = products.filter(product => 
        product.metadata?.type === 'card_skin' || 
        product.category.toLowerCase().includes('card') ||
        product.brand === 'CardSkins'
      );
    }

    return NextResponse.json({
      products: filteredProducts,
      categories,
      brands
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 