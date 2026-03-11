'use client';

import { useCart } from '@/lib/cart';
import { Product } from '@/lib/products';
import { useState } from 'react';
import Link from 'next/link';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price, emoji: product.emoji });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleAdd}
        className={`font-black text-lg px-8 py-4 rounded-full shadow-lg transition-all ${
          added
            ? 'bg-green-400 text-white scale-95'
            : 'bg-pink-500 hover:bg-pink-600 text-white hover:shadow-xl hover:-translate-y-1'
        }`}
      >
        {added ? '✓ Added to cart!' : 'Add to cart 🛒'}
      </button>
      {added && (
        <Link href="/cart" className="text-center text-pink-500 font-bold hover:underline">
          View cart →
        </Link>
      )}
    </div>
  );
}
