import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import Navbar from '@/components/Navbar';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Bloucowlait 🐄 — Handmade by Bea & Louisa',
  description: 'Handmade crafts, art, and accessories made with love by two sisters!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-amber-50 min-h-screen`}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="text-center py-8 text-pink-400 font-bold text-sm mt-12">
            🐄 Made with love by Bea &amp; Louisa 🐄
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
