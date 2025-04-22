import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Products from "@/components/Products";

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-4xl text-center font-bold mt-5">
          Welcome to Anthamma Stores
        </h1>
        <p className="mt-4 text-lg">Your one-stop shopping for everything!</p>
        <Products />
      </div>
    </>
  );
};

export default Home;
