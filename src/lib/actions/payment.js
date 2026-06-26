const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPayments = async (buyerId) => {
  const res = await fetch(
    `${baseUrl}/api/payments?buyerId=${buyerId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};