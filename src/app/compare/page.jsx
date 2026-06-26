"use client";

import { getProducts } from "@/lib/api/product";
import { useEffect, useState } from "react";

export default function ComparePage() {
const [products, setProducts] = useState([]);
const [selected, setSelected] = useState([]);

useEffect(() => {
getProducts().then(setProducts);


const saved = localStorage.getItem("compareList");

if (saved) {
  setSelected(JSON.parse(saved));
}


}, []);

useEffect(() => {
localStorage.setItem(
"compareList",
JSON.stringify(selected)
);
}, [selected]);

const toggleSelect = (product) => {
if (selected.find((p) => p._id === product._id)) {
setSelected(
selected.filter((p) => p._id !== product._id)
);
} else {
if (selected.length < 3) {
setSelected([...selected, product]);
}
}
};

const getConditionScore = (condition) => {
switch (condition?.toLowerCase()) {
case "like-new":
return 100;
case "used":
return 70;
default:
return 50;
}
};

const getScore = (product) => {
return (
getConditionScore(product.condition) +
product.stock * 2 -
product.price / 1000
);
};

const bestPriceId =
selected.length > 0
? selected.reduce((min, p) =>
p.price < min.price ? p : min
)._id
: null;

const recommendedId =
selected.length > 0
? selected.reduce((best, p) =>
getScore(p) > getScore(best) ? p : best
)._id
: null;

return ( <div className="min-h-screen bg-gradient-to-br from-[#760031] via-[#4a001f] to-[#1a000b] text-white p-8">


  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        Compare Products
      </h1>

      <p className="text-white/60 mt-2">
        Select up to 3 products to compare side-by-side.
      </p>
    </div>

    {/* Clear Button */}
    {selected.length > 0 && (
      <button
        onClick={() => {
          setSelected([]);
          localStorage.removeItem("compareList");
        }}
        className="mb-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
      >
        Clear Comparison
      </button>
    )}

    {/* Product Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => toggleSelect(product)}
          className={`cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            selected.find((p) => p._id === product._id)
              ? "border-[#FEEC41] bg-white/10"
              : "border-white/10 bg-white/5"
          }`}
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-56 w-full object-cover"
          />

          <div className="p-4">
            <h2 className="font-semibold text-lg line-clamp-1">
              {product.title}
            </h2>

            <p className="text-white/60 text-sm">
              {product.category}
            </p>

            <p className="mt-2 text-[#FEEC41] text-2xl font-bold">
              ৳{product.price}
            </p>

            <div className="mt-3 flex justify-between text-sm text-white/70">
              <span>{product.condition}</span>
              <span>Stock: {product.stock}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Comparison Table */}
    {selected.length > 0 && (
      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-white/10">
              <th className="p-4 text-left">
                Feature
              </th>

              {selected.map((p) => (
                <th
                  key={p._id}
                  className="p-4 text-left min-w-[220px]"
                >
                  {p.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {/* Price */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Price
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">

                  <div className="flex flex-col gap-2">

                    <span className="text-[#FEEC41] font-bold text-lg">
                      ৳{p.price}
                    </span>

                    {p._id === bestPriceId && (
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded w-fit">
                        🏆 Best Price
                      </span>
                    )}

                  </div>

                </td>
              ))}
            </tr>

            {/* Condition */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Condition
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">
                  {p.condition}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Category
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">
                  {p.category}
                </td>
              ))}
            </tr>

            {/* Seller */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Seller
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">
                  {p.sellerName}
                </td>
              ))}
            </tr>

            {/* Seller Rating */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Seller Rating
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">
                  ⭐ {p.sellerRating || 4.5}
                </td>
              ))}
            </tr>

            {/* Stock */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Stock
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">
                  {p.stock}
                </td>
              ))}
            </tr>

            {/* Score */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Comparison Score
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">

                  <div className="flex flex-col gap-2">

                    <span>
                      ⭐ {getScore(p).toFixed(1)}
                    </span>

                    {p._id === recommendedId && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded w-fit">
                        Recommended
                      </span>
                    )}

                  </div>

                </td>
              ))}
            </tr>

            {/* Price Chart */}
            <tr className="border-t border-white/10">
              <td className="p-4 font-semibold">
                Price Chart
              </td>

              {selected.map((p) => (
                <td key={p._id} className="p-4">

                  <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-[#FEEC41]"
                      style={{
                        width: `${
                          (p.price /
                            Math.max(
                              ...selected.map(
                                (item) => item.price
                              )
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                </td>
              ))}
            </tr>

          </tbody>

        </table>

      </div>
    )}

  </div>
</div>

);
}
