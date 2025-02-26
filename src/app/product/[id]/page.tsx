import ProductDetailPage from "@/components/ProductDetailPage";
import React from "react";

export default async function page({ params }: any) {
  const { id } = params;
  let product = null;
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    product = await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
  return (
    <div>
      <ProductDetailPage product={product} />
    </div>
  );
}
