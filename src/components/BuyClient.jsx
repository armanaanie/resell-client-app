"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function BuyClient({ product }) { 
      const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

   try {
  setLoading(true);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
        buyerInfo: formData,
        buyerId: session?.user?.id
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  window.location.href = data.url;
} catch (error) {
  console.error(error);
  alert("Failed to initialize payment");
} finally {
  setLoading(false);
}}
  return (
    <div className="min-h-screen bg-[#760031] py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Secure Checkout
          </h1>

          <p className="text-white/70 mt-2">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* DELIVERY FORM */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Delivery Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-white mb-2">
                  Full Name
                </label>

                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    placeholder:text-white/40
                    focus:outline-none
                    focus:border-[#FEEC41]
                  "
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  Phone Number
                </label>

                <input
                  required
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+8801XXXXXXXXX"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    placeholder:text-white/40
                    focus:outline-none
                    focus:border-[#FEEC41]
                  "
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  Delivery Address
                </label>

                <textarea
                  required
                  rows={5}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete delivery address"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    placeholder:text-white/40
                    focus:outline-none
                    focus:border-[#FEEC41]
                  "
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-[#D51C39]
                  hover:bg-[#b91630]
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  transition
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Processing..."
                  : `Proceed To Payment (৳ ${product.price + 100})`}
              </button>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <div className="inline-block px-3 py-1 rounded-full bg-[#FEEC41] text-[#760031] text-xs font-bold">
                {product.condition}
              </div>

              <h3 className="text-2xl font-bold text-white mt-4">
                {product.title}
              </h3>

              <p className="text-white/60 mt-1">
                {product.category}
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-white">
                  <span>Product Price</span>
                  <span>৳ {product.price}</span>
                </div>

                <div className="flex justify-between text-white">
                  <span>Delivery Fee</span>
                  <span>৳ 100</span>
                </div>

                <hr className="border-white/10" />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">
                    Total
                  </span>

                  <span className="text-[#FEEC41]">
                    ৳ {product.price + 100}
                  </span>
                </div>
              </div>

              <div className="mt-8 bg-[#D51C39]/20 border border-[#D51C39]/30 rounded-2xl p-4">

                <p className="text-white text-sm">
                  ✓ Secure Checkout
                </p>

                <p className="text-white text-sm mt-2">
                  ✓ Buyer Protection
                </p>

                <p className="text-white text-sm mt-2">
                  ✓ Fast Delivery Support
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}