import React from "react";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to Anthamma Stores</h1>
        <p className="mt-4 text-lg">Your one-stop shop for everything!</p>
        <p className="mt-2 text-sm text-gray-500">
          Page is under construction. Please check back later.
        </p>
      </div>
    </>
  );
};

export default Home;
