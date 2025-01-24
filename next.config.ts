import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        http: false,
        https: false,
        stream: false,
        web3: false
      };
    }
    return config;
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx']
};

export default nextConfig;
