"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateOrderStatus, deleteOrder } from "@/lib/api/orders";

export default function OrdersTable({ orders }) {
  const router = useRouter();

  const handleStatus = async (id, status) => {
    const res = await updateOrderStatus(id, status);
console.log(status)
    if (res.modifiedCount > 0) {
      toast.success(`Order ${status}`);
      router.refresh();
    } else {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteOrder(id);

    if (res.deletedCount > 0) {
      toast.success("Order deleted");
      router.refresh();
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Buyer</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((o) => (
            <tr key={o._id} className="border-b border-white/10">
              <td className="p-3">{o.productTitle}</td>
              <td className="p-3">{o.buyerName}</td>
              <td className="p-3">${o.price}</td>
              <td className="p-3">{o.status}</td>

              <td className="p-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => handleStatus(o._id, "accepted")}
                  className="px-2 py-1 bg-green-500 text-black rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleStatus(o._id, "processing")}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Process
                </button>

                <button
                  onClick={() => handleStatus(o._id, "shipped")}
                  className="px-2 py-1 bg-yellow-500 text-black rounded"
                >
                  Ship
                </button>

                <button
                  onClick={() => handleStatus(o._id, "delivered")}
                  className="px-2 py-1 bg-purple-500 text-white rounded"
                >
                  Deliver
                </button>

                <button
                  onClick={() => handleDelete(o._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}