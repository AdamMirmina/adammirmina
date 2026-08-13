import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // HSTS pairs with the redirect in middleware.ts: the redirect catches the
    // first request, this stops there ever being a second one over http.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
