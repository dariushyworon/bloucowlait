'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    // Clear cart directly from localStorage — most reliable after Stripe redirect
    localStorage.removeItem('bloucowlait-cart');
    // Force a storage event so the cart context re-syncs
    window.dispatchEvent(new Event('storage'));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl mb-6 animate-bounce">🎉</div>
      <h1 className="text-4xl font-black text-blue-900 mb-4">Thank you so much!!</h1>
      <div className="text-5xl mb-4">🐄💛</div>
      <p className="text-xl text-gray-500 mb-2">
        Your order is confirmed! Bea & Louisa will start making it right away.
      </p>
      <p className="text-gray-400 mb-8">
        Check your email for your order confirmation. It will come with a personal note!
      </p>
      <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl p-8 mb-8">
        <p className="font-black text-2xl text-sky-500 mb-2">Thank you for supporting our little shop! 🥹</p>
        <p className="text-gray-500">— Bea & Louisa</p>
      </div>
      <Link
        href="/shop"
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-black text-lg px-8 py-3 rounded-full shadow-lg transition-all hover:-translate-y-1"
      >
        Shop more →
      </Link>
    </div>
  );
}
