import Link from "next/link";
import React from "react";

import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CustomAvatar from "./Avatar";

const MobileNav = () => {
  return (
    <div className="flex items-center justify-around py-2 bg-slate-800 text-white sticky bottom-0 md:hidden w-full">
      <Link href="/">
        <FaHome className="text-2xl" />
      </Link>
      <Link href="/cart">
        <FaCartShopping className="text-2xl" />
      </Link>
      <Link href="/user-profile">
        <CustomAvatar letter="V" />
      </Link>
    </div>
  );
};

export default MobileNav;
