import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.18.54'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000',
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'none'; frame-src 'self' https://maps.google.com https://www.google.com; form-action 'self'; frame-ancestors 'self'; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
