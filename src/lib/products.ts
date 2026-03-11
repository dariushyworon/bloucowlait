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
    name: 'Rainbow Friendship Bracelet',
    description: 'Handmade with love by Bea! Bright rainbow colours, adjustable size. Perfect for best friends.',
    price: 500, // $5.00
    image: '/products/bracelet.jpg',
    category: 'accessory',
    emoji: '🌈',
    stock: 10,
  },
  {
    id: 'p2',
    name: 'Painted Rock Pet',
    description: 'Each rock is hand-painted by Louisa with a unique animal face. No two are the same!',
    price: 800,
    image: '/products/rock.jpg',
    category: 'craft',
    emoji: '🪨',
    stock: 5,
  },
  {
    id: 'p3',
    name: 'Cow Print Hair Scrunchie',
    description: 'Super cute cow print scrunchie, handmade by the Bloucowlait team. Fits all hair types!',
    price: 400,
    image: '/products/scrunchie.jpg',
    category: 'accessory',
    emoji: '🐄',
    stock: 15,
  },
  {
    id: 'p4',
    name: 'Original Watercolour Card',
    description: 'A one-of-a-kind watercolour painting by Louisa, perfect for framing or gifting.',
    price: 1200,
    image: '/products/watercolour.jpg',
    category: 'craft',
    emoji: '🎨',
    stock: 3,
  },
  {
    id: 'p5',
    name: 'Tie-Dye Tote Bag',
    description: 'Hand tie-dyed cotton tote bag. Great for the beach, shopping, or just looking cool!',
    price: 1500,
    image: '/products/tote.jpg',
    category: 'clothing',
    emoji: '👜',
    stock: 6,
  },
  {
    id: 'p6',
    name: 'Glitter Bookmark Set',
    description: 'Set of 3 hand-decorated glitter bookmarks. Never lose your page again!',
    price: 600,
    image: '/products/bookmark.jpg',
    category: 'craft',
    emoji: '✨',
    stock: 20,
  },
  {
    id: 'p7',
    name: 'Beaded Keychain',
    description: 'Colourful beaded keychain handmade by Bea. Choose your favourite colours at checkout!',
    price: 700,
    image: '/products/keychain.jpg',
    category: 'accessory',
    emoji: '🔑',
    stock: 12,
  },
  {
    id: 'p8',
    name: 'Custom Name Painting',
    description: 'Louisa will paint your name in her own special style! Takes 1 week. Great gift.',
    price: 2000,
    image: '/products/name.jpg',
    category: 'craft',
    emoji: '🖌️',
    stock: 4,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
