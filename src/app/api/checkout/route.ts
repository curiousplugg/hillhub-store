import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { items, successUrl, cancelUrl, shipping, total } = await req.json();

    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    // Check if this is a card skins order (all items are card skins)
    const isCardSkinsOrder = items.every((item: any) => 
      item.priceId && item.priceId.startsWith('price_cardskin_')
    );

    // Calculate shipping based on order type
    let shippingAmount = 0;
    if (isCardSkinsOrder) {
      // Card skins: $4.99 flat rate
      shippingAmount = 499;
    } else {
      // Regular products: existing logic
      const hasCompass = items.some((item: any) => item.id === 'prod_StSX7agKmGxakP');
      const hasHologramCube = items.some((item: any) => item.id === 'prod_SuAzOcPEF7ZVoV');
      
      if (hasCompass && hasHologramCube) {
        shippingAmount = 999; // $9.99
      } else if (hasCompass) {
        shippingAmount = 599; // $5.99 for compass only
      } else if (hasHologramCube) {
        shippingAmount = 999; // $9.99 for hologram cube only
      } else {
        shippingAmount = 999; // Default shipping for other products
      }
    }

    // Create Stripe checkout session with custom branding
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        ...items.map((item: { id: string; name: string; description: string; price: number; quantity: number; images?: string[]; priceId?: string }) => {
          // Handle card skins - use Stripe price ID
          if (item.priceId && item.priceId.startsWith('price_cardskin_')) {
            return {
              price: item.priceId,
              quantity: item.quantity,
            };
          }
          
          // Handle Minecraft Compass product specifically - use Stripe price ID for automatic product data
          if (item.id === 'prod_StSX7agKmGxakP') {
            return {
              price: 'price_1S2MpdBJjaZO6BBgoOyAu4Yj', // Use Stripe price ID for automatic product data including your uploaded image
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
            unit_amount: shippingAmount,
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