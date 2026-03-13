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
        <h2 className="text-2xl font-black text-sky-500 mb-4">Hi! 👋</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
          We are the inventors of <strong className="text-blue-900">Bloucowlait</strong> — and we have been best
          friends since the day we were born. We started our little company when we were just six years old,
          and we have always dreamed of having our very own website. Well, now we do! 🎉
        </p>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
          We are so happy you found us. Every single product on here has been made by our own hands,
          with real time and real effort — because we care about every person who gets something from us.
        </p>
        <p className="text-gray-600 leading-relaxed text-lg">
          We really hope you love what we make. Thanks for visiting — bye! 🐄💛
        </p>
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
