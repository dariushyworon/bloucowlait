'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') ?? '';
  const [cartCleared, setCartCleared] = useState(false);

  useEffect(() => {
    if (!cartCleared) {
      localStorage.removeItem('bloucowlait-cart');
      window.dispatchEvent(new Event('storage'));
      setCartCleared(true);
    }
  }, [cartCleared]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl mb-6 animate-bounce">🎉</div>
      <h1 className="text-4xl font-black text-blue-900 mb-4">Thank you so much!!</h1>
      <div className="text-5xl mb-4">🐄💛</div>

      {orderNumber && (
        <div className="bg-blue-900 text-white rounded-2xl px-8 py-4 inline-block mb-6 shadow-lg">
          <p className="text-sm font-bold opacity-70 mb-1">Order number</p>
          <p className="text-3xl font-black tracking-widest">{orderNumber}</p>
        </div>
      )}

      <p className="text-xl text-gray-500 mb-2">
        Your order is confirmed! Bea & Louisa will start making it right away.
      </p>
      <p className="text-gray-400 mb-8">
        Check your email for your order confirmation with this order number.
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
