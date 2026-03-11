'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart';

export default function Navbar() {
  const { count } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-sky-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/logo.jpg" alt="Bloucowlait logo" width={52} height={52} className="rounded-xl" />
          <span className="text-2xl font-black">
            <span className="text-sky-500">blou</span>
            <span className="text-blue-900">cow</span>
            <span className="text-sky-400">lait</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/shop" className="font-bold text-gray-600 hover:text-sky-500 transition-colors text-lg">
            Shop 🛍️
          </Link>
          <Link href="/about" className="font-bold text-gray-600 hover:text-sky-500 transition-colors text-lg">
            About us 💛
          </Link>
          <Link href="/cart" className="relative">
            <div className="bg-sky-500 hover:bg-sky-600 transition-colors text-white font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
              <span className="text-xl">🛒</span>
              <span>Cart</span>
              {count > 0 && (
                <span className="bg-yellow-400 text-gray-800 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
