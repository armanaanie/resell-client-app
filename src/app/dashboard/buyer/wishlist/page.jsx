import { requireRole } from "@/lib/requireRole";
import { getWishlist } from "@/lib/api/wishlist";
import WishlistGrid from "@/components/dashboard/WishlistGrid";

export default async function WishlistPage() {
  const user = await requireRole("buyer");

  const wishlist = await getWishlist(user.id);

  return (
    <div className="min-h-screen bg-[#760031] text-white p-6">
      <div className="max-w-7xl mx-auto">

        <h1
          className="text-4xl mb-8"
          style={{
            fontFamily:
              "'DM Serif Display', serif",
          }}
        >
          My Wishlist
        </h1>

        <WishlistGrid
          wishlist={wishlist}
        />
      </div>
    </div>
  );
}