'use client';

import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>

        <div className="space-y-3">
          <Link href="/products" className="block w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                Try Again
              </Link>
          
          <Link
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 