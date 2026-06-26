const baseUrl= process.env.NEXT_PUBLIC_BASE_URL;

export const getAllCategories2 = async () => {
  const res = await fetch(`${baseUrl}/api/categories2`, {
    cache: "no-store",
  });

  return res.json();
};