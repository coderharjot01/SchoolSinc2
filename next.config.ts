import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features for faster navigation
  experimental: {
    // Enable optimized package imports for faster loading
    optimizePackageImports: ['lucide-react', 'recharts', '@radix-ui/react-icons'],
  },

  // Enable logging for debugging slow navigations (can be removed in production)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
