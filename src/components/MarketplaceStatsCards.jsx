"use client";

import { motion } from "motion/react";

export default function MarketplaceStatsCards({ stats }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          whileHover={{
            scale: 1.05,
          }}
          className="
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-8
            text-center
            shadow-xl
          "
        >
          <h3 className="text-4xl font-bold text-[#FEEC41]">
            {item.value}
          </h3>

          <p className="mt-3 text-white/70 text-sm uppercase tracking-wide">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}