import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "scontent.fcgy1-1.fna.fbcdn.net" },
      { protocol: "https", hostname: "scontent.fcgy2-1.fna.fbcdn.net" },
      { protocol: "https", hostname: "scontent.fceb1-1.fna.fbcdn.net" },
    ],
  },
};

export default nextConfig;
