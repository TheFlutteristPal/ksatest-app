
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enable static export
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export with next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // If deploying to a subdirectory on GitHub Pages (e.g., your-username.github.io/your-repo-name),
  // you might need to set basePath and assetPrefix.
  // For example, if your repo is 'my-ksatest-app':
  // basePath: process.env.NODE_ENV === 'production' ? '/my-ksatest-app' : undefined,
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/my-ksatest-app/' : undefined,
};

export default nextConfig;
