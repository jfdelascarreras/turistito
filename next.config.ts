import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
