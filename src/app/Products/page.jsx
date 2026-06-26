import Pagination from "@/components/Pagination";
import ProductsClient from "@/components/ProductsClient";
import { getAllProducts } from "@/lib/actions/product";

export default async function ProductsPage({
  searchParams,
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
const search = params.search || "";
const category = params.category || "";
const condition = params.condition || "";
  const data = await getAllProducts(page,12, search, category, condition);

  return (<><ProductsClient
      products={data.products}
      search
    />
   <Pagination
  currentPage={page}
  totalPages={data.totalPages}
  search={search}
  category={category}
  condition={condition}
/></>
    
  );
}