import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: {
    ignoreBuildErrors: true,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off"
},
};

export default nextConfig;
