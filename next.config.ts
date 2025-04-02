const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

import type { NextConfig } from "next";

const nextConfig: NextConfig = withPWA({
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental:{
    viewTransition:true
  }
});

export default nextConfig;
