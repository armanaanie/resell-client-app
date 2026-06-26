const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const changeStatus = async (
  id,
  status,token
) => {
  const res = await fetch(
    `${baseUrl}/api/admin/users/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
          authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  return res.json();
};

export const deleteUser = async (id,token) => {
  const res = await fetch(
    `${baseUrl}/api/admin/users/${id}`,
    {
      method: "DELETE",
      headers: {
        
          authorization: `Bearer ${token}`
      },
    }
  );

  return res.json();
};