import Banner from "@/components/Banner";
import CategoriesPage from "@/components/CategoryPage";
import Comparison from "@/components/Comparison";
import MarketplaceStats from "@/components/MarketplaceStats";
import ProductsPage from "@/components/ProductsPage";
import SuccessStories from "@/components/SuccessStories";
import SustainabilityImpact from "@/components/SustainabilityImpact";
import Image from "next/image";

export default function Home() {
  return (
   <><Banner/>
   <ProductsPage/>
   <CategoriesPage/>
   <SuccessStories/>
   <MarketplaceStats/>
   <Comparison/>
   <SustainabilityImpact/>
   
   </>
  );
}
