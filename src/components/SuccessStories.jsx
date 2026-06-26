export default function SuccessStories() {
  const stories = [
    {
      name: "Arif Rahman",
      role: "Seller",
      story:
        "I sold my old laptop within 2 days on ReSell Hub. The process was smooth and I earned a fair price!",
      type: "seller",
    },
    {
      name: "Nusrat Jahan",
      role: "Buyer",
      story:
        "I bought a like-new phone at half price. The condition was exactly as shown. Very satisfied!",
      type: "buyer",
    },
    {
      name: "Shakil Ahmed",
      role: "Seller",
      story:
        "Posting products is super easy. I’ve already made multiple successful sales.",
      type: "seller",
    },
    {
      name: "Mahmudul Hasan",
      role: "Buyer",
      story:
        "Great platform for finding budget-friendly electronics. Highly recommended!",
      type: "buyer",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#760031] via-[#4a001f] to-[#1a000b] text-white px-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2
          className="text-5xl font-bold"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Success Stories
        </h2>
        <p className="mt-4 text-white/70">
          Real experiences from buyers and sellers who trust ReSell Hub.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stories.map((s, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 transition"
          >
            {/* Role Badge */}
            <span
              className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${
                s.type === "buyer"
                  ? "bg-[#FEEC41] text-[#760031]"
                  : "bg-[#D51C39] text-white"
              }`}
            >
              {s.role}
            </span>

            {/* Name */}
            <h3 className="text-lg font-semibold">{s.name}</h3>

            {/* Story */}
            <p className="text-white/60 mt-2 text-sm leading-relaxed">
              "{s.story}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}