
import { getMarketplaceStats } from "@/lib/actions/getMarketplaceStats";
import MarketplaceStatsCards from "./MarketplaceStatsCards";


export default async function MarketplaceStats() {
  const statsData = await getMarketplaceStats();

  const stats = [
    {
      label: "Total Products",
      value: statsData.totalProducts,
    },
    {
      label: "Total Sellers",
      value: statsData.totalSellers,
    },
    {
      label: "Total Buyers",
      value: statsData.totalBuyers,
    },
    {
      label: "Completed Orders",
      value: statsData.completedOrders,
    },
  ];

  return (
    <section>
      <h2
          className="text-5xl lg:my-20 my-10  text-center font-bold"
          style={{
            fontFamily:
              "'DM Serif Display', serif",
          }}
        >
          Marketplace Statistics
        </h2>
      <MarketplaceStatsCards stats={stats} />
    </section>
  );
}