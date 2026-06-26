import BuyClient from "@/components/BuyClient";
import { getProductById } from "@/lib/actions/product";

export default async function BuyPage({ params }) {
  console.log("PARAMS:", params);

  const { id } = await params; // for your Next.js version

  const product = await getProductById(id);

  return <BuyClient product={product} />;
}