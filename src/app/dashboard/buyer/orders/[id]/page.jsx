
import Link from "next/link";
import { getOrderById } from "@/lib/api/orders";
import { Card, Chip, Button } from "@heroui/react";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  Clock,
  XCircle,
  Eye,
} from "lucide-react";
import { notFound } from "next/navigation";
import OrderActions from "@/components/dashboard/OrderActions";
import { getTokenForServer } from "@/lib/useToken";
import BuyerOrderActions from "@/components/BuyerOrderActions";

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
const token= await getTokenForServer()
  const order = await getOrderById(id,token);
console.log("order from",order)
  if (!order) {
    notFound();
  }

  const statusColor = {
    pending: "warning",
    accepted: "success",
    cancelled: "danger",
  };

  return (
    <div className="min-h-screen bg-[#760031] text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <Link href="/dashboard/buyer/orders">
            <Button
              variant="bordered"
              className=""
              startContent={<ArrowLeft size={18} />}
            >
              View All Orders
            </Button>
          </Link>

          <Chip
            color={statusColor[order.status] || "default"}
            variant="flat"
            size="lg"
          >
            {order.status}
          </Chip>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Order Details
          </h1>
          <p className=" mt-2">
            Track your order and manage order actions.
          </p>
        </div>

        {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Order Summary */}
         <div className="md:col-span-2">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <Card.Header className="p-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Package size={20} />
                    Order Summary
                  </h2>
                  <p className="">
                    Quick overview of your order.
                  </p>
                </div>
              </Card.Header>

              <Card.Content className="px-6 pb-6">
                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="">
                      Order ID
                    </span>
                    <span className="break-all text-right">
  {order._id}
</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="">
                      Created At
                    </span>
                    <span>
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="">
                      Total Price
                    </span>
                    <span className="font-bold">
                      ৳{order.productPrice || 0}
                    </span>
                  </div>

                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Status */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <Card.Header className="p-6">
              <div>
                <h2 className="font-bold">
                  Current Status
                </h2>
              </div>
            </Card.Header>

            <Card.Content className="px-6 pb-6">
              <Chip
                color={statusColor[order.status] || "default"}
                size="lg"
              >
                {order.status}
              </Chip>
            </Card.Content>
          </Card>

          {/* Buyer Information */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <Card.Header className="p-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <User size={20} />
                    Buyer Information
                  </h2>
                </div>
              </Card.Header>

              <Card.Content className="px-6 pb-6">
                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <User size={18} />
                    <span>{order?.buyerName}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span>{order?.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span>{order?.address}</span>
                  </div>

                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Actions */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <Card.Header className="p-6">
              <h2 className="font-bold">
                Order Actions
              </h2>
            </Card.Header>

            <Card.Content className="px-6 pb-6">
                Order status: {order.status}
              <BuyerOrderActions order={order} />
            </Card.Content>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mt-8">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <Card.Header className="p-6">
              <h2 className="text-xl font-bold">
                Order Timeline
              </h2>
            </Card.Header>

            <Card.Content className="px-6 pb-8">
              <div className="flex justify-between">

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 mx-auto mb-2" />
                  <p>Pending</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-2" />
                  <p>Accepted</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-red-500 mx-auto mb-2" />
                  <p>Cancelled</p>
                </div>

              </div>
            </Card.Content>
          </Card>
        </div>

      </div>
    </div>
  );
}