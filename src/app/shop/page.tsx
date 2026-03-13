import { supabase } from '@/lib/supabase';
import { Product, formatPrice } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('id');
  if (error || !data) return [];
  return data as Product[];
}

export default async function ShopPage() {
  const products = await getProducts();
  const crafts = products.filter((p) => p.category === 'craft');
  const accessories = products.filter((p) => p.category === 'accessory');
  const clothing = products.filter((p) => p.category === 'clothing');

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black text-gray-800 mb-2">Our Shop 🛍️</h1>
        <p className="text-gray-500 text-lg">Everything is handmade by Bea & Louisa with lots of love!</p>
      </div>

      {crafts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-black text-purple-500 mb-6 flex items-center gap-2">🎨 Art & Crafts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crafts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {accessories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-black text-pink-500 mb-6 flex items-center gap-2">✨ Accessories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {clothing.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-black text-yellow-500 mb-6 flex items-center gap-2">👗 Clothing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clothing.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {products.length === 0 && (
        <p className="text-center text-gray-400 py-20">No products yet — check back soon!</p>
      )}
    </div>
  );
}
