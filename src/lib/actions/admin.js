const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminStats = async (token) => {
  const res = await fetch(
    `${baseUrl}/api/admin/stats`,
    {
      headers:{
        authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};

export const getAdminProducts = async (token,
  search = "",
  status = ""
) => {
  const query = new URLSearchParams();

  if (search) {
    query.append("search", search);
  }

  if (status) {
    query.append("status", status);
  } 
  console.log("SEARCH:", search);
console.log("STATUS:", status);

  const res = await fetch(
    `${baseUrl}/api/admin/products?${query.toString()}`,
    {
       
      headers:{
        authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};
export const approveProduct =
  async (id) => {
    const res = await fetch(
      `${baseUrl}/api/admin/products/${id}/approve`,
      {
        method: "PATCH",
      }
    );

    return res.json();
  };
  export const rejectProduct =
  async (id) => {
    const res = await fetch(
      `${baseUrl}/api/admin/products/${id}/reject`,
      {
        method: "PATCH",
      }
    );

    return res.json();
  };
  export const deleteProduct =
  async (id) => {
    const res = await fetch(
      `${baseUrl}/api/admin/products/${id}`,
      {
        method: "DELETE",
      }
    );

    return res.json();
  };