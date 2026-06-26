"use client";

import { Button } from "@heroui/react";
import {  updateOrderStatusforBuyer } from "@/lib/api/orders";
import { useRouter } from "next/navigation";
import { getTokenForClient } from "@/lib/useTokenClient";

export default function BuyerOrderActions({
  order,
}) {
  const router = useRouter();

  const handleConfirmDelivery =
    async () => {
const token= await getTokenForClient()
      const res =

        await updateOrderStatusforBuyer(token,
          order._id,
          "delivered"
        );

      if (
        !res?.modifiedCount
      ) {
        alert(
          "Failed to update order"
        );
        return;
      }

      router.refresh();
    };

  return (
    <>
      {order.status ===
        "shipped" && (
        <Button
          color="success"
          size="lg"
          onPress={
            handleConfirmDelivery
          }
        >
          Confirm Delivery
        </Button>
      )}
    </>
  );
}