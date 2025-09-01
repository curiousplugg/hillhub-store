# Card Skins Feature

## Overview
The Card Skins feature allows customers to purchase vinyl skins for their credit and debit cards. All card skins are priced at $5 each with a flat $4.99 shipping fee regardless of quantity.

## Features

### 1. Product Catalog (`/cardskins`)
- **Real-time Search**: Search across product names, descriptions, categories, and brands
- **Category Filtering**: Filter by Gaming, Anime, Pokemon, Spongebob, Minimalist, etc.
- **Product Modal**: Click on any product to see detailed information and images
- **Quick Add to Cart**: Add products directly from the catalog or modal
- **Responsive Design**: Works on desktop, tablet, and mobile

### 2. About Page (`/cardskins/about`)
- **Pricing Information**: Clear explanation of $5 per skin + $4.99 shipping
- **Installation Guide**: Step-by-step instructions for applying card skins
- **Care Instructions**: Do's and don'ts for maintaining card skins
- **FAQ Section**: Common questions and answers
- **Video Tutorial Placeholder**: Ready for tutorial videos

### 3. Data Management
- **Hybrid Approach**: Fetches from Stripe API with local caching
- **Fallback System**: Uses sample data if Stripe is unavailable
- **Performance Optimized**: 5-minute cache duration for fast loading
- **Real-time Updates**: Automatically syncs with Stripe product changes

## Technical Implementation

### File Structure
```
src/app/cardskins/
├── page.tsx              # Main catalog page
└── about/
    └── page.tsx          # About/installation guide page

src/lib/
└── cardSkinsData.ts      # Data management utilities

scripts/
└── add-card-skins-to-stripe.js  # Script to create Stripe products

public/cardskins/         # Product images
├── gaming-dragon-1.jpg
├── anime-character-1.jpg
├── pokemon-pikachu-1.jpg
├── spongebob-1.jpg
└── minimalist-abstract-1.jpg
```

### Key Components

#### 1. Card Skins Page (`/cardskins`)
- **Search Functionality**: Real-time filtering as user types
- **Category Filtering**: Sidebar with category selection
- **Product Grid**: Responsive grid layout with hover effects
- **Product Modal**: Detailed view with image gallery
- **Add to Cart**: Integration with existing cart system

#### 2. Data Management (`cardSkinsData.ts`)
- **Caching System**: 5-minute cache to reduce API calls
- **Stripe Integration**: Fetches products from Stripe API
- **Fallback Data**: Sample products if API fails
- **Search Functions**: Fast local search across all fields
- **Category Management**: Dynamic category generation

#### 3. Stripe Integration
- **Product Creation**: Script to bulk create products in Stripe
- **Metadata Support**: Category, brand, and type information
- **Price Management**: All products priced at $5.00
- **Image Support**: Product images stored in Stripe

## Usage

### For Customers
1. **Browse**: Visit `/cardskins` to see all available designs
2. **Search**: Use the search bar to find specific designs
3. **Filter**: Use category filters to narrow down options
4. **View Details**: Click on any product to see more information
5. **Add to Cart**: Add products directly or from the modal
6. **Checkout**: Proceed through the existing cart/checkout system

### For Administrators
1. **Add Products**: Use the Stripe script to create new products
2. **Upload Images**: Add product images to `public/cardskins/`
3. **Update Data**: Modify `cardSkinsData.ts` for fallback data
4. **Monitor**: Check Stripe dashboard for sales and inventory

## Pricing Structure
- **Product Price**: $5.00 per card skin
- **Shipping**: $4.99 flat rate (regardless of quantity)
- **Example**: 5 card skins = $25.00 + $4.99 shipping = $29.99 total

## Future Enhancements
1. **Infinite Scroll**: Load more products as user scrolls
2. **Advanced Filters**: Price range, rating, availability
3. **Wishlist**: Save favorite designs
4. **Bulk Discounts**: Discounts for larger orders
5. **Custom Designs**: Allow customers to upload custom images
6. **Reviews System**: Customer reviews and ratings
7. **Inventory Management**: Track stock levels
8. **Analytics**: Track popular designs and sales

## Setup Instructions

### 1. Create Stripe Products
```bash
cd hillhub
node scripts/add-card-skins-to-stripe.js
```

### 2. Add Product Images
Place product images in `public/cardskins/` with the naming convention:
- `{category}-{name}-{number}.jpg`
- Example: `gaming-dragon-1.jpg`

### 3. Update Navigation
The navigation has been updated to include the "Card Skins" link.

### 4. Test the Feature
1. Start the development server: `npm run dev`
2. Visit `/cardskins` to see the catalog
3. Visit `/cardskins/about` to see the about page
4. Test search and filtering functionality
5. Test adding products to cart

## Notes
- The system uses a hybrid approach for optimal performance
- All card skins are priced at $5.00 for simplicity
- Shipping is handled at checkout with a flat $4.99 rate
- The about page includes placeholders for tutorial videos
- The system is designed to scale to 50+ products efficiently 