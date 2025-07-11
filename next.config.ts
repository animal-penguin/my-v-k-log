// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ここで直接指定
  appDir: false,

  // もし他に必要な設定があれば続けて書く
  // pageExtensions: ['tsx','ts','jsx','js'],
};

export default nextConfig;

