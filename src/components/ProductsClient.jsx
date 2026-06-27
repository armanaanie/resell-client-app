"use client";

import { useState, useMemo } from "react";
import WishlistButton from "@/components/WishlistButton";
import Link from "next/link";
import { Card } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ProductsClient({ products}) {
const router = useRouter();
  const [sort, setSort] = useState("");
const [search, setSearch] = useState("");
  /* ---------------- FILTER + SORT ---------------- */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // 🔍 SEARCH
    
    // 🔽 SORT
    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [products, search, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#760031] via-[#5c0026] to-[#2b0012] p-8">

     <h2
          className="text-5xl font-bold text-center "
          style={{ fontFamily: "'DM Serif Display', serif" }}>
        All Products
      </h2>

      {/* 🔍 SEARCH + SORT BAR */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">

        <input
          value={search}
  onChange={(e) => {
    const value = e.target.value;
    setSearch(value);

    router.push(
      `/Products?page=1&search=${value}`
    );
  }}
          placeholder="Search by name..."
          className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
        />

        <div className="relative w-full md:w-1/4">
  
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="
      w-full
      appearance-none
      px-4
      py-3
      pr-10
      rounded-xl
      bg-white/10
      border border-white/20
      text-white
      backdrop-blur-xl
      shadow-lg
      outline-none
      transition
      hover:bg-white/15
      focus:border-pink-400
      focus:ring-2
      focus:ring-pink-500/30
      cursor-pointer
    "
  >
    <option value="" >
      Sort by price
    </option>
    <option value="low" className="bg-[#760031]">
      Price: Low → High
    </option>
    <option value="high" className="bg-[#760031]">
      Price: High → Low
    </option>
  </select>

  {/* Custom Arrow */}
  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>

</div>
      </div>

      {/* 🛍 PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute top-3 right-3 z-20">
                <WishlistButton product={product} />
              </div>

              <div className="absolute bottom-3 left-3 z-20">
                <span className="rounded-full bg-[#FEEC41] px-3 py-1 text-xs font-bold text-[#760031]">
                  {product.condition}
                </span>
              </div>
            </div>

            {/* TITLE */}
            <Card.Header className="flex flex-col items-start gap-2 pb-2">
              <Card.Title className="text-white text-xl font-semibold line-clamp-1">
                {product.title}
              </Card.Title>

              <Card.Description className="text-white/60">
                {product.category}
              </Card.Description>
            </Card.Header>

            {/* PRICE + STOCK */}
            <Card.Content>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50">Price</p>
                  <h3 className="text-3xl font-bold text-[#FEEC41]">
                    ৳{product.price}
                  </h3>
                </div>

                <div className="rounded-2xl bg-white/10 px-3 py-2 text-center">
                  <p className="text-xs text-white/50">Stock</p>
                  <p className="font-semibold text-white">{product.stock}</p>
                </div>
              </div>
            </Card.Content>

            {/* BUTTON */}
            <Card.Footer className="pt-4">
              <Link href={`/Products/${product._id}`}>
                <button className="w-full rounded-2xl bg-[#D51C39] p-2 text-white">
                  View Details
                </button>
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-white/60 mt-10">
          No products found
        </p>
      )}
    </div>
  );
}