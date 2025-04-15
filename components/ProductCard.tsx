import Image from "next/image";
import React from "react";
import LOGO from "@/public/globe.svg";
import StarRatingDisplay from "./StarRatingDisplay";

const ProductCard = (props: {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
}) => {
  const { imageUrl, title, description, price, stock, rating } = props;
  return (
    <div className="flex flex-col md:flex-row items-center min-h-[200px] md:min-w-[400px] gap-10  bg-white shadow-md rounded-lg p-4 m-4 border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <Image
        src={imageUrl || LOGO}
        priority={true}
        alt="Product Image"
        width={150}
        height={150}
        className="w-[150px] h-[150px] object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700 mb-4">
          {description || "No description available."}
        </p>
        <div className="flex items-center mb-2">
          <span className="text-gray-500 mr-2">Rating:</span>
          <StarRatingDisplay rating={rating} />
        </div>
        <div className="flex items-center justify-between gap-5 w-full mb-4">
          <span className="font-semibold text-lg">Available: {stock}</span>
          <span className="font-semibold text-lg">Price: ${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
