import { getAdminStats } from "@/lib/actions/admin";
import { auth } from "@/lib/auth";
import { requireRole } from "@/lib/requireRole";
import { getTokenForServer } from "@/lib/useToken";
import { headers } from "next/headers";

export default async function AdminDashboard() {
    await requireRole('admin');
   const token=await getTokenForServer()
    console.log("token",token)
  const stats = await getAdminStats(token);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: "📦",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: "🛒",
    },
    {
      title: "Revenue",
      value: `৳${(
        stats.totalRevenue / 100
      ).toLocaleString()}`,
      icon: "💰",
    },
  ];

  return (
    <div className="min-h-screen bg-[#760031] p-6">
      <h1 className="text-4xl font-bold text-white mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              bg-white/10
              backdrop-blur-xl
              border border-white/10
              rounded-3xl
              p-6
              text-center
            "
          >
            <div className="text-5xl mb-4">
              {card.icon}
            </div>

            <h3 className="text-white/60">
              {card.title}
            </h3>

            <p className="text-3xl font-bold text-white mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}