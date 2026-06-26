import { getAllCategories2 } from "@/lib/actions/category";
import Link from "next/link";



export default async function CategoriesPage() {
  const categories = await getAllCategories2();

  return (
<div><h2 className="text-5xl font-bold text-center"
          style={{ fontFamily: "'DM Serif Display', serif" }}>All Categories</h2><div className=" flex justify-end m-3"><Link href="/categories">See all categories...</Link></div><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories?.map((category) => (
  <Link
    key={category.name}
    href={`/categories/${category.name}`}
    className="p-4 rounded-2xl bg-white/5 hover:bg-[#D51C39] transition"
  >
    <div className="text-white font-bold">
      {category.name}
    </div>

    <div className="text-white/60 text-sm">
      {category.count} products
    </div>
  </Link>
))}
        </div>
      

</div>


  );
}