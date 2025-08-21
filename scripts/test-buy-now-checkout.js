// Test script for the buy-now checkout API endpoint
const testBuyNowCheckout = async () => {
  try {
    console.log('Testing buy-now checkout API...');
    
    const response = await fetch('http://localhost:3000/api/checkout/buy-now', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: 'prod_SuAzOcPEF7ZVoV', // Hologram Cube
        quantity: 1,
        successUrl: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: 'http://localhost:3000/products/hologram-cube',
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('❌ API Error:', data.error);
      return;
    }
    
    if (data.url) {
      console.log('✅ Checkout session created successfully!');
      console.log('🔗 Checkout URL:', data.url);
      console.log('🆔 Session ID:', data.sessionId);
    } else {
      console.error('❌ No checkout URL returned');
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test if this script is executed directly
if (typeof window === 'undefined') {
  testBuyNowCheckout();
}

module.exports = { testBuyNowCheckout }; 