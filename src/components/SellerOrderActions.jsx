"use client";

import { updateOrderStatus } from "@/lib/api/orders";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SellerOrderActions({
  order,
}) {
  const router = useRouter();

  const handleStatusChange = async (
    status
  ) => {
    try {
      const res =
        await updateOrderStatus(
          order._id,
          status
        );

      if (!res?.modifiedCount) {
        toast.error(
          "Failed to update order"
        );
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong"
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {order.status === "pending" && (
        <>
          <Button
            color="success"
            size="lg"
            onPress={() =>
              handleStatusChange(
                "accepted"
              )
            }
          >
            Accept Order
          </Button>

          <Button
            color="danger"
            variant="flat"
            size="lg"
            onPress={() =>
              handleStatusChange(
                "rejected"
              )
            }
          >
            Reject Order
          </Button>
        </>
      )}

      {order.status === "accepted" && (
        <Button
          color="primary"
          size="lg"
          onPress={() =>
            handleStatusChange(
              "shipped"
            )
          }
        >
          Mark As Shipped
        </Button>
      )}

      {order.status === "shipped" && (
        <Button
          isDisabled
          size="lg"
        >
          Waiting For Buyer
        </Button>
      )}

      {order.status ===
        "delivered" && (
        <Button
          color="success"
          isDisabled
          size="lg"
        >
          Delivered
        </Button>
      )}

      {order.status ===
        "cancelled" && (
        <Button
          color="danger"
          isDisabled
          size="lg"
        >
          Cancelled
        </Button>
      )}

      {order.status ===
        "rejected" && (
        <Button
          color="danger"
          isDisabled
          size="lg"
        >
          Rejected
        </Button>
      )}
    </div>
  );
}