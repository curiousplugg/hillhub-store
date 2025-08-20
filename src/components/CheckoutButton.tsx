'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface CheckoutButtonProps {
  items: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
  }>;
  className?: string;
  children?: React.ReactNode;
}

export default function CheckoutButton({ items, className = '', children }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group ${className}`}
    >
      {children ? (
        <>
          {children}
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          {isLoading ? 'Processing...' : 'Checkout'}
        </>
      )}
    </button>
  );
} 