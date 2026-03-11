import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-200 py-20 px-4 text-center relative overflow-hidden">
        {/* Decorative emojis */}
        <div className="absolute top-4 left-8 text-5xl opacity-40 rotate-12">🐄</div>
        <div className="absolute top-8 right-12 text-4xl opacity-40 -rotate-12">🌈</div>
        <div className="absolute bottom-4 left-16 text-4xl opacity-40 rotate-6">✨</div>
        <div className="absolute bottom-8 right-8 text-5xl opacity-40 -rotate-6">🎨</div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-8xl mb-4">🐄</div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="text-purple-500">blou</span>
            <span className="text-pink-500">cow</span>
            <span className="text-yellow-500">lait</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-600 mb-2">
            Handmade with love by Bea & Louisa 💛
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Unique crafts, art, and accessories — each one made by hand, just for you!
          </p>
          <Link
            href="/shop"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-black text-xl px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            Shop now 🛍️
          </Link>
        </div>
      </section>

      {/* About strip */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="text-5xl mb-3">👐</div>
            <h3 className="font-black text-lg text-gray-800 mb-2">100% Handmade</h3>
            <p className="text-gray-500">Every item is made by hand by Bea or Louisa</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-3">💌</div>
            <h3 className="font-black text-lg text-gray-800 mb-2">Made with Love</h3>
            <p className="text-gray-500">Each order comes with a personal note from us!</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-3">🌍</div>
            <h3 className="font-black text-lg text-gray-800 mb-2">Ships Everywhere</h3>
            <p className="text-gray-500">We ship to family and friends around the world</p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-center text-gray-800 mb-2">
          Featured items ⭐
        </h2>
        <p className="text-center text-gray-500 mb-8">Our most popular handmade treasures</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-black text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            See all products →
          </Link>
        </div>
      </section>

      {/* Fun banner */}
      <section className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 py-12 px-4 text-center my-8">
        <p className="text-2xl font-black text-white drop-shadow">
          🐄 &nbsp; B for Bea &nbsp;•&nbsp; Lou for Louisa &nbsp;•&nbsp; Cow because we love them &nbsp;•&nbsp; Lait means milk &nbsp; 🥛
        </p>
      </section>
    </div>
  );
}
