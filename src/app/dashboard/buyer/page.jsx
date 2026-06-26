import { getBuyerOrders } from "@/lib/api/orders";

import { requireRole } from "@/lib/requireRole";


export default async function BuyerDashboard() {
    await requireRole("buyer")
    
  const user = await requireRole("buyer");

const orders = await getBuyerOrders(user.id);

const totalOrders = orders.length;

const recentPurchases = orders.slice(0, 3);

const wishlistCount = 0; 
  return (
    <div className="min-h-screen bg-[#760031] p-6 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Buyer Dashboard
        </h1>
        <p className="text-white/60 mt-2">
          Overview of your shopping activity
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Orders */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition">
          <p className="text-white/60">Total Orders</p>
          <h2 className="text-4xl font-bold text-[#FEEC41]">
            {totalOrders}
          </h2>
        </div>

        {/* Wishlist */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition">
          <p className="text-white/60">Wishlist Items</p>
          <h2 className="text-4xl font-bold text-[#FEEC41]">
            {wishlistCount}
          </h2>
        </div>

        {/* Recent Purchases */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 col-span-1 md:col-span-1">
          <p className="text-white/60 mb-4">Recent Purchases</p>

          <div className="space-y-3">
  {recentPurchases.length > 0 ? (
    recentPurchases.map((order) => (
      <div
        key={order._id}
        className="bg-white/5 rounded-xl p-3 border border-white/10"
      >
        <h3 className="font-semibold text-white">
          {order.productTitle}
        </h3>

        <p className="text-sm text-white/60">
          ৳ {order.productPrice}
        </p>

        <span
          className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
            order.status === "pending"
              ? "bg-yellow-500/20 text-yellow-300"
              : order.status === "accepted"
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {order.status}
        </span>
      </div>
    ))
  ) : (
    <p className="text-white/50">
      No purchases yet
    </p>
  )}
</div>
        </div>

      </div>

    </div>
  );
}