"use client";

import React from "react";
import LOGO from "@/public/globe.svg"; // Adjust the path as necessary
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = ({ loggedIn }: { loggedIn: boolean }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/sign-in");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Image src={LOGO} alt="Logo" className="w-[2rem]" />
        <span className="ml-2 text-xl font-bold">Anthamma Stores</span>
      </div>
      {loggedIn && (
        <Button
          type="button"
          onClick={handleLogout}
          variant="link"
          className="text-white hover:text-gray-300 hover:no-underline text-md"
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default Navbar;
