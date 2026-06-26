
import ProductOfAdmin from "@/components/ProductOfAdmin";
import { getAdminProducts } from "@/lib/actions/admin";
import { auth } from "@/lib/auth";
import { getTokenForServer } from "@/lib/useToken";
import { headers } from "next/headers";
export default async function AdminProductsPage({
  searchParams,
}) {
        const token = await getTokenForServer()
        console.log("token",token)
  const params = await searchParams;

  const search = params?.search || "";
  const status = params?.status || "";

  const products = await getAdminProducts(token,
    search,
    status
  );
console.log(products);
  return (
    <ProductOfAdmin
      products={products}
      search={search}
      status={status}
    />
  );
}