'use client';

import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/products';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again!');
      }
    } catch {
      alert('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-3xl font-black text-gray-700 mb-4">Your cart is empty!</h1>
        <p className="text-gray-500 mb-8">Go find something you love in our shop 💛</p>
        <Link
          href="/shop"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-black text-lg px-8 py-3 rounded-full shadow-lg transition-all hover:-translate-y-1"
        >
          Browse the shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black text-gray-800 mb-8">Your cart 🛒</h1>

      <div className="bg-white rounded-3xl shadow-lg border-2 border-pink-100 overflow-hidden mb-6">
        {items.map((item, i) => (
          <div key={item.id} className={`flex items-center gap-4 p-5 ${i < items.length - 1 ? 'border-b border-pink-50' : ''}`}>
            <span className="text-4xl">{item.emoji}</span>
            <div className="flex-1">
              <h3 className="font-black text-gray-800">{item.name}</h3>
              <p className="text-pink-500 font-bold">{formatPrice(item.price)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-pink-100 hover:bg-pink-200 text-pink-600 font-black rounded-full flex items-center justify-center transition-colors"
              >
                −
              </button>
              <span className="font-black text-lg w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-pink-100 hover:bg-pink-200 text-pink-600 font-black rounded-full flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
            <span className="font-black text-gray-800 w-16 text-right">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-300 hover:text-red-400 transition-colors text-xl ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-lg border-2 border-pink-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="font-black text-xl text-gray-700">Total</span>
          <span className="font-black text-3xl text-pink-500">{formatPrice(total)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-black text-xl py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 disabled:translate-y-0"
        >
          {loading ? 'Loading...' : 'Checkout with Stripe 💳'}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}
