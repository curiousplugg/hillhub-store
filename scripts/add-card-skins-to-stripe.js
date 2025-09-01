const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cardSkins = [
  {
    name: 'Vegeta Super Saiyan Blue Card Skin',
    description: 'A bold credit card skin featuring Vegeta in his Super Saiyan Blue form with an intense glare and glowing aura. Perfect for Dragon Ball fans who want a powerful, sleek look.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/vegeta-blue-saiyan-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Vegeta Lightning Aura Card Skin',
    description: 'Showcasing Vegeta mid-battle with crackling blue lightning energy, this skin adds an electrifying effect to your card.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/vegeta-lightning-aura-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Vegeta & Goku Duo Card Skin',
    description: 'A dynamic skin featuring Vegeta and Goku side by side in their golden Super Saiyan forms, ready for battle.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-vegeta-duo-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Vegeta Black & White Silhouette Skin',
    description: 'Minimalist black-and-white design of Vegeta in a serious pose. A clean, stylish choice for fans of the prince of all Saiyans.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/vegeta-blackwhite-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Goku Black (Rose Form) Card Skin',
    description: 'Featuring Goku Black with his signature pink Rose transformation aura, this skin is dark yet vibrant.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-black-rose-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Goku Super Saiyan Blue Kamehameha Skin',
    description: 'Goku unleashing a Kamehameha wave in his Super Saiyan Blue form, glowing with power.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-blue-kamehameha-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Goku Black & White Silhouette Skin',
    description: 'A striking monochrome sketch of Goku powering up, highlighting the simplicity and raw energy of Dragon Ball.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-blackwhite-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Goku Super Saiyan Charge Skin',
    description: 'Bright and fiery, this skin shows Goku powering up in his Super Saiyan form with golden energy blasting outward.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-super-saiyan-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Dragon Ball Super Logo Card Skin',
    description: 'Featuring Goku with the Dragon Ball Super logo, surrounded by fiery red aura. A bold, branded choice for fans of the series.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/dragon-ball-super-logo-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Goku Kanji Symbol Card Skin',
    description: 'A minimalist orange skin with Goku\'s iconic kanji "悟" (Go), representing wisdom and his martial journey.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-kanji-symbol-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Goku Black Rose Power Card Skin',
    description: 'Another variant of Goku Black in his Rose form, surrounded by swirling pink and purple aura.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-black-rose2-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Goku Classic Super Saiyan Skin',
    description: 'A classic take on Goku in Super Saiyan form with his golden hair, bright yellow aura, and determined expression.',
    price: 500,
    category: 'Dragon Ball Z',
    images: ['/cardskins/goku-classic-super-saiyan-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Dragon Ball Z',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Solo Leveling Inspired Hollow Mask Credit Card Skin – Sinister Blue Edition',
    description: 'A bold credit/debit card skin inspired by the dark aesthetic of Solo Leveling. Featuring a sinister mask with glowing red eyes, jagged teeth, and icy blue tones, this design captures the chilling presence of powerful antagonists and shadowy figures from the series. Durable yet slim, it personalizes your card without interfering with chip, swipe, or tap-to-pay functionality. Perfect for fans of Solo Leveling and dark anime art styles.',
    price: 500,
    category: 'Solo Leveling',
    images: ['/cardskins/solo-leveling-hollow-mask-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'Solo Leveling',
      brand: 'CardSkins'
    }
  },
  {
    name: 'One Piece Straw Hat Pirates Jolly Roger Credit Card Skin – Crew Edition',
    description: 'This credit/debit card skin features the iconic Straw Hat Pirates Jolly Roger from One Piece. In the center is the classic skull with Luffy\'s straw hat, surrounded by unique mini Jolly Roger emblems representing other crew members such as Zoro, Sanji, Brook, and more. The black background makes the holographic-like colors of the designs stand out, giving your card a stylish, anime-inspired upgrade. Slim and durable, this skin protects your card surface while keeping it fully functional for chip, swipe, and tap payments.',
    price: 500,
    category: 'One Piece',
    images: ['/cardskins/one-piece-straw-hat-jolly-roger-skin.png'],
    metadata: {
      type: 'card_skin',
      category: 'One Piece',
      brand: 'CardSkins'
    }
  },
  {
    name: 'Hello Kitty & My Melody Credit Card Skin – Pink Hearts Edition',
    description: 'This decorative credit/debit card skin features two beloved Sanrio characters: Hello Kitty in her signature red bow and My Melody in her pink bunny hood, holding a gift. The design is set against a soft pink background with hearts and polka dots, creating a cute and playful aesthetic. Crafted to fit standard credit/debit cards, this skin provides a stylish layer of protection while personalizing your card. It is thin enough not to interfere with swiping, tap-to-pay, or chip use, while giving your card a fun, kawaii-themed look.',
    price: 500,
    category: 'Kawaii',
    images: ['/cardskins/hello-kitty-melody-1.webp'],
    metadata: {
      type: 'card_skin',
      category: 'Kawaii',
      brand: 'CardSkins'
    }
  }
];

async function createCardSkinProducts() {
  console.log('Creating card skin products in Stripe...\n');

  for (const skin of cardSkins) {
    try {
      // Create the product
      const product = await stripe.products.create({
        name: skin.name,
        description: skin.description,
        images: skin.images,
        metadata: skin.metadata
      });

      // Create the price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: skin.price,
        currency: 'usd',
        metadata: {
          type: 'card_skin',
          category: skin.category
        }
      });

      console.log(`✅ Created: ${skin.name}`);
      console.log(`   Product ID: ${product.id}`);
      console.log(`   Price ID: ${price.id}`);
      console.log(`   Price: $${(skin.price / 100).toFixed(2)}`);
      console.log('');

    } catch (error) {
      console.error(`❌ Error creating ${skin.name}:`, error.message);
    }
  }

  console.log('Card skin products creation completed!');
}

// Run the script
if (require.main === module) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY environment variable is required');
    process.exit(1);
  }

  createCardSkinProducts()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { createCardSkinProducts }; 