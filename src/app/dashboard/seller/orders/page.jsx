import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSellerOrders } from "@/lib/api/orders";
import SellerOrdersTable from "@/components/dashboard/SellerOrdersTable";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const orders = await getSellerOrders(session.user.id);

  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  );

  const acceptedOrders = orders.filter(
    (o) => o.status === "accepted"
  );

  const shippedOrders = orders.filter(
    (o) => o.status === "shipped"
  );

  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered"
  );

  return (
    <div className="min-h-screen bg-[#760031] p-6 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily:
                "'DM Serif Display', serif",
            }}
          >
            Manage Orders
          </h1>

          <p className="mt-2 text-white/70">
            Review and process incoming
            customer orders.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <p className="text-white/60 text-sm">
              Pending
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {pendingOrders.length}
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <p className="text-white/60 text-sm">
              Accepted
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {acceptedOrders.length}
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <p className="text-white/60 text-sm">
              Shipped
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {shippedOrders.length}
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <p className="text-white/60 text-sm">
              Delivered
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {deliveredOrders.length}
            </h3>
          </div>
        </div>

        <SellerOrdersTable orders={orders} />
      </div>
    </div>
  );
}