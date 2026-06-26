"use client";

import { cancelOrder } from "@/lib/api/orders";

import { useRouter } from "next/navigation";
import { Button, Modal } from "@heroui/react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { getTokenForClient } from "@/lib/useTokenClient";

export default function OrderCancelModal({ order }) {
  const router = useRouter();

  const handleCancelOrder = async () => {
    try {
        const token= await getTokenForClient()
      const res = await cancelOrder(token,order._id);

      if (!res?.modifiedCount) {
        toast.error("Failed to cancel order");
        return;
      }
if (res?.modifiedCount)
 {     toast.success("Order cancelled successfully");}
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <Modal placement="center">
      <Button
        size="sm"
        color="danger"
        variant="flat"
        startContent={<XCircle size={16} />}
        isDisabled={order.status !== "pending"}
      >
        Cancel
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="bg-[#0f172a]/95 backdrop-blur-2xl border border-red-500/20 text-white">

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon />
              <Modal.Heading>
                Cancel Order
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4">

                <p className="text-gray-300">
                  Are you sure you want to cancel this order?
                </p>

                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <p className="text-sm text-red-300">
                    This action cannot be undone.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-gray-400 mb-1">
                    Product
                  </p>

                  <p className="font-medium">
                    {order.productTitle}
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-gray-400 mb-1">
                    Order ID
                  </p>

                  <p className="break-all text-sm">
                    {order._id}
                  </p>
                </div>

              </div>
            </Modal.Body>

            <Modal.Footer>

              <Button variant="light">
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
  );
}