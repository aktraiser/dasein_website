import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // app/global-not-found.tsx: styled 404 for URLs that match no route.
    globalNotFound: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // One address for the site: www goes to the bare domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dasein-ai.com" }],
        destination: "https://dasein-ai.com/:path*",
        permanent: true,
      },
      // Pages removed from the site.
      { source: "/:lang(en|fr)/expertise", destination: "/:lang#verticals", permanent: true },
      { source: "/:lang(en|fr)/:old(lab|work)", destination: "/:lang", permanent: true },
      { source: "/:lang(en|fr)/:old(lab|work)/:rest*", destination: "/:lang", permanent: true },
    ];
  },
};

export default nextConfig;
