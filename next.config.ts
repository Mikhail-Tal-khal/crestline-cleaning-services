import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // The quotation form accepts photos and one short video for assessment.
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
