import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/security",
        destination: "/categories/security",
        permanent: true,
      },
      {
        source: "/finance",
        destination: "/categories/finance",
        permanent: true,
      },
      {
        source: "/it-solutions",
        destination: "/categories/it-solutions",
        permanent: true,
      },
      {
        source: "/rakshak",
        destination: "/products/kryptik",
        permanent: true,
      },
      {
        source: "/hi-events",
        destination: "/products/noxsov-events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
