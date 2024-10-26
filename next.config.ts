import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  images: {
    domains: ["image.tmdb.org", "img.daisyui.com"],
  },
};

export default nextConfig;
