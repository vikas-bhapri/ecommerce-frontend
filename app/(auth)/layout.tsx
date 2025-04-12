import React from "react";
import LOGO from "@/public/globe.svg"; // Adjust the path as necessary
import Image from "next/image";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

const roboto_flex = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anthamma Stores",
  description: "An Ecommerce Store. Buy and Sell with ease. Fast and Secure.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${roboto_flex.className} antialiased`}>
        <div className="flex">
          <div className="hidden lg:flex min-h-screen flex-col gap-3 w-2/5 bg-gradient-to-r from-[#0f172a] to-[#1e293b] justify-center items-center">
            <Image src={LOGO} className="w-1/3" alt="Logo" />
            <div className="text-white mt-10 text-4xl font-bold">
              Anthamma Stores
            </div>
            <p className="text-white">
              An Ecommerce Store. Buy and Sell with ease. Fast and Secure.
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2 lg:w-3/5 min-h-full">
            <h1 className="text-3xl mt-5 lg:hidden font-semibold ">
              Anthamma Stores
            </h1>
            <Image
              src={LOGO}
              alt="LOGO"
              className="max-w-[125px] min-w-[75px] my-5 w-1/3 lg:hidden"
            />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default layout;
