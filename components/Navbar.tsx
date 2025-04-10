import React from "react";
import LOGO from "@/public/globe.svg"; // Adjust the path as necessary
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Image src={LOGO} alt="Logo" className="w-[2rem]" />
        <span className="ml-2 text-xl font-bold">Anthamma Stores</span>
      </div>
    </div>
  );
};

export default Navbar;
