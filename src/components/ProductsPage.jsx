import { getAllProducts2 } from "@/lib/actions/product";

import Link from "next/link";
import ProductCard from "./ProductCard";

export default async function ProductsPage() {
  const products = await getAllProducts2();

  return (
    <div className="pb-15">
      <h2 className="text-5xl font-bold text-center"
          style={{ fontFamily: "'DM Serif Display', serif" }}>
        Latest Products
      </h2>

      <div className="flex justify-end m-3">
        <Link href="/Products">
          See all products...
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}