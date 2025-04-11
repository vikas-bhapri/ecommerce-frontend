import React from "react";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  return (
    <>
      <Navbar loggedIn={true} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to Anthamma Stores</h1>
        <p className="mt-4 text-lg">
          You&apos;re authenticated for one-stop shopping for everything!
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Page is under construction. Please check back later.
        </p>
      </div>
    </>
  );
};

export default Home;
