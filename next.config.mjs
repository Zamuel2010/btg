import dotenv from "dotenv";
dotenv.config();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false
  },
  env: {
    NEXT_PUBLIC_CLUSTER_URL: process.env.NEXT_PUBLIC_CLUSTER_URL
  }
};
export default nextConfig;
