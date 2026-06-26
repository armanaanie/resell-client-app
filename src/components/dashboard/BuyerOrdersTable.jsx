// src/components/dashboard/BuyerOrdersTable.jsx

"use client";

import { cancelOrder } from "@/lib/api/orders";
import Link from "next/link";
import OrderCancelModal from "../OrderCancelModal";

export default function BuyerOrdersTable({
  orders,
}) {
  if (!orders?.length) {
    return (
      <div className="bg-white/10 p-8 rounded-3xl text-white">
        No orders found
      </div>
    );
  }
   const handleCancelOrder = async () => {
    
      const res = await cancelOrder(order._id);
  
      if (!res?.modifiedCount) {
  
        toast.error("Failed to cancel order");
        
      }
  
      toast.success("Order cancelled successfully");
      router.refresh();
    
  };
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10">
      <table className="w-full text-white">
        <thead className="bg-[#8d0c41]">
          <tr>
            <th className="p-4 text-left">
              Product
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-left">
              Payment
            </th>

            <th className="p-4 text-left">
              Status
            </th>
            <th className="p-4 text-left">
  Actions
</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-t border-white/10"
            >
              <td className="p-4 flex items-center gap-3">
                <img
                  src={order.productImage}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover"
                />

                {order.productTitle}
              </td>

              <td className="p-4">
                ৳ {order.productPrice}
              </td>

              <td className="p-4">
                {order.paymentStatus}
              </td>

              <td className="p-4">
                {order.status}
              </td>
<td className="p-4">
  <div className="flex flex-wrap gap-2">

    <Link
      href={`/dashboard/buyer/orders/${order._id}`}
    >
      <button className="px-3 py-1 rounded-lg bg-[#8d0c41] hover:bg-[#a80f4d] transition text-sm text-white">
        Details
      </button>
    </Link>

    {order.status === "pending" && (
      <OrderCancelModal order={order} />
    )}

  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}