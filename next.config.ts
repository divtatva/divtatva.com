import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: 'build', // Specify the output directory for the static export
  images: {
    unoptimized: true, // Disable image optimization for static export
  },

};

export default nextConfig;
