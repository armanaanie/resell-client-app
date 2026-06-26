"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AllOrder({
  orders,
}) {
    console.log(orders);
  const router = useRouter();

  const statusColors = {
    pending:
      "bg-yellow-500/20 text-yellow-300",

    processing:
      "bg-blue-500/20 text-blue-300",

    shipped:
      "bg-purple-500/20 text-purple-300",

    delivered:
      "bg-green-500/20 text-green-300",

    disputed:
      "bg-red-500/20 text-red-300",

    cancelled:
      "bg-gray-500/20 text-gray-300",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          All Orders
        </h1>

        <p className="text-white/60 mt-2">
          Monitor and manage all platform orders
        </p>
      </div>

      {/* Table */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-5 text-left">
                  Product
                </th>

                <th className="p-5 text-left">
                  Buyer
                </th>

                <th className="p-5 text-left">
                  Seller
                </th>

                <th className="p-5 text-left">
                  Amount
                </th>

                <th className="p-5 text-left">
                  Payment
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

                <th className="p-5 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order) => (
                
                <tr
                  key={order._id}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                    transition
                  "
                >
                  {/* Product */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <Image
                        src={order.productImage}
                        alt={order.productTitle}
                        width={60}
                        height={60}
                        className="
                          rounded-xl
                          object-cover
                        "
                      />

                      <div>
                        <h3 className="font-semibold">
                          {order.productTitle}
                        </h3>

                        
                      </div>
                    </div>
                  </td>

                  {/* Buyer */}
                  <td className="p-5">
                    <div>
                      <p>
                        {order.buyerName}
                      </p>

                      <p className="text-xs text-white/50">
                        {order.buyerEmail}
                      </p>
                    </div>
                  </td>

                  {/* Seller */}
                  <td className="p-5 text-white/70">
                    {order.sellerName}
                  </td>

                  {/* Amount */}
                  <td className="p-5">
                    <span className="font-semibold text-[#FEEC41]">
                      ৳
                      {order.totalPrice}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="p-5">
                    <span
                      className={`
                        px-3 py-1
                        rounded-full
                        text-xs
                        ${
                          order.paymentStatus ===
                          "paid"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }
                      `}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

<td className="p-5">
  {/* Order Status */}
  <div className="mb-2">
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        statusColors[order.orderStatus] ||
        "bg-white/10 text-white/60"
      }`}
    >
      {order.orderStatus || "pending"}
    </span>
  </div>

  {/* Dispute Status */}
  {order.dispute?.isDisputed ? (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        order.dispute.status === "resolved"
          ? "bg-green-500/20 text-green-300"
          : "bg-red-500/20 text-red-300"
      }`}
    >
      {order.dispute.status === "resolved"
        ? "DISPUTE RESOLVED"
        : "DISPUTED"}
    </span>
  ) : (
    <span className="text-white/30 text-xs">
      no dispute
    </span>
  )}
</td>                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex gap-2">
                      <button
  onClick={() => {
    console.log(
      "Going to:",
      `/Products/${order.productId}`
    );

    router.push(
      `/Products/${order.productId}`
    );
  }}
>
  <Eye size={18} />
</button>
                    </div>
                  </td>
                </tr>
              ))}

              {!orders?.length && (
                <tr>
                  <td
                    colSpan="7"
                    className="
                      p-10
                      text-center
                      text-white/60
                    "
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}