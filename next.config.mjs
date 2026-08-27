/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next_dev",
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;


