"use client";

import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import CartItem from "@/components/CartItem";

type cartItem = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  image_url: string;
  total_price: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([] as cartItem[]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleDelete = async (product_id: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== product_id)
    );
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookie.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(`${backendUrl}/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data.cart_items);
        console.log(data.cart_items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [backendUrl]);

  return (
    <div className="w-4/5 mx-auto mt-5">
      <h2 className="text-2xl mb-5">My Cart</h2>
      {cartItems.map((item) => (
        <CartItem
          key={item.product_id}
          name={item.product_name}
          price={item.product_price}
          product_id={item.product_id}
          image_url={item.image_url}
          quantity={item.product_quantity}
          total_price={item.total_price}
          onDelete={handleDelete} // Pass the delete handler
        />
      ))}
    </div>
  );
};

export default CartPage;
