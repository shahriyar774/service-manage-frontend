import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/flowable/:path*',
        destination: 'http://localhost:8080/flowable-rest/service/:path*',
      },
    ];
  },
};

export default nextConfig;
