/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:http*',
        headers: [{ key: 'referrer-policy', value: 'no-referrer' }],
      },
    ]
  },
}

module.exports = nextConfig
