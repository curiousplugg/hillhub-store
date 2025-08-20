// Re-export Stripe types for consistency
export interface Product {
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
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  stripePaymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckoutSession {
  id: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'open' | 'complete' | 'expired';
  stripeSessionId: string;
  createdAt: Date;
} 