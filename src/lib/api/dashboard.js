const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSellerDashboardStats =
  async (sellerId) => {
    const res = await fetch(
      `${baseUrl}/api/seller/dashboard/${sellerId}`,
      {
        cache: "no-store",
      }
    );

    return res.json();
  };