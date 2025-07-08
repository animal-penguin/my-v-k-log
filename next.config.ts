import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    appDir: false,  // App Router を無効化して Pages Router モードにする
  },
}as NextConfig;

export default nextConfig;
