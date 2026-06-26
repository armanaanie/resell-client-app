const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL;

export const getAllOrders =
  async (token) => {
    const res = await fetch(
      `${baseUrl}/api/admin/orders`,
      {
        
      headers:{
        authorization: `Bearer ${token}`
      }
      }
    );

    return res.json();
  };

export const updateOrderStatus =
  async (id, status) => {
    const res = await fetch(
      `${baseUrl}/api/admin/orders/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    return res.json();
  };