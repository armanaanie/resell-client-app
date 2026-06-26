"use client";

import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { addWishlist } from "@/lib/api/wishlist";
import { useState } from "react";

export default function WishlistButton({
  product,
}) {
  const { data: session } =
    authClient.useSession();
    
const [wishlisted, setWishlisted] =
  useState(false);
  const handleWishlist =
    async () => {
        
      if (!session?.user) {
        toast.error(
          "Please login first"
        );
        return;
      }

      const res =
        await addWishlist({
          productId: product._id,
          buyerId:
            session.user.id,
             title: product.title,
  image: product.image,
  price: product.price,
  condition: product.condition,
        });

      if (res.insertedId) {
         setWishlisted(true);
        toast.success(
          "Added to wishlist"
        );
      } else {
        toast.info(
          "Already wishlisted"
        );
      }
    };

  return (
    <button
  onClick={handleWishlist}
  className="
    h-10
    w-10
    rounded-full
    bg-black/60
    backdrop-blur-md
    flex
    items-center
    justify-center
    border
    border-white/20
    hover:scale-110
    transition-all
    duration-300
  "
>
 <Heart
  size={18}
  className={
    wishlisted
      ? "fill-red-500 text-red-500"
      : "text-white"
  }
/>
</button>
  );
}