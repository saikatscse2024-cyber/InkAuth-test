import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/isomorphic-ws", "@libsql/client"],
  /* config options here */
};

export default nextConfig;
