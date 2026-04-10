/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/login", destination: "/home", permanent: false },
      { source: "/signup", destination: "/home", permanent: false },
      { source: "/auth/callback", destination: "/home", permanent: false },
    ];
  },
};

export default nextConfig;
