import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 静态部署
  output: "export",

  // 图片优化配置（静态导出不支持服务端优化，使用 unoptimized）
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 启用压缩
  compress: true,

  // 移除 X-Powered-By 头（安全性）
  poweredByHeader: false,

  // 严格模式
  reactStrictMode: true,

  // 注意：headers() 在 output: 'export' 模式下不支持
  // 安全头由 GitHub Pages 或 CDN 层控制
};

export default nextConfig;
