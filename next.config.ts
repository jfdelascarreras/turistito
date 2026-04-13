import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Allow image uploads in /tours Server Actions.
      bodySizeLimit: "12mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      {
        protocol: "https",
        hostname: "interactive-examples.mdn.mozilla.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
