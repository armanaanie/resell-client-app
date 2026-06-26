import { getOrderById } from "@/lib/api/orders";
import { notFound } from "next/navigation";
import { Card, Chip, Button } from "@heroui/react";
import Link from "next/link";
import SellerOrderActions from "@/components/SellerOrderActions";

export default async function SellerOrderDetailsPage({
  params,
}) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  const statusColor =
    order.status === "pending"
      ? "warning"
      : order.status === "accepted"
      ? "success"
      : order.status === "shipped"
      ? "primary"
      : order.status === "delivered"
      ? "secondary"
      : "danger";

  return (
    <div className="min-h-screen bg-[#760031] p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-3xl md:text-5xl"
              style={{
                fontFamily:
                  "'DM Serif Display', serif",
              }}
            >
              Order Details
            </h1>

            <p className="text-white/70 mt-2">
              Manage and review customer
              orders.
            </p>
          </div>

          <Link href="/dashboard/seller/orders">
            <Button
              className="bg-[#8d0c41] text-white"
              radius="full"
            >
              Back To Orders
            </Button>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Product Card */}
          <Card className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                Product Information
              </h2>

              <img
                src={order.productImage}
                alt={order.productTitle}
                className="w-full h-72 object-cover rounded-3xl"
              />

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-white/60 text-sm">
                    Product Name
                  </p>

                  <p className="text-xl font-semibold">
                    {order.productTitle}
                  </p>
                </div>

                <div>
                  <p className="text-white/60 text-sm">
                    Price
                  </p>

                  <p className="text-3xl font-bold">
                    ৳ {order.productPrice}
                  </p>
                </div>

                <div>
                  <p className="text-white/60 text-sm">
                    Product ID
                  </p>

                  <p className="break-all text-sm">
                    {order.productId}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Buyer & Order Info */}
          <Card className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl">
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold">
                Buyer Information
              </h2>

              <div>
                <p className="text-white/60 text-sm">
                  Buyer Name
                </p>

                <p className="text-lg font-medium">
                  {order.buyerName}
                </p>
              </div>

              <div>
                <p className="text-white/60 text-sm">
                  Phone Number
                </p>

                <p>{order.phone}</p>
              </div>

              <div>
                <p className="text-white/60 text-sm">
                  Delivery Address
                </p>

                <p>{order.address}</p>
              </div>

              <div className="h-px bg-white/10" />

              <h2 className="text-2xl font-bold">
                Order Information
              </h2>

              <div>
                <p className="text-white/60 text-sm">
                  Payment Status
                </p>

                <Chip
                  color="success"
                  variant="flat"
                >
                  {order.paymentStatus}
                </Chip>
              </div>

              <div>
                <p className="text-white/60 text-sm">
                  Order Status
                </p>

                <Chip
                  color={statusColor}
                  variant="flat"
                >
                  {order.status}
                </Chip>
              </div>

              <div>
                <p className="text-white/60 text-sm">
                  Order Date
                </p>

                <p>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <Card className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              Order Actions
            </h2>

       <SellerOrderActions
  order={order}
/>
          </div>
        </Card>
      </div>
    </div>
  );
}