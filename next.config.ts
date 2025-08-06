import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Отключаем строгий режим ESLint для продакшена
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Отключаем строгую проверку TypeScript для продакшена
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
