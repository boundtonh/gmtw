/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/our-locations',
        destination: '/locations',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/',
        permanent: true,
      },
      {
        source: '/online-store',
        destination: '/',
        permanent: true,
      },
      {
        source: '/online-store/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
