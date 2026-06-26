import AllOrder from "@/components/dashboard/AllOrder";

import { getAllOrders } from "@/lib/actions/orders";
import { auth } from "@/lib/auth";
import { getTokenForServer } from "@/lib/useToken";
import { headers } from "next/headers";

export default async function OrdersPage() {
     const token= await getTokenForServer()
  const orders =
    await getAllOrders(token);

  return (
    <AllOrder
      orders={orders}
    />
  );
}