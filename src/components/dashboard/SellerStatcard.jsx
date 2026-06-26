import { Card } from "@heroui/react";
import { getSellerDashboardStats } from "@/lib/api/dashboard";

export default async function SellerStatcards({
  sellerId,
}) {
  const stats =
    await getSellerDashboardStats(
      sellerId
    );

  const cards = [
    {
      title: "Total Products",
      description:
        "Products listed by you",
      value: stats.totalProducts,
    },
    {
      title: "Total Sales",
      description:
        "Completed sales",
      value: stats.totalSales,
    },
    {
      title: "Total Revenue",
      description:
        "Earnings from orders",
      value: `৳${stats.totalRevenue}`,
    },
    {
      title: "Pending Orders",
      description:
        "Waiting for action",
      value: stats.pendingOrders,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((item) => (
        <Card
          key={item.title}
          className="bg-[#760031] text-white border border-white/10"
        >
          <Card.Header>
            <Card.Title>
              {item.title}
            </Card.Title>

            <Card.Description>
              {item.description}
            </Card.Description>
          </Card.Header>

          <Card.Content>
            <p className="text-3xl font-bold text-[#FEEC41]">
              {item.value}
            </p>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}