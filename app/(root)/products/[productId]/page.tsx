"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Import js-cookie

import React from "react";
import { useParams } from "next/navigation";
import LOGO from "@/public/globe.svg";
import { useState, useEffect } from "react";
import Image from "next/image";
import StarRating from "@/components/StarRatingInput";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import StarRatingDisplay from "@/components/StarRatingDisplay";

type reviewType = {
  id?: number;
  product_id: number;
  user_id: string;
  rating: number;
  comment: string;
  created_at: Date;
};

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
  reviews: reviewType[];
  created_at: Date;
  seller_address: string;
  seller_email: string;
};

const reviewSchema = z.object({
  comment: z.string().min(1).max(500),
});

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({} as productType);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([] as reviewType[]);

  const reviewsLength = reviews.length;

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleAddToCart = async () => {
    const response = await fetch(
      `${backendUrl}/cart/?product_id=${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Error adding product to cart:", response.statusText);
      return;
    }
    toast.success("Product added to cart successfully!");
  };

  const handleReviewSubmit = async (data: z.infer<typeof reviewSchema>) => {
    console.log(data);
    if (rating === 0) {
      alert("Please select a rating before submitting your review.");
      return;
    }

    try {
      const token = Cookies.get("token");
      if (!token) {
        console.log("No token found. User might not be logged in.");
        return;
      }

      const response = await fetch(`${backendUrl}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          rating: rating,
          comment: data.comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newReview = await response.json();

      // Update the reviews state
      setReviews((prevReviews) => [newReview, ...prevReviews]);

      // Calculate the new average rating
      const totalReviews = reviews.length + 1; // Include the new review
      const totalRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) +
        newReview.rating;
      const newAverageRating = parseFloat(
        (totalRating / totalReviews).toFixed(2)
      ); // Round to 2 decimal places

      // Update the product state with the new rating
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: newAverageRating,
      }));
    } catch (error) {
      console.error("Error submitting review:", error);
    }

    setRating(0); // Reset the rating after submission
    form.reset({ comment: "" }); // Reset the form fields to default values
  };

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
        setRating(data.rating || 0);
        setReviews(data.reviews || []);
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
        <div className="w-full md:w-1/2 py-6 md:p-6">
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
              onClick={handleAddToCart}
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
        Rating {product.rating}
        <span className="text-sm text-gray-600 ml-2">
          ({reviewsLength > 0 ? `${reviewsLength}` : 0} review(s))
        </span>
      </h2>
      <div className="flex gap-3 items-center mb-2">
        <h2 className="text-lg font-semibold mt-1">Add a review</h2>
        <StarRating
          onResetRating={rating}
          onRatingChange={handleRatingChange}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleReviewSubmit)}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-md">Comment</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Write your review here..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Form>
      {reviews?.length > 0 ? (
        <div className="mt-2 text-gray-700">
          {reviews.map((review: reviewType, index: number) => (
            <div key={review.id || index} className="border-b py-2">
              <div className="flex gap-3 flex-wrap items-center mb-2">
                <div>{review.user_id}</div>
                Rating: <StarRatingDisplay rating={review.rating} />
              </div>
              <div className="">{review.comment}</div>
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
