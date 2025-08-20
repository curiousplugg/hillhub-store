#!/bin/bash

echo "🚀 HillHub Production Deployment Script"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the hillhub directory"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found. Please create it first."
    exit 1
fi

echo "📋 Step 1: Installing dependencies..."
npm install

echo "📋 Step 2: Setting up Stripe webhook..."
npm run setup-webhook

echo "📋 Step 3: Building for production..."
npm run build

echo "📋 Step 4: Checking for linting issues..."
npm run lint

echo "✅ Build completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Copy the webhook secret from above and add it to your .env.local"
echo "2. Deploy to Vercel: vercel --prod"
echo "3. Configure your domain hill-hub.com in Vercel dashboard"
echo "4. Test the checkout flow"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 