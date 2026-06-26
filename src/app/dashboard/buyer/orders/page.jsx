// src/app/dashboard/buyer/orders/page.jsx

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import BuyerOrdersTable from "@/components/dashboard/BuyerOrdersTable";
import { getBuyerOrders } from "@/lib/api/orders";
import { getTokenForServer } from "@/lib/useToken";

export default async function BuyerOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token= await getTokenForServer()

  const orders = await getBuyerOrders(
    session.user.id ,token
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl text-white mb-8">
        My Orders
      </h1>

      <BuyerOrdersTable
        orders={orders}
      />
    </div>
  );
}