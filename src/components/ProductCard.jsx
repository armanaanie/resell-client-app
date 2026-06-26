"use client";

import { motion } from "motion/react";
import { Card } from "@heroui/react";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
      }}
    >
      <Card
        className="
          group
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-xl
          hover:border-[#FF6060]
          transition-all
          duration-500
        "
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="
              h-64
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#760031]/80 via-transparent to-transparent" />

          <div className="absolute top-4 right-4">
            <span
              className="
                rounded-full
                bg-[#FEEC41]
                px-3 py-1
                text-xs
                font-bold
                text-[#760031]
                shadow-lg
              "
            >
              {product.condition}
            </span>
          </div>
        </div>

        <Card.Header className="flex flex-col items-start gap-2 pb-2">
          <Card.Title className="text-white text-xl font-semibold line-clamp-1">
            {product.title}
          </Card.Title>

          <Card.Description className="text-white/60">
            {product.category}
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">
                Price
              </p>

              <h3 className="text-3xl font-bold text-[#FEEC41]">
                ৳{product.price}
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 px-3 py-2 text-center">
              <p className="text-xs text-white/50">
                Stock
              </p>

              <p className="font-semibold text-white">
                {product.stock}
              </p>
            </div>
          </div>
        </Card.Content>

        <Card.Footer className="pt-4">
          <Link
            href={`/Products/${product._id}`}
            className="w-full"
          >
            <button className="w-full rounded-2xl bg-[#D51C39] p-2 text-white">
              View Details
            </button>
          </Link>
        </Card.Footer>
      </Card>
    </motion.div>
  );
}