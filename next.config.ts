import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['mysql2'],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
