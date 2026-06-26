import { getCategories } from "@/lib/api/category";
import Link from "next/link";

export default async function page() {
    const categories= await getCategories()
  return (
    <section className="py-16 bg-[#760031]">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-4xl text-center text-white mb-3"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Shop By Category
        </h2>

        <p className="text-center text-white/70 mb-10">
          Discover products from different categories
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
    </section>
  );
}