// lib/actions/stats.js

export async function getMarketplaceStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketplace-stats`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}