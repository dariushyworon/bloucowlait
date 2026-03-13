export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  image: string;
  category: 'craft' | 'clothing' | 'accessory';
  emoji: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Bracelet',
    description: 'Handmade with love by Bea and Louisa! Bright rainbow colours, adjustable size. Perfect for best friends. Choose your colours.',
    price: 350,
    image: '/products/bracelet.jpg',
    category: 'accessory',
    emoji: '🌈',
    stock: 100,
  },
  {
    id: 'p2',
    name: 'Painted Rock Pet',
    description: 'Each rock is hand-painted by Louisa and Bea with a unique animal face. No two are the same!',
    price: 200,
    image: '/products/rock.jpg',
    category: 'craft',
    emoji: '🪨',
    stock: 100,
  },
  {
    id: 'p4',
    name: 'Original Watercolour Card',
    description: 'A one-of-a-kind watercolour painting by Louisa and Bea, perfect for framing or gifting. You can customise it with words.',
    price: 900,
    image: '/products/watercolour.jpg',
    category: 'craft',
    emoji: '🎨',
    stock: 100,
  },
  {
    id: 'p5',
    name: 'Tie-Dye Bag',
    description: 'Hand tie-dyed bag. Great for the beach, shopping, or just looking cool!',
    price: 1985,
    image: '/products/tote.jpg',
    category: 'clothing',
    emoji: '🎒',
    stock: 100,
  },
  {
    id: 'p7',
    name: 'Set of Keychains',
    description: 'Colourful beaded keychains handmade by Bea and Louisa. Choose your favourite colours at checkout. Includes 1 crochet animal, 4 surprises and 1 braided keychain.',
    price: 2500,
    image: '/products/keychain.jpg',
    category: 'accessory',
    emoji: '🔑',
    stock: 100,
  },
  {
    id: 'p9',
    name: 'Custom Name Painting',
    description: 'A handmade name tag — you choose exactly what is written on it!',
    price: 700,
    image: '/products/product9.jpg',
    category: 'craft',
    emoji: '🏷️',
    stock: 100,
  },
  {
    id: 'p10',
    name: 'Crochet Blanket',
    description: 'A cosy handmade crochet blanket to keep you warm. Made by Bea and Louisa.',
    price: 5000,
    image: '/products/product10.jpg',
    category: 'craft',
    emoji: '🧶',
    stock: 100,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
