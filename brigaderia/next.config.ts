import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Suas configurações aqui
  reactStrictMode: true,
  experimental: {
    // Tentar remover o botão "N" se for essa a origem
    nextScriptWorkers: false,
  },
};

export default nextConfig;
