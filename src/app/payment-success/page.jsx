"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const createOrder = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-order-from-session/${sessionId}`
        );

        const data = await res.json();

        if (data.success) {
          setTimeout(() => {
            router.push("/dashboard/buyer/orders");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    };

    createOrder();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#760031] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-10 text-center">
        <h1 className="text-4xl font-bold text-[#760031]">
          Payment Successful 🎉
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your purchase.
        </p>
      </div>
    </div>
  );
}