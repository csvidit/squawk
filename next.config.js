/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "images.pexels.com",
      //   port: "",
      //   pathname: "*",
      // },
      {
        protocol: "https",
        hostname: "eryflyojnheiubiqebez.supabase.co",
        port: "",
        pathname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
