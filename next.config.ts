import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Dockerfile sets STANDALONE_BUILD=1 to emit .next/standalone: a minimal
  // server.js plus only the node_modules it needs. Local `next start`, the
  // Playwright tests and Vercel keep the default output.
  output: process.env.STANDALONE_BUILD === "1" ? "standalone" : undefined,
  poweredByHeader: false,
};

export default nextConfig;
