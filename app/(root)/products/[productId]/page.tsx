"use client";

import React from "react";
import { useParams } from "next/navigation";
import LOGO from "@/public/globe.svg";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  reviews: [];
  created_at: Date;
  seller_address: string;
  seller_email: string;
};

type reviewType = {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: Date;
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({} as productType);
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const product = async () => {
      try {
        const response = await fetch(`${backendUrl}/products/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        return null;
      }
    };

    product();
  }, [productId, backendUrl]);

  return (
    <div className="w-4/5 mx-auto mt-5">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="flex flex-wrap flex-col md:flex-row justify-center mx-auto mt-5">
        <div className="w-full md:w-1/2 ">
          <Image
            src={product.image_url || LOGO}
            alt={product.name || "product logo"}
            width={500}
            height={500}
            className="w-full object-cover p-2 md:p-6 rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-lg font-semibold">Product Details</h2>
          <p className="mt-2 text-gray-700">{product.description}</p>
          <div className="mt-4">
            <span className="text-lg font-bold">${product.price}</span>
            <span className="text-sm text-gray-600 ml-2">
              {product.stock} in stock
            </span>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mt-6">Seller Information</h2>
      <p className="mt-2 text-gray-700">Email: {product.seller_email}</p>
      <p className="mt-2 text-gray-700">Address: {product.seller_address}</p>
      <h2 className="text-lg font-semibold mt-6">
        Reviews {product.rating}
        <span className="text-sm text-gray-600 ml-2">
          ({product.reviews?.length > 0 ? `(${product.reviews.length})` : 0}{" "}
          reviews)
        </span>
      </h2>

      {product.reviews?.length > 0 ? (
        <div className="mt-2 text-gray-700">
          {product.reviews.map((review: reviewType) => (
            <div key={review.id} className="border-b py-2">
              <p className="font-semibold">{review.comment}</p>
              <p className="text-sm text-gray-500">Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-gray-500">No reviews available.</p>
      )}
    </div>
  );
};

export default ProductDetail;
