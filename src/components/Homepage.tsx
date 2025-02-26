"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("name-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sorting Function
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="bg-white w-full py-20">
      <div className="w-[90%] mx-auto">
        {/* Sorting Dropdown */}
        <div className="flex justify-end mb-4">
          <select
            className="border border-gray-300 px-4 py-2 rounded text-black"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>


        {error && <p className="text-red-500 text-center">{error}</p>}


        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {currentProducts.map((product: any) => (
              <div key={product.id}>
                <Link href={`/product/${product.id}`}>
                  <div className="py-[64%] relative border border-gray-300">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="py-3">
                    <p className="text-black text-sm md:text-base">{product.title}</p>
                    <p className="text-gray-500 text-sm md:text-base">
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </p>
                    <p className="text-black text-base">Rs {product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}


        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white bg-gray-600 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold text-black">{currentPage}</span>

          <button
            onClick={() =>
              setCurrentPage((prev) => (indexOfLastProduct < sortedProducts.length ? prev + 1 : prev))
            }
            disabled={indexOfLastProduct >= sortedProducts.length}
            className={`px-4 py-2 text-white bg-gray-600 rounded ${
              indexOfLastProduct >= sortedProducts.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
