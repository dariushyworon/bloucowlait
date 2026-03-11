import { getProduct, formatPrice, products } from '@/lib/products';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-pink-100 grid md:grid-cols-2">
        {/* Image */}
        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 flex items-center justify-center text-9xl p-16">
          {product.emoji}
        </div>

        {/* Details */}
        <div className="p-8 flex flex-col justify-center">
          <span className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-black text-gray-800 mb-3">{product.name}</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-black text-pink-500">{formatPrice(product.price)}</span>
            {product.stock <= 5 && (
              <span className="bg-yellow-100 text-yellow-700 text-sm font-bold px-3 py-1 rounded-full">
                Only {product.stock} left!
              </span>
            )}
          </div>

          <AddToCartButton product={product} />

          <p className="text-xs text-gray-400 mt-4 text-center">
            💌 Comes with a personal note from Bea & Louisa
          </p>
        </div>
      </div>
    </div>
  );
}
