import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { items, successUrl, cancelUrl } = await req.json();

    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    // Create Stripe checkout session with custom branding
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        ...items.map((item: { id: string; name: string; description: string; price: number; quantity: number; images?: string[] }) => {
          // Handle Minecraft Compass product specifically - use Stripe price ID for automatic product data
                                if (item.id === 'prod_StSX7agKmGxakP') {
                        return {
                          price: 'price_1RyIdqBJjaZO6BBgFHzb7Be4', // Use Stripe price ID for automatic product data including your uploaded image
                          quantity: item.quantity,
                        };
                      }
                      
                      if (item.id === 'prod_SuAzOcPEF7ZVoV') {
                        return {
                          price: 'price_1RyMhfBJjaZO6BBgQfl1z4HZ', // Use Stripe price ID for automatic product data
                          quantity: item.quantity,
                        };
                      }
          
          // For other products, use manual price_data
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                description: item.description,
                images: item.images,
              },
              unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
          };
        }),
        // Add shipping as a separate line item
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Shipping',
              description: 'Standard shipping (1-3 weeks)',
            },
                                    unit_amount: 999, // $9.99 in cents
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: successUrl || `https://hill-hub.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `https://hill-hub.com/cancel`,
      metadata: {
        order_id: `order_${Date.now()}`,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      // Custom text
      custom_text: {
        submit: {
          message: 'Thank you for shopping with HillHub! 🏔️',
        },
        shipping_address: {
          message: 'Please provide your shipping address for delivery.',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 