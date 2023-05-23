module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800', // Increase the max-age value as needed
          },
        ],
      },
    ];
  },
};
