import ReportProductButton from "@/components/ReportProductButton";
import { getProductById } from "@/lib/actions/product";
import { Card, Button, CloseButton } from "@heroui/react";
import Link from "next/link";
export default async function ProductDetailsPage({ params }) {
  const { id } = await params; // ✅ required in your setup

  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#760031] flex items-center justify-center p-6">

      <Card className="w-full max-w-5xl items-stretch md:flex-row bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

        {/* IMAGE SECTION */}
        <div className="relative h-[280px] md:h-auto md:w-[320px] w-full shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 h-full w-full object-cover scale-110"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#760031]/70 via-transparent to-transparent" />

          {/* badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#FEEC41] text-[#760031]">
              {product.condition}
            </span>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-1 flex-col gap-4 p-6">

          <Card.Header className="relative gap-2">
            <Card.Title className="text-3xl font-bold text-white pr-10">
              {product.title}
            </Card.Title>

            <Card.Description className="text-white/60">
              {product.category}
            </Card.Description>

            <CloseButton
              aria-label="close"
              className="absolute top-0 right-0 text-white/60 hover:text-white"
            />
          </Card.Header>

          {/* DESCRIPTION */}
          <p className="text-white/70 leading-relaxed">
            {product.description}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-4 mt-2">

            <div className="bg-white/10 rounded-2xl p-3">
              <p className="text-xs text-white/50">Price</p>
              <p className="text-2xl font-bold text-[#FEEC41]">
                ৳ {product.price}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-3">
              <p className="text-xs text-white/50">Stock</p>
              <p className="text-xl font-semibold text-white">
                {product.stock}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-3 col-span-2">
              <p className="text-xs text-white/50">Seller</p>
              <p className="text-white font-medium">
                {product.sellerName}
              </p>
            </div>

          </div>

          {/* FOOTER */}
          <Card.Footer className="mt-auto flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

            <div>
              <p className="text-xs text-white/50">Availability</p>
              <p className="text-sm font-medium text-white">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>



<div className="flex gap-3">
  <ReportProductButton
    product={product}
  />

  <Link
    href={`/Products/${product._id}/buy`}
    className="
      bg-[#D51C39]
      text-white
      px-6 py-3
      rounded-xl
      font-semibold
      inline-block
      text-center
      hover:scale-105
      transition
    "
  >
    Buy Now
  </Link>
</div>
          </Card.Footer>

        </div>

      </Card>
    </div>
  );
}