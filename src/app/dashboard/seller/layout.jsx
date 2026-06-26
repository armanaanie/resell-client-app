import { requireRole } from "@/lib/requireRole";

export default async function SellerLayout({
  children,
}) {
  await requireRole("seller");

  return children;
}