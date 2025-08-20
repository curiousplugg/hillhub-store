# HillHub - Premium Dropshipping Store

A modern, clean dropshipping store built with Next.js, Firebase, and Stripe. Each product has its own dedicated page that feels like a standalone website.

## Features

- 🏔️ **HillHub Branding** - Custom hill-themed logo and branding
- 🛍️ **Product Showcase** - Beautiful product grid with filtering and sorting
- 📱 **Individual Product Pages** - Each product feels like its own website
- 🔥 **Firebase Integration** - Backend, hosting, and database
- 💳 **Stripe Checkout** - Secure payment processing
- 🎨 **Modern UI** - Clean design with white, gray, and black color scheme
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Built with Next.js for speed

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Stripe (Products, Payments, Checkout)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hillhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Stripe credentials in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Stripe Setup

1. Create a Stripe account at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from the Developers section
3. Add the keys to your `.env.local` file
4. Set up webhooks for payment processing
5. Create products in your Stripe dashboard (optional - currently using mock data)

## Project Structure

```
hillhub/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── products/        # Product pages
│   │   │   └── [id]/        # Individual product pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── Logo.tsx         # HillHub logo
│   │   ├── Navigation.tsx   # Navigation bar
│   │   ├── Hero.tsx         # Hero section
│   │   ├── FeaturedProducts.tsx
│   │   └── Footer.tsx       # Footer
│   ├── lib/                 # Utility libraries
│   │   └── stripe.ts        # Stripe configuration and product data
│   └── types/               # TypeScript types
│       └── index.ts         # Product and other types
├── public/                  # Static assets
├── .env.local.example       # Environment variables template
└── README.md               # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Customization

### Colors
The color scheme uses white, gray, and black as requested. You can customize colors in `tailwind.config.js`.

### Logo
The hill logo is created with SVG in `src/components/Logo.tsx`. You can modify the SVG paths to change the hill design.

### Products
Add your products by updating the product data in `src/lib/stripe.ts` or connecting to Stripe Products API.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@hillhub.com or create an issue in the repository.
