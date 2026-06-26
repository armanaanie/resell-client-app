const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getUsers = async (
  search = "",
  role = ""
) => {
  const query = new URLSearchParams();

  if (search) query.append("search", search);
  if (role) query.append("role", role);

  const res = await fetch(
    `${baseUrl}/api/users?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};
export const getUserById = async (id) => {
  const res = await fetch(
    `${baseUrl}/api/users/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};
export const updateUser = async (token,
  id,
  data
) => {
  const res = await fetch(
    `${baseUrl}/api/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
          "authorization":` Bearer ${token}`
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};