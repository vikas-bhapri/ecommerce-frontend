import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://ecommercewebapp.blob.core.windows.net/**")]
  }
};

export default nextConfig;
