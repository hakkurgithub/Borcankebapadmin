/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // Resimlerin geldiği GitHub adresi
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;