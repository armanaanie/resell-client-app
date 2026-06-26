import { ArrowRight, Shield, TrendingUp } from "lucide-react";

import FramerMotion from "./FramerMotion";
import Link from "next/link";
export default function Banner() {
  const STATS = [
    { value: "480K+", label: "Active Listings" },
    { value: "92K+", label: "Verified Sellers" },
    { value: "1.2M+", label: "Happy Buyers" },
    { value: "68", label: "Cities Covered" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#760031] text-white">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D51C39] rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FEEC41] rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6060] rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white mb-6">
              <TrendingUp size={14} />
              <span>68 cities · 480K+ active listings</span>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.1] mb-5"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Buy & Sell <br />
              <span className="text-[#FEEC41] italic">Pre-Loved</span> Goods <br />
              Near You
            </h1>

            {/* Description */}
            <p className="text-white/80 text-lg mb-8 max-w-md leading-relaxed">
              A trusted local marketplace where condition transparency,
              verified sellers, and community reputation make every deal feel safe.
            </p>

            {/* CTA Button */}
            <Link href="/Products"><button className="bg-[#D51C39] hover:bg-[#FF6060] transition px-6 py-3 rounded-md font-medium flex items-center gap-2">
              Start Exploring
              <ArrowRight size={16} />
            </button></Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {["Cameras", "Vintage Clothing", "Furniture", "Books"].map((t) => (
                <button
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative hidden lg:block">

            <div className="relative w-full aspect-square max-w-md mx-auto">

              <img
                src="https://i.ibb.co.com/QFQPfjmY/photo-1680362667647-c2a8c6994742-w-500-h-600-fit-crop-auto-format.jpg"
                alt="Seller"
                className="absolute top-0 right-0 w-64 h-80 object-cover rounded-2xl shadow-xl"
              />

              <img
                src="https://i.ibb.co.com/yB7wpS9k/photo-1741446440073-2b22fb6399e7-w-400-h-300-fit-crop-auto-format.jpg"
                alt="Products"
                className="absolute bottom-0 left-0 w-56 h-48 object-cover rounded-2xl shadow-xl border-4 border-white/20"
              />

              {/* Trust badge */}
              <div className="absolute top-6 left-2 bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg flex items-center gap-2 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#D51C39] flex items-center justify-center">
                  <Shield size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold">Verified Seller</p>
                  <p className="text-white/70">92K+ trusted members</p>
                </div>
              </div>

              {/* Discount card */}
          <FramerMotion/>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center"
            >
              <p
                className="text-2xl font-bold text-[#FEEC41]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-white/70 font-medium mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}