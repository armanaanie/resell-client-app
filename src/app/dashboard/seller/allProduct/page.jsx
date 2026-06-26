import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProduct } from "@/lib/actions/product";
import MyProductsTable from "@/components/dashboard/MyProductsTable";
import { getCategories } from "@/lib/api/category";

export default async function Page(props) {
      const searchParams = await props.searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const categories = await getCategories();
const search = searchParams?.search || "";
const category = searchParams?.category || "";
const condition = searchParams?.condition || "";
 const products =
  (await getProduct(user.id, {
    search,
    category,
    condition,
  })) || [];

  return (
    <div className="min-h-screen bg-[#760031] p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl text-white font-bold"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          My Products
        </h1>

        <p className="text-white/60 mt-2">
          Manage, edit and track your listed products
        </p>
      </div>
<form
  action="/dashboard/seller/allProduct"
  className="
    mb-6
    grid
    md:grid-cols-3
    gap-4
  "
>
  <input
    type="text"
    name="search"
    defaultValue={search}
    placeholder="Search products..."
    className="
      p-3
      rounded-xl
      bg-white/10
      border border-white/10
      text-white
      placeholder:text-white/40
    "
  />

  <select
  name="category"
  defaultValue={category}
  className="
    p-3
    rounded-xl
    bg-white/10
    border border-white/10
    text-white
  "
>
  <option value="" >
    All Categories
  </option>

  {categories?.map((cat) => (
    <option className="bg-[#760031]"
      key={cat.name}
      value={cat.name}
    >
      {cat.name}
    </option>
  ))}
</select>

  <select
    name="condition"
    defaultValue={condition}
    className="
      p-3
      rounded-xl
      bg-white/10
      border border-white/10
      text-white
    "
  >
    <option value="">All Conditions</option>
    <option value="Used"className="bg-[#760031]">
      Used
    </option>
    <option value="Like New"className="bg-[#760031]">
      Like New
    </option>
    <option value="Refurbished"className="bg-[#760031]">
      Refurbished
    </option>
  </select>

  <button
    type="submit"
    className="
      md:col-span-3
      bg-[#D51C39]
      text-white
      py-3
      rounded-xl
      font-semibold
    "
  >
    Apply Filters
  </button>
</form>
      {/* Empty State */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-10 max-w-md">
            
            <h2 className="text-2xl font-semibold text-white">
              No Products Yet
            </h2>

            <p className="text-white/60 mt-2">
              You haven’t added any products. Start selling now.
            </p>

            <a
              href="/dashboard/seller/addProduct"
              className="
                inline-block mt-6
                bg-[#D51C39]
                hover:bg-[#FF6060]
                text-white
                px-6 py-3
                rounded-xl
                font-semibold
              "
            >
              + Add First Product
            </a>

          </div>
        </div>
      ) : (
        /* Table */
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <MyProductsTable products={products} />
        </div>
      )}

    </div>
  );
}