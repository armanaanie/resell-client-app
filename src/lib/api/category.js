const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getCategories = async () => {
  const res = await fetch(`${baseUrl}/api/categories`);
  return res.json();
};
export const getProductsByCategory = async (category) => {
  const res = await fetch(
    `${baseUrl}/api/products/category/${category}`
  );

  return res.json();
};