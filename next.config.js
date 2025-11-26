/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Resim İzinleri
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  
  // 2. Yönlendirmeler (Redirects)
  async redirects() {
    return [
      {
        source: '/admin', // Biri /admin yazarsa
        destination: '/login', // Buraya gitsin
        permanent: true, // Bu kalıcı bir değişikliktir
      },
    ];
  },
};

export default nextConfig;