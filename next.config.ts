import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'ecommercewebapp.blob.core.windows.net',
        pathname: '/ecommerce-products/**',
      },
    ]
  }
};

export default nextConfig;
