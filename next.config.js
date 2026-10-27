/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.engelengel.com',
      },
      {
        protocol: 'https',
        hostname: 'engelandengel.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
  async redirects() {
    const redirects = [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/team',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/services/forensic-accounting',
        permanent: true,
      },
    ];

    // Redirect resources and design-showcase to home on Vercel only
    if (process.env.VERCEL) {
      redirects.push(

        {
          source: '/design-showcase',
          destination: '/',
          permanent: false,
        }
      );
    }

    return redirects;
  },
  // Enable compression
  compress: true,
  // Optimize for production
  swcMinify: true,
  // Generate sitemap
  trailingSlash: false,
  // Vercel deployment trigger
  poweredByHeader: false,
}

module.exports = nextConfig
