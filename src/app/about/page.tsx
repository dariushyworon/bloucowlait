import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Image src="/logo.jpg" alt="Bloucowlait" width={140} height={140} className="rounded-3xl shadow-xl" />
        </div>
        <h1 className="text-5xl font-black text-blue-900 mb-4">About us 💛</h1>
        <p className="text-xl text-gray-500">The story behind Bloucowlait</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-sky-100 mb-8">
        <h2 className="text-2xl font-black text-sky-500 mb-4">How did we get our name?</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Our name is a mix of all the things we love most!
          <strong className="text-sky-500"> Blou</strong> is for <strong>B</strong>ea,
          <strong className="text-blue-900"> Lou</strong> is for <strong>Lou</strong>isa,
          we added <strong className="text-gray-700"> Cow</strong> because we absolutely love cows 🐄,
          and <strong className="text-sky-400"> Lait</strong> is the French word for milk —
          because what else do cows make? 🥛
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl p-8 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-black text-blue-900 mb-2">Louisa</h3>
          <p className="text-gray-600">
            Louisa loves painting and creating art. She makes all our hand-painted items,
            from rocks to watercolour cards to custom name paintings!
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-sky-100 rounded-3xl p-8 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-2xl font-black text-sky-500 mb-2">Bea</h3>
          <p className="text-gray-600">
            Bea loves making accessories and jewellery. She handcrafts our bracelets,
            keychains, scrunchies, and anything sparkly!
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-blue-900 rounded-3xl p-8 text-center">
        <p className="text-2xl font-black text-white drop-shadow mb-2">
          Every item is made with love, just for you 💛
        </p>
        <p className="text-white opacity-80">
          When you buy from us, you&apos;re supporting two little sisters and their big dreams!
        </p>
      </div>
    </div>
  );
}
