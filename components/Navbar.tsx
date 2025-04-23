import React from "react";
import LOGO from "@/public/globe.svg";
import Image from "next/image";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

import getTokens from "@/utils/auth/getTokens";
import verifyJWT from "@/utils/auth/verifyJWT";
import CustomAvatar from "./Avatar";

const Navbar = async () => {
  const { accessToken } = await getTokens();
  const payload = verifyJWT(accessToken);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center gap-5">
        <Image src={LOGO} alt="Logo" className="w-[2rem]" />
        <Link href={"/"}>
          <span className="text-xl font-bold">Anthamma Stores</span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-5">
        <Link href={"/cart"} className="text-white text-md hover:text-gray-300">
          <div className="flex items-center gap-1">
            <FaCartShopping />
            <span>Cart</span>
          </div>
        </Link>

        <Link href={"/user-profile"}>
          <CustomAvatar letter={payload?.sub[0].toUpperCase() || "@"} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
