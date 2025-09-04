import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1, selectedSize, successUrl, cancelUrl } = await req.json();

    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    // Calculate shipping based on product
    let shippingAmount = 0;
    
    if (productId === 'prod_StSX7agKmGxakP') {
      shippingAmount = 599; // $5.99 for compass
    } else if (productId === 'prod_SuAzOcPEF7ZVoV') {
      shippingAmount = 999; // $9.99 for hologram cube
    } else if (productId === 'prod_SmartLedBacklight') {
      shippingAmount = 499; // $4.99 for LED backlight
    } else if (productId === 'prod_SzTH6yZQpYqQYl') {
      shippingAmount = 499; // $4.99 for bed sheet holder
    } else {
      shippingAmount = 999; // Default shipping for other products
    }

    // Create Stripe checkout session for single product
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        // Product line item
        (() => {
          if (productId === 'prod_StSX7agKmGxakP') {
            return {
              price: 'price_1S2MpdBJjaZO6BBgoOyAu4Yj', // Minecraft Compass Stripe price ID
              quantity: quantity,
            };
          } else if (productId === 'prod_SzTH6yZQpYqQYl') {
            return {
              price: 'price_1S3UKbBJjaZO6BBgpxZeRB2R', // Bed Sheet Holder Stripe price ID
              quantity: quantity,
            };
          }
          
          if (productId === 'prod_SuAzOcPEF7ZVoV') {
            return {
              price: 'price_1RyMhfBJjaZO6BBgQfl1z4HZ', // Hologram Cube Stripe price ID
              quantity: quantity,
            };
          }
          
          if (productId === 'prod_SmartLedBacklight') {
            // For LED backlight, use manual price data with size information
            const sizeLabels = {
              '24inch': '24 Inch',
              '27inch': '27 Inch', 
              '32inch': '32 Inch',
              '34inch': '34 Inch'
            };
            
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `Smart LED Strip Backlight - ${sizeLabels[selectedSize as keyof typeof sizeLabels] || '24 Inch'}`,
                  description: 'Gaming Atmosphere Ambient Light with Music Sync - USB Plug & Play LED Strip',
                  images: ['https://hill-hub.com/monitorSmartLights/main.jpg'],
                },
                unit_amount: 1999, // $19.99
              },
              quantity: quantity,
            };
          }
          
          // For other products, this would need to be handled differently
          throw new Error('Product not configured for direct checkout');
        })(),
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
        product_id: productId,
        quantity: quantity.toString(),
        selected_size: selectedSize || '',
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
    console.error('Buy Now checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 