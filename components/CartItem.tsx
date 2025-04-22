/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React, { useState } from "react";
import Cookie from "js-cookie";

import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import Link from "next/link";
import { Button } from "./ui/button";

type cartItem = {
  product_id: number;
  name: string;
  image_url: string;
  quantity: number;
  price: number;
  total_price: number;
};

type CartItemProps = cartItem & {
  onDelete: (product_id: number) => void; // Callback to delete the item
};

const CartItem = ({
  product_id,
  name,
  quantity,
  price,
  total_price,
  image_url,
  onDelete,
}: CartItemProps) => {
  const [item, setItem] = useState({
    product_id,
    name,
    quantity,
    price,
    total_price,
    image_url,
  } as cartItem);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleIncrease = async () => {
    setItem((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
      total_price: prev.total_price + prev.price,
    }));
    const response = await fetch("/api/auth/secure-fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        path: `/cart/?product_id=${item.product_id}`,
      }),
    });
  };

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      setItem((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
        total_price: prev.total_price - prev.price,
      }));
    } else {
      onDelete(item.product_id); // Call the onDelete callback when quantity is zero
    }

    const response = await fetch("/api/auth/secure-fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "DELETE",
        path: `/cart/?product_id=${item.product_id}`,
      }),
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Image
            src={image_url}
            alt="Product Image"
            className="w-16 h-16 object-contain rounded-md"
            width={100}
            height={100}
          />
          <div className="">
            <Link href={`/products/${product_id}`}>
              <h3 className="text-lg font-semibold">{name}</h3>
            </Link>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-600">Price: ${price}</p>
          </div>
        </div>
        <div className="flex flex-col content-center items-center gap-4">
          <div className="flex items-center justify-center gap-2 border-1 border-gray-500 rounded-md">
            <Button
              type="button"
              onClick={handleDecrease}
              className="rounded-r-none rounded-l-md bg-gray-200 hover:bg-gray-300  border-r-1 border-gray-500"
            >
              <BiMinus className="text-lg text-gray-800" />
            </Button>
            <span className="text-lg font-semibold">{item.quantity}</span>
            <Button
              type="button"
              onClick={handleIncrease}
              className="rounded-r-md rounded-l-none bg-gray-200 hover:bg-gray-300 border-l-1 border-gray-500"
            >
              <BiPlus className="text-lg text-gray-800" />
            </Button>
          </div>
          <p className="text-lg font-semibold">${item.total_price}</p>
        </div>
      </div>

      <hr className="mt-2" />
    </>
  );
};

export default CartItem;
