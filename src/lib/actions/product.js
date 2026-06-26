const baseUrl= process.env.NEXT_PUBLIC_BASE_URL;

export const getProduct = async (
  sellerId,
  searchParams = {}
) => {
  const query = new URLSearchParams();

  query.append("sellerId", sellerId);

  if (searchParams.search) {
    query.append(
      "search",
      searchParams.search
    );
  }

  if (searchParams.category) {
    query.append(
      "category",
      searchParams.category
    );
  }

  if (searchParams.condition) {
    query.append(
      "condition",
      searchParams.condition
    );
  }

  const res = await fetch(
    `${baseUrl}/api/product?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};
export const deleteProduct = async (id, token) => {
  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
export const updateProduct = async (token,id, data) => {
  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
export const getAllProducts = async (
  page = 1,
  limit = 12,
  search = "",
  category = "",
  condition = ""
) => {
  const res = await fetch(
    `${baseUrl}/api/all/product?page=${page}&limit=${limit}&search=${search}&category=${category}&condition=${condition}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};
export const getAllProducts2 = async () => {
  const res = await fetch(`${baseUrl}/api/all/product2`, {
    cache: "no-store",
  });

  return res.json();
};
export const getProductById = async (id) => {
  const res = await fetch(`${baseUrl}/api/all/product/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.product; // ✅ IMPORTANT
};