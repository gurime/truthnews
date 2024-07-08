/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_STRIPE_PRIVATE_KEY:process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY
    },
    reactStrictMode: true, // Optional: Enable React Strict Mode
  };
  
  export default nextConfig;
  