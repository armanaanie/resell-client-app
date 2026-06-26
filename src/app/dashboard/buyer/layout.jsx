import { requireRole } from "@/lib/requireRole";

export default async function BuyerLayout({
  children,
}) {
  await requireRole("buyer");

  return children;
}