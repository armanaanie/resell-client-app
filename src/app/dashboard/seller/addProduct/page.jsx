"use client";


import { createProduct } from "@/lib/api/product";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/uploadImageToImgbb";
import { getTokenForClient } from "@/lib/useTokenClient";

import {  useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
  console.log("user",user)
 const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const file = formData.get("image");

  let imageUrl = "";

  try {
    if (file && file.size > 0) {
      imageUrl = await uploadImageToImgBB(file);
    }

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      condition: formData.get("condition"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      sellerId: user.id,
      sellerName: user.name,
      image: imageUrl,
      status: "pending", 

  createdAt: new Date(), 
    };
const token = await getTokenForClient()
    const res = await createProduct(payload,token);

    if (res.acknowledged || res.insertedId) {
      toast.success("Product created successfully!");
      router.push("/dashboard/seller/allProduct");
    } else {
      toast.error("Failed to create product");
    }
  } catch (error) {
    console.error(error);
    toast.error("Image upload failed");
  }
};
  return (
    <div className="min-h-screen bg-[#760031] text-white px-4 ">
      <div className="mx-auto w-full max-w-6xl rounded-[32px] border border-white/10 bg-white/10 p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Add Product
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Add a new product to your catalog with full details and pricing.
          </p>
        </div>

        <form className="grid gap-6" onSubmit={onSubmit}>
          <div className="grid gap-3">
            <label htmlFor="image" className="text-sm font-medium text-white">
              Product Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              
              className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D51C39] focus:ring-2 focus:ring-[#D51C39]/30 file:mr-4 file:rounded-full file:border-0 file:bg-white/20 file:px-4 file:py-2 file:text-sm file:text-white"
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="title" className="text-sm font-medium text-white">
              Product Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. iPhone 13 Pro"
              className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D51C39] focus:ring-2 focus:ring-[#D51C39]/30"
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="description" className="text-sm font-medium text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              placeholder="Describe your product..."
              className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D51C39] focus:ring-2 focus:ring-[#D51C39]/30"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="grid gap-3">
              <label htmlFor="category" className="text-sm font-medium text-white">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                required
                placeholder="e.g. Electronics"
                className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D51C39] focus:ring-2 focus:ring-[#D51C39]/30"
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="condition" className="text-sm font-medium text-white">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                required
                className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D51C39] focus:ring-2 focus:ring-[#D51C39]/30 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                  paddingRight: '40px'
                }}
              >
                <option value="used" className="bg-[#760031]">Used</option>
                <option value="like-new" className="bg-[#760031]">Like New</option>
                <option value="refurbished" className="bg-[#760031]">Refurbished</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="grid gap-3">
              <label htmlFor="price" className="text-sm font-medium text-white">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                placeholder="Enter price"
                className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D51C39] focus:ring-2 focus:ring-[#D51C39]/30"
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="stock" className="text-sm font-medium text-white">
                Stock Quantity
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                required
                placeholder="Available quantity"
                className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D51C39] focus:ring-2 focus:ring-[#D51C39]/30"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-[#D51C39] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#FF6060]"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
