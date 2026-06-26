export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#760031] via-[#4a001f] to-[#1a000b] text-white px-6 py-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1
          className="text-5xl font-bold"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          About ReSell Hub
        </h1>

        <p className="mt-4 text-white/70 text-lg">
          A modern second-hand marketplace where buyers and sellers connect, trade, and grow together.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-[#FEEC41] mb-3">
            Our Mission
          </h2>
          <p className="text-white/70 leading-relaxed">
            We aim to make buying and selling used products simple, safe, and accessible for everyone.
            ReSell Hub empowers users to give products a second life while saving money and reducing waste.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-[#FEEC41] mb-3">
            Why Choose Us
          </h2>
          <p className="text-white/70 leading-relaxed">
            With secure authentication, easy listing tools, and smooth order management,
            ReSell Hub ensures a seamless experience for both buyers and sellers.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Easy Listing",
            desc: "Post products in seconds with images, price, and details.",
          },
          {
            title: "Secure System",
            desc: "Authentication and role-based access for safety.",
          },
          {
            title: "Smart Marketplace",
            desc: "Browse categories and find exactly what you need.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/10 border border-white/10 rounded-2xl p-6 hover:scale-105 transition"
          >
            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="text-white/60 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-3xl mx-auto text-center mt-16">
        <h2 className="text-3xl font-bold text-[#FEEC41]">
          Start Buying & Selling Today
        </h2>

        <p className="text-white/70 mt-3">
          Join ReSell Hub and become part of a growing second-hand marketplace community.
        </p>
      </div>

    </div>
  );
}