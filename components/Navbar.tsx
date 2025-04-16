"use client";

import React from "react";
import LOGO from "@/public/globe.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

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
      <div className="flex items-center gap-5">
        <Image src={LOGO} alt="Logo" className="w-[2rem]" />
        <Link href={"/"}>
          <span className="text-xl font-bold">Anthamma Stores</span>
        </Link>
        <Link href={"/contact"}>
          <div className="text-md mt-1 hover:text-gray-200 hover:no-underline">
            Contact Us
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Link href={"/cart"} className="text-white text-md hover:text-gray-300">
          <div className="flex items-center gap-1">
            <FaCartShopping />
            <span>Cart</span>
          </div>
        </Link>

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
    </div>
  );
};

export default Navbar;
