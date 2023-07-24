/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photo-resize-zmp3.zmdcdn.me',
        port: '',
        pathname: '',
      },
    ],
  },
}

module.exports = nextConfig
