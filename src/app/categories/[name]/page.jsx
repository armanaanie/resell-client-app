import { getProductsByCategory } from "@/lib/api/category";


export default async function CategoryPage({ params }) {
   const { name } = await params;

  const products = await getProductsByCategory(name);

  return (
    <div className="min-h-screen bg-[#760031] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        {params.name} Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((p) => (
          <div
            key={p._id}
            className="p-4 rounded-2xl bg-white/10 border border-white/10"
          >
            <img
              src={p.image}
              className="w-full h-40 object-cover rounded-xl"
            />

            <h2 className="mt-3 font-semibold">{p.title}</h2>

            <p className="text-white/70">৳ {p.price}</p>

            <p className="text-sm text-white/50">
              {p.condition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}