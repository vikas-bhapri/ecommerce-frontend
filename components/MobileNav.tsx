import Link from "next/link";
import React from "react";

const MobileNav = () => {
  return (
    <div className="flex items-center justify-around p-4 bg-slate-800 text-white fixed bottom-0 md:hidden w-full">
      <Link href={"/"}>Home</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/user-profile">Profile</Link>
    </div>
  );
};

export default MobileNav;
