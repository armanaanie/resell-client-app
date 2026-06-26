"use client";

import { deleteProduct, updateProduct } from "@/lib/actions/product";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getTokenForClient } from "@/lib/useTokenClient";

export default function MyProductsTable({ products }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    const token = await getTokenForClient()
    const res = await deleteProduct(id,token);

    if (res.deletedCount > 0) {
      toast.success("Product deleted");
      router.refresh();
    } else {
      toast.error("Delete failed");
    }
  };
   const handleEdit = async (p) => {
  const title = prompt("Enter new title", p.title);
  const price = prompt("Enter new price", p.price);
  const stock = prompt("Enter new stock", p.stock);
  const token = await getTokenForClient()
  const res = await updateProduct(token,p._id, {
    title,
    price: Number(price),
    stock: Number(stock),
  });

  if (res.modifiedCount > 0) {
    toast.success("Product updated successfully");
    router.refresh();
  } else {
    toast.error("Nothing updated");
  }
};

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Price</th>
            <th className="text-left p-3">Stock</th>
            <th className="text-left p-3">Category</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((p) => (
            <tr key={p._id} className="border-b border-white/10">
              <td className="p-3">{p.title}</td>
              <td className="p-3">${p.price}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">{p.category}</td>

              <td className="p-3 flex gap-3">
                <button
  onClick={() => handleEdit(p)}
  className="px-3 py-1 bg-yellow-500 text-black rounded"
>
  Edit
</button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}