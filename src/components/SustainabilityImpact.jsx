"use client";

import { Leaf, Recycle, Droplets, TreePine, Zap } from "lucide-react";

export default function SustainabilityImpact() {
  const stats = [
    {
      icon: Recycle,
      value: "1,245 kg",
      label: "waste diverted from landfills",
    },
    {
      icon: TreePine,
      value: "86",
      label: "trees saved by reuse",
    },
    {
      icon: Droplets,
      value: "2,310 L",
      label: "water saved",
    },
    {
      icon: Zap,
      value: "670 kg",
      label: "CO₂ emissions reduced",
    },
  ];

  const points = [
    {
      title: "Less Waste",
      desc: "Keeps usable products out of landfills and extends product lifecycle.",
    },
    {
      title: "Save Resources",
      desc: "Reduces demand for raw materials and manufacturing energy.",
    },
    {
      title: "Lower Emissions",
      desc: "Cuts down pollution from production and transportation.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
           <h2
          className="text-5xl lg:my-10 my-5  text-center font-bold"
          style={{
            fontFamily:
              "'DM Serif Display', serif",
          }}>
            Sustainability{" "}
            <span className="text-green-500">Impact</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Every second-hand purchase helps reduce waste and protect the planet.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left info */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold mb-4">
              Reduce Waste. Create Impact.
            </h3>

            <p className="text-gray-400 mb-6">
              Choosing pre-owned items reduces landfill waste and decreases the need
              for new production cycles.
            </p>

            <div className="space-y-5">
              {points.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                    <Leaf size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-medium">
                Small Choices, Big Change
              </button>
            </div>
          </div>

          {/* Right stats */}
          <div className="space-y-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl flex items-center gap-4 hover:scale-[1.02] transition"
                >
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold">{s.value}</h4>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-10 text-center text-sm text-gray-500">
          🌱 Second-hand today, sustainable tomorrow.
        </div>
      </div>
    </section>
  );
}