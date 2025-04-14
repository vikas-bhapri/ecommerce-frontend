"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

type productType = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  brand: string;
  rating: number;
  num_reviews: number;
  created_at: Date;
  seller_email: string;
  seller_address: string;
};

const Products = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [loading, setLoading] = useState(false);
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/products/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data);

      // Cache the products in localStorage
      localStorage.setItem("products", JSON.stringify(data));
      localStorage.setItem("productsCacheTime", Date.now().toString());
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if products are cached
    const cachedProducts = localStorage.getItem("products");
    const cacheTime = localStorage.getItem("productsCacheTime");

    // Cache expiration logic (e.g., 1 hour)
    const cacheExpiration = 60 * 1000; // 1 min in milliseconds
    const isCacheValid =
      cacheTime && Date.now() - parseInt(cacheTime, 10) < cacheExpiration;

    if (cachedProducts && isCacheValid) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      fetchProducts();
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map((product: productType) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard
                key={product.id}
                imageUrl={product.image_url}
                title={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
