import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { getBuyerOrders } from "@/lib/api/orders";
import { getWishlist } from "@/lib/api/wishlist";
import Link from "next/link";

export default async function BuyerProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        User not found
      </div>
    );
  }

  const user = session.user;

  // Replace these with your actual API calls
 const orders = await getBuyerOrders(user.id);
const wishlist = await getWishlist(user.id);

  const totalOrders = orders.length;

const paidPayments = orders.filter(
  (order) => order.paymentStatus === "paid"
).length;

const wishlistCount = wishlist.length;

const totalSpent = orders.reduce(
  (sum, order) => sum + (order.productPrice || 0),
  0
);

  return (
    <div className="min-h-screen bg-[#760031] p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Profile Header */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/10
            backdrop-blur-xl
            p-6
          "
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src={user.image || "/avatar.png"}
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-white/20 object-cover"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">
                {user.name}
              </h1>

              <p className="text-white/70 mt-2">
                {user.email}
              </p>

              <p className="text-white/50 text-sm mt-1">
                Buyer Account
              </p>
            </div>

            <Link href="/dashboard/buyer/profile/edit">
  <Button
    className="
      bg-white/20
      text-white
      backdrop-blur-md
      hover:bg-white/30
    "
  >
    Edit Profile
  </Button>
</Link>
          </div>
        </div>

        {/* Stats */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    {
      title: "Orders",
      value: totalOrders,
      icon: "📦",
    },
    {
      title: "Payments",
      value: paidPayments,
      icon: "💳",
    },
    {
      title: "Wishlist",
      value: wishlistCount,
      icon: "❤️",
    },
    {
      title: "Total Spent",
      value: `৳${totalSpent.toLocaleString()}`,
      icon: "💰",
    },
  ].map((item) => (
    <div
      key={item.title}
      className="
        rounded-3xl
        border border-white/10
        bg-white/10
        backdrop-blur-xl
        p-5
        text-center
        hover:scale-[1.02]
        transition-all
        flex flex-col items-center justify-center
        min-h-[150px]
      "
    >
      <span className="text-4xl mb-3">
        {item.icon}
      </span>

      <p className="text-white/60 text-sm">
        {item.title}
      </p>

      <h3 className="text-3xl font-bold text-white mt-2">
        {item.value}
      </h3>
    </div>
  ))}
</div>

        {/* Personal Information */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/10
            backdrop-blur-xl
            p-6
          "
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem
              label="Full Name"
              value={user.name}
            />

            <InfoItem
              label="Email"
              value={user.email}
            />

            <InfoItem
              label="Role"
              value={user.role}
            />

            <InfoItem
              label="User ID"
              value={user.id}
            />
          </div>
        </div>

        {/* Recent Orders */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/10
            backdrop-blur-xl
            p-6
          "
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Recent Activity
          </h2>

          {orders.length === 0 ? (
            <p className="text-white/60">
              No recent activity found.
            </p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="
                    p-4
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                  "
                >
                  <p className="text-white">
                    Purchased {order.productTitle}
                  </p>

                  <p className="text-white/50 text-sm mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-white/50 text-sm">
        {label}
      </p>

      <p className="text-white mt-1 break-all">
        {value || "Not provided"}
      </p>
    </div>
  );
}