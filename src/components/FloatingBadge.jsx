"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.7,
        },
      }}
      className="absolute top-6 left-2"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg flex items-center gap-2 text-xs border border-white/20">
        <div className="w-7 h-7 rounded-full bg-[#D51C39] flex items-center justify-center">
          <Shield size={14} className="text-white" />
        </div>

        <div>
          <p className="font-semibold">Verified Seller</p>
          <p className="text-white/70">92K+ trusted members</p>
        </div>
      </div>
    </motion.div>
  );
}