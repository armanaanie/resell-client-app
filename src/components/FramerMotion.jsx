"use client"
import { motion } from "framer-motion";
const FramerMotion = () => {
    return (
         <motion.div
  className="absolute bottom-10 right-2 bg-[#FEEC41] rounded-xl px-4 py-2.5 shadow-lg text-[#760031]"
  initial={{ opacity: 0, y: 20, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
  }}
  whileHover={{ scale: 1.05 }}
>
  <p className="text-xs font-mono">Avg. savings</p>

  <p
    className="text-xl font-bold"
    style={{ fontFamily: "'DM Serif Display', serif" }}
  >
    48% off
  </p>
</motion.div>

    );
};

export default FramerMotion;