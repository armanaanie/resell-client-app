const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL;

export const addWishlist = async (
  data
) => {
  const res = await fetch(
    `${baseUrl}/api/wishlist`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};

export const getWishlist = async (
  buyerId
) => {
  const res = await fetch(
    `${baseUrl}/api/wishlist?buyerId=${buyerId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

export const removeWishlist =
  async (id) => {
    const res = await fetch(
      `${baseUrl}/api/wishlist/${id}`,
      {
        method: "DELETE",
      }
    );

    return res.json();
  };