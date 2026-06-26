"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { removeWishlist } from "@/lib/api/wishlist";
import { toast } from "react-toastify";

export default function WishlistGrid({
  wishlist,
}) {
    const router = useRouter();
    const handleRemove = async (id) => {
  try {
    const res =
      await removeWishlist(id);

    if (res.deletedCount) {
      toast.success(
        "Removed from wishlist"
      );

      router.refresh();
    }
  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to remove wishlist item"
    );
  }
};
  if (!wishlist?.length) {
    return (
      <div className="rounded-3xl bg-white/10 p-10 text-center">
        <h2 className="text-2xl font-bold">
          ❤️ Wishlist Empty
        </h2>

        <p className="text-white/60 mt-3">
          Save products you love and
          they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
      {wishlist.map((item) => (
        <Card
          key={item._id}
          className="
            bg-white/5
            border
            border-white/10
            backdrop-blur-xl
            overflow-hidden
          "
        >
          <img
            src={item.image}
            alt={item.title}
            className="
              h-56
              w-full
              object-cover
            "
          />

          <Card.Header>
            <div>
              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-white/60 text-sm">
                {item.condition}
              </p>
            </div>
          </Card.Header>

          <Card.Content>
            <h2 className="text-2xl font-bold text-[#FEEC41]">
              ৳{item.price}
            </h2>
          </Card.Content>

          <Card.Footer>
            <div className="flex md:flex-col gap-3"> <Link
    href={`/Products/${item.productId}`}
    className="flex-1"
  >
    <button
      className="
        w-full
        rounded-xl
        bg-[#D51C39]
        p-2
        text-white
      "
    >
      View Product
    </button>
  </Link>

  <button
    onClick={() =>
      handleRemove(item._id)
    }
    className="
      rounded-xl
      bg-red-500
      px-4
      text-white
      hover:bg-red-600
      transition
    "
  >
    Remove
  </button></div>
           
           
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}