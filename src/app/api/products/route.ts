import { NextResponse } from 'next/server';
import { getStripeProducts, getCategories, getBrands } from '@/lib/stripe-service';

export async function GET() {
  try {
    const [products, categories, brands] = await Promise.all([
      getStripeProducts(),
      getCategories(),
      getBrands()
    ]);

    return NextResponse.json({
      products,
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