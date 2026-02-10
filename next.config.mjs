/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["zk-eligibility-sdk"],
  async redirects() {
    return [
      {
        source: "/go",
        destination:
          "https://airdrop-eligibility-demo-1-4o2f308e9.vercel.app?_vercel_share=lVEtAdzU5jIDc3A251ypFQTvCp2qQImF",
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
}

export default nextConfig
