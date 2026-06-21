export default function AboutPage() {
  return (
    <main className="min-h-screen bg-red-300 relative overflow-hidden">
      {/* Circular design elements */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full border-8 border-red-500 opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-red-500 opacity-10"></div>

      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            ROOP NAGAR<br />BAZAAR
          </h1>
          <div className="h-1 w-24 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Roop Nagar Bazaar is a marketplace built for the Roop Nagar society. Our goal is to empower local buyers and sellers with a friendly space to discover goods, trade items, and support neighborhood commerce.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          <div className="bg-white bg-opacity-95 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              We connect Roop Nagar residents through a marketplace that values trust, community support, and convenient local commerce. Every listing is meant to serve buyers and sellers across Roop Nagar's neighborhoods.
            </p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-red-600 mb-6">What We Offer</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-4 text-xl">✦</span>
                <span className="text-lg text-slate-700">Community-first marketplace for Delhi-based products and services.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-4 text-xl">✦</span>
                <span className="text-lg text-slate-700">Searchable local listings that help sellers reach buyers in nearby neighborhoods.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-4 text-xl">✦</span>
                <span className="text-lg text-slate-700">Guidance for safe transactions and verified offers.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-95 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Join the Community</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Whether you're selling handcrafted goods, buying daily essentials, or looking for a unique Roop Nagar deal, Roop Nagar Bazaar is your neighborhood marketplace.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
