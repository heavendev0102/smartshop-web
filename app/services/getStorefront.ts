export const getStorefront = async () => {
  const res = await fetch(
    "https://smartshop-api-yhkt.onrender.com/api/v1/storefront/",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch storefront");

  return res.json();
};