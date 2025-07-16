import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      // Tambahkan domain lain jika perlu
    ],
  },
};

export default nextConfig;
