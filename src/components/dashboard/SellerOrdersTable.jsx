"use client";

import { updateOrderStatus } from "@/lib/api/orders";
import { getTokenForClient } from "@/lib/useTokenClient";
import { Button, Chip } from "@heroui/react";
import { CheckCircle, Truck, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SellerOrdersTable({ orders }) {
  const router = useRouter();

  const handleStatusChange = async (
    orderId,
    status
  ) => {
    try {
        const token= await getTokenForClient()
      const res = await updateOrderStatus(token,
        orderId,
        status
      );

      if (!res?.modifiedCount) {
        alert("Failed to update order");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";

      case "accepted":
        return "success";

      case "shipped":
        return "success";

      case "delivered":
        return "success";

      case "cancelled":
        return "danger";

      case "rejected":
        return "danger";

      default:
        return "default";
    }
  };

  if (!orders?.length) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center text-white">
        No orders found.
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <table className="w-full text-white">
          <thead className="bg-[#8d0c41]">
            <tr>
              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Buyer
              </th>

              <th className="p-4 text-left">
                Price
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
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.productImage}
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover"
                    />

                    <div>
                      <h4 className="font-semibold">
                        {order.productTitle}
                      </h4>
<Link href={`/dashboard/seller/orders/${order._id}`}>
  <Button size="sm" variant="bordered">
    Details
  </Button>
</Link>
                      <p className="text-xs text-white/60 break-all">
                        {order.productId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div>
                    <h4 className="font-medium">
                      {order.buyerName}
                    </h4>

                    <p className="text-sm text-white/60">
                      {order.phone}
                    </p>
                  </div>
                </td>

                <td className="p-4 font-semibold">
                  ৳ {order.productPrice}
                </td>

                <td className="p-4">
                  <Chip
                    color={getStatusColor(
                      order.status
                    )}
                    variant="flat"
                  >
                    {order.status}
                  </Chip>
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {order.status ===
                      "pending" && (
                      <>
                        <Button
                          size="sm"
                          color="success"
                          startContent={
                            <CheckCircle
                              size={16}
                            />
                          }
                          onPress={() =>
                            handleStatusChange(
                              order._id,
                              "accepted"
                            )
                          }
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          startContent={
                            <XCircle
                              size={16}
                            />
                          }
                          onPress={() =>
                            handleStatusChange(
                              order._id,
                              "rejected"
                            )
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    {order.status ===
                      "accepted" && (
                      <Button
                        size="sm"
                        color="primary"
                        startContent={
                          <Truck size={16} />
                        }
                        onPress={() =>
                          handleStatusChange(
                            order._id,
                            "shipped"
                          )
                        }
                      >
                        Ship
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 text-white"
          >
            <div className="flex gap-4">
              <img
                src={order.productImage}
                alt=""
                className="w-20 h-20 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {order.productTitle}
                </h3>

                <p className="text-sm text-white/60">
                  {order.buyerName}
                </p>

                <p className="font-bold mt-2">
                  ৳ {order.productPrice}
                </p>

                <div className="mt-2">
                  <Chip
                    color={getStatusColor(
                      order.status
                    )}
                    variant="flat"
                  >
                    {order.status}
                  </Chip>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {order.status ===
                "pending" && (
                <>
                  <Button
                    size="sm"
                    color="success"
                    onPress={() =>
                      handleStatusChange(
                        order._id,
                        "accepted"
                      )
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() =>
                      handleStatusChange(
                        order._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </Button>
                </>
              )}

              {order.status ===
                "accepted" && (
                <Button
                  size="sm"
                  color="blue"
                  onPress={() =>
                    handleStatusChange(
                      order._id,
                      "shipped"
                    )
                  }
                >
                  Ship
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}