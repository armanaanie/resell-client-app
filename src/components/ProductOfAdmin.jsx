"use client";

import Image from "next/image";
import { Eye, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  approveProduct,
  rejectProduct,
  deleteProduct,
} from "@/lib/actions/admin";
import { toast } from "react-toastify";
export default function ProductOfAdmin({ products, search, status }) {
  const router = useRouter();

  const [searchText, setSearchText] = useState(search || "");
  const [statusValue, setStatusValue] = useState(status || "");

 useEffect(() => {
  const delay = setTimeout(() => {
    const params = new URLSearchParams();

    if (searchText) params.set("search", searchText);
    if (statusValue) params.set("status", statusValue);

    const query = params.toString();

    router.push(`/dashboard/admin/products?${query}`);
  }, 500);

  return () => clearTimeout(delay);
}, [searchText, statusValue, router]);
const handleApprove =
  async (id) => {
    const data =
      await approveProduct(id);

    if (data.modifiedCount) {
        toast.success("Approved!")
      router.refresh();
    }
  };
  const handleReject =
  async (id) => {
    const data =
      await rejectProduct(id);

    if (data.modifiedCount) {
        toast.error("Rejected!!")
      router.refresh();
    }
  };
  const handleDelete =
  async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    const data =
      await deleteProduct(id);

    if (data.deletedCount) {
      router.refresh();
    }
  };
  return (
    <div>
     <div className="mb-8">
  <div className="flex flex-col md:flex-row gap-4 p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
    
    {/* Search Input */}
    <div className="relative flex-1">
      <input
        type="text"
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
        placeholder="Search products..."
        className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 pl-12 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    {/* Status Filter */}
    <div className="relative min-w-[220px]">
      <select
        value={statusValue}
        onChange={(e) =>
          setStatusValue(e.target.value)
        }
        className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none transition-all"
      >
        <option value="" className="bg-[#760031]">
          All Status
        </option>

        <option
          value="pending"
          className="bg-[#760031]"
        >
          Pending
        </option>

        <option
          value="approved"
          className="bg-[#760031]"
        >
          Approved
        </option>

        <option
          value="rejected"
          className="bg-[#760031]"
        >
          Rejected
        </option>
      </select>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
</div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-5 text-gray-300">Product</th>
                <th className="p-5 text-gray-300">Category</th>
                <th className="p-5 text-gray-300">Price</th>
                <th className="p-5 text-gray-300">Stock</th>
                <th className="p-5 text-gray-300">Seller</th>
                <th className="p-5 text-gray-300">Status</th>
                <th className="p-5 text-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-white">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-400 truncate max-w-[250px]">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-gray-300">{product.category}</td>
                  <td className="p-5 text-cyan-400 font-semibold">৳{product.price}</td>
                  <td className="p-5 text-gray-300">{product.stock}</td>
                  <td className="p-5 text-gray-300">{product.sellerName}</td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : product.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {product.status || "pending"}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <button 
                      onClick={() =>
    router.push(
      `/Products/${product._id}`
    )
  } className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                        <Eye size={18} />
                      </button>
                      <button onClick={() =>
    handleApprove(product._id)
  }className="p-2 rounded-xl bg-green-500/20 text-green-400">
                        <CheckCircle size={18} />
                      </button>
                      <button  onClick={() =>
    handleReject(product._id)
  }className="p-2 rounded-xl bg-red-500/20 text-red-400">
                        <XCircle size={18} />
                      </button>
                      <button onClick={() =>
    handleDelete(product._id)
  }className="p-2 rounded-xl bg-red-600/20 text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}