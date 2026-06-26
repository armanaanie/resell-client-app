const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);
export const getSellerOrders = async (sellerId) => {
  const res = await fetch(`${baseUrl}/api/orders?sellerId=${sellerId}`);
  return res.json();
};

export const updateOrderStatus = async (token,id, status) => {
  const res = await fetch(`${baseUrl}/api/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};
export const updateOrderStatusforBuyer = async (token,id, status) => {
  const res = await fetch(`${baseUrl}/api/orders/${id}/deliver`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};
export const deleteOrder = async (id) => {
  const res = await fetch(`${baseUrl}/api/orders/${id}`, {
    method: "DELETE",
  });

  return res.json();
};
export const getBuyerOrders = async (buyerId,token) => {
  const res = await fetch(
    `${baseUrl}/api/orders?buyerId=${buyerId}`,
    {
      headers:{
        authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};
export const getOrderById=async function getOrderById(id,token) {
  const res = await fetch(`${baseUrl}/api/orders/${id}`, {
headers:{
        authorization: `Bearer ${token}`
      }  });

  if (!res.ok) return null;

  return res.json();
}

export const cancelOrder = async (token,id) => {
  const res = await fetch(
    `${baseUrl}/api/orders/${id}/remove-from-buyer-orders`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${token}`

      },
      body: JSON.stringify({
        status: "cancelled",
      }),
    }
  );

  return res.json();
};