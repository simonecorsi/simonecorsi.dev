const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['raw.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
  webpack: (config) => {
    config.module.rules.push(
      ...[
        {
          test: /\.svg$/,
          use: '@svgr/webpack',
        },
      ]
    );

    return config;
  },
});
