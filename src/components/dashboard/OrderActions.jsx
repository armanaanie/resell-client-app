"use client";

import { cancelOrder, updateOrderStatusforBuyer } from "@/lib/api/orders";
import { getTokenForClient } from "@/lib/useTokenClient";
import { Button, Modal } from "@heroui/react";
import { Eye, XCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function OrderActions({ order }) {
  const router = useRouter();
console.log(order)
  const handleViewDetails = () => {
    router.refresh();
  };

  const handleTrackStatus = () => {
toast(`Current Status: ${order.status}`);
  };

 const handleCancelOrder = async () => {
  const token = await getTokenForClient()
    const res = await cancelOrder(token,order._id);

    if (!res?.modifiedCount) {

      toast.error("Failed to cancel order");
      
    }

    toast.success("Order cancelled successfully");
    router.refresh();
  
};
const handleConfirmDelivery =
  async () => {
    const res =
      await updateOrderStatusforBuyer(
        order._id,
        "delivered"
      );
console.log("Update response:", res);
    if (!res?.modifiedCount) {
      alert("Failed");
      return;
    }

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        fullWidth
        color="primary"
        startContent={<Eye size={18} />}
        onPress={handleViewDetails}
      >
        View Order Details
      </Button>
{order.status === "shipped" && (
  <Button
    fullWidth
    color="success"
    onPress={
      handleConfirmDelivery
    }
  >
    Confirm Delivery
  </Button>
)}
     <Modal placement="center">
  <Button
    fullWidth
    color="danger"
    variant="flat"
    startContent={<XCircle size={18} />}
    isDisabled={order.status !== "pending"}
  >
    Cancel Order
  </Button>

  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog className="bg-white/10 backdrop-blur-2xl border border-red-500/20">
        
        <Modal.CloseTrigger />

        <Modal.Header>
          <Modal.Icon />
          <Modal.Heading>
            Cancel Order
          </Modal.Heading>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-3">
            <p className="text-gray-300">
              Are you sure you want to cancel this order?
            </p>

            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
              <p className="text-sm text-red-300">
                This action cannot be undone.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-sm text-gray-400">
                Order ID
              </p>

              <p className="font-medium break-all">
                {order._id}
              </p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="light"
          >
            Keep Order
          </Button>

          <Button
            color="danger"
            onPress={handleCancelOrder}
          >
            Yes, Cancel Order
          </Button>
        </Modal.Footer>

      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>

      <Button
        fullWidth
        variant="bordered"
        startContent={<Clock size={18} />}
        onPress={handleTrackStatus}
      >
        Track Order Status
      </Button>
    </div>
  );
}