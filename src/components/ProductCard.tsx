'use client';

import Link from 'next/link';
import { Product, formatPrice } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price, emoji: product.emoji });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
      <Link href={`/shop/${product.id}`}>
        <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-white h-48 flex items-center justify-center text-7xl cursor-pointer hover:scale-105 transition-transform">
          {product.emoji}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-black text-gray-800 text-lg hover:text-sky-500 transition-colors cursor-pointer leading-tight mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm flex-1 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-black text-2xl text-blue-900">{formatPrice(product.price)}</span>
          <button
            onClick={handleAdd}
            className={`font-bold px-4 py-2 rounded-full text-sm shadow-md transition-all ${
              added
                ? 'bg-green-400 text-white scale-95'
                : 'bg-sky-500 hover:bg-sky-600 text-white hover:shadow-lg'
            }`}
          >
            {added ? '✓ Added!' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
