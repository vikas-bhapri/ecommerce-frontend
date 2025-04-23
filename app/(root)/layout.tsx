import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import MobileNav from "@/components/MobileNav";

const roboto_flex = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anthamma Stores",
  description: "An Ecommerce Store. Buy and Sell with ease. Fast and Secure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto_flex.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <MobileNav />
        <Toaster />
      </body>
    </html>
  );
}
